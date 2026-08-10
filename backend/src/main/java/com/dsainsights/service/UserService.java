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
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CodeRepository codeRepository;
    private final MongoTemplate mongoTemplate;

    public UserService(UserRepository userRepository, CodeRepository codeRepository, MongoTemplate mongoTemplate) {
        this.userRepository = userRepository;
        this.codeRepository = codeRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public boolean isConnected() {
        try {
            mongoTemplate.executeCommand("{ ping: 1 }");
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Map<String, Object> dbStatus() {
        return Map.of("connected", isConnected());
    }

    public Map<String, Object> getOrCreateUser(String userId, String name) {
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
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> updateUser(String userId, Map<String, Object> body) {
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
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> getSolved(String userId) {
        try {
            List<Integer> solved = userRepository.findByUserId(userId)
                    .map(UserProfile::getSolvedProblems)
                    .orElse(new ArrayList<>());
            return Map.of("solved", solved);
        } catch (Exception e) {
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> addSolved(String userId, Integer problemId) {
        try {
            UserProfile user = userRepository.findByUserId(userId).orElseGet(() -> {
                UserProfile u = new UserProfile();
                u.setUserId(userId);
                return u;
            });
            user.setUserId(userId);
            if (problemId != null && !user.getSolvedProblems().contains(problemId)) {
                user.getSolvedProblems().add(problemId);
            }
            userRepository.save(user);
            return Map.of("solved", user.getSolvedProblems());
        } catch (Exception e) {
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> leaderboard() {
        try {
            List<UserProfile> users = userRepository.findAll().stream()
                    .sorted(Comparator.comparingInt((UserProfile u) -> u.getProfile().getTotalSolved()).reversed()
                            .thenComparing(Comparator.comparingInt((UserProfile u) -> u.getProfile().getCurrentStreak()).reversed()))
                    .limit(50)
                    .toList();
            List<Map<String, Object>> leaderboard = users.stream().map(u -> Map.<String, Object>of(
                    "name", u.getName(),
                    "solved", u.getProfile().getTotalSolved(),
                    "streak", u.getProfile().getCurrentStreak(),
                    "userId", u.getUserId()
            )).toList();
            return Map.of("leaderboard", leaderboard);
        } catch (Exception e) {
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> saveCode(String userId, Integer problemId, String language, String code) {
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
            return Map.of("fallback", true);
        }
    }

    public Map<String, Object> getCode(String userId, Integer problemId, String language) {
        try {
            String code = codeRepository.findByUserIdAndProblemIdAndLanguage(userId, problemId, language)
                    .map(SavedCode::getCode)
                    .orElse("");
            return Map.of("code", code);
        } catch (Exception e) {
            return Map.of("fallback", true);
        }
    }

    private com.fasterxml.jackson.databind.ObjectMapper objectMapper() {
        return new com.fasterxml.jackson.databind.ObjectMapper();
    }
}
