package com.dsainsights.controller;

import com.dsainsights.dto.ChatRequest;
import com.dsainsights.dto.ResumeStartRequest;
import com.dsainsights.dto.ScoreRequest;
import com.dsainsights.service.GroqClient;
import com.dsainsights.service.Prompts;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resume-interview")
@CrossOrigin(origins = "*")
public class ResumeInterviewController {

    private final GroqClient groqClient;

    public ResumeInterviewController(GroqClient groqClient) {
        this.groqClient = groqClient;
    }

    @PostMapping("/start")
    public Map<String, Object> start(@RequestBody ResumeStartRequest req) {
        if (req.getResumeText() == null || req.getResumeText().isBlank()) {
            return Map.of("error", "Resume text not provided");
        }
        return Map.of(
                "systemPrompt", Prompts.resumeSystemPrompt(req.getUserName(), req.getResumeText()),
                "initialMessage", Prompts.resumeInitialMessage(req.getUserName(), req.getResumeText()));
    }

    @PostMapping("/score")
    public Map<String, Object> score(@RequestBody ScoreRequest req) {
        if (!groqClient.isConfigured()) {
            return Map.of("error", "Groq API key not configured");
        }
        try {
            List<Map<String, Object>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", Prompts.resumeScoreSystemPrompt(req.getResumeText())));
            if (req.getMessages() != null) {
                messages.addAll(req.getMessages());
            }
            GroqClient.ChatCompletionResult result = groqClient.chat(messages, 400, 0.3);
            return Map.of("score", result.content());
        } catch (Exception e) {
            return Map.of("error", "Score Error: " + e.getMessage());
        }
    }
}
