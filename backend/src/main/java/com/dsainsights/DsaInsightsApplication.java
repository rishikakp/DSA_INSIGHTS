package com.dsainsights;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class DsaInsightsApplication {

    public static void main(String[] args) {
        SpringApplication.run(DsaInsightsApplication.class, args);
    }
}
