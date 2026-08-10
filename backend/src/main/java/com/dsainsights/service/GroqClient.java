package com.dsainsights.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GroqClient {

    private static final String BASE_URL = "https://api.groq.com/openai/v1";

    private final RestClient restClient;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${groq.api-key:}")
    private String apiKey;

    @Value("${groq.model:llama-3.3-70b-versatile}")
    private String model;

    @Value("${groq.stt-model:whisper-large-v3-turbo}")
    private String sttModel;

    public GroqClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    private String authHeader() {
        return "Bearer " + apiKey;
    }

    public boolean isConfigured() {
        return apiKey != null && !apiKey.isBlank();
    }

    public ChatCompletionResult chat(List<Map<String, Object>> messages, Integer maxTokens, Double temperature) {
        Map<String, Object> body = Map.of(
                "model", model,
                "messages", messages,
                "max_tokens", maxTokens,
                "temperature", temperature
        );
        JsonNode resp = restClient.post()
                .uri(BASE_URL + "/chat/completions")
                .header(HttpHeaders.AUTHORIZATION, authHeader())
                .contentType(MediaType.APPLICATION_JSON)
                .body(body)
                .retrieve()
                .body(JsonNode.class);

        String reply = resp.path("choices").path(0).path("message").path("content").asText("");
        return new ChatCompletionResult(reply, resp.path("usage"));
    }

    public String transcribe(byte[] audio, String filename) {
        MultiValueMap<String, Object> form = new LinkedMultiValueMap<>();
        form.add("model", sttModel);
        form.add("file", new ByteArrayResource(audio) {
            @Override
            public String getFilename() {
                return filename;
            }
        });
        form.add("language", "en");

        JsonNode resp = restClient.post()
                .uri(BASE_URL + "/audio/transcriptions")
                .header(HttpHeaders.AUTHORIZATION, authHeader())
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(form)
                .retrieve()
                .body(JsonNode.class);

        return resp == null ? "" : resp.path("text").asText("");
    }

    public record ChatCompletionResult(String content, JsonNode usage) {}
}
