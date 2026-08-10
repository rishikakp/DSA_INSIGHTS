package com.dsainsights.controller;

import com.dsainsights.dto.ChatRequest;
import com.dsainsights.dto.InterviewStartRequest;
import com.dsainsights.dto.ScoreRequest;
import com.dsainsights.service.GroqClient;
import com.dsainsights.service.Prompts;
import com.dsainsights.service.TtsService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/interview")
@CrossOrigin(origins = "*")
public class InterviewController {

    private final GroqClient groqClient;
    private final TtsService ttsService;

    public InterviewController(GroqClient groqClient, TtsService ttsService) {
        this.groqClient = groqClient;
        this.ttsService = ttsService;
    }

    @PostMapping("/start")
    public Map<String, Object> start(@RequestBody InterviewStartRequest req) {
        if (req.getProblem() == null) {
            return Map.of("error", "Problem not provided");
        }
        String title = req.getProblem().getTitle() == null ? "problem" : req.getProblem().getTitle();
        return Map.of(
                "systemPrompt", Prompts.dsaSystemPrompt(req.getProblem()),
                "initialMessage", Prompts.dsaInitialMessage(title));
    }

    @PostMapping("/chat")
    public Map<String, Object> chat(@RequestBody ChatRequest req) {
        if (!groqClient.isConfigured()) {
            return Map.of("error", "Groq API key not configured");
        }
        try {
            List<Map<String, Object>> messages = req.getMessages() == null ? new ArrayList<>() : req.getMessages();
            GroqClient.ChatCompletionResult result = groqClient.chat(messages, 400, 0.6);
            return Map.of("reply", result.content(), "usage", result.usage());
        } catch (Exception e) {
            return Map.of("error", "AI Error: " + e.getMessage());
        }
    }

    @PostMapping("/score")
    public Map<String, Object> score(@RequestBody ScoreRequest req) {
        if (!groqClient.isConfigured()) {
            return Map.of("error", "Groq API key not configured");
        }
        try {
            String title = req.getProblem() == null ? null : req.getProblem().getTitle();
            List<Map<String, Object>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", Prompts.dsaScoreSystemPrompt(title)));
            if (req.getMessages() != null) {
                messages.addAll(req.getMessages());
            }
            GroqClient.ChatCompletionResult result = groqClient.chat(messages, 300, 0.3);
            return Map.of("score", result.content());
        } catch (Exception e) {
            return Map.of("error", "Score Error: " + e.getMessage());
        }
    }

    @PostMapping("/voice")
    public ResponseEntity<?> voice(@RequestBody Map<String, Object> body) {
        String text = body.get("text") == null ? "" : String.valueOf(body.get("text"));
        try {
            byte[] audio = ttsService.synthesize(text);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_TYPE, "audio/mpeg")
                    .body(audio);
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("useBrowserTTS", true, "text", text));
        }
    }

    @PostMapping("/speech-to-text")
    public Map<String, Object> speechToText(@RequestParam("audio") MultipartFile audio) {
        if (!groqClient.isConfigured()) {
            return Map.of("error", "Groq API key not configured");
        }
        if (audio == null || audio.isEmpty()) {
            return Map.of("error", "No audio file provided");
        }
        try {
            String filename = audio.getOriginalFilename() == null ? "audio.webm" : audio.getOriginalFilename();
            String text = groqClient.transcribe(audio.getBytes(), filename);
            return Map.of("text", text == null ? "" : text);
        } catch (Exception e) {
            return Map.of("error", "STT Error: " + e.getMessage());
        }
    }
}
