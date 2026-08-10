package com.dsainsights.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "codes")
@CompoundIndex(name = "user_problem_lang", def = "{'userId': 1, 'problemId': 1, 'language': 1}", unique = true)
public class SavedCode {

    @Id
    private String id;

    @Indexed
    private String userId;

    private Integer problemId;
    private String language;
    private String code = "";

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public Integer getProblemId() { return problemId; }
    public void setProblemId(Integer problemId) { this.problemId = problemId; }
    public String getLanguage() { return language; }
    public void setLanguage(String language) { this.language = language; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
}
