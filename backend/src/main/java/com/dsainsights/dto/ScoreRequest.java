package com.dsainsights.dto;

import java.util.List;
import java.util.Map;

public class ScoreRequest {

    private List<Map<String, Object>> messages;
    private ProblemDto problem;
    private String resumeText;

    public List<Map<String, Object>> getMessages() { return messages; }
    public void setMessages(List<Map<String, Object>> messages) { this.messages = messages; }
    public ProblemDto getProblem() { return problem; }
    public void setProblem(ProblemDto problem) { this.problem = problem; }
    public String getResumeText() { return resumeText; }
    public void setResumeText(String resumeText) { this.resumeText = resumeText; }
}
