package com.dsainsights.dto;

import java.util.List;
import java.util.Map;

public class ExecuteRequest {

    private String code;
    private String language;
    private String funcName;
    private List<TestCase> testCases;

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getFuncName() { return funcName; }
    public void setFuncName(String funcName) { this.funcName = funcName; }
    public List<TestCase> getTestCases() { return testCases; }
    public void setTestCases(List<TestCase> testCases) { this.testCases = testCases; }

    public static class TestCase {
        private Map<String, Object> input;
        private Object output;

        public Map<String, Object> getInput() { return input; }
        public void setInput(Map<String, Object> input) { this.input = input; }
        public Object getOutput() { return output; }
        public void setOutput(Object output) { this.output = output; }
    }
}
