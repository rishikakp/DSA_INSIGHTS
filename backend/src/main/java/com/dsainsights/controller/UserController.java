package com.dsainsights.controller;

import com.dsainsights.service.UserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/api/db/status")
    public Map<String, Object> dbStatus() {
        return userService.dbStatus();
    }

    @GetMapping("/api/user/{userId}")
    public Map<String, Object> getUser(@PathVariable String userId, @RequestBody(required = false) Map<String, Object> body) {
        String name = body == null ? null : (String) body.get("name");
        return userService.getOrCreateUser(userId, name);
    }

    @PutMapping("/api/user/{userId}")
    public Map<String, Object> updateUser(@PathVariable String userId, @RequestBody Map<String, Object> body) {
        return userService.updateUser(userId, body);
    }

    @GetMapping("/api/user/{userId}/solved")
    public Map<String, Object> getSolved(@PathVariable String userId) {
        return userService.getSolved(userId);
    }

    @PostMapping("/api/user/{userId}/solved")
    public Map<String, Object> addSolved(@PathVariable String userId, @RequestBody Map<String, Object> body) {
        Integer problemId = body.get("problemId") == null ? null
                : ((Number) body.get("problemId")).intValue();
        List<Integer> problemIds = null;
        Object raw = body.get("problemIds");
        if (raw instanceof List<?> list) {
            problemIds = list.stream()
                    .filter(Number.class::isInstance)
                    .map(n -> ((Number) n).intValue())
                    .toList();
        }
        return userService.addSolved(userId, problemId, problemIds);
    }

    @GetMapping("/api/leaderboard")
    public Map<String, Object> leaderboard() {
        return userService.leaderboard();
    }

    @PutMapping("/api/user/{userId}/code")
    public Map<String, Object> saveCode(@PathVariable String userId, @RequestBody Map<String, Object> body) {
        Integer problemId = body.get("problemId") == null ? null
                : ((Number) body.get("problemId")).intValue();
        String language = (String) body.get("language");
        String code = (String) body.get("code");
        return userService.saveCode(userId, problemId, language, code);
    }

    @GetMapping("/api/user/{userId}/code/{problemId}/{language}")
    public Map<String, Object> getCode(@PathVariable String userId,
                                       @PathVariable Integer problemId,
                                       @PathVariable String language) {
        return userService.getCode(userId, problemId, language);
    }
}
