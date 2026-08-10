package com.dsainsights.dto;

import java.util.List;
import java.util.Map;

public class ChatRequest {

    private List<Map<String, Object>> messages;

    public List<Map<String, Object>> getMessages() { return messages; }
    public void setMessages(List<Map<String, Object>> messages) { this.messages = messages; }
}
