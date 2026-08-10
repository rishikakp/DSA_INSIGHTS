export const problems = [
    {
        id: 1,
        title: "Contains Duplicate",
        titleSlug: "0217-contains-duplicate",
        difficulty: 'Easy',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table", "Sorting"],
        description: "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "true", explanation: "The value 1 appears twice." },
            { input: "nums = [1,2,3,4]", output: "false", explanation: "All elements are distinct." },
            { input: "nums = [1,1,1,3,3,4,3,2,4,2]", output: "true", explanation: "Multiple duplicates exist." }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
        testCases: [
            { input: { "nums": [1, 2, 3, 1] }, output: true },
            { input: { "nums": [1, 2, 3, 4] }, output: false },
            { input: { "nums": [1, 1, 1, 3, 3, 4, 3, 2, 4, 2] }, output: true },
            { input: { "nums": [] }, output: false },
            { input: { "nums": [1] }, output: false }
        ],
        funcName: "containsDuplicate",
        funcArgs: "nums",
        starterCode: "function containsDuplicate(nums) {\n  \n}",
    },
    {
        id: 2,
        title: "Valid Anagram",
        titleSlug: "0242-valid-anagram",
        difficulty: 'Easy',
        category: "Arrays & Hashing",
        tags: ["Hash Table", "String", "Sorting"],
        description: "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is a word formed by rearranging the letters of another word.",
        examples: [
            { input: "s = \"anagram\", t = \"nagaram\"", output: "true" },
            { input: "s = \"rat\", t = \"car\"", output: "false" }
        ],
        constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
        testCases: [
            { input: { "s": "anagram", "t": "nagaram" }, output: true },
            { input: { "s": "rat", "t": "car" }, output: false }
        ],
        funcName: "validAnagram",
        funcArgs: "s, t",
        starterCode: "function validAnagram(s, t) {\n  \n}",
    },
    {
        id: 3,
        title: "Two Sum",
        titleSlug: "0001-two-sum",
        difficulty: 'Easy',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table"],
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers that add up to `target`. You may assume that each input has exactly one solution.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9." },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" },
            { input: "nums = [3,3], target = 6", output: "[0,1]" }
        ],
        constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
        testCases: [
            { input: { "nums": [2, 7, 11, 15], "target": 9 }, output: [0, 1] },
            { input: { "nums": [3, 2, 4], "target": 6 }, output: [1, 2] }
        ],
        funcName: "twoSum",
        funcArgs: "nums, target",
        starterCode: "function twoSum(nums, target) {\n  \n}",
    },
    {
        id: 4,
        title: "Group Anagrams",
        titleSlug: "0049-group-anagrams",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table", "String", "Sorting"],
        description: "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. An anagram is a word formed by rearranging the letters of another word.",
        examples: [
            { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
            { input: "strs = [\"\"]", output: "[[\"\"]]" },
            { input: "strs = [\"a\"]", output: "[[\"a\"]]" }
        ],
        constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
        testCases: [
            { input: { "strs": ["eat", "tea", "tan", "ate", "nat", "bat"] }, output: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] },
            { input: { "strs": [""] }, output: [[""]] }
        ],
        funcName: "groupAnagrams",
        funcArgs: "strs",
        starterCode: "function groupAnagrams(strs) {\n  \n}",
    },
    {
        id: 5,
        title: "Top K Frequent Elements",
        titleSlug: "0347-top-k-frequent-elements",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table", "Divide and Conquer", "Sorting", "Heap"],
        description: "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.",
        examples: [
            { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]" },
            { input: "nums = [1], k = 1", output: "[1]" }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in the range [1, the number of unique elements]."],
        testCases: [
            { input: { "nums": [1, 1, 1, 2, 2, 3], "k": 2 }, output: [1, 2] },
            { input: { "nums": [1], "k": 1 }, output: [1] }
        ],
        funcName: "topKFrequentElements",
        funcArgs: "nums, k",
        starterCode: "function topKFrequentElements(nums, k) {\n  \n}",
    },
    {
        id: 6,
        title: "Product of Array Except Self",
        titleSlug: "0238-product-of-array-except-self",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "Prefix Sum"],
        description: "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. You must solve it without division and in O(n) time.",
        examples: [
            { input: "nums = [1,2,3,4]", output: "[24,12,8,6]" },
            { input: "nums = [-1,1,0,-3,3]", output: "[0,0,9,0,0]" }
        ],
        constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product fits in a 32-bit integer."],
        testCases: [
            { input: { "nums": [1, 2, 3, 4] }, output: [24, 12, 8, 6] },
            { input: { "nums": [-1, 1, 0, -3, 3] }, output: [0, 0, 9, 0, 0] }
        ],
        funcName: "productOfArrayExceptSelf",
        funcArgs: "nums",
        starterCode: "function productOfArrayExceptSelf(nums) {\n  \n}",
    },
    {
        id: 7,
        title: "Valid Sudoku",
        titleSlug: "0036-valid-sudoku",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table", "Matrix"],
        description: "Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules: each row must contain the digits 1-9 without repetition, each column must contain the digits 1-9 without repetition, and each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition.",
        examples: [
            { input: "board = [[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", output: "true" },
            { input: "board = [[\"8\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]", output: "false" }
        ],
        constraints: ["board.length == 9", "board[i].length == 9", "board[i][j] is a digit 1-9 or '.'."],
        testCases: [
            { input: { "board": [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]] }, output: true },
            { input: { "board": [["8", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]] }, output: false }
        ],
        funcName: "validSudoku",
        funcArgs: "board",
        starterCode: "function validSudoku(board) {\n  \n}",
    },
    {
        id: 8,
        title: "Encode and Decode Strings",
        titleSlug: "0271-encode-and-decode-strings",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "String", "Design"],
        description: "Design an algorithm to encode a list of strings into a string and decode that string back to the original list of strings. The encoder and decoder must be lossless.",
        examples: [
            { input: 'strs = ["lint","code","love","you"', output: '["lint","code","love","you"]', explanation: 'One possible encode method is: "lint:code:love:you".' },
            { input: 'strs = ["we", "say", ":", "yes"]', output: '["we", "say", ":", "yes"]' }
        ],
        constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] consists of any possible characters."],
        testCases: [
            { input: { "strs": [] }, output: "" },
            { input: { "strs": ["a"] }, output: "a" }
        ],
        funcName: "encodeAndDecodeStrings",
        funcArgs: "strs",
        starterCode: "function encodeAndDecodeStrings(strs) {\n  \n}",
    },
    {
        id: 9,
        title: "Longest Consecutive Sequence",
        titleSlug: "0128-longest-consecutive-sequence",
        difficulty: 'Medium',
        category: "Arrays & Hashing",
        tags: ["Array", "Hash Table", "Union Find"],
        description: "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.",
        examples: [
            { input: "nums = [100,4,200,1,3,2]", output: "4", explanation: "The longest consecutive sequence is [1,2,3,4]." },
            { input: "nums = [0,3,7,2,5,8,4,6,0,1]", output: "9" }
        ],
        constraints: ["0 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9"],
        testCases: [
            { input: { "nums": [100, 4, 200, 1, 3, 2] }, output: 4 },
            { input: { "nums": [0, 3, 7, 2, 5, 8, 4, 6, 0, 1] }, output: 9 }
        ],
        funcName: "longestConsecutiveSequence",
        funcArgs: "nums",
        starterCode: "function longestConsecutiveSequence(nums) {\n  \n}",
    },
    {
        id: 10,
        title: "Valid Palindrome",
        titleSlug: "0125-valid-palindrome",
        difficulty: 'Easy',
        category: "Two Pointers",
        tags: ["Two Pointers", "String"],
        description: "A phrase is a palindrome if, after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, it reads the same forward and backward. Given a string `s`, return `true` if it is a palindrome, or `false` otherwise.",
        examples: [
            { input: 's = "A man, a plan, a canal: Panama"', output: "true", explanation: '"amanaplanacanalpanama" is a palindrome.' },
            { input: 's = "race a car"', output: "false", explanation: '"raceacar" is not a palindrome.' }
        ],
        constraints: ["1 <= s.length <= 2 * 10^5", "s consists of printable ASCII characters."],
        testCases: [
            { input: { "s": "A man, a plan, a canal: Panama" }, output: true },
            { input: { "s": "race a car" }, output: false }
        ],
        funcName: "validPalindrome",
        funcArgs: "s",
        starterCode: "function validPalindrome(s) {\n  \n}",
    },
    {
        id: 11,
        title: "Two Sum II Input Array Is Sorted",
        titleSlug: "0167-two-sum-ii-input-array-is-sorted",
        difficulty: 'Medium',
        category: "Two Pointers",
        tags: ["Array", "Two Pointers", "Binary Search"],
        description: "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers that add up to a specific `target` number. Return the indices of the two numbers (1-indexed).",
        examples: [
            { input: "numbers = [2,7,11,15], target = 9", output: "[1,2]", explanation: "The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2." },
            { input: "numbers = [2,3,4], target = 6", output: "[1,3]", explanation: "The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3." }
        ],
        constraints: ["2 <= numbers.length <= 3 * 10^4", "-100 <= numbers[i] <= 100", "numbers is sorted in non-decreasing order.", "-100 <= target <= 100", "The tests are generated such that there is exactly one solution."],
        testCases: [
            { input: { "numbers": [2, 7, 11, 15], "target": 9 }, output: [1, 2] },
            { input: { "numbers": [2, 3, 4], "target": 6 }, output: [1, 3] }
        ],
        funcName: "twoSumIIInputArrayIsSorted",
        funcArgs: "numbers, target",
        starterCode: "function twoSumIIInputArrayIsSorted(numbers, target) {\n  \n}",
    },
    {
        id: 12,
        title: "3Sum",
        titleSlug: "0015-3sum",
        difficulty: 'Medium',
        category: "Two Pointers",
        tags: ["Array", "Two Pointers", "Sorting"],
        description: "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. The solution set must not contain duplicate triplets.",
        examples: [
            { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "The distinct triplets are [-1,0,1] and [-1,-1,2]." },
            { input: "nums = [0,1,1]", output: "[]", explanation: "The only possible triplet does not sum up to 0." }
        ],
        constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
        testCases: [
            { input: { "nums": [-1, 0, 1, 2, -1, -4] }, output: [[-1, -1, 2], [-1, 0, 1]] },
            { input: { "nums": [] }, output: [] }
        ],
        funcName: "threeSum",
        funcArgs: "nums",
        starterCode: "function threeSum(nums) {\n  \n}",
    },
    {
        id: 13,
        title: "Container With Most Water",
        titleSlug: "0011-container-with-most-water",
        difficulty: 'Medium',
        category: "Two Pointers",
        tags: ["Array", "Two Pointers", "Greedy"],
        description: "You are given an integer array `height` of length `n`. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that contains the most water.",
        examples: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49", explanation: "The maximum area is obtained by choosing index 1 and index 8 (height 8), area = min(8,7) * 7 = 49." },
            { input: "height = [1,1]", output: "1" }
        ],
        constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
        testCases: [
            { input: { "height": [1, 8, 6, 2, 5, 4, 8, 3, 7] }, output: 49 },
            { input: { "height": [1, 1] }, output: 1 }
        ],
        funcName: "containerWithMostWater",
        funcArgs: "height",
        starterCode: "function containerWithMostWater(height) {\n  \n}",
    },
    {
        id: 14,
        title: "Trapping Rain Water",
        titleSlug: "0042-trapping-rain-water",
        difficulty: 'Hard',
        category: "Two Pointers",
        tags: ["Array", "Two Pointers", "Dynamic Programming", "Stack"],
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: [
            { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
            { input: "height = [4,2,0,3,2,5]", output: "9" }
        ],
        constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
        testCases: [
            { input: { "height": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] }, output: 6 },
            { input: { "height": [4, 2, 0, 3, 2, 5] }, output: 9 }
        ],
        funcName: "trappingRainWater",
        funcArgs: "height",
        starterCode: "function trappingRainWater(height) {\n  \n}",
    },
    {
        id: 15,
        title: "Best Time to Buy And Sell Stock",
        titleSlug: "0121-best-time-to-buy-and-sell-stock",
        difficulty: 'Easy',
        category: "Sliding Window",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given an array `prices` where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy and a different day to sell. Return the maximum profit, or 0 if no profit can be achieved.",
        examples: [
            { input: "prices = [7,1,5,3,6,4]", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5." },
            { input: "prices = [7,6,4,3,1]", output: "0", explanation: "No transactions are done, max profit = 0." }
        ],
        constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
        testCases: [
            { input: { "prices": [7, 1, 5, 3, 6, 4] }, output: 5 },
            { input: { "prices": [7, 6, 4, 3, 1] }, output: 0 }
        ],
        funcName: "bestTimeToBuyAndSellStock",
        funcArgs: "prices",
        starterCode: "function bestTimeToBuyAndSellStock(prices) {\n  \n}",
    },
    {
        id: 16,
        title: "Longest Substring Without Repeating Characters",
        titleSlug: "0003-longest-substring-without-repeating-characters",
        difficulty: 'Medium',
        category: "Sliding Window",
        tags: ["Hash Table", "String", "Sliding Window"],
        description: "Given a string `s`, find the length of the longest substring without repeating characters.",
        examples: [
            { input: 's = "abcabcbb"', output: "3", explanation: "The answer is 'abc', with the length of 3." },
            { input: 's = "bbbbb"', output: "1", explanation: "The answer is 'b', with the length of 1." }
        ],
        constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
        testCases: [
            { input: { "s": "abcabcbb" }, output: 3 },
            { input: { "s": "bbbbb" }, output: 1 }
        ],
        funcName: "longestSubstringWithoutRepeatingCharacters",
        funcArgs: "s",
        starterCode: "function longestSubstringWithoutRepeatingCharacters(s) {\n  \n}",
    },
    {
        id: 17,
        title: "Longest Repeating Character Replacement",
        titleSlug: "0424-longest-repeating-character-replacement",
        difficulty: 'Medium',
        category: "Sliding Window",
        tags: ["Hash Table", "String", "Sliding Window"],
        description: "You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character at most k times. Return the length of the longest substring containing the same letter you can get.",
        examples: [
            { input: 's = "ABAB", k = 2', output: "2", explanation: "Replace the two 'A's with two 'B's or vice versa." },
            { input: 's = "AABABBA", k = 1', output: "4", explanation: "Replace the one 'A' in the middle with 'B' to form 'AABBBBA' with substring 'BBBB' of length 4." }
        ],
        constraints: ["1 <= s.length <= 10^5", "0 <= k <= s.length", "s consists of uppercase English letters only."],
        testCases: [
            { input: { "s": "ABAB", "k": 2 }, output: 2 },
            { input: { "s": "a", "k": 1 }, output: 1 }
        ],
        funcName: "longestRepeatingCharacterReplacement",
        funcArgs: "s, k",
        starterCode: "function longestRepeatingCharacterReplacement(s, k) {\n  \n}",
    },
    {
        id: 18,
        title: "Permutation In String",
        titleSlug: "0567-permutation-in-string",
        difficulty: 'Medium',
        category: "Sliding Window",
        tags: ["Hash Table", "Two Pointers", "String", "Sliding Window"],
        description: "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1`, or `false` otherwise.",
        examples: [
            { input: 's1 = "ab", s2 = "eidbaooo"', output: "true", explanation: "s2 contains one permutation of s1 ('ba')." },
            { input: 's1 = "ab", s2 = "eidboaoo"', output: "false" }
        ],
        constraints: ["1 <= s1.length, s2.length <= 10^4", "s1 and s2 consist of lowercase English letters."],
        testCases: [
            { input: { "s1": "ab", "s2": "eidbaooo" }, output: true },
            { input: { "s1": "ab", "s2": "abab" }, output: true }
        ],
        funcName: "permutationInString",
        funcArgs: "s1, s2",
        starterCode: "function permutationInString(s1, s2) {\n  \n}",
    },
    {
        id: 19,
        title: "Minimum Window Substring",
        titleSlug: "0076-minimum-window-substring",
        difficulty: 'Hard',
        category: "Sliding Window",
        tags: ["Hash Table", "String", "Sliding Window"],
        description: "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string.",
        examples: [
            { input: 's = "ADOBECODEBANC", t = "ABC"', output: "BANC", explanation: "The minimum window substring 'BANC' includes 'A', 'B', and 'C' from string t." },
            { input: 's = "a", t = "a"', output: "a", explanation: "The entire string s is the minimum window." }
        ],
        constraints: ["m == s.length", "n == t.length", "1 <= m, n <= 10^5", "s and t consist of uppercase and lowercase English letters."],
        testCases: [
            { input: { "s": "ADOBECODEBANC", "t": "ABC" }, output: "BANC" },
            { input: { "s": "a", "t": "a" }, output: "a" }
        ],
        funcName: "minimumWindowSubstring",
        funcArgs: "s, t",
        starterCode: "function minimumWindowSubstring(s, t) {\n  \n}",
    },
    {
        id: 20,
        title: "Sliding Window Maximum",
        titleSlug: "0239-sliding-window-maximum",
        difficulty: 'Hard',
        category: "Sliding Window",
        tags: ["Array", "Queue", "Sliding Window", "Heap"],
        description: "You are given an array of integers `nums`, there is a sliding window of size `k` moving from the left to the right. Return the max sliding window.",
        examples: [
            { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", output: "[3,3,5,5,6,7]" },
            { input: "nums = [1], k = 1", output: "[1]" }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in the range [1, nums.length]."],
        testCases: [
            { input: { "nums": [1, 3, -1, -3, 5, 3, 6, 7], "k": 3 }, output: [3, 3, 5, 5, 6, 7] },
            { input: { "nums": [1], "k": 1 }, output: [1] }
        ],
        funcName: "slidingWindowMaximum",
        funcArgs: "nums, k",
        starterCode: "function slidingWindowMaximum(nums, k) {\n  \n}",
    },
    {
        id: 21,
        title: "Valid Parentheses",
        titleSlug: "0020-valid-parentheses",
        difficulty: 'Easy',
        category: "Stack",
        tags: ["String", "Stack"],
        description: "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if brackets close in the correct order and are properly nested.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "()[]{}"', output: "true" },
            { input: 's = "(]"', output: "false" }
        ],
        constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
        testCases: [
            { input: { "s": "()" }, output: true },
            { input: { "s": "()[]{}" }, output: true },
            { input: { "s": "(]" }, output: false }
        ],
        funcName: "validParentheses",
        funcArgs: "s",
        starterCode: "function validParentheses(s) {\n  \n}",
    },
    {
        id: 22,
        title: "Min Stack",
        titleSlug: "0155-min-stack",
        difficulty: 'Medium',
        category: "Stack",
        tags: ["Stack", "Design"],
        description: "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
        examples: [
            { input: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]', output: "[null,null,null,null,-3,null,0,-2]" }
        ],
        constraints: ["Methods pop, top and getMin operations will always be called on non-empty stacks.", "-2^31 <= val <= 2^31 - 1"],
        testCases: [
            { input: { "operations": ["push", "push", "push", "getMin", "pop", "top", "getMin"], "values": [-2, 0, -3] }, output: [null, null, null, -3, null, 0, -2] }
        ],
        funcName: "minStack",
        funcArgs: "operations, values",
        starterCode: "function minStack(operations, values) {\n  \n}",
    },
    {
        id: 23,
        title: "Evaluate Reverse Polish Notation",
        titleSlug: "0150-evaluate-reverse-polish-notation",
        difficulty: 'Medium',
        category: "Stack",
        tags: ["Array", "Math", "Stack"],
        description: "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, and /. Each operand may be an integer or another expression.",
        examples: [
            { input: 'tokens = ["2","1","+","3","*"]', output: "9", explanation: "((2 + 1) * 3) = 9." },
            { input: 'tokens = ["4","13","5","/","+"]', output: "6", explanation: "(4 + (13 / 5)) = 6." }
        ],
        constraints: ["1 <= tokens.length <= 10^4", "tokens[i] is an operator: '+', '-', '*', or '/'.", "Every operand will be an integer."],
        testCases: [
            { input: { "tokens": ["2", "1", "+", "3", "*"] }, output: 9 },
            { input: { "tokens": ["4", "13", "5", "/", "+"] }, output: 6 }
        ],
        funcName: "evaluateReversePolishNotation",
        funcArgs: "tokens",
        starterCode: "function evaluateReversePolishNotation(tokens) {\n  \n}",
    },
    {
        id: 24,
        title: "Generate Parentheses",
        titleSlug: "0022-generate-parentheses",
        difficulty: 'Medium',
        category: "Stack",
        tags: ["String", "Dynamic Programming", "Backtracking"],
        description: "Given `n` pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
        examples: [
            { input: "n = 3", output: '["((()))","(()())","(())()","()(())","()()()"]' },
            { input: "n = 1", output: '["()"]' }
        ],
        constraints: ["1 <= n <= 8"],
        testCases: [
            { input: { "n": 3 }, output: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
            { input: { "n": 1 }, output: ["()"] }
        ],
        funcName: "generateParentheses",
        funcArgs: "n",
        starterCode: "function generateParentheses(n) {\n  \n}",
    },
    {
        id: 25,
        title: "Daily Temperatures",
        titleSlug: "0739-daily-temperatures",
        difficulty: 'Medium',
        category: "Stack",
        tags: ["Array", "Stack", "Monotonic Stack"],
        description: "Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that answer[i] is the number of days you have to wait until a warmer temperature.",
        examples: [
            { input: "temperatures = [73,74,75,71,69,72,76,73]", output: "[1,1,4,2,1,1,0,0]" },
            { input: "temperatures = [30,40,50,60]", output: "[0,0,0,0]" }
        ],
        constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
        testCases: [
            { input: { "temperatures": [73, 74, 75, 71, 69, 72, 76, 73] }, output: [1, 1, 4, 2, 1, 1, 0, 0] },
            { input: { "temperatures": [30, 40, 50, 60] }, output: [0, 0, 0, 0] }
        ],
        funcName: "dailyTemperatures",
        funcArgs: "temperatures",
        starterCode: "function dailyTemperatures(temperatures) {\n  \n}",
    },
    {
        id: 26,
        title: "Car Fleet",
        titleSlug: "0853-car-fleet",
        difficulty: 'Medium',
        category: "Stack",
        tags: ["Array", "Stack", "Sorting", "Monotonic Stack"],
        description: "There are n cars going to the same destination along a one-lane road. You are given two arrays `position` and `speed` (both length n), and a `target` integer. Return the number of car fleets that will arrive at the destination.",
        examples: [
            { input: "target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]", output: "3" },
            { input: "target = 10, position = [3], speed = [3]", output: "1" }
        ],
        constraints: ["n == position.length == speed.length", "1 <= n <= 10^5", "0 < target <= 10^6"],
        testCases: [
            { input: { "target": 12, "position": [10, 8, 0, 5, 3], "speed": [2, 4, 1, 1, 3] }, output: 3 },
            { input: { "target": 10, "position": [3], "speed": [3] }, output: 1 }
        ],
        funcName: "carFleet",
        funcArgs: "target, position, speed",
        starterCode: "function carFleet(target, position, speed) {\n  \n}",
    },
    {
        id: 27,
        title: "Largest Rectangle In Histogram",
        titleSlug: "0084-largest-rectangle-in-histogram",
        difficulty: 'Hard',
        category: "Stack",
        tags: ["Array", "Stack", "Monotonic Stack"],
        description: "Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
        examples: [
            { input: "heights = [2,1,5,6,2,3]", output: "10" },
            { input: "heights = [2,4]", output: "4" }
        ],
        constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
        testCases: [
            { input: { "heights": [2, 1, 5, 6, 2, 3] }, output: 10 },
            { input: { "heights": [2, 4] }, output: 4 }
        ],
        funcName: "largestRectangleInHistogram",
        funcArgs: "heights",
        starterCode: "function largestRectangleInHistogram(heights) {\n  \n}",
    },
    {
        id: 28,
        title: "Binary Search",
        titleSlug: "0704-binary-search",
        difficulty: 'Easy',
        category: "Binary Search",
        tags: ["Array", "Binary Search"],
        description: "Given an array of integers `nums` sorted in ascending order and an integer `target`, write a function to search target in nums. If target exists, return its index. Otherwise, return -1.",
        examples: [
            { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4", explanation: "9 exists in nums and its index is 4." },
            { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1", explanation: "2 does not exist in nums so return -1." }
        ],
        constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."],
        testCases: [
            { input: { "nums": [-1, 0, 3, 5, 9, 12], "target": 9 }, output: 4 },
            { input: { "nums": [-1, 0, 3, 5, 9, 12], "target": 13 }, output: -1 }
        ],
        funcName: "binarySearch",
        funcArgs: "nums, target",
        starterCode: "function binarySearch(nums, target) {\n  \n}",
    },
    {
        id: 29,
        title: "Search a 2D Matrix",
        titleSlug: "0074-search-a-2d-matrix",
        difficulty: 'Medium',
        category: "Binary Search",
        tags: ["Array", "Binary Search", "Matrix"],
        description: "You are given an m x n integer matrix with two properties: each row is sorted in non-decreasing order, and the first integer of each row is greater than the last of the previous row. Return true if target is found.",
        examples: [
            { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3", output: "true" },
            { input: "matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13", output: "false" }
        ],
        constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100", "-10^4 <= matrix[i][j], target <= 10^4"],
        testCases: [
            { input: { "matrix": [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], "target": 13 }, output: false },
            { input: { "matrix": [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], "target": 3 }, output: true }
        ],
        funcName: "searchA2DMatrix",
        funcArgs: "matrix, target",
        starterCode: "function searchA2DMatrix(matrix, target) {\n  \n}",
    },
    {
        id: 30,
        title: "Koko Eating Bananas",
        titleSlug: "0875-koko-eating-bananas",
        difficulty: 'Medium',
        category: "Binary Search",
        tags: ["Array", "Binary Search"],
        description: "Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. Koko can decide her bananas-per-hour eating speed of k. Return the minimum integer k such that she can eat all bananas within h hours.",
        examples: [
            { input: "piles = [3,6,7,11], h = 8", output: "4" },
            { input: "piles = [30,11,23,4,20], h = 5", output: "30" }
        ],
        constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9", "1 <= piles[i] <= 10^9"],
        testCases: [
            { input: { "piles": [1, 1, 1, 1], "h": 4 }, output: 1 },
            { input: { "piles": [312884539], "h": 968709470 }, output: 1 }
        ],
        funcName: "kokoEatingBananas",
        funcArgs: "piles, h",
        starterCode: "function kokoEatingBananas(piles, h) {\n  \n}",
    },
    {
        id: 31,
        title: "Find Minimum In Rotated Sorted Array",
        titleSlug: "0153-find-minimum-in-rotated-sorted-array",
        difficulty: 'Medium',
        category: "Binary Search",
        tags: ["Array", "Binary Search"],
        description: "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Given the rotated array, return the minimum element. You must write an algorithm that runs in O(log n) time.",
        examples: [
            { input: "nums = [3,4,5,1,2]", output: "1", explanation: "The original array was [1,2,3,4,5] rotated 3 times." },
            { input: "nums = [4,5,6,7,0,1,2]", output: "0", explanation: "The original array was [0,1,2,4,5,6,7] rotated 4 times." }
        ],
        constraints: ["1 <= n <= 5000", "-5000 <= nums[i] <= 5000", "All the integers of nums are unique.", "nums is sorted and rotated between 1 and n times."],
        testCases: [
            { input: { "nums": [3, 4, 5, 1, 2] }, output: 1 },
            { input: { "nums": [4, 5, 6, 7, 0, 1, 2] }, output: 0 }
        ],
        funcName: "findMinimumInRotatedSortedArray",
        funcArgs: "nums",
        starterCode: "function findMinimumInRotatedSortedArray(nums) {\n  \n}",
    },
    {
        id: 32,
        title: "Search In Rotated Sorted Array",
        titleSlug: "0033-search-in-rotated-sorted-array",
        difficulty: 'Medium',
        category: "Binary Search",
        tags: ["Array", "Binary Search"],
        description: "There is an integer array nums sorted in ascending order that is rotated at an unknown pivot. Given target, return its index, or -1 if not found. Must be O(log n).",
        examples: [
            { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4" },
            { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1" }
        ],
        constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values of nums are unique.", "nums is an ascending array that is possibly rotated.", "-10^4 <= target <= 10^4"],
        testCases: [
            { input: { "nums": [4, 5, 6, 7, 0, 1, 2], "target": 0 }, output: 4 },
            { input: { "nums": [4, 5, 6, 7, 0, 1, 2], "target": 3 }, output: -1 }
        ],
        funcName: "searchInRotatedSortedArray",
        funcArgs: "nums, target",
        starterCode: "function searchInRotatedSortedArray(nums, target) {\n  \n}",
    },
    {
        id: 33,
        title: "Time Based Key Value Store",
        titleSlug: "0981-time-based-key-value-store",
        difficulty: 'Medium',
        category: "Binary Search",
        tags: ["Hash Table", "String", "Binary Search", "Design"],
        description: "Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.",
        examples: [
            { input: '["TimeKV","set","set","get","get","get","get","get"]\\n[[],["foo","bar",1],["foo","bar",2],["foo",1],["foo",3],["foo",2],["foo",4],["foo",null]]', output: "[null,null,null,\"bar\",\"bar\",\"bar\",\"bar\",null]" }
        ],
        constraints: ["1 <= key.length, value.length <= 100", "key and value consist of lowercase English letters and digits.", "1 <= timestamp <= 10^7", "All the timestamps timestamp of set are strictly increasing.", "At most 2 * 10^5 calls will be made to set and get."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "timeBasedKeyValueStore",
        funcArgs: "",
        starterCode: "function timeBasedKeyValueStore() {\n  \n}",
    },
    {
        id: 34,
        title: "Median of Two Sorted Arrays",
        titleSlug: "0004-median-of-two-sorted-arrays",
        difficulty: 'Hard',
        category: "Binary Search",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
        examples: [
            { input: "nums1 = [1,3], nums2 = [2]", output: "2.0", explanation: "merged array = [1,2,3] and median is 2." },
            { input: "nums1 = [1,2], nums2 = [3,4]", output: "2.5", explanation: "merged array = [1,2,3,4] and median is (2+3)/2 = 2.5." }
        ],
        constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000", "-10^6 <= nums1[i], nums2[i] <= 10^6"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "medianOfTwoSortedArrays",
        funcArgs: "nums1, nums2",
        starterCode: "function medianOfTwoSortedArrays(nums1, nums2) {\n  \n}",
    },
    {
        id: 35,
        title: "Reverse Linked List",
        titleSlug: "0206-reverse-linked-list",
        difficulty: 'Easy',
        category: "Linked List",
        tags: ["Linked List", "Recursion"],
        description: "Given the head of a singly linked list, reverse the list and return the reversed list.",
        examples: [
            { input: "head = [1,2,3,4,5]", output: "[5,4,3,2,1]" },
            { input: "head = [1,2]", output: "[2,1]" }
        ],
        constraints: ["The number of nodes is in the range [0, 5000].", "-5000 <= Node.val <= 5000"],
        testCases: [
            { input: { "head": "1,2,3" }, output: "3,2,1" },
            { input: { "head": null }, output: null }
        ],
        funcName: "reverseLinkedList",
        funcArgs: "head",
        starterCode: "function reverseLinkedList(head) {\n  \n}",
    },
    {
        id: 36,
        title: "Merge Two Sorted Lists",
        titleSlug: "0021-merge-two-sorted-lists",
        difficulty: 'Easy',
        category: "Linked List",
        tags: ["Linked List", "Recursion"],
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists into one sorted list and return the head of the merged list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            { input: "list1 = [], list2 = []", output: "[]" }
        ],
        constraints: ["The number of nodes in both lists is in the range [0, 50].", "-100 <= Node.val <= 100", "Both list1 and list2 are sorted in non-decreasing order."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "mergeTwoSortedLists",
        funcArgs: "list1, list2",
        starterCode: "function mergeTwoSortedLists(list1, list2) {\n  \n}",
    },
    {
        id: 37,
        title: "Reorder List",
        titleSlug: "0143-reorder-list",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Linked List", "Two Pointers", "Stack"],
        description: "You are given the head of a singly linked list. Reorder the list to be L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...",
        examples: [
            { input: "head = [1,2,3,4]", output: "[1,4,2,3]" },
            { input: "head = [1,2,3,4,5]", output: "[1,5,2,4,3]" }
        ],
        constraints: ["The number of nodes in the list is in the range [1, 5 * 10^4].", "1 <= Node.val <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "reorderList",
        funcArgs: "head",
        starterCode: "function reorderList(head) {\n  \n}",
    },
    {
        id: 38,
        title: "Remove Nth Node From End of List",
        titleSlug: "0019-remove-nth-node-from-end-of-list",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Linked List", "Two Pointers"],
        description: "Given the head of a linked list, remove the nth node from the end of the list and return its head.",
        examples: [
            { input: "head = [1,2,3,4,5], n = 2", output: "[1,2,3,5]" },
            { input: "head = [1], n = 1", output: "[]" }
        ],
        constraints: ["The number of nodes in the list is sz.", "1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "removeNthNodeFromEndOfList",
        funcArgs: "head, n",
        starterCode: "function removeNthNodeFromEndOfList(head, n) {\n  \n}",
    },
    {
        id: 39,
        title: "Copy List With Random Pointer",
        titleSlug: "0138-copy-list-with-random-pointer",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Hash Table", "Linked List"],
        description: "A linked list of length n is given such that each node contains an additional random pointer that could point to any node or null. Construct a deep copy of the list.",
        examples: [
            { input: "head = [[7,null],[13,0],[11,4],[10,2],[1,0]]", output: "[[7,null],[13,0],[11,4],[10,2],[1,0]]" },
            { input: "head = [[1,1],[2,1]]", output: "[[1,1],[2,1]]" }
        ],
        constraints: ["0 <= n <= 1000", "-10^4 <= Node.val <= 10^4", "Node.random is null or points to a node in the linked list."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "copyListWithRandomPointer",
        funcArgs: "head",
        starterCode: "function copyListWithRandomPointer(head) {\n  \n}",
    },
    {
        id: 40,
        title: "Add Two Numbers",
        titleSlug: "0002-add-two-numbers",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Linked List", "Math", "Recursion"],
        description: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order. Add the two numbers and return the sum as a linked list.",
        examples: [
            { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
            { input: "l1 = [0], l2 = [0]", output: "[0]" }
        ],
        constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 <= Node.val <= 9", "It is guaranteed that the list represents a number that does not have leading zeros."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "addTwoNumbers",
        funcArgs: "l1, l2",
        starterCode: "function addTwoNumbers(l1, l2) {\n  \n}",
    },
    {
        id: 41,
        title: "Linked List Cycle",
        titleSlug: "0141-linked-list-cycle",
        difficulty: 'Easy',
        category: "Linked List",
        tags: ["Hash Table", "Linked List", "Two Pointers"],
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, false otherwise.",
        examples: [
            { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed)." },
            { input: "head = [1,2], pos = -1", output: "false", explanation: "There is no cycle in the linked list." }
        ],
        constraints: ["The number of the nodes in the list is in the range [0, 10^4].", "-10^5 <= Node.val <= 10^5", "pos is -1 or a valid index in the linked-list."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "linkedListCycle",
        funcArgs: "head",
        starterCode: "function linkedListCycle(head) {\n  \n}",
    },
    {
        id: 42,
        title: "Find The Duplicate Number",
        titleSlug: "0287-find-the-duplicate-number",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Array", "Two Pointers", "Binary Search", "Bit Manipulation"],
        description: "Given an array of integers nums containing n + 1 integers where each integer is in the range [1, n] inclusive, there is only one repeated number. Return this repeated number.",
        examples: [
            { input: "nums = [1,3,4,2,2]", output: "2" },
            { input: "nums = [3,1,3,4,2]", output: "3" }
        ],
        constraints: ["1 <= n <= 10^5", "nums.length == n + 1", "1 <= nums[i] <= n", "All the integers in nums appear only once except for precisely one element which appears two or more times."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "findTheDuplicateNumber",
        funcArgs: "nums",
        starterCode: "function findTheDuplicateNumber(nums) {\n  \n}",
    },
    {
        id: 43,
        title: "LRU Cache",
        titleSlug: "0146-lru-cache",
        difficulty: 'Medium',
        category: "Linked List",
        tags: ["Hash Table", "Linked List", "Design"],
        description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement the LRUCache class.",
        examples: [
            { input: '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', output: "[null,null,null,1,null,-1,null,-1,3,4]" }
        ],
        constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5", "At most 2 * 10^5 calls will be made to get and put."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "lruCache",
        funcArgs: "",
        starterCode: "function lruCache() {\n  \n}",
    },
    {
        id: 44,
        title: "Merge K Sorted Lists",
        titleSlug: "0023-merge-k-sorted-lists",
        difficulty: 'Hard',
        category: "Linked List",
        tags: ["Linked List", "Divide and Conquer", "Heap"],
        description: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
        examples: [
            { input: "lists = [[1,4,5],[1,3,4],[2,6]]", output: "[1,1,2,3,4,4,5,6]" },
            { input: "lists = []", output: "[]" }
        ],
        constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4", "lists[i] is sorted in ascending order."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "mergeKSortedLists",
        funcArgs: "lists",
        starterCode: "function mergeKSortedLists(lists) {\n  \n}",
    },
    {
        id: 45,
        title: "Reverse Nodes In K Group",
        titleSlug: "0025-reverse-nodes-in-k-group",
        difficulty: 'Hard',
        category: "Linked List",
        tags: ["Linked List", "Recursion"],
        description: "Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.",
        examples: [
            { input: "head = [1,2,3,4,5], k = 2", output: "[2,1,4,3,5]" },
            { input: "head = [1,2,3,4,5], k = 3", output: "[3,2,1,4,5]" }
        ],
        constraints: ["The number of nodes in the list is n.", "1 <= k <= n <= 5000", "0 <= Node.val <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "reverseNodesInKGroup",
        funcArgs: "head, k",
        starterCode: "function reverseNodesInKGroup(head, k) {\n  \n}",
    },
    {
        id: 46,
        title: "Invert Binary Tree",
        titleSlug: "0226-invert-binary-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
        description: "Given the root of a binary tree, invert the tree and return its root. Inverting means swapping every left and right child.",
        examples: [
            { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]" },
            { input: "root = [2,1,3]", output: "[2,3,1]" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
        testCases: [
            { input: { "root": "1,null,2" }, output: "2,null,1" },
            { input: { "root": null }, output: null }
        ],
        funcName: "invertBinaryTree",
        funcArgs: "root",
        starterCode: "function invertBinaryTree(root) {\n  \n}",
    },
    {
        id: 47,
        title: "Maximum Depth of Binary Tree",
        titleSlug: "0104-maximum-depth-of-binary-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
        description: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "3" },
            { input: "root = [1,null,2]", output: "2" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-100 <= Node.val <= 100"],
        testCases: [
            { input: { "root": "3,9,20,null,null,15,7" }, output: 3 },
            { input: { "root": null }, output: 0 }
        ],
        funcName: "maximumDepthOfBinaryTree",
        funcArgs: "root",
        starterCode: "function maximumDepthOfBinaryTree(root) {\n  \n}",
    },
    {
        id: 48,
        title: "Diameter of Binary Tree",
        titleSlug: "0543-diameter-of-binary-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Tree"],
        description: "Given the root of a binary tree, return the length of the diameter of the tree. The diameter is the length of the longest path between any two nodes in a tree.",
        examples: [
            { input: "root = [1,2,3,4,5]", output: "3", explanation: "The diameter is the path [4,2,1,3] or [5,2,1,3]." },
            { input: "root = [1,2]", output: "1" }
        ],
        constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "-100 <= Node.val <= 100"],
        testCases: [
            { input: { "root": "1,2,3,4,5" }, output: 3 },
            { input: { "root": "1,2" }, output: 2 }
        ],
        funcName: "diameterOfBinaryTree",
        funcArgs: "root",
        starterCode: "function diameterOfBinaryTree(root) {\n  \n}",
    },
    {
        id: 49,
        title: "Balanced Binary Tree",
        titleSlug: "0110-balanced-binary-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Tree"],
        description: "Given a binary tree, determine if it is height-balanced. A height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differs by more than one.",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "true" },
            { input: "root = [1,2,2,3,3,null,null,4,4]", output: "false" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 5000].", "-10^4 <= Node.val <= 10^4"],
        testCases: [
            { input: { "root": "3,9,20,null,null,15,7" }, output: true },
            { input: { "root": "1,2,2,3,3,null,null,4,4" }, output: false }
        ],
        funcName: "balancedBinaryTree",
        funcArgs: "root",
        starterCode: "function balancedBinaryTree(root) {\n  \n}",
    },
    {
        id: 50,
        title: "Same Tree",
        titleSlug: "0100-same-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
        description: "Given the roots of two binary trees p and q, write a function to check if they are the same or not. Two binary trees are considered the same if they are structurally identical and the nodes have the same value.",
        examples: [
            { input: "p = [1,2,3], q = [1,2,3]", output: "true" },
            { input: "p = [1,2], q = [1,null,2]", output: "false" }
        ],
        constraints: ["The number of nodes in both trees is in the range [0, 100].", "-10^4 <= Node.val <= 10^4"],
        testCases: [
            { input: { "p": "1,2,3", "q": "1,2,3" }, output: true },
            { input: { "p": "1,2", "q": "2,1" }, output: false }
        ],
        funcName: "sameTree",
        funcArgs: "p, q",
        starterCode: "function sameTree(p, q) {\n  \n}",
    },
    {
        id: 51,
        title: "Subtree of Another Tree",
        titleSlug: "0572-subtree-of-another-tree",
        difficulty: 'Easy',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Tree"],
        description: "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot, and false otherwise.",
        examples: [
            { input: "root = [3,4,5,1,2], subRoot = [4,1,2]", output: "true" },
            { input: "root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]", output: "false" }
        ],
        constraints: ["The number of nodes in both trees is in the range [0, 1000].", "-10^4 <= Node.val <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "subtreeOfAnotherTree",
        funcArgs: "root, subRoot",
        starterCode: "function subtreeOfAnotherTree(root, subRoot) {\n  \n}",
    },
    {
        id: 52,
        title: "Lowest Common Ancestor of a Binary Search Tree",
        titleSlug: "0235-lowest-common-ancestor-of-a-binary-search-tree",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
        description: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q in the BST.",
        examples: [
            { input: "root = [6,2,8,0,4,7,9,null,null,null,3,5], p = 2, q = 8", output: "6", explanation: "The LCA of nodes 2 and 8 is 6." },
            { input: "root = [6,2,8,0,4,7,9,null,null,null,3,5], p = 2, q = 4", output: "2", explanation: "The LCA of nodes 2 and 4 is 2, since 2 is an ancestor of 4." }
        ],
        constraints: ["The number of nodes in the tree is in the range [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique.", "p != q", "p and q will exist in the BST."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "lowestCommonAncestorOfABinarySearchTree",
        funcArgs: "root, p, q",
        starterCode: "function lowestCommonAncestorOfABinarySearchTree(root, p, q) {\n  \n}",
    },
    {
        id: 53,
        title: "Binary Tree Level Order Traversal",
        titleSlug: "0102-binary-tree-level-order-traversal",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Breadth-First Search", "Binary Tree"],
        description: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]" },
            { input: "root = [1]", output: "[[1]]" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 2000].", "-1000 <= Node.val <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "binaryTreeLevelOrderTraversal",
        funcArgs: "root",
        starterCode: "function binaryTreeLevelOrderTraversal(root) {\n  \n}",
    },
    {
        id: 54,
        title: "Binary Tree Right Side View",
        titleSlug: "0199-binary-tree-right-side-view",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
        description: "Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.",
        examples: [
            { input: "root = [1,2,3,null,5,null,4]", output: "[1,3,4]", explanation: "You can see nodes 1, 3, and 4 from the right side." },
            { input: "root = [1,null,3]", output: "[1,3]" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 100].", "-100 <= Node.val <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "binaryTreeRightSideView",
        funcArgs: "root",
        starterCode: "function binaryTreeRightSideView(root) {\n  \n}",
    },
    {
        id: 55,
        title: "Count Good Nodes In Binary Tree",
        titleSlug: "1448-count-good-nodes-in-binary-tree",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Breadth-First Search", "Binary Tree"],
        description: "Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X. Return the number of good nodes.",
        examples: [
            { input: "root = [3,1,4,3,null,1,5]", output: "4", explanation: "Good nodes are: 3, 4, 5, and 3." },
            { input: "root = [3,3,null,4,2]", output: "3", explanation: "Good nodes are: 3, 3, and 4." }
        ],
        constraints: ["The number of nodes in the binary tree is in the range [1, 10^5].", "-10^4 <= Node.val <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "countGoodNodesInBinaryTree",
        funcArgs: "root",
        starterCode: "function countGoodNodesInBinaryTree(root) {\n  \n}",
    },
    {
        id: 56,
        title: "Validate Binary Search Tree",
        titleSlug: "0098-validate-binary-search-tree",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
        description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
        examples: [
            { input: "root = [2,1,3]", output: "true" },
            { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "The root node's value is 5 but its right child's value is 4." }
        ],
        constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "-2^31 <= Node.val <= 2^31 - 1"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "validateBinarySearchTree",
        funcArgs: "root",
        starterCode: "function validateBinarySearchTree(root) {\n  \n}",
    },
    {
        id: 57,
        title: "Kth Smallest Element In a Bst",
        titleSlug: "0230-kth-smallest-element-in-a-bst",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
        description: "Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
        examples: [
            { input: "root = [3,1,4,null,2], k = 1", output: "1" },
            { input: "root = [5,3,6,2,4,null,null,1], k = 3", output: "3" }
        ],
        constraints: ["The number of nodes in the tree is in the range [1, 10^4].", "1 <= k <= 10^4", "-10^4 <= Node.val <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "kthSmallestElementInABst",
        funcArgs: "root, k",
        starterCode: "function kthSmallestElementInABst(root, k) {\n  \n}",
    },
    {
        id: 58,
        title: "Construct Binary Tree From Preorder And Inorder Traversal",
        titleSlug: "0105-construct-binary-tree-from-preorder-and-inorder-traversal",
        difficulty: 'Medium',
        category: "Trees",
        tags: ["Array", "Hash Table", "Divide and Conquer", "Tree", "Binary Tree"],
        description: "Given two integer arrays preorder and inorder, construct and return the binary tree.",
        examples: [
            { input: "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]", output: "[3,9,20,null,null,15,7]" },
            { input: "preorder = [-1], inorder = [-1]", output: "[-1]" }
        ],
        constraints: ["1 <= preorder.length <= 3000", "inorder.length == preorder.length", "-3000 <= preorder[i], inorder[i] <= 3000", "preorder and inorder consist of unique values.", "Each value of inorder also appears in preorder."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "constructBinaryTreeFromPreorderAndInorderTraversal",
        funcArgs: "preorder, inorder",
        starterCode: "function constructBinaryTreeFromPreorderAndInorderTraversal(preorder, inorder) {\n  \n}",
    },
    {
        id: 59,
        title: "Binary Tree Maximum Path Sum",
        titleSlug: "0124-binary-tree-maximum-path-sum",
        difficulty: 'Hard',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Dynamic Programming", "Binary Tree"],
        description: "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. Find the maximum path sum.",
        examples: [
            { input: "root = [1,2,3]", output: "6", explanation: "The maximum path sum is 2 + 1 + 3 = 6." },
            { input: "root = [-10,9,20,null,null,15,7]", output: "42", explanation: "The maximum path sum is 15 + 20 + 7 = 42." }
        ],
        constraints: ["The number of nodes in the tree is in the range [1, 3 * 10^4].", "-1000 <= Node.val <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "binaryTreeMaximumPathSum",
        funcArgs: "root",
        starterCode: "function binaryTreeMaximumPathSum(root) {\n  \n}",
    },
    {
        id: 60,
        title: "Serialize And Deserialize Binary Tree",
        titleSlug: "0297-serialize-and-deserialize-binary-tree",
        difficulty: 'Hard',
        category: "Trees",
        tags: ["Tree", "Depth-First Search", "Design", "String"],
        description: "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work.",
        examples: [
            { input: "root = [1,2,3,null,null,4,5]", output: "[1,2,3,null,null,4,5]", explanation: "You can serialize the tree and deserialize it back." },
            { input: "root = []", output: "[]" }
        ],
        constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-1000 <= Node.val <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "serializeAndDeserializeBinaryTree",
        funcArgs: "",
        starterCode: "function serializeAndDeserializeBinaryTree() {\n  \n}",
    },
    {
        id: 61,
        title: "Implement Trie Prefix Tree",
        titleSlug: "0208-implement-trie-prefix-tree",
        difficulty: 'Medium',
        category: "Tries",
        tags: ["Hash Table", "String", "Design", "Trie"],
        description: "A trie or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the Trie class.",
        examples: [
            { input: '["Trie","insert","search","search","startsWith","insert","search"]\n[[],["apple"],["apple"],["app"],["app"],["app"],["app"]]', output: "[null,null,true,false,true,null,true]" }
        ],
        constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters.", "At most 3 * 10^4 calls in total will be made to insert, search, and startsWith."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "implementTriePrefixTree",
        funcArgs: "",
        starterCode: "function implementTriePrefixTree() {\n  \n}",
    },
    {
        id: 62,
        title: "Design Add And Search Words Data Structure",
        titleSlug: "0211-design-add-and-search-words-data-structure",
        difficulty: 'Medium',
        category: "Tries",
        tags: ["String", "Depth-First Search", "Design", "Trie"],
        description: "Design a data structure that supports adding new words and finding if a string matches any previously added string. The search can contain '.' which matches any character.",
        examples: [
            { input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]', output: "[null,null,null,null,false,true,true,true]" }
        ],
        constraints: ["1 <= word.length <= 25", "word consists of lowercase English letters and '.'.", "At most 3 dots in word.", "At most 10^4 calls will be made to addWord and search."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "designAddAndSearchWordsDataStructure",
        funcArgs: "",
        starterCode: "function designAddAndSearchWordsDataStructure() {\n  \n}",
    },
    {
        id: 63,
        title: "Word Search II",
        titleSlug: "0212-word-search-ii",
        difficulty: 'Hard',
        category: "Tries",
        tags: ["Array", "String", "Backtracking", "Trie", "Matrix"],
        description: "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells.",
        examples: [
            { input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]', output: '["eat","oath"]' },
            { input: 'board = [["a","b"],["c","d"]], words = ["abcb"]', output: '[]' }
        ],
        constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "board[i][j] is a lowercase English letter.", "1 <= words.length <= 3 * 10^4", "1 <= words[i].length <= 10", "words[i] consists of lowercase English letters.", "All the strings of words are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "wordSearchII",
        funcArgs: "board, words",
        starterCode: "function wordSearchII(board, words) {\n  \n}",
    },
    {
        id: 64,
        title: "Kth Largest Element In a Stream",
        titleSlug: "0703-kth-largest-element-in-a-stream",
        difficulty: 'Easy',
        category: "Heap / Priority Queue",
        tags: ["Tree", "Design", "Binary Search Tree", "Heap"],
        description: "Design a class to find the kth largest element in a stream of numbers. It should support adding new numbers and returning the kth largest element.",
        examples: [
            { input: '["KthLargest","add","add","add","add","add"]\n[[3,[4,5,8,2]],3],[5],[10],[9],[4]]', output: "[null,4,5,5,8,8]" }
        ],
        constraints: ["1 <= k <= 10^4", "0 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "-10^4 <= val <= 10^4", "At most 10^4 calls will be made to add.", "It is guaranteed that there will be at least k elements in the heap when you search for the kth element."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "kthLargestElementInAStream",
        funcArgs: "",
        starterCode: "function kthLargestElementInAStream() {\n  \n}",
    },
    {
        id: 65,
        title: "Last Stone Weight",
        titleSlug: "1046-last-stone-weight",
        difficulty: 'Easy',
        category: "Heap / Priority Queue",
        tags: ["Array", "Heap", "Greedy"],
        description: "You are given an array of integers stones where stones[i] is the weight of the ith stone. On each turn, smash the two heaviest stones together and return the weight of the last remaining stone.",
        examples: [
            { input: "stones = [2,7,4,1,8,1]", output: "1", explanation: "Smash 7 and 8 to get 1, array becomes [2,4,1,1,1], then smash 2 and 4 to get 2, array becomes [1,1,1,2], then smash 2 and 1 to get 1, array becomes [1,1], then smash 1 and 1 to get 0." },
            { input: "stones = [1]", output: "1" }
        ],
        constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "lastStoneWeight",
        funcArgs: "stones",
        starterCode: "function lastStoneWeight(stones) {\n  \n}",
    },
    {
        id: 66,
        title: "K Closest Points to Origin",
        titleSlug: "0973-k-closest-points-to-origin",
        difficulty: 'Medium',
        category: "Heap / Priority Queue",
        tags: ["Array", "Math", "Geometry", "Sorting", "Heap"],
        description: "Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).",
        examples: [
            { input: "points = [[3,3],[5,-1],[-2,4]], k = 2", output: "[[3,3],[-2,4]]", explanation: "The distance from (3,3) is sqrt(18), from (-2,4) is sqrt(20), from (5,-1) is sqrt(26)." },
            { input: "points = [[1,3],[2,-1]], k = 1", output: "[[1,3]]" }
        ],
        constraints: ["1 <= k <= points.length <= 10^4", "-10^4 < x[i], y[i] < 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "kClosestPointsToOrigin",
        funcArgs: "points, k",
        starterCode: "function kClosestPointsToOrigin(points, k) {\n  \n}",
    },
    {
        id: 67,
        title: "Kth Largest Element In An Array",
        titleSlug: "0215-kth-largest-element-in-an-array",
        difficulty: 'Medium',
        category: "Heap / Priority Queue",
        tags: ["Array", "Divide and Conquer", "Sorting", "Heap"],
        description: "Given an integer array nums and an integer k, return the kth largest element in the array. Note that it is the kth largest element in sorted order.",
        examples: [
            { input: "nums = [3,2,1,5,6,4], k = 2", output: "5" },
            { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", output: "4" }
        ],
        constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "kthLargestElementInAnArray",
        funcArgs: "nums, k",
        starterCode: "function kthLargestElementInAnArray(nums, k) {\n  \n}",
    },
    {
        id: 68,
        title: "Task Scheduler",
        titleSlug: "0621-task-scheduler",
        difficulty: 'Medium',
        category: "Heap / Priority Queue",
        tags: ["Array", "Hash Table", "Greedy", "Sorting", "Heap"],
        description: "Given a characters array tasks representing CPU tasks and an integer n representing the cooling period, return the least number of units of time that the CPU will take to finish all the given tasks.",
        examples: [
            { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: "8", explanation: "A -> B -> idle -> A -> B -> idle -> A -> B." },
            { input: 'tasks = ["A","A","A","B","B","B"], n = 0', output: "6", explanation: "On this case any scheduling is possible." }
        ],
        constraints: ["1 <= tasks.length <= 10^4", "tasks[i] is an uppercase English letter.", "0 <= n <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "taskScheduler",
        funcArgs: "tasks, n",
        starterCode: "function taskScheduler(tasks, n) {\n  \n}",
    },
    {
        id: 69,
        title: "Design Twitter",
        titleSlug: "0355-design-twitter",
        difficulty: 'Medium',
        category: "Heap / Priority Queue",
        tags: ["Hash Table", "Linked List", "Design", "Heap"],
        description: "Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and see the 10 most recent tweets in the user's news feed.",
        examples: [
            { input: '["Twitter","postTweet","getNewsFeed","follow","postTweet","getNewsFeed","unfollow","getNewsFeed"]\n[[],[1,"foo"],[1],[2,1],[2,"bar"],[1],[2,1],[1]]', output: "[null,null,[1],null,null,[2,1],null,[1]]" }
        ],
        constraints: ["1 <= userId <= 500", "1 <= companyId <= 200", "1 <= tweetId <= 10^4", "All the calls to postTweet and getNewsFeed are valid.", "At most 3 * 10^4 calls will be made to postTweet, follow, unfollow, and getNewsFeed."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "designTwitter",
        funcArgs: "",
        starterCode: "function designTwitter() {\n  \n}",
    },
    {
        id: 70,
        title: "Find Median From Data Stream",
        titleSlug: "0295-find-median-from-data-stream",
        difficulty: 'Hard',
        category: "Heap / Priority Queue",
        tags: ["Design", "Sorting", "Heap", "Data Stream"],
        description: "The median is the middle value of a sorted list of integers. Design a data structure that supports adding numbers and finding the median of all added numbers.",
        examples: [
            { input: '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]', output: "[null,null,null,1.5,null,2.0]" }
        ],
        constraints: ["-10^5 <= num <= 10^5", "There will be at least one element in the data structure before calling findMedian.", "At most 5 * 10^4 calls will be made to addNum and findMedian."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "findMedianFromDataStream",
        funcArgs: "",
        starterCode: "function findMedianFromDataStream() {\n  \n}",
    },
    {
        id: 71,
        title: "Subsets",
        titleSlug: "0078-subsets",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "Backtracking", "Bit Manipulation"],
        description: "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
        examples: [
            { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]" },
            { input: "nums = [0]", output: "[[],[0]]" }
        ],
        constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "subsets",
        funcArgs: "nums",
        starterCode: "function subsets(nums) {\n  \n}",
    },
    {
        id: 72,
        title: "Combination Sum",
        titleSlug: "0039-combination-sum",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "Backtracking"],
        description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
        examples: [
            { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", explanation: "2 + 2 + 3 = 7 and 7 = 7." },
            { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]" }
        ],
        constraints: ["1 <= candidates.length <= 30", "1 <= candidates[i] <= 200", "All elements of candidates are distinct.", "1 <= target <= 500"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "combinationSum",
        funcArgs: "candidates, target",
        starterCode: "function combinationSum(candidates, target) {\n  \n}",
    },
    {
        id: 73,
        title: "Permutations",
        titleSlug: "0046-permutations",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "Backtracking"],
        description: "Given an array nums of distinct integers, return all possible permutations. You can return the answer in any order.",
        examples: [
            { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            { input: "nums = [0,1]", output: "[[0,1],[1,0]]" }
        ],
        constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All the integers of nums are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "permutations",
        funcArgs: "nums",
        starterCode: "function permutations(nums) {\n  \n}",
    },
    {
        id: 74,
        title: "Subsets II",
        titleSlug: "0090-subsets-ii",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "Backtracking", "Bit Manipulation"],
        description: "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
        examples: [
            { input: "nums = [1,2,2]", output: "[[],[1],[1,2],[1,2,2],[2],[2,2]]" },
            { input: "nums = [0]", output: "[[],[0]]" }
        ],
        constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "subsetsII",
        funcArgs: "nums",
        starterCode: "function subsetsII(nums) {\n  \n}",
    },
    {
        id: 75,
        title: "Combination Sum II",
        titleSlug: "0040-combination-sum-ii",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "Backtracking"],
        description: "Given a collection of candidate numbers candidates and a target number target, find all unique combinations where candidates sum to target. Each number may only be used once.",
        examples: [
            { input: "candidates = [10,1,2,7,6,1,5], target = 8", output: "[[1,1,6],[1,2,5],[1,7],[2,6]]" },
            { input: "candidates = [2,5,2,1,2], target = 5", output: "[[1,2,2],[5]]" }
        ],
        constraints: ["1 <= candidates.length <= 30", "1 <= candidates[i] <= 50", "All elements of candidates are unique.", "1 <= target <= 50"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "combinationSumII",
        funcArgs: "candidates, target",
        starterCode: "function combinationSumII(candidates, target) {\n  \n}",
    },
    {
        id: 76,
        title: "Word Search",
        titleSlug: "0079-word-search",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Array", "String", "Backtracking", "Matrix"],
        description: "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
        examples: [
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: "true" },
            { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: "true" }
        ],
        constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15", "board and word consist of only lowercase and uppercase English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "wordSearch",
        funcArgs: "board, word",
        starterCode: "function wordSearch(board, word) {\n  \n}",
    },
    {
        id: 77,
        title: "Palindrome Partitioning",
        titleSlug: "0131-palindrome-partitioning",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["String", "Dynamic Programming", "Backtracking"],
        description: "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.",
        examples: [
            { input: 's = "aab"', output: '[["a","a","b"],["aa","b"]]' },
            { input: 's = "a"', output: '[["a"]]' }
        ],
        constraints: ["1 <= s.length <= 16", "s contains only lowercase English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "palindromePartitioning",
        funcArgs: "s",
        starterCode: "function palindromePartitioning(s) {\n  \n}",
    },
    {
        id: 78,
        title: "Letter Combinations of a Phone Number",
        titleSlug: "0017-letter-combinations-of-a-phone-number",
        difficulty: 'Medium',
        category: "Backtracking",
        tags: ["Hash Table", "String", "Backtracking"],
        description: "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.",
        examples: [
            { input: 'digits = "23"', output: '["ad","ae","af","bd","be","bf","cd","ce","cf"]' },
            { input: 'digits = ""', output: '[]' }
        ],
        constraints: ["0 <= digits.length <= 4", "digits[i] is a digit in the range ['2', '9']."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "letterCombinationsOfAPhoneNumber",
        funcArgs: "digits",
        starterCode: "function letterCombinationsOfAPhoneNumber(digits) {\n  \n}",
    },
    {
        id: 79,
        title: "N Queens",
        titleSlug: "0051-n-queens",
        difficulty: 'Hard',
        category: "Backtracking",
        tags: ["Array", "Backtracking"],
        description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
        examples: [
            { input: "n = 4", output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', explanation: "There exist two distinct solutions to the 4-queens puzzle." },
            { input: "n = 1", output: '[["Q"]]' }
        ],
        constraints: ["1 <= n <= 9"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "solveNQueens",
        funcArgs: "n",
        starterCode: "function solveNQueens(n) {\n  \n}",
    },
    {
        id: 80,
        title: "Number of Islands",
        titleSlug: "0200-number-of-islands",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
        description: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
        examples: [
            { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: "1" },
            { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: "3" }
        ],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "numberOfIslands",
        funcArgs: "grid",
        starterCode: "function numberOfIslands(grid) {\n  \n}",
    },
    {
        id: 81,
        title: "Clone Graph",
        titleSlug: "0133-clone-graph",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Hash Table", "Depth-First Search", "Breadth-First Search", "Graph"],
        description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
        examples: [
            { input: "adjList = [[2,4],[1,3],[2,4],[1,3]]", output: "[[2,4],[1,3],[2,4],[1,3]]", explanation: "There are 4 nodes in the graph. Node 1's neighbors are 2 and 4." },
            { input: "adjList = [[]]", output: "[[]]" }
        ],
        constraints: ["The number of nodes in the graph is in the range [0, 100].", "1 <= Node.val <= 100", "Node.val is unique for each node.", "There are no repeated edges and no self-loops in the graph."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "cloneGraph",
        funcArgs: "node",
        starterCode: "function cloneGraph(node) {\n  \n}",
    },
    {
        id: 82,
        title: "Max Area of Island",
        titleSlug: "0695-max-area-of-island",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
        description: "You are given an m x n binary matrix grid. An island is a group of 1's (land) connected 4-directionally. Return the maximum area of an island.",
        examples: [
            { input: 'grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]', output: "6" },
            { input: 'grid = [[0,0,0,0,0,0,0,0]]', output: "0" }
        ],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 50", "grid[i][j] is either 0 or 1."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "maxAreaOfIsland",
        funcArgs: "grid",
        starterCode: "function maxAreaOfIsland(grid) {\n  \n}",
    },
    {
        id: 83,
        title: "Pacific Atlantic Water Flow",
        titleSlug: "0417-pacific-atlantic-water-flow",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Depth-First Search", "Breadth-First Search", "Matrix"],
        description: "There is an m x n rectangular island that borders both the Pacific and Atlantic oceans. Return a 2D list of grid coordinates where rain water can flow from that cell to both oceans.",
        examples: [
            { input: "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", output: "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]" },
            { input: "heights = [[2,1],[1,2]]", output: "[[0,0],[0,1],[1,0],[1,1]]" }
        ],
        constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "pacificAtlanticWaterFlow",
        funcArgs: "heights",
        starterCode: "function pacificAtlanticWaterFlow(heights) {\n  \n}",
    },
    {
        id: 84,
        title: "Surrounded Regions",
        titleSlug: "0130-surrounded-regions",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Depth-First Search", "Breadth-First Search", "Union Find", "Matrix"],
        description: "Given an m x n matrix board containing 'X' and 'O', capture all regions that are surrounded by 'X'.",
        examples: [
            { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]' },
            { input: 'board = [["X"]]', output: '[["X"]]' }
        ],
        constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 200", "board[i][j] is 'X' or 'O'."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "surroundedRegions",
        funcArgs: "board",
        starterCode: "function surroundedRegions(board) {\n  \n}",
    },
    {
        id: 85,
        title: "Rotting Oranges",
        titleSlug: "0994-rotting-oranges",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Breadth-First Search", "Matrix"],
        description: "You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh orange), or 2 (rotten orange). Return the minimum number of minutes that must elapse until no cell has a fresh orange.",
        examples: [
            { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: "4" },
            { input: 'grid = [[2,1,1],[0,1,1],[1,0,1]]', output: "-1", explanation: "The orange in the bottom left corner is never rotten." }
        ],
        constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10", "0 <= grid[i][j] <= 2"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "rottingOranges",
        funcArgs: "grid",
        starterCode: "function rottingOranges(grid) {\n  \n}",
    },
    {
        id: 86,
        title: "Walls And Gates",
        titleSlug: "0286-walls-and-gates",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Array", "Breadth-First Search", "Matrix"],
        description: "You are given an m x n grid rooms initialized with these three values: -1 (wall), 0 (gate), INF (empty room). Fill each empty room with the distance to its nearest gate.",
        examples: [
            { input: "rooms = [[INF,-1,0,INF],[INF,INF,INF,-1],[INF,-1,INF,-1],[0,-1,INF,INF]]", output: "[[3,-1,0,1],[2,2,1,-1],[1,-1,2,-1],[0,-1,3,4]]", explanation: "INF = 2147483647." }
        ],
        constraints: ["m == rooms.length", "n == rooms[i].length", "1 <= m, n <= 250", "rooms[i][j] is -1, 0, or 2^31 - 1."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "wallsAndGates",
        funcArgs: "rooms",
        starterCode: "function wallsAndGates(rooms) {\n  \n}",
    },
    {
        id: 87,
        title: "Course Schedule",
        titleSlug: "0207-course-schedule",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Given prerequisites pairs, determine if you can finish all courses.",
        examples: [
            { input: "numCourses = 2, prerequisites = [[1,0]]", output: "true", explanation: "You can take course 0 first, then course 1." },
            { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", output: "false", explanation: "You must take course 1 before course 0 and vice versa." }
        ],
        constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2", "0 <= ai, bi < numCourses"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "courseSchedule",
        funcArgs: "numCourses, prerequisites",
        starterCode: "function courseSchedule(numCourses, prerequisites) {\n  \n}",
    },
    {
        id: 88,
        title: "Course Schedule II",
        titleSlug: "0210-course-schedule-ii",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
        description: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Given prerequisites pairs, return the ordering of courses you should take to finish all courses.",
        examples: [
            { input: "numCourses = 2, prerequisites = [[1,0]]", output: "[0,1]", explanation: "You must take course 0 before course 1." },
            { input: "numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]", output: "[0,1,2,3] or [0,2,1,3]" }
        ],
        constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2", "0 <= ai, bi < numCourses", "All the pairs prerequisites[i] are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "courseScheduleII",
        funcArgs: "numCourses, prerequisites",
        starterCode: "function courseScheduleII(numCourses, prerequisites) {\n  \n}",
    },
    {
        id: 89,
        title: "Redundant Connection",
        titleSlug: "0684-redundant-connection",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Graph"],
        description: "In this problem, a tree is an undirected graph that is connected and has no cycles. The given input is a graph that started as a tree with n nodes labeled 1 to n, with one additional edge added. Find the edge that can be removed.",
        examples: [
            { input: "edges = [[1,2],[1,3],[2,3]]", output: "[2,3]", explanation: "The edge [2,3] creates a cycle." },
            { input: "edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]", output: "[1,4]" }
        ],
        constraints: ["n == edges.length", "3 <= n <= 1000", "edges[i].length == 2", "1 <= ai, bi <= n", "ai != bi"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "redundantConnection",
        funcArgs: "edges",
        starterCode: "function redundantConnection(edges) {\n  \n}",
    },
    {
        id: 90,
        title: "Number of Connected Components In An Undirected Graph",
        titleSlug: "0323-number-of-connected-components-in-an-undirected-graph",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Graph"],
        description: "You have a graph of n nodes labeled from 0 to n - 1. Given integer n and an edge list, return the number of connected components in the graph.",
        examples: [
            { input: "n = 5, edges = [[0,1],[1,2],[3,4]]", output: "2", explanation: "There are 2 connected components: {0,1,2} and {3,4}." },
            { input: "n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]", output: "1" }
        ],
        constraints: ["1 <= n <= 2000", "1 <= edges.length <= 5000", "edges[i].length == 2", "0 <= ai, bi <= n - 1", "ai != bi"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "numberOfConnectedComponentsInAnUndirectedGraph",
        funcArgs: "n, edges",
        starterCode: "function numberOfConnectedComponentsInAnUndirectedGraph(n, edges) {\n  \n}",
    },
    {
        id: 91,
        title: "Graph Valid Tree",
        titleSlug: "0261-graph-valid-tree",
        difficulty: 'Medium',
        category: "Graphs",
        tags: ["Depth-First Search", "Breadth-First Search", "Union Find", "Graph"],
        description: "You have a graph of n nodes labeled from 0 to n - 1. Given n and an edge list, determine if the edges make up a valid tree.",
        examples: [
            { input: "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", output: "true" },
            { input: "n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]", output: "false" }
        ],
        constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000", "edges[i].length == 2", "0 <= ai, bi <= n - 1", "ai != bi"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "graphValidTree",
        funcArgs: "n, edges",
        starterCode: "function graphValidTree(n, edges) {\n  \n}",
    },
    {
        id: 92,
        title: "Word Ladder",
        titleSlug: "0127-word-ladder",
        difficulty: 'Hard',
        category: "Graphs",
        tags: ["Hash Table", "String", "Breadth-First Search"],
        description: "A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words where each adjacent pair differs by one letter. Return the length of the shortest transformation sequence.",
        examples: [
            { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: "5", explanation: "hit -> hot -> dot -> dog -> cog." },
            { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', output: "0", explanation: "The endWord 'cog' is not in wordList." }
        ],
        constraints: ["1 <= beginWord.length <= 10", "endWord.length == beginWord.length", "1 <= wordList.length <= 5000", "wordList[i].length == beginWord.length", "beginWord, endWord, and wordList[i] consist of lowercase English letters.", "beginWord != endWord", "The words in wordList are all unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "wordLadder",
        funcArgs: "beginWord, endWord, wordList",
        starterCode: "function wordLadder(beginWord, endWord, wordList) {\n  \n}",
    },
    {
        id: 93,
        title: "Reconstruct Itinerary",
        titleSlug: "0332-reconstruct-itinerary",
        difficulty: 'Hard',
        category: "Advanced Graphs",
        tags: ["Depth-First Search", "Graph", "Eulerian Circuit"],
        description: "You are given a list of airline tickets where tickets[i] = [fromi, toi] represent departure and arrival airports. Reconstruct the itinerary in order and return it.",
        examples: [
            { input: 'tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]', output: '["JFK","MUC","LHR","SFO","SJC"]' },
            { input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', output: '["JFK","ATL","JFK","SFO","ATL","SFO"]' }
        ],
        constraints: ["1 <= tickets.length <= 300", "tickets[i].length == 2", "fromi.length == 2", "toi.length == 2", "fromi and toi consist of uppercase English letters.", "fromi != toi"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "reconstructItinerary",
        funcArgs: "tickets",
        starterCode: "function reconstructItinerary(tickets) {\n  \n}",
    },
    {
        id: 94,
        title: "Min Cost to Connect All Points",
        titleSlug: "1584-min-cost-to-connect-all-points",
        difficulty: 'Medium',
        category: "Advanced Graphs",
        tags: ["Array", "Union Find", "Graph", "Minimum Spanning Tree"],
        description: "You are given an array points representing points on an X-Y plane, where points[i] = [xi, yi]. Return the minimum cost to make all points connected.",
        examples: [
            { input: "points = [[0,0],[2,2],[3,10],[5,2],[7,0]]", output: "20", explanation: "Connect (0,0) to (2,2) with cost 4, (2,2) to (3,10) with cost 12, (2,2) to (5,2) with cost 4, (5,2) to (7,0) with cost 4. Total = 20." },
            { input: "points = [[3,12],[-2,5],[-4,1]]", output: "18" }
        ],
        constraints: ["1 <= points.length <= 1000", "-10^6 <= xi, yi <= 10^6", "All the pairs (xi, yi) are distinct."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "minCostToConnectAllPoints",
        funcArgs: "points",
        starterCode: "function minCostToConnectAllPoints(points) {\n  \n}",
    },
    {
        id: 95,
        title: "Network Delay Time",
        titleSlug: "0743-network-delay-time",
        difficulty: 'Medium',
        category: "Advanced Graphs",
        tags: ["Depth-First Search", "Graph", "Heap", "Shortest Path"],
        description: "You are given a network of n nodes labeled from 1 to n and a list of travel times as directed edges. Return the minimum time for all nodes to receive the signal starting from node k.",
        examples: [
            { input: "times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2", output: "2", explanation: "From node 2, we can reach nodes 1, 3, and 4. The minimum time is 2." },
            { input: "times = [[1,2,1]], n = 2, k = 1", output: "1" }
        ],
        constraints: ["1 <= k <= n <= 100", "1 <= times.length <= 6000", "times[i].length == 3", "1 <= ui, vi <= n", "ui != vi", "0 <= wi <= 100", "All the pairs (ui, vi) are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "networkDelayTime",
        funcArgs: "times, n, k",
        starterCode: "function networkDelayTime(times, n, k) {\n  \n}",
    },
    {
        id: 96,
        title: "Swim In Rising Water",
        titleSlug: "0778-swim-in-rising-water",
        difficulty: 'Hard',
        category: "Advanced Graphs",
        tags: ["Array", "Binary Search", "Depth-First Search", "Breadth-First Search", "Union Find", "Heap", "Matrix"],
        description: "You are given an n x n integer matrix grid where each value grid[i][j] represents the elevation at that point. Return the minimum water level to reach the bottom-right square.",
        examples: [
            { input: "grid = [[0,2],[1,3]]", output: "3", explanation: "We can reach the bottom-right at time 3." },
            { input: "grid = [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]", output: "16" }
        ],
        constraints: ["n == grid.length", "n == grid[i].length", "1 <= n <= 50", "0 <= grid[i][j] < n^2", "All values of grid[i][j] are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "swimInRisingWater",
        funcArgs: "grid",
        starterCode: "function swimInRisingWater(grid) {\n  \n}",
    },
    {
        id: 97,
        title: "Alien Dictionary",
        titleSlug: "0269-alien-dictionary",
        difficulty: 'Hard',
        category: "Advanced Graphs",
        tags: ["Array", "String", "Depth-First Search", "Graph", "Topological Sort"],
        description: "There is a new alien language that uses English letters, but the order among letters is unknown. Given a list of words from the dictionary, return a string of the unique letters sorted in the alien order.",
        examples: [
            { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: "wertf" },
            { input: 'words = ["z","x"]', output: "zx" }
        ],
        constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100", "words[i] consists of only lowercase English letters.", "All strings in words are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "alienDictionary",
        funcArgs: "words",
        starterCode: "function alienDictionary(words) {\n  \n}",
    },
    {
        id: 98,
        title: "Cheapest Flights Within K Stops",
        titleSlug: "0787-cheapest-flights-within-k-stops",
        difficulty: 'Medium',
        category: "Advanced Graphs",
        tags: ["Dynamic Programming", "Depth-First Search", "Graph", "Heap", "Shortest Path"],
        description: "There are n cities connected by some number of flights. Given flights, source city, destination city, and max stops k, return the cheapest price from src to dst with at most k stops.",
        examples: [
            { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1", output: "200", explanation: "The cheapest price from 0 to 2 with at most 1 stop is 200 (0->1->2)." },
            { input: "n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0", output: "500" }
        ],
        constraints: ["1 <= n <= 100", "0 <= flights.length <= (n * (n - 1) / 2)", "flights[i].length == 3", "0 <= fromi, toi < n", "fromi != toi", "1 <= pricei <= 10^4", "There are no duplicate flights.", "0 <= src, dst, k < n", "src != dst"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "cheapestFlightsWithinKStops",
        funcArgs: "n, flights, src, dst, k",
        starterCode: "function cheapestFlightsWithinKStops(n, flights, src, dst, k) {\n  \n}",
    },
    {
        id: 99,
        title: "Climbing Stairs",
        titleSlug: "0070-climbing-stairs",
        difficulty: 'Easy',
        category: "1-D Dynamic Programming",
        tags: ["Math", "Dynamic Programming", "Memoization"],
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2", explanation: "1. 1 step + 1 step. 2. 2 steps." },
            { input: "n = 3", output: "3", explanation: "1. 1 + 1 + 1. 2. 1 + 2. 3. 2 + 1." }
        ],
        constraints: ["1 <= n <= 45"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "climbingStairs",
        funcArgs: "n",
        starterCode: "function climbingStairs(n) {\n  \n}",
    },
    {
        id: 100,
        title: "Min Cost Climbing Stairs",
        titleSlug: "0746-min-cost-climbing-stairs",
        difficulty: 'Easy',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given an integer array cost where cost[i] is the cost of ith step on a staircase. Once you pay the cost, you can either climb one or two steps. Return the minimum cost to reach the top.",
        examples: [
            { input: "cost = [10,15,20]", output: "15", explanation: "Pay 15 to climb step 1 and reach the top." },
            { input: "cost = [1,100,1,1,1,100,1,1,100,1]", output: "6" }
        ],
        constraints: ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "minCostClimbingStairs",
        funcArgs: "cost",
        starterCode: "function minCostClimbingStairs(cost) {\n  \n}",
    },
    {
        id: 101,
        title: "House Robber",
        titleSlug: "0198-house-robber",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Return the maximum amount you can rob tonight without alerting the police.",
        examples: [
            { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4." },
            { input: "nums = [2,7,9,3,1]", output: "12", explanation: "Rob house 1 (money = 2), house 3 (money = 9), and house 5 (money = 1). Total = 12." }
        ],
        constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "houseRobber",
        funcArgs: "nums",
        starterCode: "function houseRobber(nums) {\n  \n}",
    },
    {
        id: 102,
        title: "House Robber II",
        titleSlug: "0213-house-robber-ii",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are a professional robber planning to rob houses along a street. All houses are arranged in a circle. Return the maximum amount you can rob tonight without alerting the police.",
        examples: [
            { input: "nums = [2,3,2]", output: "3", explanation: "You cannot rob house 1 (money = 2) and house 3 (money = 2) since they are adjacent in a circle." },
            { input: "nums = [1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and house 3 (money = 3). Total = 4." }
        ],
        constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "houseRobberII",
        funcArgs: "nums",
        starterCode: "function houseRobberII(nums) {\n  \n}",
    },
    {
        id: 103,
        title: "Longest Palindromic Substring",
        titleSlug: "0005-longest-palindromic-substring",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given a string s, return the longest palindromic substring in s.",
        examples: [
            { input: 's = "babad"', output: "bab", explanation: "'aba' is also a valid answer." },
            { input: 's = "cbbd"', output: "bb" }
        ],
        constraints: ["1 <= s.length <= 1000", "s consist of only digits and English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "longestPalindromicSubstring",
        funcArgs: "s",
        starterCode: "function longestPalindromicSubstring(s) {\n  \n}",
    },
    {
        id: 104,
        title: "Palindromic Substrings",
        titleSlug: "0647-palindromic-substrings",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given a string s, return the number of palindromic substrings in it. A string is a palindrome when it reads the same backward as forward.",
        examples: [
            { input: 's = "abc"', output: "3", explanation: "The three palindromic substrings are 'a', 'b', 'c'." },
            { input: 's = "aaa"', output: "6", explanation: "The six palindromic substrings are 'a', 'a', 'a', 'aa', 'aa', 'aaa'." }
        ],
        constraints: ["1 <= s.length <= 1000", "s consists of only lowercase English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "palindromicSubstrings",
        funcArgs: "s",
        starterCode: "function palindromicSubstrings(s) {\n  \n}",
    },
    {
        id: 105,
        title: "Decode Ways",
        titleSlug: "0091-decode-ways",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "A message containing letters from A-Z can be encoded into numbers using a mapping: 'A' -> 1, 'B' -> 2, ..., 'Z' -> 26. Given a string s containing only digits, return the number of ways to decode it.",
        examples: [
            { input: 's = "12"', output: "2", explanation: "It could be decoded as 'AB' (1 2) or 'L' (12)." },
            { input: 's = "226"', output: "3", explanation: "'BZ' (2 26), 'VF' (22 6), or 'BBF' (2 2 6)." }
        ],
        constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zero(s)."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "decodeWays",
        funcArgs: "s",
        starterCode: "function decodeWays(s) {\n  \n}",
    },
    {
        id: 106,
        title: "Coin Change",
        titleSlug: "0322-coin-change",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming", "Breadth-First Search"],
        description: "You are given an integer array coins representing coins of different denominations and an integer amount. Return the fewest number of coins needed to make up that amount. If that amount cannot be made, return -1.",
        examples: [
            { input: "coins = [1,5,10,25], amount = 30", output: "2", explanation: "15 + 15 or other combinations." },
            { input: "coins = [2], amount = 3", output: "-1", explanation: "Amount 3 cannot be made with coin of denomination 2." }
        ],
        constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "coinChange",
        funcArgs: "coins, amount",
        starterCode: "function coinChange(coins, amount) {\n  \n}",
    },
    {
        id: 107,
        title: "Maximum Product Subarray",
        titleSlug: "0152-maximum-product-subarray",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "Given an integer array nums, find a subarray that has the largest product, and return the product.",
        examples: [
            { input: "nums = [2,3,-2,4]", output: "6", explanation: "[2,3] has the largest product 6." },
            { input: "nums = [-2,0,-1]", output: "0", explanation: "The result cannot be a subarray product." }
        ],
        constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10", "The product of any subarray of nums is guaranteed to fit in a 32-bit integer."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "maximumProductSubarray",
        funcArgs: "nums",
        starterCode: "function maximumProductSubarray(nums) {\n  \n}",
    },
    {
        id: 108,
        title: "Word Break",
        titleSlug: "0139-word-break",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Hash Table", "String", "Dynamic Programming", "Trie"],
        description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
        examples: [
            { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: "Return true because 'leetcode' can be segmented as 'leet code'." },
            { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true", explanation: "Return true because 'applepenapple' can be segmented as 'apple pen apple'." }
        ],
        constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20", "s and wordDict[i] consist of only lowercase English letters.", "All the strings of wordDict are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "wordBreak",
        funcArgs: "s, wordDict",
        starterCode: "function wordBreak(s, wordDict) {\n  \n}",
    },
    {
        id: 109,
        title: "Longest Increasing Subsequence",
        titleSlug: "0300-longest-increasing-subsequence",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Binary Search", "Dynamic Programming"],
        description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
        examples: [
            { input: "nums = [10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101]." },
            { input: "nums = [0,1,0,3,2,3]", output: "4" }
        ],
        constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "longestIncreasingSubsequence",
        funcArgs: "nums",
        starterCode: "function longestIncreasingSubsequence(nums) {\n  \n}",
    },
    {
        id: 110,
        title: "Partition Equal Subset Sum",
        titleSlug: "0416-partition-equal-subset-sum",
        difficulty: 'Medium',
        category: "1-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal.",
        examples: [
            { input: "nums = [1,5,11,5]", output: "true", explanation: "The array can be partitioned as [1, 5, 5] and [11]." },
            { input: "nums = [1,2,3,5]", output: "false", explanation: "The array cannot be partitioned into two equal sum subsets." }
        ],
        constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "partitionEqualSubsetSum",
        funcArgs: "nums",
        starterCode: "function partitionEqualSubsetSum(nums) {\n  \n}",
    },
    {
        id: 111,
        title: "Unique Paths",
        titleSlug: "0062-unique-paths",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["Math", "Dynamic Programming", "Combinatorics"],
        description: "There is a robot on an m x n grid. The robot is initially at the top-left corner and tries to move to the bottom-right corner. The robot can only move down or right. How many possible unique paths are there?",
        examples: [
            { input: "m = 3, n = 7", output: "28" },
            { input: "m = 3, n = 2", output: "3", explanation: "From the top-left corner, there are 3 paths to the bottom-right corner: right, right, down, down, right." }
        ],
        constraints: ["1 <= m, n <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "uniquePaths",
        funcArgs: "m, n",
        starterCode: "function uniquePaths(m, n) {\n  \n}",
    },
    {
        id: 112,
        title: "Longest Common Subsequence",
        titleSlug: "1143-longest-common-subsequence",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
        examples: [
            { input: 'text1 = "abcde", text2 = "ace"', output: "3", explanation: "The longest common subsequence is 'ace' with length 3." },
            { input: 'text1 = "abc", text2 = "def"', output: "0", explanation: "There is no common subsequence." }
        ],
        constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "longestCommonSubsequence",
        funcArgs: "text1, text2",
        starterCode: "function longestCommonSubsequence(text1, text2) {\n  \n}",
    },
    {
        id: 113,
        title: "Best Time to Buy And Sell Stock With Cooldown",
        titleSlug: "0309-best-time-to-buy-and-sell-stock-with-cooldown",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given an array prices where prices[i] is the price on the ith day. After you sell your stock, you cannot buy stock on the next day. Find the maximum profit.",
        examples: [
            { input: "prices = [1,2,3,0,2]", output: "3", explanation: "Buy on day 1 (price = 2), sell on day 3 (price = 3), cooldown on day 4, buy on day 5 (price = 2), sell on day 5 (price = 2). Total profit = 3." },
            { input: "prices = [1]", output: "0" }
        ],
        constraints: ["1 <= prices.length <= 5000", "0 <= prices[i] <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "bestTimeToBuyAndSellStockWithCooldown",
        funcArgs: "prices",
        starterCode: "function bestTimeToBuyAndSellStockWithCooldown(prices) {\n  \n}",
    },
    {
        id: 114,
        title: "Coin Change II",
        titleSlug: "0518-coin-change-ii",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given an integer array coins and an integer amount. Return the number of combinations that make up that amount. If that amount cannot be made, return 0.",
        examples: [
            { input: "amount = 5, coins = [1,2,5]", output: "4", explanation: "There are 4 ways: 5=5, 5=2+2+1, 5=2+1+1+1, 5=1+1+1+1+1." },
            { input: "amount = 3, coins = [2]", output: "0", explanation: "The amount of 3 cannot be made using just coin of denomination 2." }
        ],
        constraints: ["1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "All the values of coins are unique.", "0 <= amount <= 5000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "coinChangeII",
        funcArgs: "amount, coins",
        starterCode: "function coinChangeII(amount, coins) {\n  \n}",
    },
    {
        id: 115,
        title: "Target Sum",
        titleSlug: "0494-target-sum",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming", "Backtracking"],
        description: "You are given an integer array nums and an integer target. You want to build an expression by adding '+' or '-' before each integer. Return the number of different expressions that evaluate to target.",
        examples: [
            { input: "nums = [1,1,1,1,1], target = 3", output: "5", explanation: "There are 5 ways to assign '+'/'-' to get sum 3." },
            { input: "nums = [1], target = 1", output: "1" }
        ],
        constraints: ["1 <= nums.length <= 20", "0 <= nums[i] <= 1000", "0 <= sum(nums[i]) <= 1000", "-1000 <= target <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "targetSum",
        funcArgs: "nums, target",
        starterCode: "function targetSum(nums, target) {\n  \n}",
    },
    {
        id: 116,
        title: "Interleaving String",
        titleSlug: "0097-interleaving-string",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given strings s1, s2, and s3, determine whether s3 is formed by an interleaving of s1 and s2.",
        examples: [
            { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"', output: "true" },
            { input: 's1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"', output: "false" }
        ],
        constraints: ["0 <= s1.length, s2.length <= 100", "0 <= s3.length <= 200", "s1, s2, and s3 consist of lowercase English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "interleavingString",
        funcArgs: "s1, s2, s3",
        starterCode: "function interleavingString(s1, s2, s3) {\n  \n}",
    },
    {
        id: 117,
        title: "Longest Increasing Path In a Matrix",
        titleSlug: "0329-longest-increasing-path-in-a-matrix",
        difficulty: 'Hard',
        category: "2-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming", "Depth-First Search", "Graph", "Memoization", "Matrix"],
        description: "Given an m x n integers matrix, return the length of the longest increasing path in matrix. From each cell, you can move in four directions.",
        examples: [
            { input: "matrix = [[9,9,4],[6,6,8],[2,1,1]]", output: "4", explanation: "The longest increasing path is [1,2,6,9]." },
            { input: "matrix = [[3,4,5],[3,2,6],[2,2,1]]", output: "4", explanation: "The longest increasing path is [3,4,5,6]." }
        ],
        constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 200", "0 <= matrix[i][j] <= 2^31 - 1"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "longestIncreasingPathInAMatrix",
        funcArgs: "matrix",
        starterCode: "function longestIncreasingPathInAMatrix(matrix) {\n  \n}",
    },
    {
        id: 118,
        title: "Distinct Subsequences",
        titleSlug: "0115-distinct-subsequences",
        difficulty: 'Hard',
        category: "2-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given two strings s and t, return the number of distinct subsequences of s which equal t.",
        examples: [
            { input: 's = "rabbbit", t = "rabbit"', output: "3", explanation: "There are 3 ways to get 'rabbit': rabbbit -> rabbit." },
            { input: 's = "babgbag", t = "bag"', output: "5" }
        ],
        constraints: ["1 <= s.length, t.length <= 1000", "s and t consist of English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "distinctSubsequences",
        funcArgs: "s, t",
        starterCode: "function distinctSubsequences(s, t) {\n  \n}",
    },
    {
        id: 119,
        title: "Edit Distance",
        titleSlug: "0072-edit-distance",
        difficulty: 'Medium',
        category: "2-D Dynamic Programming",
        tags: ["String", "Dynamic Programming"],
        description: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You can insert, delete, or replace a character.",
        examples: [
            { input: 'word1 = "horse", word2 = "ros"', output: "3", explanation: "horse -> rorse (replace h with r), rorse -> rose (remove r), rose -> ros (remove e)." },
            { input: 'word1 = "intention", word2 = "execution"', output: "5" }
        ],
        constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "editDistance",
        funcArgs: "word1, word2",
        starterCode: "function editDistance(word1, word2) {\n  \n}",
    },
    {
        id: 120,
        title: "Burst Balloons",
        titleSlug: "0312-burst-balloons",
        difficulty: 'Hard',
        category: "2-D Dynamic Programming",
        tags: ["Array", "Dynamic Programming"],
        description: "You are given n balloons, indexed from 0 to n - 1. Each balloon is painted with a number on it. Return the maximum coins you can collect by bursting the balloons strategically.",
        examples: [
            { input: "nums = [3,1,5,8]", output: "167", explanation: "Burst balloons in order: [1,5,8] then [3,5,8] then [5,8] then [8]." },
            { input: "nums = [1,5]", output: "10" }
        ],
        constraints: ["1 <= balloons.length <= 300", "0 <= balloons[i] <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "burstBalloons",
        funcArgs: "nums",
        starterCode: "function burstBalloons(nums) {\n  \n}",
    },
    {
        id: 121,
        title: "Regular Expression Matching",
        titleSlug: "0010-regular-expression-matching",
        difficulty: 'Hard',
        category: "2-D Dynamic Programming",
        tags: ["String", "Dynamic Programming", "Recursion"],
        description: "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*'.",
        examples: [
            { input: 's = "aa", p = "a"', output: "false", explanation: "'a' does not match the entire string 'aa'." },
            { input: 's = "aa", p = "a*"', output: "true", explanation: "'*' means zero or more of the preceding element 'a'." }
        ],
        constraints: ["1 <= s.length <= 20", "1 <= p.length <= 30", "s contains only lowercase English letters.", "p contains only lowercase English letters, '.', and '*'.", "It is guaranteed that for each '*' there will be a previous character in p."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "regularExpressionMatching",
        funcArgs: "s, p",
        starterCode: "function regularExpressionMatching(s, p) {\n  \n}",
    },
    {
        id: 122,
        title: "Maximum Subarray",
        titleSlug: "0053-maximum-subarray",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "The subarray [4,-1,2,1] has the largest sum 6." },
            { input: "nums = [1]", output: "1" }
        ],
        constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "maximumSubarray",
        funcArgs: "nums",
        starterCode: "function maximumSubarray(nums) {\n  \n}",
    },
    {
        id: 123,
        title: "Jump Game",
        titleSlug: "0055-jump-game",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Dynamic Programming", "Greedy"],
        description: "You are given an integer array nums. You are initially positioned at the first index. Each element represents your maximum jump length. Return true if you can reach the last index.",
        examples: [
            { input: "nums = [2,3,1,1,4]", output: "true", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
            { input: "nums = [3,2,1,0,4]", output: "false", explanation: "You will always arrive at index 3 with value 0, which makes it impossible to reach the last index." }
        ],
        constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "jumpGame",
        funcArgs: "nums",
        starterCode: "function jumpGame(nums) {\n  \n}",
    },
    {
        id: 124,
        title: "Jump Game II",
        titleSlug: "0045-jump-game-ii",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Dynamic Programming", "Greedy"],
        description: "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Return the minimum number of jumps to reach nums[n - 1].",
        examples: [
            { input: "nums = [2,3,1,1,4]", output: "2", explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index." },
            { input: "nums = [2,3,0,1,4]", output: "2" }
        ],
        constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 1000", "It's guaranteed that you can reach nums[n - 1]."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "jumpGameII",
        funcArgs: "nums",
        starterCode: "function jumpGameII(nums) {\n  \n}",
    },
    {
        id: 125,
        title: "Gas Station",
        titleSlug: "0134-gas-station",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Greedy"],
        description: "There are n gas stations along a circular route. You are given two integer arrays gas and cost. Return the starting gas station's index if you can travel around the circuit once.",
        examples: [
            { input: "gas = [1,2,3,4,5], cost = [3,4,5,1,2]", output: "3", explanation: "Start at station 3 (index 3). Tank goes to 4-1=3, then 3-2=1, then 1-3=0, then 0-4=0... wait. Actually: start at 3: +4-1=3, +5-2=3, +1-3=1, +2-4=2, +3-5=0. It works." },
            { input: "gas = [2,3,4], cost = [3,4,3]", output: "-1", explanation: "No starting station can complete the circuit." }
        ],
        constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "gasStation",
        funcArgs: "gas, cost",
        starterCode: "function gasStation(gas, cost) {\n  \n}",
    },
    {
        id: 126,
        title: "Hand of Straights",
        titleSlug: "0846-hand-of-straights",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Hash Table", "Greedy", "Sorting"],
        description: "Alice has a hand of cards given as an array of integers hand where hand[i] is the value. She wants to rearrange the cards into groups of groupSize consecutive cards. Return true if she can.",
        examples: [
            { input: "hand = [1,2,3,6,2,3,4,7,8], groupSize = 3", output: "true", explanation: "Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]." },
            { input: "hand = [1,2,3,4,5], groupSize = 4", output: "false", explanation: "Alice's hand cannot be rearranged into groups of 4." }
        ],
        constraints: ["1 <= hand.length <= 10^4", "0 <= hand[i] <= 10^9", "1 <= groupSize <= hand.length"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "handOfStraights",
        funcArgs: "hand, groupSize",
        starterCode: "function handOfStraights(hand, groupSize) {\n  \n}",
    },
    {
        id: 127,
        title: "Merge Triplets to Form Target Triplet",
        titleSlug: "1899-merge-triplets-to-form-target-triplet",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["Array", "Greedy"],
        description: "A triplet is an array of three integers. You are given a 2D array of triplets and a target triplet. Return true if you can obtain the target from the given triplets.",
        examples: [
            { input: "triplets = [[2,5,3],[1,8,4],[1,7,5]], target = [2,7,5]", output: "true", explanation: "Take the first two triplets and merge them to get [2,7,5]." },
            { input: "triplets = [[3,4,5],[4,5,6]], target = [3,2,5]", output: "false", explanation: "It is impossible to form the target triplet." }
        ],
        constraints: ["1 <= triplets.length <= 10^5", "triplets[i].length == 3", "1 <= ai, bi, ci <= 1000", "target.length == 3"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "mergeTripletsToFormTargetTriplet",
        funcArgs: "triplets, target",
        starterCode: "function mergeTripletsToFormTargetTriplet(triplets, target) {\n  \n}",
    },
    {
        id: 128,
        title: "Partition Labels",
        titleSlug: "0763-partition-labels",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["String", "Hash Table", "Two Pointers", "Greedy"],
        description: "You are given a string s. Partition the string into as many parts as possible so that each letter appears in at most one part. Return a list of integers representing the size of these parts.",
        examples: [
            { input: 's = "ababcbacadefegdehijhklij"', output: "[9,7,8]", explanation: "The partition is 'ababcbaca', 'defegde', 'hijhklij'." },
            { input: 's = "eccbbbbdec"', output: "[10]" }
        ],
        constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters only."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "partitionLabels",
        funcArgs: "s",
        starterCode: "function partitionLabels(s) {\n  \n}",
    },
    {
        id: 129,
        title: "Valid Parenthesis String",
        titleSlug: "0678-valid-parenthesis-string",
        difficulty: 'Medium',
        category: "Greedy",
        tags: ["String", "Dynamic Programming", "Stack", "Greedy"],
        description: "Given a string s containing only three types of characters: '(', ')', and '*', return true if s is valid.",
        examples: [
            { input: 's = "()"', output: "true" },
            { input: 's = "(*)"', output: "true" },
            { input: 's = "(*))"', output: "true" }
        ],
        constraints: ["1 <= s.length <= 100", "s[i] is '(', ')' or '*'."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "validParenthesisString",
        funcArgs: "s",
        starterCode: "function validParenthesisString(s) {\n  \n}",
    },
    {
        id: 130,
        title: "Insert Interval",
        titleSlug: "0057-insert-interval",
        difficulty: 'Medium',
        category: "Intervals",
        tags: ["Array"],
        description: "You are given an array of non-overlapping intervals sorted by start and a new interval. Insert the new interval into intervals and merge if necessary.",
        examples: [
            { input: "intervals = [[1,3],[6,9]], newInterval = [2,5]", output: "[[1,5],[6,9]]" },
            { input: "intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]", output: "[[1,2],[3,10],[12,16]]" }
        ],
        constraints: ["0 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^5", "intervals is sorted by starti in ascending order.", "newInterval.length == 2", "0 <= start <= end <= 10^5"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "insertInterval",
        funcArgs: "intervals, newInterval",
        starterCode: "function insertInterval(intervals, newInterval) {\n  \n}",
    },
    {
        id: 131,
        title: "Merge Intervals",
        titleSlug: "0056-merge-intervals",
        difficulty: 'Medium',
        category: "Intervals",
        tags: ["Array", "Sorting"],
        description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals and return an array of the non-overlapping intervals.",
        examples: [
            { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, so merge them into [1,6]." },
            { input: "intervals = [[1,4],[4,5]]", output: "[[1,5]]" }
        ],
        constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti <= endi <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "mergeIntervals",
        funcArgs: "intervals",
        starterCode: "function mergeIntervals(intervals) {\n  \n}",
    },
    {
        id: 132,
        title: "Non Overlapping Intervals",
        titleSlug: "0435-non-overlapping-intervals",
        difficulty: 'Medium',
        category: "Intervals",
        tags: ["Array", "Dynamic Programming", "Greedy", "Sorting"],
        description: "Given an array of intervals where intervals[i] = [starti, endi], return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.",
        examples: [
            { input: "intervals = [[1,2],[2,3],[3,4],[1,3]]", output: "1", explanation: "Remove [1,3] to make the rest non-overlapping." },
            { input: "intervals = [[1,2],[1,2],[1,2]]", output: "2", explanation: "You need to remove two intervals to make the rest non-overlapping." }
        ],
        constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "-2 * 10^4 <= starti < endi <= 2 * 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "nonOverlappingIntervals",
        funcArgs: "intervals",
        starterCode: "function nonOverlappingIntervals(intervals) {\n  \n}",
    },
    {
        id: 133,
        title: "Meeting Rooms",
        titleSlug: "0252-meeting-rooms",
        difficulty: 'Easy',
        category: "Intervals",
        tags: ["Array", "Sorting"],
        description: "Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.",
        examples: [
            { input: "intervals = [[0,30],[5,10],[15,20]]", output: "false", explanation: "Person cannot attend [0,30] and [5,10] at the same time." },
            { input: "intervals = [[7,10],[2,4]]", output: "true" }
        ],
        constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= starti < endi <= 10^6"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "meetingRooms",
        funcArgs: "intervals",
        starterCode: "function meetingRooms(intervals) {\n  \n}",
    },
    {
        id: 134,
        title: "Meeting Rooms II",
        titleSlug: "0253-meeting-rooms-ii",
        difficulty: 'Medium',
        category: "Intervals",
        tags: ["Array", "Two Pointers", "Greedy", "Sorting", "Heap"],
        description: "Given an array of meeting time intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.",
        examples: [
            { input: "intervals = [[0,30],[5,10],[15,20]]", output: "2" },
            { input: "intervals = [[7,10],[2,4]]", output: "1" }
        ],
        constraints: ["1 <= intervals.length <= 10^4", "0 <= starti < endi <= 10^6"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "meetingRoomsII",
        funcArgs: "intervals",
        starterCode: "function meetingRoomsII(intervals) {\n  \n}",
    },
    {
        id: 135,
        title: "Minimum Interval to Include Each Query",
        titleSlug: "1851-minimum-interval-to-include-each-query",
        difficulty: 'Hard',
        category: "Intervals",
        tags: ["Array", "Binary Search", "Sorting", "Heap"],
        description: "You are given a 2D integer array intervals and a 1D integer array queries. For each query, find the minimum length of an interval that covers that query value.",
        examples: [
            { input: "intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]", output: "[2,4,3,4]" },
            { input: "intervals = [[0,5],[1,2]], queries = [5]", output: "[5]" }
        ],
        constraints: ["1 <= intervals.length <= 10^5", "1 <= queries.length <= 10^5", "intervals[i].length == 2", "1 <= li <= ri <= 10^9", "1 <= qi <= 10^9", "All the intervals and queries are distinct."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "minimumIntervalToIncludeEachQuery",
        funcArgs: "intervals, queries",
        starterCode: "function minimumIntervalToIncludeEachQuery(intervals, queries) {\n  \n}",
    },
    {
        id: 136,
        title: "Rotate Image",
        titleSlug: "0048-rotate-image",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Array", "Math", "Matrix"],
        description: "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise). You must rotate the image in-place.",
        examples: [
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[[7,4,1],[8,5,2],[9,6,3]]" },
            { input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]", output: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]" }
        ],
        constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20", "-1000 <= matrix[i][j] <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "rotateImage",
        funcArgs: "matrix",
        starterCode: "function rotateImage(matrix) {\n  \n}",
    },
    {
        id: 137,
        title: "Spiral Matrix",
        titleSlug: "0054-spiral-matrix",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Array", "Matrix", "Simulation"],
        description: "Given an m x n matrix, return all elements of the matrix in spiral order.",
        examples: [
            { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1,2,3,6,9,8,7,4,5]" },
            { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1,2,3,4,8,12,11,10,9,5,6,7]" }
        ],
        constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "spiralMatrix",
        funcArgs: "matrix",
        starterCode: "function spiralMatrix(matrix) {\n  \n}",
    },
    {
        id: 138,
        title: "Set Matrix Zeroes",
        titleSlug: "0073-set-matrix-zeroes",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Array", "Hash Table", "Matrix"],
        description: "Given an m x n integer matrix, if an element is 0, set its entire row and column to 0's in-place.",
        examples: [
            { input: "matrix = [[1,1,1],[1,0,1],[1,1,1]]", output: "[[1,0,1],[0,0,0],[1,0,1]]" },
            { input: "matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]", output: "[[0,0,0,0],[0,4,5,0],[0,3,1,0]]" }
        ],
        constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "setMatrixZeroes",
        funcArgs: "matrix",
        starterCode: "function setMatrixZeroes(matrix) {\n  \n}",
    },
    {
        id: 139,
        title: "Happy Number",
        titleSlug: "0202-happy-number",
        difficulty: 'Easy',
        category: "Math & Geometry",
        tags: ["Hash Table", "Math", "Two Pointers"],
        description: "Write an algorithm to determine if a number n is happy. A happy number is defined by repeatedly replacing it by the sum of squares of its digits until it equals 1 or loops endlessly.",
        examples: [
            { input: "n = 19", output: "true", explanation: "1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1." },
            { input: "n = 2", output: "false" }
        ],
        constraints: ["1 <= n <= 2^31 - 1"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "happyNumber",
        funcArgs: "n",
        starterCode: "function happyNumber(n) {\n  \n}",
    },
    {
        id: 140,
        title: "Plus One",
        titleSlug: "0066-plus-one",
        difficulty: 'Easy',
        category: "Math & Geometry",
        tags: ["Array", "Math"],
        description: "You are given a large integer represented as an integer array digits. Increment the large integer by one and return the resulting array.",
        examples: [
            { input: "digits = [1,2,3]", output: "[1,2,4]", explanation: "The array represents the integer 123. Incrementing gives 124." },
            { input: "digits = [4,3,2,1]", output: "[4,3,2,2]" }
        ],
        constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9", "digits does not contain any leading 0's."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "plusOne",
        funcArgs: "digits",
        starterCode: "function plusOne(digits) {\n  \n}",
    },
    {
        id: 141,
        title: "Pow(x, n)",
        titleSlug: "0050-powx-n",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Math", "Recursion"],
        description: "Implement pow(x, n), which calculates x raised to the power n.",
        examples: [
            { input: "x = 2.00000, n = 10", output: "1024.00000", explanation: "2^10 = 1024." },
            { input: "x = 2.10000, n = 3", output: "9.26100", explanation: "2.1^3 = 9.261." }
        ],
        constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31 - 1", "-10^4 <= x^n <= 10^4"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "myPow",
        funcArgs: "x, n",
        starterCode: "function myPow(x, n) {\n  \n}",
    },
    {
        id: 142,
        title: "Multiply Strings",
        titleSlug: "0043-multiply-strings",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Math", "String", "Simulation"],
        description: "Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2, also represented as a string.",
        examples: [
            { input: 'num1 = "2", num2 = "3"', output: "6" },
            { input: 'num1 = "123", num2 = "456"', output: "56088" }
        ],
        constraints: ["1 <= num1.length, num2.length <= 200", "num1 and num2 consist of digits only.", "Both num1 and num2 do not contain any leading zero, except the number 0 itself."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "multiplyStrings",
        funcArgs: "num1, num2",
        starterCode: "function multiplyStrings(num1, num2) {\n  \n}",
    },
    {
        id: 143,
        title: "Detect Squares",
        titleSlug: "2013-detect-squares",
        difficulty: 'Medium',
        category: "Math & Geometry",
        tags: ["Array", "Hash Table", "Math", "Design", "Counting"],
        description: "You are given a stream of points on the X-Y plane. Design an algorithm that supports adding new points and counting the number of axis-aligned squares that can be formed with a query point.",
        examples: [
            { input: '["DetectSquare","add","add","add","count","count","add","count"]\n[[],[[3,10]],[11,2]],[3,2]],[11,10]],[14,8]],[11,2]],[11,10]]', output: "[null,null,null,null,1,0,null,2]" }
        ],
        constraints: ["1 <= x, y <= 1000", "At most 3000 calls in total will be made to add and count."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "detectSquares",
        funcArgs: "",
        starterCode: "function detectSquares() {\n  \n}",
    },
    {
        id: 144,
        title: "Single Number",
        titleSlug: "0136-single-number",
        difficulty: 'Easy',
        category: "Bit Manipulation",
        tags: ["Array", "Bit Manipulation"],
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one. Implement a solution with linear runtime and constant extra space.",
        examples: [
            { input: "nums = [2,2,1]", output: "1" },
            { input: "nums = [4,1,2,1,2]", output: "4" }
        ],
        constraints: ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4", "Each element in the array appears twice except for one element which appears only once."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "singleNumber",
        funcArgs: "nums",
        starterCode: "function singleNumber(nums) {\n  \n}",
    },
    {
        id: 145,
        title: "Number of 1 Bits",
        titleSlug: "0191-number-of-1-bits",
        difficulty: 'Easy',
        category: "Bit Manipulation",
        tags: ["Divide and Conquer", "Bit Manipulation"],
        description: "Write a function that takes an unsigned integer and returns the number of '1' bits it has (also known as the Hamming weight).",
        examples: [
            { input: "n = 11 (binary 00000000000000000000000000001011)", output: "3" },
            { input: "n = 128 (binary 00000000000000000000000010000000)", output: "1" }
        ],
        constraints: ["The input must be a binary string of length 32."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "numberOf1Bits",
        funcArgs: "n",
        starterCode: "function numberOf1Bits(n) {\n  \n}",
    },
    {
        id: 146,
        title: "Counting Bits",
        titleSlug: "0338-counting-bits",
        difficulty: 'Easy',
        category: "Bit Manipulation",
        tags: ["Dynamic Programming", "Bit Manipulation"],
        description: "Given an integer n, return an array ans of length n + 1 such that for each i, ans[i] is the number of 1's in the binary representation of i.",
        examples: [
            { input: "n = 2", output: "[0,1,1]", explanation: "0 -> 0 (0 ones), 1 -> 1 (1 one), 2 -> 10 (1 one)." },
            { input: "n = 5", output: "[0,1,1,2,1,2]" }
        ],
        constraints: ["0 <= n <= 10^5"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "countingBits",
        funcArgs: "n",
        starterCode: "function countingBits(n) {\n  \n}",
    },
    {
        id: 147,
        title: "Reverse Bits",
        titleSlug: "0190-reverse-bits",
        difficulty: 'Easy',
        category: "Bit Manipulation",
        tags: ["Divide and Conquer", "Bit Manipulation"],
        description: "Reverse bits of a given 32 bits unsigned integer. Return the reversed bits as an unsigned integer.",
        examples: [
            { input: "n = 43261596 (binary 00000010100101000001111010011100)", output: "964176192 (binary 00111001011110000010100101000000)" },
            { input: "n = 4294967293 (binary 11111111111111111111111111111101)", output: "3221225471 (binary 10111111111111111111111111111111)" }
        ],
        constraints: ["The input must be a binary string of length 32."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "reverseBits",
        funcArgs: "n",
        starterCode: "function reverseBits(n) {\n  \n}",
    },
    {
        id: 148,
        title: "Missing Number",
        titleSlug: "0268-missing-number",
        difficulty: 'Easy',
        category: "Bit Manipulation",
        tags: ["Array", "Hash Table", "Math", "Binary Search", "Bit Manipulation", "Sorting"],
        description: "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.",
        examples: [
            { input: "nums = [3,0,1]", output: "2", explanation: "n = 3, numbers in range [0,3] are 0,1,2,3. 2 is missing." },
            { input: "nums = [0,1]", output: "2" }
        ],
        constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n", "All the numbers in nums are unique."],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "missingNumber",
        funcArgs: "nums",
        starterCode: "function missingNumber(nums) {\n  \n}",
    },
    {
        id: 149,
        title: "Sum of Two Integers",
        titleSlug: "0371-sum-of-two-integers",
        difficulty: 'Medium',
        category: "Bit Manipulation",
        tags: ["Math", "Bit Manipulation"],
        description: "Given two integers a and b, return the sum of the two integers without using the operators + and -.",
        examples: [
            { input: "a = 1, b = 2", output: "3" },
            { input: "a = 2, b = 3", output: "5" }
        ],
        constraints: ["-1000 <= a, b <= 1000"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "sumOfTwoIntegers",
        funcArgs: "a, b",
        starterCode: "function sumOfTwoIntegers(a, b) {\n  \n}",
    },
    {
        id: 150,
        title: "Reverse Integer",
        titleSlug: "0007-reverse-integer",
        difficulty: 'Medium',
        category: "Bit Manipulation",
        tags: ["Math"],
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes overflow, return 0.",
        examples: [
            { input: "x = 123", output: "321" },
            { input: "x = -123", output: "-321" },
            { input: "x = 120", output: "21" }
        ],
        constraints: ["-2^31 <= x <= 2^31 - 1"],
        testCases: [
            { input: {}, output: null },
        ],
        funcName: "reverseInteger",
        funcArgs: "x",
        starterCode: "function reverseInteger(x) {\n  \n}",
    }
];
