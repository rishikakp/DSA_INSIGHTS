package com.dsainsights.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class TtsService {

    @Value("${tts.edge-tts-path:edge-tts}")
    private String edgeTtsPath;

    public byte[] synthesize(String text) throws IOException, InterruptedException {
        String clean = cleanText(text);
        if (clean.isEmpty()) {
            throw new IllegalArgumentException("No text");
        }

        Path dir = Files.createTempDirectory("dsa-tts-");
        try {
            Path input = dir.resolve("tts-in.txt");
            Path output = dir.resolve("tts-out.mp3");
            Files.writeString(input, clean);

            List<String> cmd = List.of(
                    edgeTtsPath,
                    "--voice", "en-US-JennyNeural",
                    "--file", input.toString(),
                    "--write-media", output.toString());

            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.redirectErrorStream(true);
            Process p = pb.start();
            p.getInputStream().readAllBytes();
            if (!p.waitFor(15, TimeUnit.SECONDS)) {
                p.destroyForcibly();
                throw new IOException("edge-tts timed out");
            }
            if (p.exitValue() != 0 || !Files.exists(output)) {
                throw new IOException("edge-tts failed");
            }
            return Files.readAllBytes(output);
        } finally {
            try {
                Files.walk(dir)
                        .sorted((a, b) -> b.compareTo(a))
                        .forEach(p -> {
                            try { Files.deleteIfExists(p); } catch (IOException ignore) { }
                        });
            } catch (IOException ignore) { }
        }
    }

    public String cleanText(String text) {
        String clean = (text == null ? "" : text)
                .replaceAll("[*_`#\\[\\]{}|]", "")
                .replaceAll("\\n+", ". ")
                .replaceAll("\\s+", " ")
                .trim();
        if (clean.length() > 2000) {
            clean = clean.substring(0, 2000);
        }
        return clean;
    }
}
