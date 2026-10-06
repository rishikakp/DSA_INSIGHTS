package com.dsainsights.config;

import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.concurrent.TimeUnit;

/**
 * Without a reachable MongoDB the driver waits 30s (the default server selection
 * timeout) before failing, which blocks every /api/user/* and /api/leaderboard
 * call for half a minute. The app is designed to run without Mongo (localStorage
 * fallback), so connections must fail fast instead.
 */
@Configuration
public class MongoConfig {

    private static final long SERVER_SELECTION_MS = 1500L;
    private static final long CONNECT_MS = 1500L;
    private static final long READ_MS = 5000L;

    @Bean
    public MongoClientSettingsBuilderCustomizer failFastMongoCustomizer() {
        return settings -> settings
                .applyToClusterSettings(c -> c.serverSelectionTimeout(SERVER_SELECTION_MS, TimeUnit.MILLISECONDS))
                .applyToSocketSettings(s -> s
                        .connectTimeout(CONNECT_MS, TimeUnit.MILLISECONDS)
                        .readTimeout(READ_MS, TimeUnit.MILLISECONDS));
    }
}
