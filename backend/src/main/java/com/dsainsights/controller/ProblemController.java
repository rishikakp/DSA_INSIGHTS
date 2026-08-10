package com.dsainsights.controller;

import com.dsainsights.data.ProblemsData;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProblemController {

    @GetMapping("/api/problems")
    public List<Map<String, Object>> problems() {
        return ProblemsData.all();
    }
}
