package com.dsainsights.controller;

import com.dsainsights.dto.ExecuteRequest;
import com.dsainsights.service.CodeExecutorService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ExecuteController {

    private final CodeExecutorService executorService;

    public ExecuteController(CodeExecutorService executorService) {
        this.executorService = executorService;
    }

    @PostMapping("/execute")
    public Map<String, Object> execute(@RequestBody ExecuteRequest request) {
        return executorService.execute(request);
    }
}
