package com.dsainsights.repository;

import com.dsainsights.model.SavedCode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CodeRepository extends MongoRepository<SavedCode, String> {
    Optional<SavedCode> findByUserIdAndProblemIdAndLanguage(String userId, Integer problemId, String language);
}
