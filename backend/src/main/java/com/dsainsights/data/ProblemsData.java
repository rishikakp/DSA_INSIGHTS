package com.dsainsights.data;

import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public final class ProblemsData {

    public static List<Map<String, Object>> all() {
        return Arrays.asList(
            map(
                "id", 1,
                "title", "Contains Duplicate",
                "titleSlug", "0217-contains-duplicate",
                "difficulty", "Easy",
                "category", "Arrays & Hashing",
                "tags", Arrays.asList("Array", "Hash Table", "Sorting"),
                "description", "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
                "examples", Arrays.asList(map("input", "nums = [1,2,3,1]", "output", "true", "explanation", "The value 1 appears twice."), map("input", "nums = [1,2,3,4]", "output", "false", "explanation", "All elements are distinct."), map("input", "nums = [1,1,1,3,3,4,3,2,4,2]", "output", "true", "explanation", "Multiple duplicates exist.")),
                "constraints", Arrays.asList("1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"),
                "testCases", Arrays.asList(map("input", map("nums", Arrays.asList(1, 2, 3, 1)), "output", true), map("input", map("nums", Arrays.asList(1, 2, 3, 4)), "output", false), map("input", map("nums", Arrays.asList(1, 1, 1, 3, 3, 4, 3, 2, 4, 2)), "output", true), map("input", map("nums", Arrays.asList()), "output", false), map("input", map("nums", Arrays.asList(1)), "output", false)),
                "funcName", "containsDuplicate",
                "funcArgs", "nums",
                "starterCode", "function containsDuplicate(nums) {\n  \n}"
            ),
            map(
                "id", 2,
                "title", "Valid Anagram",
                "titleSlug", "0242-valid-anagram",
                "difficulty", "Easy",
                "category", "Arrays & Hashing",
                "tags", Arrays.asList("Hash Table", "String", "Sorting"),
                "description", "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is a word formed by rearranging the letters of another word.",
                "examples", Arrays.asList(map("input", "s = \"anagram\", t = \"nagaram\"", "output", "true"), map("input", "s = \"rat\", t = \"car\"", "output", "false")),
                "constraints", Arrays.asList("1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."),
                "testCases", Arrays.asList(map("input", map("s", "anagram", "t", "nagaram"), "output", true), map("input", map("s", "rat", "t", "car"), "output", false)),
                "funcName", "validAnagram",
                "funcArgs", "s, t",
                "starterCode", "function validAnagram(s, t) {\n  \n}"
            ),
            map(
                "id", 3,
                "title", "Two Sum",
                "titleSlug", "0001-two-sum",
                "difficulty", "Easy",
                "category", "Arrays & Hashing",
                "tags", Arrays.asList("Array", "Hash Table"),
                "description", "Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`. You may assume that each input has exactly one solution.",
                "examples", Arrays.asList(map("input", "nums = [2,7,11,15], target = 9", "output", "[0,1]", "explanation", "Because nums[0] + nums[1] == 9."), map("input", "nums = [3,2,4], target = 6", "output", "[1,2]"), map("input", "nums = [3,3], target = 6", "output", "[0,1]")),
                "constraints", Arrays.asList("2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."),
                "testCases", Arrays.asList(map("input", map("nums", Arrays.asList(2, 7, 11, 15), "target", 9), "output", Arrays.asList(0, 1)), map("input", map("nums", Arrays.asList(3, 2, 4), "target", 6), "output", Arrays.asList(1, 2))),
                "funcName", "twoSum",
                "funcArgs", "nums, target",
                "starterCode", "function twoSum(nums, target) {\n  \n}"
            )
        );
    }

    private static Map<String, Object> map(Object... kv) {
        Map<String, Object> m = new LinkedHashMap<>();
        for (int i = 0; i + 1 < kv.length; i += 2) {
            m.put((String) kv[i], kv[i + 1]);
        }
        return m;
    }

    private ProblemsData() {
    }
}
