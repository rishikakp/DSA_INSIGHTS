package com.dsainsights.dto;

public class InterviewStartRequest {

    private Integer problemId;
    private ProblemDto problem;

    public Integer getProblemId() { return problemId; }
    public void setProblemId(Integer problemId) { this.problemId = problemId; }
    public ProblemDto getProblem() { return problem; }
    public void setProblem(ProblemDto problem) { this.problem = problem; }
}
