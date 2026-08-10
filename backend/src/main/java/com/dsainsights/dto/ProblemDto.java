package com.dsainsights.dto;

import java.util.List;

public class ProblemDto {

    private Integer problemId;
    private String title;
    private String description;
    private List<String> constraints;

    public Integer getProblemId() { return problemId; }
    public void setProblemId(Integer problemId) { this.problemId = problemId; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getConstraints() { return constraints; }
    public void setConstraints(List<String> constraints) { this.constraints = constraints; }
}
