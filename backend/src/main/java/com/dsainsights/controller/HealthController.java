package com.dsainsights.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, Object> health() {
        return Map.of("status", "ok", "service", "java-spring");
    }

    @PostMapping("/api/python/analyze")
    public Map<String, Object> analyze() {
        return Map.of(
                "complexity", "O(n)",
                "issues", java.util.List.of(),
                "suggestions", java.util.List.of("Add type hints", "Consider edge cases"));
    }
}
