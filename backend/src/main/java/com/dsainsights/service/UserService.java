package com.dsainsights.service;

import com.dsainsights.model.Profile;
import com.dsainsights.model.SavedCode;
import com.dsainsights.model.UserProfile;
import com.dsainsights.repository.CodeRepository;
import com.dsainsights.repository.UserRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    /**
     * How long a "MongoDB is unreachable" verdict is cached. While cached the
     * repository lookups are skipped entirely, so the frontend falls back to
     * localStorage immediately instead of waiting out a timeout on every call.
     */
    private static final long DOWN_CACHE_MS = 15_000L;

    private static final Map<String, Object> FALLBACK = Map.of("fallback", true);

    private final UserRepository userRepository;
    private final CodeRepository codeRepository;
    private final MongoTemplate mongoTemplate;

    private final Object probeLock = new Object();
    private volatile boolean reachable = false;
    private volatile long lastProbeAt = 0L;

    public UserService(UserRepository userRepository, CodeRepository codeRepository, MongoTemplate mongoTemplate) {
        this.userRepository = userRepository;
        this.codeRepository = codeRepository;
        this.mongoTemplate = mongoTemplate;
    }

    private boolean mongoAvailable() {
        long now = System.currentTimeMillis();
        if (now - lastProbeAt < DOWN_CACHE_MS) {
            return reachable;
        }
        synchronized (probeLock) {
            now = System.currentTimeMillis();
            if (now - lastProbeAt < DOWN_CACHE_MS) {
                return reachable;
            }
            reachable = ping();
            lastProbeAt = System.currentTimeMillis();
            return reachable;
        }
    }

    private boolean ping() {
        try {
            mongoTemplate.executeCommand("{ ping: 1 }");
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Map<String, Object> dbStatus() {
        return Map.of("connected", mongoAvailable());
    }

    public Map<String, Object> getOrCreateUser(String userId, String name) {
        if (!mongoAvailable()) return FALLBACK;
        try {
            Optional<UserProfile> existing = userRepository.findByUserId(userId);
            UserProfile user = existing.orElseGet(() -> {
                UserProfile u = new UserProfile();
                u.setUserId(userId);
                u.setName(name == null || name.isBlank() ? "User" : name);
                return userRepository.save(u);
            });
            return Map.of("user", user);
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    public Map<String, Object> updateUser(String userId, Map<String, Object> body) {
        if (!mongoAvailable()) return FALLBACK;
        try {
            UserProfile user = userRepository.findByUserId(userId).orElseGet(UserProfile::new);
            user.setUserId(userId);
            if (body.get("name") != null) user.setName(String.valueOf(body.get("name")));
            if (body.get("email") != null) user.setEmail(String.valueOf(body.get("email")));
            if (body.get("profile") != null) {
                user.setProfile(objectMapper().convertValue(body.get("profile"), Profile.class));
            }
            userRepository.save(user);
            return Map.of("user", user);
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    public Map<String, Object> getSolved(String userId) {
        if (!mongoAvailable()) return FALLBACK;
        try {
            List<Integer> solved = userRepository.findByUserId(userId)
                    .map(UserProfile::getSolvedProblems)
                    .orElse(new ArrayList<>());
            return Map.of("solved", solved);
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    /**
     * Accepts either a single {@code problemId} or a {@code problemIds} array.
     * Non-positive ids are ignored: the frontend used to post {@code -1} as a
     * "sync" sentinel, which polluted the stored solved list with -1.
     */
    public Map<String, Object> addSolved(String userId, Integer problemId, List<Integer> problemIds) {
        if (!mongoAvailable()) return FALLBACK;
        try {
            Set<Integer> requested = new LinkedHashSet<>();
            if (problemIds != null) {
                for (Integer p : problemIds) {
                    if (p != null && p > 0) requested.add(p);
                }
            }
            if (problemId != null && problemId > 0) requested.add(problemId);

            UserProfile user = userRepository.findByUserId(userId).orElseGet(() -> {
                UserProfile u = new UserProfile();
                u.setUserId(userId);
                return u;
            });
            user.setUserId(userId);
            for (Integer p : requested) {
                if (!user.getSolvedProblems().contains(p)) {
                    user.getSolvedProblems().add(p);
                }
            }
            userRepository.save(user);
            return Map.of("solved", user.getSolvedProblems());
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    public Map<String, Object> leaderboard() {
        if (!mongoAvailable()) return FALLBACK;
        try {
            List<UserProfile> users = userRepository.findAll().stream()
                    .sorted(Comparator.comparingInt((UserProfile u) -> safeProfile(u).getTotalSolved()).reversed()
                            .thenComparing(Comparator.comparingInt((UserProfile u) -> safeProfile(u).getCurrentStreak()).reversed()))
                    .limit(50)
                    .toList();
            List<Map<String, Object>> leaderboard = users.stream().map(u -> Map.<String, Object>of(
                    "name", u.getName() == null ? "User" : u.getName(),
                    "solved", safeProfile(u).getTotalSolved(),
                    "streak", safeProfile(u).getCurrentStreak(),
                    "userId", u.getUserId() == null ? "" : u.getUserId()
            )).toList();
            return Map.of("leaderboard", leaderboard);
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    public Map<String, Object> saveCode(String userId, Integer problemId, String language, String code) {
        if (problemId == null || problemId <= 0 || language == null) return FALLBACK;
        if (!mongoAvailable()) return FALLBACK;
        try {
            SavedCode doc = codeRepository.findByUserIdAndProblemIdAndLanguage(userId, problemId, language)
                    .orElseGet(SavedCode::new);
            doc.setUserId(userId);
            doc.setProblemId(problemId);
            doc.setLanguage(language);
            doc.setCode(code == null ? "" : code);
            codeRepository.save(doc);
            return Map.of("saved", true);
        } catch (Exception e) {
            return FALLBACK;
        }
    }

    public Map<String, Object> getCode(String userId, Integer problemId, String language) {
        if (problemId == null || problemId <= 0 || language == null) {
            return Map.of("code", "");
        }
        if (!mongoAvailable()) return Map.of("code", "");
        try {
            String code = codeRepository.findByUserIdAndProblemIdAndLanguage(userId, problemId, language)
                    .map(SavedCode::getCode)
                    .orElse("");
            return Map.of("code", code);
        } catch (Exception e) {
            return Map.of("code", "");
        }
    }

    private Profile safeProfile(UserProfile u) {
        return u.getProfile() == null ? new Profile() : u.getProfile();
    }

    private com.fasterxml.jackson.databind.ObjectMapper objectMapper() {
        return new com.fasterxml.jackson.databind.ObjectMapper();
    }
}
