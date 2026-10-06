package com.dsainsights.service;

import com.dsainsights.dto.ExecuteRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class CodeExecutorService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${exec.timeout.js:5000}")
    private long jsTimeout;
    @Value("${exec.timeout.ts:30000}")
    private long tsTimeout;
    @Value("${exec.timeout.python:5000}")
    private long pythonTimeout;
    @Value("${exec.timeout.cpp:5000}")
    private long cppTimeout;
    @Value("${exec.timeout.java:5000}")
    private long javaTimeout;
    @Value("${exec.timeout.compile:15000}")
    private long compileTimeout;

    private static final Map<String, String> LANG_NAMES = Map.of(
            "javascript", "JavaScript", "typescript", "TypeScript", "python", "Python",
            "cpp", "C++", "java", "Java");

    public Map<String, Object> execute(ExecuteRequest req) {
        String code = req.getCode();
        String language = req.getLanguage();
        String funcName = req.getFuncName();
        List<ExecuteRequest.TestCase> testCases = req.getTestCases();

        if (code == null || language == null || funcName == null
                || testCases == null || testCases.isEmpty()) {
            return error("Missing required fields");
        }

        List<ExecuteRequest.TestCase> valid = testCases.stream()
                .filter(tc -> tc.getInput() != null && !tc.getInput().isEmpty())
                .toList();
        if (valid.isEmpty()) {
            return error("Test cases are not fully defined for this problem yet");
        }

        Path tmpDir = null;
        try {
            tmpDir = Files.createTempDirectory("dsa-exec-");
            String cleanCode = clean(code, language);
            String tcJson = objectMapper.writeValueAsString(
                    valid.stream().map(ExecuteRequest.TestCase::getInput).toList());

            List<String> runCmd;
            long runTimeout;

            switch (language) {
                case "javascript" -> {
                    String wrapper = cleanCode + "\nconst _testCases = " + tcJson + ";\n"
                            + "const _results = [];\nfor (const _tc of _testCases) {\n"
                            + "    const _args = Object.values(_tc);\n"
                            + "    const _r = " + funcName + "(..._args);\n    _results.push(_r);\n}\n"
                            + "console.log(JSON.stringify(_results));";
                    Path src = tmpDir.resolve("script.js");
                    Files.writeString(src, wrapper);
                    runCmd = List.of("node", src.toString());
                    runTimeout = jsTimeout;
                }
                case "typescript" -> {
                    String wrapper = cleanCode + "\nconst _testCases = " + tcJson + " as any[];\n"
                            + "const _results: any[] = [];\nfor (const _tc of _testCases) {\n"
                            + "    const _args = Object.values(_tc);\n"
                            + "    const _r = " + funcName + "(..._args);\n    _results.push(_r);\n}\n"
                            + "console.log(JSON.stringify(_results));";
                    Path src = tmpDir.resolve("script.ts");
                    Files.writeString(src, wrapper);
                    runCmd = npxTsx(src.toString());
                    runTimeout = tsTimeout;
                }
                case "python" -> {
                    Path tcFile = tmpDir.resolve("testcases.json");
                    Files.writeString(tcFile, tcJson);
                    String tcPath = tcFile.toString().replace("\\", "/");
                    String wrapper = cleanCode + "\n\nimport json, sys\n"
                            + "with open(r'" + tcPath + "') as f:\n"
                            + "    _test_cases = json.load(f)\n"
                            + "_results = []\n"
                            + "for _tc in _test_cases:\n"
                            + "    _args = list(_tc.values())\n"
                            + "    _r = " + funcName + "(*_args)\n"
                            + "    _results.append(_r)\n"
                            + "print(json.dumps(_results))";
                    Path src = tmpDir.resolve("script.py");
                    Files.writeString(src, wrapper);
                    runCmd = List.of("__python__", src.toString());
                    runTimeout = pythonTimeout;
                }
                case "cpp" -> {
                    boolean hasClass = cleanCode.contains("class Solution");
                    StringBuilder cb = new StringBuilder();
                    for (int i = 0; i < valid.size(); i++) {
                        Map<String, Object> input = valid.get(i).getInput();
                        List<String> decls = new ArrayList<>();
                        List<String> refs = new ArrayList<>();
                        for (Map.Entry<String, Object> e : input.entrySet()) {
                            String varName = e.getKey() + "_" + i;
                            decls.add(cppDecl(varName, e.getValue()));
                            refs.add(varName);
                        }
                        String d = decls.isEmpty() ? "" : String.join("\n    ", decls) + "\n    ";
                        if (hasClass) {
                            cb.append(d).append("Solution _sol").append(i).append(";\n    _out(_sol")
                                    .append(i).append(".").append(funcName).append("(")
                                    .append(String.join(", ", refs)).append("));\n");
                        } else {
                            cb.append(d).append("_out(").append(funcName).append("(")
                                    .append(String.join(", ", refs)).append("));\n");
                        }
                    }
                    String wrapper = "#include <iostream>\n#include <string>\n#include <vector>\n"
                            + "#include <climits>\n#include <algorithm>\n#include <unordered_set>\n"
                            + "#include <unordered_map>\n#include <set>\n#include <map>\n"
                            + "#include <stack>\n#include <queue>\n#include <sstream>\nusing namespace std;\n\n"
                            + "void _print(bool v) { cout << (v ? \"true\" : \"false\"); }\n"
                            + "void _print(int v) { cout << v; }\n"
                            + "void _print(long long v) { cout << v; }\n"
                            + "void _print(double v) { cout << v; }\n"
                            + "void _print(const string& v) { cout << v; }\n"
                            + "void _print(const vector<int>& v) { cout << \"[\"; for (size_t i = 0; i < v.size(); i++) { if (i) cout << \",\"; cout << v[i]; } cout << \"]\"; }\n"
                            + "void _print(const vector<vector<int>>& v) { cout << \"[\"; for (size_t i = 0; i < v.size(); i++) { if (i) cout << \",\"; _print(v[i]); } cout << \"]\"; }\n"
                            + "template<typename T> void _out(T r) { _print(r); cout << \"\\n\"; }\n\n"
                            + cleanCode + "\n\nint main() {\n    " + cb + "    return 0;\n}";
                    Path src = tmpDir.resolve("script.cpp");
                    Files.writeString(src, wrapper);
                    Path bin = tmpDir.resolve("script" + (isWindows() ? ".exe" : ""));
                    ExecResult comp = exec(List.of("g++", "-std=c++17", src.toString(), "-o", bin.toString()), compileTimeout);
                    if (!comp.ok()) {
                        return error("C++ compile error:\n" + comp.stderr());
                    }
                    runCmd = List.of(bin.toString());
                    runTimeout = cppTimeout;
                }
                case "java" -> {
                    Path solFile = tmpDir.resolve("Solution.java");
                    Files.writeString(solFile, "import java.util.*;\nimport java.util.stream.*;\n\n" + cleanCode);
                    String javac = System.getProperty("java.home") + "/bin/javac";
                    String java = System.getProperty("java.home") + "/bin/java";

                    ExecResult comp1 = exec(List.of(javac, solFile.toString(), "-d", tmpDir.toString()), compileTimeout);
                    if (!comp1.ok()) {
                        return error("Java compile error (Solution.java):\n" + comp1.stderr());
                    }

                    List<String> calls = new ArrayList<>();
                    for (int i = 0; i < valid.size(); i++) {
                        String vals = valid.get(i).getInput().values().stream()
                                .map(this::javaArg)
                                .collect(Collectors.joining(", "));
                        calls.add("Object _result" + i + " = _sol." + funcName + "(" + vals + "); "
                                + "if (_result" + i + " instanceof int[]) { System.out.println(java.util.Arrays.toString((int[])_result" + i + ")); } "
                                + "else { System.out.println(_result" + i + "); }");
                    }
                    String wrapper = "public class Test { public static void main(String[] args) {\n"
                            + "    Solution _sol = new Solution();\n    "
                            + String.join("\n    ", calls)
                            + "\n} }";
                    Path testFile = tmpDir.resolve("Test.java");
                    Files.writeString(testFile, wrapper);
                    ExecResult comp2 = exec(List.of(javac, testFile.toString(), "-cp", tmpDir.toString(), "-d", tmpDir.toString()), compileTimeout);
                    if (!comp2.ok()) {
                        return error("Java compile error (Test.java):\n" + comp2.stderr()
                                + "\n\n--- Test.java ---\n" + wrapper);
                    }
                    runCmd = List.of(java, "-cp", tmpDir.toString(), "Test");
                    runTimeout = javaTimeout;
                }
                default -> {
                    return error("Execution for " + LANG_NAMES.getOrDefault(language, language) + " is not supported");
                }
            }

            ExecResult run = execWithFallback(runCmd, runTimeout);
            if (!run.ok()) {
                return error("Runtime error (" + LANG_NAMES.getOrDefault(language, language) + "):\n"
                        + (run.stderr().isBlank() ? run.stdout() : run.stderr()));
            }

            List<Object> parsed = parseOutput(run.stdout(), language);
            List<Map<String, Object>> results = new ArrayList<>();
            for (int i = 0; i < valid.size(); i++) {
                Object actual = i < parsed.size() ? parsed.get(i) : null;
                Object expected = valid.get(i).getOutput();
                results.add(Map.of(
                        "passed", jsonEquals(actual, expected),
                        "expected", expected,
                        "actual", actual));
            }
            return Map.of("results", results);
        } catch (Exception e) {
            return error("Server error: " + e.getMessage());
        } finally {
            if (tmpDir != null) deleteRecursively(tmpDir);
        }
    }

    private List<String> npxTsx(String src) {
        if (isWindows()) {
            return List.of("cmd.exe", "/c", "npx tsx " + quote(src));
        }
        return List.of("npx", "tsx", src);
    }

    private ExecResult execWithFallback(List<String> cmd, long timeoutMs) {
        if (!cmd.isEmpty() && "__python__".equals(cmd.get(0)) && cmd.size() == 2) {
            // On Windows `python3` is usually a Microsoft Store alias stub that
            // exits with "Python was not found", so order the attempts by platform
            // and treat that stub output as a miss rather than a result.
            String preferred = isWindows() ? "python" : "python3";
            String alternate = isWindows() ? "python3" : "python";

            ExecResult primary = exec(withPythonBinary(cmd, preferred), timeoutMs);
            if (primary.started() && !looksLikeMissingPython(primary)) {
                return primary;
            }
            ExecResult secondary = exec(withPythonBinary(cmd, alternate), timeoutMs);
            if (secondary.started() && !looksLikeMissingPython(secondary)) {
                return secondary;
            }
            return new ExecResult(false, false, "",
                    "Python interpreter not found. Install Python 3 and make sure "
                            + "`python` (or `python3`) is on PATH.");
        }
        return exec(cmd, timeoutMs);
    }

    private List<String> withPythonBinary(List<String> cmd, String binary) {
        List<String> copy = new ArrayList<>(cmd);
        copy.set(0, binary);
        return copy;
    }

    private boolean looksLikeMissingPython(ExecResult r) {
        String combined = (r.stdout() + "\n" + r.stderr()).toLowerCase();
        return combined.contains("python was not found")
                || combined.contains("'python' is not recognized")
                || combined.contains("\"python\" is not recognized")
                || combined.contains("python: command not found");
    }

    private String clean(String code, String language) {
        if ("cpp".equals(language)) {
            return code.replaceAll("(?m)^\\s*#include\\s+<[^>]+>\\s*$", "").trim();
        }
        if ("java".equals(language)) {
            return code.replaceAll("(?m)^\\s*import\\s+[^;]+;\\s*$", "").trim();
        }
        if ("python".equals(language)) {
            String c = code.replaceAll("(?m)^\\s*import\\s+.+$", "");
            c = c.replaceAll("(?m)^\\s*from\\s+.+\\s+import\\s+.+$", "");
            return c.trim();
        }
        return code;
    }

    private String cppDecl(String varName, Object value) {
        if (value instanceof List<?> list) {
            if (!list.isEmpty() && list.get(0) instanceof List<?> inner) {
                return "vector<vector<int>> " + varName + " = {"
                        + inner.stream().map(sub -> "{" + joinInts(sub) + "}").collect(Collectors.joining(","))
                        + "};";
            }
            return "vector<int> " + varName + " = {" + joinInts(list) + "};";
        }
        if (value instanceof String s) {
            return "string " + varName + " = \"" + s.replace("\"", "\\\"") + "\";";
        }
        if (value instanceof Boolean b) {
            return "bool " + varName + " = " + b + ";";
        }
        return "int " + varName + " = " + value + ";";
    }

    private String joinInts(Object list) {
        if (!(list instanceof List<?> l)) return String.valueOf(list);
        return l.stream().map(String::valueOf).collect(Collectors.joining(","));
    }

    private String javaArg(Object value) {
        if (value instanceof String s) {
            return "\"" + s.replace("\\", "\\\\").replace("\"", "\\\"") + "\"";
        }
        if (value instanceof Boolean b) {
            return String.valueOf(b);
        }
        if (value instanceof Number n) {
            return n.toString();
        }
        if (value instanceof List<?> list) {
            if (!list.isEmpty() && list.get(0) instanceof List<?>) {
                return "new int[][]{" + list.stream()
                        .map(sub -> "{" + joinInts(sub) + "}")
                        .collect(Collectors.joining(",")) + "}";
            }
            return "new int[]{" + joinInts(list) + "}";
        }
        if (value == null) {
            return "null";
        }
        return "\"" + value + "\"";
    }

    private List<Object> parseOutput(String raw, String language) throws IOException {
        if (raw == null || raw.isBlank()) return new ArrayList<>();
        if (!"cpp".equals(language) && !"java".equals(language)) {
            try {
                JsonNode node = objectMapper.readTree(raw.trim());
                if (node.isArray()) {
                    List<Object> out = new ArrayList<>();
                    node.forEach(n -> out.add(toPlain(n)));
                    return out;
                }
            } catch (Exception ignore) { }
            return new ArrayList<>();
        }
        List<Object> out = new ArrayList<>();
        for (String line : raw.split("\n")) {
            String t = line.trim();
            if (t.isEmpty()) continue;
            out.add(parseLine(t));
        }
        return out;
    }

    private Object parseLine(String t) {
        if ("true".equals(t)) return true;
        if ("false".equals(t)) return false;
        if (t.matches("-?\\d+")) return parseNumber(t);
        if (t.matches("-?\\d+\\.\\d+")) return Double.parseDouble(t);
        if (t.startsWith("[") && t.endsWith("]")) {
            try {
                return toPlain(objectMapper.readTree(t));
            } catch (Exception ignore) { }
            return parseArray(t);
        }
        return t;
    }

    private Object parseArray(String s) {
        String content = s.substring(1, s.length() - 1).trim();
        List<Object> items = new ArrayList<>();
        if (content.isEmpty()) return items;
        int depth = 0, start = 0;
        for (int j = 0; j <= content.length(); j++) {
            if (j == content.length() || (content.charAt(j) == ',' && depth == 0)) {
                String item = content.substring(start, j).trim();
                if (item.startsWith("[")) {
                    try {
                        items.add(toPlain(objectMapper.readTree(item)));
                    } catch (Exception e) {
                        items.add(item);
                    }
                } else if (item.matches("-?\\d+")) {
                    items.add(parseNumber(item));
                } else if ("true".equals(item)) {
                    items.add(true);
                } else if ("false".equals(item)) {
                    items.add(false);
                } else {
                    items.add(item);
                }
                start = j + 1;
            } else if (content.charAt(j) == '[') {
                depth++;
            } else if (content.charAt(j) == ']') {
                depth--;
            }
        }
        return items;
    }

    private Number parseNumber(String s) {
        try {
            long l = Long.parseLong(s);
            if (l >= Integer.MIN_VALUE && l <= Integer.MAX_VALUE) return (int) l;
            return l;
        } catch (NumberFormatException e) {
            return Double.parseDouble(s);
        }
    }

    private Object toPlain(JsonNode n) {
        if (n == null || n.isNull()) return null;
        if (n.isTextual()) return n.asText();
        if (n.isBoolean()) return n.asBoolean();
        if (n.isIntegralNumber()) return parseNumber(n.asText());
        if (n.isFloatingPointNumber()) return n.asDouble();
        if (n.isArray()) {
            List<Object> l = new ArrayList<>();
            n.forEach(x -> l.add(toPlain(x)));
            return l;
        }
        if (n.isObject()) {
            Map<String, Object> m = new HashMap<>();
            n.fields().forEachRemaining(e -> m.put(e.getKey(), toPlain(e.getValue())));
            return m;
        }
        return n.asText();
    }

    private boolean jsonEquals(Object a, Object b) {
        try {
            JsonNode na = objectMapper.valueToTree(a);
            JsonNode nb = objectMapper.valueToTree(b);
            return nodesEqual(na, nb);
        } catch (Exception e) {
            return String.valueOf(a).equals(String.valueOf(b));
        }
    }

    private boolean nodesEqual(JsonNode a, JsonNode b) {
        if (a.isNumber() && b.isNumber()) {
            return a.decimalValue().compareTo(b.decimalValue()) == 0;
        }
        if (a.isArray() && b.isArray()) {
            if (a.size() != b.size()) return false;
            for (int i = 0; i < a.size(); i++) {
                if (!nodesEqual(a.get(i), b.get(i))) return false;
            }
            return true;
        }
        if (a.isObject() && b.isObject()) {
            if (a.size() != b.size()) return false;
            var it = a.fields();
            while (it.hasNext()) {
                var e = it.next();
                if (!nodesEqual(e.getValue(), b.get(e.getKey()))) return false;
            }
            return true;
        }
        return a.equals(b);
    }

    private ExecResult exec(List<String> cmd, long timeoutMs) {
        try {
            ProcessBuilder pb = new ProcessBuilder(cmd);
            pb.redirectErrorStream(false);
            Process p = pb.start();
            CompletableFuture<String> outF = CompletableFuture.supplyAsync(() -> read(p.getInputStream()));
            CompletableFuture<String> errF = CompletableFuture.supplyAsync(() -> read(p.getErrorStream()));
            boolean finished = p.waitFor(timeoutMs, TimeUnit.MILLISECONDS);
            if (!finished) {
                p.destroyForcibly();
                return new ExecResult(false, false, "", "Process timed out");
            }
            String out = outF.get(5, TimeUnit.SECONDS);
            String err = errF.get(5, TimeUnit.SECONDS);
            return new ExecResult(p.exitValue() == 0, true, out == null ? "" : out, err == null ? "" : err);
        } catch (Exception e) {
            return new ExecResult(false, false, "", e.getMessage());
        }
    }

    private String read(InputStream in) {
        try {
            return new String(in.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            return "";
        }
    }

    private boolean isWindows() {
        return System.getProperty("os.name", "").toLowerCase().contains("win");
    }

    private String quote(String s) {
        return "\"" + s + "\"";
    }

    private void deleteRecursively(Path dir) {
        try {
            if (dir.toFile().exists()) {
                Files.walk(dir)
                        .sorted((p1, p2) -> p2.compareTo(p1))
                        .forEach(p -> {
                            try { Files.deleteIfExists(p); } catch (IOException ignore) { }
                        });
            }
        } catch (IOException ignore) { }
    }

    private Map<String, Object> error(String message) {
        return Map.of("error", message);
    }

    private record ExecResult(boolean ok, boolean started, String stdout, String stderr) {
        public boolean ok() { return ok; }
        public boolean started() { return started; }
    }
}
