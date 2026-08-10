import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { SignUp, SignIn, useUser, useClerk } from '@clerk/react';
import { problems } from './problems';
import { getComplexity } from './complexity';
const PROFILE_KEY = (id) => `dsa-profile-${id}`;
const SOLVED_KEY = (id) => `dsa-solved-${id}`;
const LB_KEY = 'dsa-leaderboard';
const CELEB_KEY = (id) => `dsa-celebrated-${id}`;
const LinkedInIcon = ({ size = 20 }) => (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" }) }));
const WhatsAppIcon = ({ size = 20 }) => (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" }) }));
const InstagramIcon = ({ size = 20 }) => (_jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: _jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" }) }));
const CopyIcon = ({ size = 20 }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }), _jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })] }));
const LinkIcon = ({ size = 20 }) => (_jsxs("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: [_jsx("path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" }), _jsx("path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" })] }));
const clerkAppearance = {
    variables: {
        colorBackground: '#1a1a2e', colorSurface: '#252536', colorTextPrimary: '#f0f0f0',
        colorTextSecondary: '#b0b0b0', colorBorder: '#3a3a5c', colorPrimary: '#6366f1',
        colorInputBackground: '#12121f', colorInputText: '#f0f0f0',
        colorInputBorder: '#3a3a5c', colorPlaceholder: '#777',
    },
    elements: {
        rootBox: { width: '100%' },
        card: { padding: '0', boxShadow: 'none', background: 'transparent', border: 'none' },
        header: { marginBottom: '20px' },
        headerTitle: { color: '#f0f0f0', fontSize: '20px', fontWeight: '700', marginBottom: '4px' },
        headerSubtitle: { color: '#888', fontSize: '13px' },
        formButtonPrimary: {
            backgroundColor: '#6366f1', color: '#fff', border: 'none', fontSize: '13px', fontWeight: '600',
            borderRadius: '8px', padding: '9px 18px', minHeight: '36px', width: '25%', margin: '8px auto 0',
            display: 'block', textAlign: 'center', cursor: 'pointer',
            '&:hover': { backgroundColor: '#5558e6', transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' },
            '&:active': { transform: 'translateY(0)' },
        },
        formFieldInput: {
            backgroundColor: '#12121f', border: '1px solid #3a3a5c', color: '#f0f0f0',
            borderRadius: '8px', fontSize: '13px', padding: '10px 14px', minHeight: '40px',
            width: '80%', margin: '0 auto', display: 'block',
            '&:focus': { borderColor: '#6366f1', boxShadow: '0 0 0 3px rgba(99,102,241,0.15)', outline: 'none' },
        },
        formFieldLabel: { color: '#b0b0b0', fontSize: '13px', fontWeight: '500', marginBottom: '6px' },
        formField: { marginBottom: '16px' },
        socialButtonsRoot: { display: 'flex', flexDirection: 'column', gap: '10px', width: '80%', margin: '0 auto' },
        socialButtons: { display: 'flex', flexDirection: 'column', gap: '10px', width: '80%', margin: '0 auto' },
        socialButtonsBlockButton: {
            border: '1px solid #3a3a5c', borderRadius: '8px', color: '#e0e0e0',
            backgroundColor: '#252536', fontSize: '13px', fontWeight: '500',
            padding: '10px 16px', minHeight: '40px', textTransform: 'none',
            flex: '1', minWidth: '0', boxSizing: 'border-box', overflow: 'hidden',
            justifyContent: 'center', cursor: 'pointer',
            '&:hover': { backgroundColor: '#2e2e44' },
        },
        socialButtonsProviderIcon: { width: '18px', height: '18px' },
        socialButtonsBlockButtonText: { margin: '0', whiteSpace: 'nowrap' },
        lastAuthenticationStrategyBadge: { display: 'none' },
        dividerLine: { backgroundColor: '#3a3a5c', margin: '20px 0' },
        dividerText: { color: '#888', fontSize: '12px', padding: '0 12px' },
        formFieldInputShowPasswordButton: { color: '#888' },
        footerActionLink: {
            color: '#6366f1', fontSize: '13px', fontWeight: '500', padding: '8px 12px', borderRadius: '6px',
            '&:hover': { color: '#818cf8', backgroundColor: 'rgba(99,102,241,0.1)' },
        },
        footerActionText: { color: '#888', fontSize: '13px' },
        footer: { marginTop: '16px' },
        formFieldError: { color: '#ef4444', fontSize: '12px', marginTop: '4px' },
        alertBox: { fontSize: '13px', padding: '10px 14px', borderRadius: '8px' },
    },
};
const getToday = () => new Date().toISOString().slice(0, 10);
const getYesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); };
const emptyProfile = () => ({ totalSolved: 0, currentStreak: 0, lastActiveDate: '', dailyHistory: [] });
const API = '/api';
const apiGet = async (path) => {
    try {
        const r = await fetch(`${API}${path}`);
        return await r.json();
    }
    catch {
        return { fallback: true };
    }
};
const apiPost = async (path, body) => {
    try {
        const r = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return await r.json();
    }
    catch {
        return { fallback: true };
    }
};
const apiPut = async (path, body) => {
    try {
        const r = await fetch(`${API}${path}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
        return await r.json();
    }
    catch {
        return { fallback: true };
    }
};
const loadProfile = async (id) => {
    const res = await apiGet(`/user/${id}`);
    if (res.fallback) {
        try {
            const s = localStorage.getItem(`dsa-profile-${id}`);
            if (!s)
                return emptyProfile();
            return JSON.parse(s);
        }
        catch {
            return emptyProfile();
        }
    }
    return res.user?.profile || emptyProfile();
};
const saveProfile = async (id, p) => {
    await apiPut(`/user/${id}`, { profile: p });
    localStorage.setItem(`dsa-profile-${id}`, JSON.stringify(p));
};
const loadSolved = async (id) => {
    const res = await apiGet(`/user/${id}/solved`);
    if (res.fallback) {
        try {
            const s = localStorage.getItem(`dsa-solved-${id}`);
            return s ? new Set(JSON.parse(s)) : new Set();
        }
        catch {
            return new Set();
        }
    }
    return new Set(res.solved || []);
};
const saveSolved = async (id, s) => {
    await apiPost(`/user/${id}/solved`, { problemId: -1 });
    localStorage.setItem(`dsa-solved-${id}`, JSON.stringify([...s]));
};
const categories = Array.from(new Set(problems.map(p => p.category)));
// ============================================================
// SYNTAX HIGHLIGHTING
// ============================================================
function highlightCode(code, language) {
    let escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    const keywords = {
        javascript: 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|try|catch|finally|throw|async|await|yield|typeof|instanceof|in|of|true|false|null|undefined|void|delete|static|super',
        python: 'def|return|if|elif|else|for|while|class|import|from|as|try|except|finally|raise|with|lambda|yield|pass|break|continue|True|False|None|and|or|not|is|in|del|global|nonlocal|assert|print',
        java: 'public|private|protected|static|final|class|interface|extends|implements|new|this|super|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|void|int|long|double|float|boolean|char|String|byte|short|Object|null|true|false|enum|abstract|synchronized|native|transient|volatile',
        cpp: 'int|long|double|float|bool|char|void|string|vector|map|set|pair|auto|const|static|return|if|else|for|while|do|switch|case|break|continue|class|struct|public|private|protected|new|delete|this|true|false|nullptr|namespace|using|template|typename|virtual|override|enum|typedef|#include',
    };
    const kw = keywords[language] || keywords.javascript;
    const kwRegex = new RegExp(`\\b(${kw})\\b`, 'g');
    const placeholder = '\x00';
    const protectedRegions = [];
    const protect = (match) => {
        protectedRegions.push(match);
        return `${placeholder}${placeholder}${protectedRegions.length - 1}${placeholder}${placeholder}`;
    };
    let protected_text = escaped;
    if (language === 'python') {
        protected_text = protected_text.replace(/"""[\s\S]*?"""/g, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
        protected_text = protected_text.replace(/(#[^\n]*)/gm, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
    }
    else {
        protected_text = protected_text.replace(/(\/\/[^\n]*)/gm, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
        protected_text = protected_text.replace(/(\/\*[\s\S]*?\*\/)/g, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
    }
    protected_text = protected_text.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, (m) => protect(`<span style="color:#98c379">${m}</span>`));
    protected_text = protected_text.replace(kwRegex, `<span style="color:#c678dd">$1</span>`);
    protected_text = protected_text.replace(/\b(\d+\.?\d*)\b/g, `<span style="color:#d19a66">$1</span>`);
    protected_text = protected_text.replace(/\b([A-Z]\w*)\b(?=\s*\()/g, `<span style="color:#e5c07b">$1</span>`);
    let result = protected_text;
    const placeholderPattern = new RegExp(`${placeholder}${placeholder}(\\d+)${placeholder}${placeholder}`, 'g');
    result = result.replace(placeholderPattern, (_, idx) => protectedRegions[parseInt(idx)]);
    return result;
}
// ============================================================
// CODE EDITOR (syntax highlighted textarea)
// ============================================================
const KEYWORDS = {
    javascript: ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import', 'export', 'default', 'from', 'try', 'catch', 'finally', 'throw', 'async', 'await', 'yield', 'typeof', 'instanceof', 'in', 'of', 'true', 'false', 'null', 'undefined', 'void', 'delete', 'static', 'super', 'console', 'Math', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Map', 'Set', 'Promise', 'JSON', 'Date', 'RegExp', 'Error', 'setTimeout', 'parseInt', 'parseFloat', 'includes', 'indexOf', 'push', 'pop', 'shift', 'unshift', 'splice', 'slice', 'map', 'filter', 'reduce', 'forEach', 'find', 'sort', 'reverse', 'join', 'split', 'trim', 'replace', 'startsWith', 'endsWith', 'charAt', 'charCodeAt', 'toString', 'length', 'keys', 'values', 'entries', 'from', 'assign', 'create', 'has', 'get', 'set', 'add', 'delete', 'clear', 'size', 'isArray', 'keys', 'entries', 'prototype', 'constructor', 'toString', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable'],
    python: ['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with', 'lambda', 'yield', 'pass', 'break', 'continue', 'True', 'False', 'None', 'and', 'or', 'not', 'is', 'in', 'del', 'global', 'nonlocal', 'assert', 'print', 'range', 'len', 'str', 'int', 'float', 'list', 'dict', 'tuple', 'set', 'bool', 'type', 'input', 'open', 'map', 'filter', 'zip', 'enumerate', 'sorted', 'reversed', 'any', 'all', 'sum', 'min', 'max', 'abs', 'round', 'isinstance', 'issubclass', 'hasattr', 'getattr', 'setattr', 'super', 'staticmethod', 'classmethod', 'property', 'self', 'append', 'extend', 'pop', 'insert', 'remove', 'index', 'count', 'sort', 'reverse', 'join', 'split', 'strip', 'replace', 'startswith', 'endswith', 'find', 'format', 'upper', 'lower', 'title', 'capitalize', 'encode', 'decode', 'items', 'keys', 'values', 'get', 'update', 'copy', 'clear', 'discard', 'add', 'union', 'intersection', 'difference', 'symmetric_difference'],
    java: ['public', 'private', 'protected', 'static', 'final', 'class', 'interface', 'extends', 'implements', 'new', 'this', 'super', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'throws', 'void', 'int', 'long', 'double', 'float', 'boolean', 'char', 'String', 'byte', 'short', 'Object', 'null', 'true', 'false', 'enum', 'abstract', 'synchronized', 'native', 'transient', 'volatile', 'List', 'ArrayList', 'LinkedList', 'Map', 'HashMap', 'TreeMap', 'Set', 'HashSet', 'TreeSet', 'Queue', 'Deque', 'Stack', 'PriorityQueue', 'Collections', 'Arrays', 'Stream', 'Optional', 'Integer', 'Double', 'Float', 'Boolean', 'Character', 'Long', 'Short', 'Byte', 'System', 'Math', 'String', 'StringBuilder', 'BufferedReader', 'Scanner', 'System.out.println', 'System.out.print', 'Arrays.sort', 'Arrays.toString', 'Collections.sort', 'Collections.reverse', 'Collections.shuffle', 'Collections.unmodifiableList', 'Collections.unmodifiableMap', 'Collections.unmodifiableSet', 'Collections.synchronizedList', 'Collections.synchronizedMap', 'Collections.synchronizedSet', 'Collections.singletonList', 'Collections.singletonMap', 'Collections.singleton', 'Collections.emptyList', 'Collections.emptyMap', 'Collections.emptySet', 'Collections.frequency', 'Collections.max', 'Collections.min', 'Collections.rotate', 'Collections.swap', 'Collections.addAll', 'Collections.disjoint', 'Collections.indexOfSubList', 'Collections.lastIndexOfSubList', 'Collections.replaceAll', 'Collections.fill', 'Collections.copy', 'Collections.nCopies', 'Collections.singletonIterator', 'Collections.reverseOrder', 'Collections.reverseOrder Comparator', 'Collections.checkedCollection', 'Collections.checkedList', 'Collections.checkedMap', 'Collections.checkedSet', 'Collections.checkedSortedMap', 'Collections.checkedSortedSet', 'Collections.emptyListIterator', 'Collections.singletonList', 'Collections.singletonMap', 'Collections.singletonMap', 'Collections.singletonMap', 'Collections.singletonMap'],
    cpp: ['int', 'long', 'double', 'float', 'bool', 'char', 'void', 'string', 'vector', 'map', 'set', 'pair', 'auto', 'const', 'static', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'class', 'struct', 'public', 'private', 'protected', 'new', 'delete', 'this', 'true', 'false', 'nullptr', 'namespace', 'using', 'template', 'typename', 'virtual', 'override', 'enum', 'typedef', 'cout', 'cin', 'endl', 'include', 'algorithm', 'iostream', 'string', 'vector', 'map', 'set', 'stack', 'queue', 'priority_queue', 'pair', 'tuple', 'array', 'list', 'deque', 'unordered_map', 'unordered_set', 'multimap', 'multiset', 'numeric', 'cmath', 'cstring', 'cstdlib', 'cstdio', 'cassert', 'climits', 'cfloat', 'functional', 'memory', 'utility', 'iostream', 'fstream', 'sstream', 'iomanip', 'bitset', 'regex', 'thread', 'mutex', 'atomic', 'future', 'chrono', 'random', 'limits', 'type_traits', 'remove_reference', 'enable_if', 'is_same', 'is_integral', 'is_floating_point', 'is_array', 'is_pointer', 'is_reference', 'is_const', 'is_volatile', 'is_function', 'is_class', 'is_enum', 'is_arithmetic', 'is_signed', 'is_unsigned', 'is_void', 'is_null_pointer', 'is_pod', 'is_trivial', 'is_standard_layout', 'is_polymorphic', 'is_abstract', 'is_final', 'is_constructible', 'is_default_constructible', 'is_copy_constructible', 'is_move_constructible', 'is_destructible', 'is_nothrow_constructible', 'is_nothrow_default_constructible', 'is_nothrow_copy_constructible', 'is_nothrow_move_constructible', 'is_nothrow_destructible', 'is_convertible', 'is_assignable', 'is_nothrow_assignable', 'is_swappable', 'is_nothrow_swappable', 'is_same_v', 'is_integral_v', 'is_floating_point_v', 'is_array_v', 'is_pointer_v', 'is_reference_v', 'is_const_v', 'is_volatile_v', 'is_function_v', 'is_class_v', 'is_enum_v', 'is_arithmetic_v', 'is_signed_v', 'is_unsigned_v', 'is_void_v', 'is_null_pointer_v', 'is_pod_v', 'is_trivial_v', 'is_standard_layout_v', 'is_polymorphic_v', 'is_abstract_v', 'is_final_v', 'is_constructible_v', 'is_default_constructible_v', 'is_copy_constructible_v', 'is_move_constructible_v', 'is_destructible_v', 'is_nothrow_constructible_v', 'is_nothrow_default_constructible_v', 'is_nothrow_copy_constructible_v', 'is_nothrow_move_constructible_v', 'is_nothrow_destructible_v', 'is_convertible_v', 'is_assignable_v', 'is_nothrow_assignable_v', 'is_swappable_v', 'is_nothrow_swappable_v'],
};
const SNIPPETS = {
    javascript: {
        'for': 'for (let i = 0; i < ${1:n}; i++) {\n  ${2:// code}\n}',
        'forof': 'for (const ${1:item} of ${2:collection}) {\n  ${3:// code}\n}',
        'forin': 'for (const ${1:key} in ${2:obj}) {\n  ${3:// code}\n}',
        'while': 'while (${1:condition}) {\n  ${2:// code}\n}',
        'if': 'if (${1:condition}) {\n  ${2:// code}\n}',
        'ife': 'if (${1:condition}) {\n  ${2:// code}\n} else {\n  ${3:// code}\n}',
        'try': 'try {\n  ${1:// code}\n} catch (${2:e}) {\n  ${3:// error}\n}',
        'fn': 'function ${1:name}(${2:params}) {\n  ${3:return}\n}',
        'cls': 'class ${1:Name} {\n  constructor(${2:params}) {\n    ${3:// init}\n  }\n}',
        'arr': 'const ${1:arr} = [${2:values}];',
        'obj': 'const ${1:obj} = { ${2:key}: ${3:value} };',
        'map': 'const ${1:result} = ${2:arr}.map(${3:item} => ${4:item});',
        'filter': 'const ${1:result} = ${2:arr}.filter(${3:item} => ${4:item});',
        'reduce': 'const ${1:result} = ${2:arr}.reduce((${3:acc}, ${4:item}) => ${5:acc + item}, ${6:0});',
        'sort': '${1:arr}.sort((${2:a}, ${3:b}) => ${4:a - b});',
    },
    python: {
        'for': 'for ${1:i} in range(${2:n}):\n    ${3:pass}',
        'forr': 'for ${1:item} in ${2:collection}:\n    ${3:pass}',
        'while': 'while ${1:condition}:\n    ${2:pass}',
        'if': 'if ${1:condition}:\n    ${2:pass}',
        'ife': 'if ${1:condition}:\n    ${2:pass}\nelse:\n    ${3:pass}',
        'try': 'try:\n    ${1:pass}\nexcept ${2:Exception} as ${3:e}:\n    ${4:pass}',
        'fn': 'def ${1:name}(${2:params}):\n    ${3:pass}',
        'cls': 'class ${1:Name}:\n    def __init__(self${2:, params}):\n        ${3:pass}',
        'list': '${1:arr} = [${2:values}]',
        'dict': '${1:d} = {${2:key}: ${3:value}}',
        'lc': '${1:result} = [${2:x} for ${3:x} in ${4:iterable}]',
        'dc': '${1:result} = {${2:k}: ${3:v} for ${4:k}, ${5:v} in ${6:iterable}}',
        'readlines': 'with open(${1:filename}) as ${2:f}:\n    ${3:lines} = ${2:f}.readlines()',
    },
    java: {
        'for': 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:// code}\n}',
        'fore': 'for (${1:int} ${2:num} : ${3:arr}) {\n    ${4:// code}\n}',
        'while': 'while (${1:condition}) {\n    ${2:// code}\n}',
        'if': 'if (${1:condition}) {\n    ${2:// code}\n}',
        'ife': 'if (${1:condition}) {\n    ${2:// code}\n} else {\n    ${3:// code}\n}',
        'try': 'try {\n    ${1:// code}\n} catch (${2:Exception} ${3:e}) {\n    ${4:// error}\n}',
        'cls': 'public class ${1:Name} {\n    ${2:// fields}\n\n    public ${1:Name}(${3:params}) {\n        ${4:// init}\n    }\n}',
        'sout': 'System.out.println(${1:value});',
        'psvm': 'public static void main(String[] args) {\n    ${1:// code}\n}',
        'list': 'List<${1:Integer}> ${2:list} = new ArrayList<>();',
        'map': 'Map<${1:String}, ${2:Integer}> ${3:map} = new HashMap<>();',
        'set': 'Set<${1:Integer}> ${2:set} = new HashSet<>();',
    },
    cpp: {
        'for': 'for (int ${1:i} = 0; ${1:i} < ${2:n}; ${1:i}++) {\n    ${3:// code}\n}',
        'fore': 'for (${1:auto} ${2:item} : ${3:vec}) {\n    ${4:// code}\n}',
        'while': 'while (${1:condition}) {\n    ${2:// code}\n}',
        'if': 'if (${1:condition}) {\n    ${2:// code}\n}',
        'ife': 'if (${1:condition}) {\n    ${2:// code}\n} else {\n    ${3:// code}\n}',
        'try': 'try {\n    ${1:// code}\n} catch (${2:exception} &${3:e}) {\n    ${4:// error}\n}',
        'cls': 'class ${1:Name} {\npublic:\n    ${2:// fields}\n    ${1:Name}(${3:params}) {\n        ${4:// init}\n    }\n};',
        'sol': 'class Solution {\npublic:\n    int ${1:funcName}(${2:params}) {\n        ${3:return 0;}\n    }\n};',
        'vec': 'vector<${1:int}> ${2:vec};',
        'vvec': 'vector<vector<${1:int}>> ${2:vec};',
        'mp': 'map<${1:string}, ${2:int}> ${3:mp};',
        'st': 'set<${1:int}> ${2:st};',
        'pq': 'priority_queue<${1:int}> ${2:pq};',
        'pb': '${1:vec}.push_back(${2:value});',
        'all': '${1:vec}.begin(), ${1:vec}.end()',
        'sort': 'sort(${1:vec}.begin(), ${1:vec}.end());',
        'rev': 'reverse(${1:vec}.begin(), ${1:vec}.end());',
        'uniq': 'sort(${1:vec}.begin(), ${1:vec}.end());\n${1:vec}.erase(unique(${1:vec}.begin(), ${1:vec}.end()), ${1:vec}.end());',
        'cin': 'cin >> ${1:var};',
        'cout': 'cout << ${1:value} << endl;',
        'mem': 'memset(${1:arr}, 0, sizeof(${1:arr}));',
    },
};
function CodeEditor({ code, onChange, language, }) {
    const textareaRef = useRef(null);
    const preRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const wrapRef = useRef(null);
    const [cursorLine, setCursorLine] = useState(1);
    const [cursorCol, setCursorCol] = useState(1);
    const [suggestions, setSuggestions] = useState([]);
    const [sugPos, setSugPos] = useState({ top: 0, left: 0 });
    const [sugIdx, setSugIdx] = useState(0);
    const [sugPrefix, setSugPrefix] = useState('');
    const [sugType, setSugType] = useState('keyword');
    const sugRef = useRef(null);
    const lineCount = code.split('\n').length;
    const updateCursorPos = useCallback(() => {
        const ta = textareaRef.current;
        if (!ta)
            return;
        const pos = ta.selectionStart;
        const before = code.substring(0, pos);
        const lines = before.split('\n');
        setCursorLine(lines.length);
        setCursorCol(lines[lines.length - 1].length + 1);
    }, [code]);
    useEffect(() => { updateCursorPos(); }, [code, updateCursorPos]);
    const hideSuggestions = useCallback(() => {
        setSuggestions([]);
        setSugPrefix('');
    }, []);
    const showAutoComplete = useCallback((pos) => {
        const before = code.substring(0, pos);
        const match = before.match(/(\w+)$/);
        if (!match) {
            hideSuggestions();
            return;
        }
        const prefix = match[1].toLowerCase();
        if (prefix.length < 1) {
            hideSuggestions();
            return;
        }
        const kwList = KEYWORDS[language] || KEYWORDS.javascript;
        const snippets = SNIPPETS[language] || {};
        const kwMatches = kwList.filter(k => k.toLowerCase().startsWith(prefix) && k !== prefix).slice(0, 15);
        const snipMatches = Object.keys(snippets).filter(k => k.toLowerCase().startsWith(prefix) && k !== prefix).slice(0, 5);
        const all = [...kwMatches.map(k => ({ label: k, type: 'keyword' })), ...snipMatches.map(k => ({ label: k + '()', type: 'snippet' }))];
        if (all.length === 0) {
            hideSuggestions();
            return;
        }
        const ta = textareaRef.current;
        if (!ta)
            return;
        const rect = ta.getBoundingClientRect();
        const linesBefore = before.split('\n');
        const lineIdx = linesBefore.length - 1;
        const colIdx = linesBefore[lineIdx].length;
        const lineHeight = 24.32;
        const charWidth = 9.4;
        const topOffset = (lineIdx + 1) * lineHeight - ta.scrollTop + 4;
        const leftOffset = colIdx * charWidth - ta.scrollLeft + 48;
        setSuggestions(all.map(a => a.label));
        setSugType(all[0]?.type || 'keyword');
        setSugPos({ top: Math.min(topOffset, rect.height - 200), left: Math.min(leftOffset, rect.width - 180) });
        setSugIdx(0);
        setSugPrefix(prefix);
    }, [code, language, hideSuggestions]);
    const insertSnippet = useCallback((label) => {
        const ta = textareaRef.current;
        if (!ta)
            return;
        const start = ta.selectionStart;
        const val = ta.value;
        const before = val.substring(0, start);
        const after = val.substring(start);
        const prefixLen = sugPrefix.length;
        const wordStart = start - prefixLen;
        const snippets = SNIPPETS[language] || {};
        const cleanLabel = label.replace('()', '');
        if (snippets[cleanLabel]) {
            const snippet = snippets[cleanLabel];
            let cursor = 0;
            const expanded = snippet.replace(/\$\{(\d+):?([^}]*)\}/g, (_, num, defaultVal) => {
                cursor = parseInt(num);
                return defaultVal;
            });
            const newVal = val.substring(0, wordStart) + expanded + after;
            onChange(newVal);
            const newPos = wordStart + expanded.length;
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = newPos; ta.focus(); }, 0);
        }
        else {
            const newVal = val.substring(0, wordStart) + label + after;
            onChange(newVal);
            const newPos = wordStart + label.length;
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = newPos; ta.focus(); }, 0);
        }
        hideSuggestions();
    }, [sugPrefix, language, onChange, hideSuggestions]);
    const handleKeyDown = (e) => {
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const val = ta.value;
        const hasSelection = start !== end;
        if (suggestions.length > 0) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSugIdx(i => Math.min(i + 1, suggestions.length - 1));
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSugIdx(i => Math.max(i - 1, 0));
                return;
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                insertSnippet(suggestions[sugIdx]);
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                hideSuggestions();
                return;
            }
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            if (hasSelection) {
                const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                const lineEnd = val.indexOf('\n', end);
                const actualEnd = lineEnd === -1 ? val.length : lineEnd;
                const selectedBlock = val.substring(lineStart, actualEnd);
                const lines = selectedBlock.split('\n');
                if (e.shiftKey) {
                    const newLines = lines.map(l => l.startsWith('  ') ? l.substring(2) : l);
                    const removed = selectedBlock.length - newLines.join('\n').length;
                    onChange(val.substring(0, lineStart) + newLines.join('\n') + val.substring(actualEnd));
                    setTimeout(() => { ta.selectionStart = Math.max(lineStart, start - 2); ta.selectionEnd = end - removed; }, 0);
                }
                else {
                    const newLines = lines.map(l => '  ' + l);
                    const added = newLines.join('\n').length - selectedBlock.length;
                    onChange(val.substring(0, lineStart) + newLines.join('\n') + val.substring(actualEnd));
                    setTimeout(() => { ta.selectionStart = start + 2; ta.selectionEnd = end + added; }, 0);
                }
            }
            else {
                if (e.shiftKey) {
                    const lineStart = val.lastIndexOf('\n', start - 1) + 1;
                    const line = val.substring(lineStart, start);
                    if (line.startsWith('  ')) {
                        onChange(val.substring(0, lineStart) + line.substring(2) + val.substring(start));
                        setTimeout(() => { ta.selectionStart = ta.selectionEnd = start - 2; }, 0);
                    }
                }
                else {
                    onChange(val.substring(0, start) + '  ' + val.substring(end));
                    setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
                }
            }
            return;
        }
        const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
        if (pairs[e.key]) {
            const closeChar = pairs[e.key];
            if (hasSelection) {
                e.preventDefault();
                onChange(val.substring(0, start) + e.key + val.substring(start, end) + closeChar + val.substring(end));
                setTimeout(() => { ta.selectionStart = start + 1; ta.selectionEnd = end + 1; }, 0);
                return;
            }
            if ((e.key === '"' || e.key === "'" || e.key === '`') && start > 0 && val[start - 1] === e.key) {
                e.preventDefault();
                setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 1; }, 0);
                return;
            }
            e.preventDefault();
            onChange(val.substring(0, start) + e.key + closeChar + val.substring(end));
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 1; }, 0);
            return;
        }
        if ([')', '}', ']', '"', "'"].includes(e.key) && val[start] === e.key) {
            e.preventDefault();
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 1; }, 0);
            return;
        }
        if (e.key === 'Backspace' && start === end && start > 0) {
            const before = val[start - 1];
            const after = val[start];
            const matchPairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
            if (matchPairs[before] === after) {
                e.preventDefault();
                onChange(val.substring(0, start - 1) + val.substring(start + 1));
                setTimeout(() => { ta.selectionStart = ta.selectionEnd = start - 1; }, 0);
                return;
            }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === '/') {
            e.preventDefault();
            const lineComment = language === 'python' ? '#' : '//';
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            const lineEnd = val.indexOf('\n', end);
            const actualEnd = lineEnd === -1 ? val.length : lineEnd;
            const lines = val.substring(lineStart, actualEnd).split('\n');
            const allCommented = lines.every(l => l.trimStart().startsWith(lineComment));
            const newLines = allCommented
                ? lines.map(l => l.replace(new RegExp(`^\\s*\\${lineComment === '#' ? '#' : '//'}`), ''))
                : lines.map(l => lineComment + ' ' + l);
            const newVal = val.substring(0, lineStart) + newLines.join('\n') + val.substring(actualEnd);
            onChange(newVal);
            setTimeout(() => { ta.selectionStart = lineStart; ta.selectionEnd = lineStart + newLines.join('\n').length; }, 0);
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            let lineEnd = val.indexOf('\n', start);
            if (lineEnd === -1)
                lineEnd = val.length;
            const line = val.substring(lineStart, lineEnd);
            onChange(val.substring(0, lineEnd) + '\n' + line + val.substring(lineEnd));
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + line.length + 1; }, 0);
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            const line = val.substring(lineStart, start);
            const indent = line.match(/^\s*/)?.[0] || '';
            const lastChar = line.trimEnd().slice(-1);
            const nextChar = val[start];
            let extraIndent = '';
            let addClosing = '';
            if (['{', '(', '['].includes(lastChar)) {
                extraIndent = '  ';
                if (lastChar === '{' && nextChar === '}')
                    addClosing = '\n' + indent;
                if (lastChar === '(' && nextChar === ')')
                    addClosing = '\n' + indent;
                if (lastChar === '[' && nextChar === ']')
                    addClosing = '\n' + indent;
            }
            else if (lastChar === ':') {
                extraIndent = '  ';
            }
            const insert = '\n' + indent + extraIndent + addClosing;
            onChange(val.substring(0, start) + insert + val.substring(start));
            const newPos = start + 1 + indent.length + extraIndent.length;
            setTimeout(() => {
                ta.selectionStart = ta.selectionEnd = newPos;
                const lineH = 22.4;
                const cursorLine = val.substring(0, newPos).split('\n').length;
                const cursorY = cursorLine * lineH;
                const viewTop = ta.scrollTop;
                const viewBottom = viewTop + ta.clientHeight;
                if (cursorY < viewTop + lineH || cursorY > viewBottom - lineH) {
                    ta.scrollTop = Math.max(0, cursorY - ta.clientHeight / 2);
                }
            }, 0);
            return;
        }
    };
    const handleInput = () => { };
    const handleScroll = useCallback(() => {
        const ta = textareaRef.current;
        if (!ta)
            return;
        if (preRef.current) {
            preRef.current.scrollTop = ta.scrollTop;
            preRef.current.scrollLeft = ta.scrollLeft;
        }
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = ta.scrollTop;
        }
    }, []);
    const highlighted = highlightCode(code, language);
    return (_jsxs("div", { className: "code-editor-wrap", ref: wrapRef, children: [_jsx("div", { className: "code-editor-gutter", ref: lineNumbersRef, children: Array.from({ length: lineCount }, (_, i) => (_jsx("div", { className: `code-line-num${i + 1 === cursorLine ? ' active' : ''}`, children: i + 1 }, i + 1))) }), _jsxs("div", { className: "code-editor-content", children: [_jsx("div", { ref: preRef, className: "code-editor-highlight", "aria-hidden": "true", dangerouslySetInnerHTML: { __html: highlighted + '\n' } }), _jsx("textarea", { ref: textareaRef, className: "code-editor-textarea", value: code, onChange: e => onChange(e.target.value), onKeyDown: handleKeyDown, onKeyUp: updateCursorPos, onClick: updateCursorPos, onInput: handleInput, onScroll: handleScroll, spellCheck: false, autoComplete: "off", autoCapitalize: "off", placeholder: "Write your solution..." })] }), _jsxs("div", { className: "code-editor-statusbar", children: [_jsxs("span", { children: ["Ln ", cursorLine, ", Col ", cursorCol] }), _jsx("span", { className: "statusbar-lang", children: language.charAt(0).toUpperCase() + language.slice(1) }), _jsx("span", { children: "Spaces: 2" }), _jsx("span", { children: "UTF-8" })] })] }));
}
// ============================================================
// INTERVIEW MODAL (shared between home and editor)
// ============================================================
function InterviewModal({ problem, onClose, onComplete, }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isRecording, setIsRecording] = useState(false);
    const [voiceStatus, setVoiceStatus] = useState('');
    const [timer, setTimer] = useState(300);
    const [timerActive, setTimerActive] = useState(true);
    const [ended, setEnded] = useState(false);
    const [score, setScore] = useState('');
    const [speakingIdx, setSpeakingIdx] = useState(-1);
    const remainingTextRef = useRef('');
    const messagesRef = useRef([]);
    const scrollRef = useRef(null);
    const timerRef = useRef(null);
    const timerActiveRef = useRef(true);
    const systemPromptRef = useRef('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const inputRef = useRef('');
    useEffect(() => { messagesRef.current = messages; }, [messages]);
    useEffect(() => { inputRef.current = input; }, [input]);
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
        }
    }, [messages, loading]);
    useEffect(() => {
        if (window.speechSynthesis) {
            const load = () => window.speechSynthesis.getVoices();
            load();
            window.speechSynthesis.onvoiceschanged = load;
        }
    }, []);
    const audioUnlockedRef = useRef(false);
    const unlockAudio = useCallback(() => {
        if (audioUnlockedRef.current)
            return;
        audioUnlockedRef.current = true;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const buf = ctx.createBuffer(1, 1, 22050);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(ctx.destination);
            src.start(0);
        }
        catch { }
        try {
            const u = new SpeechSynthesisUtterance(' ');
            u.volume = 0;
            window.speechSynthesis?.speak(u);
        }
        catch { }
    }, []);
    const currentAudioRef = useRef(null);
    const speakFallbackBrowser = (text, idx) => {
        if (!window.speechSynthesis)
            return;
        window.speechSynthesis.cancel();
        remainingTextRef.current = '';
        const clean = text.replace(/[*_`#\[\]{}|]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
        if (!clean)
            return;
        const u = new SpeechSynthesisUtterance(clean);
        u.rate = 0.92;
        u.pitch = 1.15;
        u.volume = 1;
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(x => x.lang.startsWith('en') && x.name.includes('Google') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en') && x.name.includes('Google'))
            || voices.find(x => x.lang.startsWith('en') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en-') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en'))
            || voices[0];
        if (v)
            u.voice = v;
        u.onboundary = (e) => {
            if (e.name === 'word')
                remainingTextRef.current = clean.slice(e.charIndex);
        };
        u.onend = () => { remainingTextRef.current = ''; setSpeakingIdx(prev => prev === idx ? -1 : prev); };
        u.onerror = () => { remainingTextRef.current = ''; setSpeakingIdx(prev => prev === idx ? -1 : prev); };
        window.speechSynthesis.speak(u);
    };
    const speak = useCallback((text, idx, force = false) => {
        if (!force && !voiceEnabled)
            return;
        unlockAudio();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        if (idx !== undefined)
            setSpeakingIdx(idx);
        remainingTextRef.current = '';
        const clean = text.replace(/[*_`#\[\]]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
        if (!clean)
            return;
        fetch('/api/interview/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: clean }),
        })
            .then(async (resp) => {
            const ct = resp.headers.get('content-type') || '';
            if (!resp.ok || ct.includes('application/json')) {
                speakFallbackBrowser(clean, idx);
                return;
            }
            const blob = await resp.blob();
            window.speechSynthesis?.cancel();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            currentAudioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                remainingTextRef.current = '';
                setSpeakingIdx(prev => prev === idx ? -1 : prev);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                speakFallbackBrowser(clean, idx);
            };
            audio.play().catch(() => speakFallbackBrowser(clean, idx));
        })
            .catch(() => speakFallbackBrowser(clean, idx));
    }, [voiceEnabled]);
    const resumeFromRemaining = useCallback((idx) => {
        if (!remainingTextRef.current)
            return;
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        setSpeakingIdx(idx);
        const text = remainingTextRef.current;
        remainingTextRef.current = '';
        fetch('/api/interview/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        })
            .then(async (resp) => {
            const ct = resp.headers.get('content-type') || '';
            if (!resp.ok || ct.includes('application/json')) {
                speakFallbackBrowser(text, idx);
                return;
            }
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            currentAudioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                remainingTextRef.current = '';
                setSpeakingIdx(prev => prev === idx ? -1 : prev);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                speakFallbackBrowser(text, idx);
            };
            audio.play().catch(() => speakFallbackBrowser(text, idx));
        })
            .catch(() => speakFallbackBrowser(text, idx));
    }, []);
    // Timer
    useEffect(() => {
        if (timerActive && timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setTimeout(() => endInterview(), 0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => { if (timerRef.current)
                clearInterval(timerRef.current); };
        }
    }, [timerActive]);
    // Start interview
    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('/api/interview/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ problemId: problem.id, problem }),
                });
                const data = await resp.json();
                if (data.systemPrompt)
                    systemPromptRef.current = data.systemPrompt;
                if (data.initialMessage) {
                    setMessages([{ role: 'assistant', content: data.initialMessage }]);
                    speak(data.initialMessage);
                    setVoiceStatus('Click microphone or type your answer');
                }
            }
            catch {
                setVoiceStatus('Failed to start interview');
            }
        })();
    }, []);
    const sendToAI = async (msgs) => {
        setLoading(true);
        setVoiceStatus('AI is thinking...');
        try {
            const resp = await fetch('/api/interview/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'system', content: systemPromptRef.current }, ...msgs] }),
            });
            const data = await resp.json();
            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
                speak(data.reply, msgs.length);
                setVoiceStatus('');
            }
            else if (data.error) {
                const fallback = getFallbackReply(msgs.length);
                setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
                speak(fallback, msgs.length);
                setVoiceStatus('');
            }
        }
        catch {
            const fallback = getFallbackReply(msgs.length);
            setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
            speak(fallback, msgs.length);
            setVoiceStatus('');
        }
        finally {
            setLoading(false);
        }
    };
    const getFallbackReply = (msgCount) => {
        const replies = [
            `Good approach. Can you explain the time and space complexity of your solution?`,
            `That works. What edge cases did you consider when implementing this?`,
            `Nice. How would you optimize this further if the input size was much larger?`,
            `Can you walk me through how your solution handles the worst-case scenario?`,
            `Good. What alternative approaches did you consider before this one?`,
            `That's a solid solution. How would you modify it if the constraints changed?`,
        ];
        return replies[msgCount % replies.length];
    };
    const endInterview = async () => {
        setTimerActive(false);
        timerActiveRef.current = false;
        if (timerRef.current)
            clearInterval(timerRef.current);
        if (isRecording && mediaRecorderRef.current) {
            try {
                mediaRecorderRef.current.stop();
            }
            catch { }
            setIsRecording(false);
        }
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setEnded(true);
        setVoiceStatus('Evaluating...');
        try {
            const resp = await fetch('/api/interview/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messagesRef.current, problem }),
            });
            const data = await resp.json();
            const raw = data.score || '';
            const match = raw.match(/(\d+(?:\.\d+)?)\s*\/\s*100/);
            const outOf10 = match ? Math.round(parseFloat(match[1]) / 10) : Math.min(10, Math.max(1, messagesRef.current.filter(m => m.role === 'user').length));
            setScore(`${outOf10}/10\n\n${raw}`);
        }
        catch {
            const qCount = messagesRef.current.filter(m => m.role === 'user').length;
            const scoreVal = Math.min(10, Math.max(1, Math.round(qCount * 1.5)));
            setScore(`${scoreVal}/10`);
        }
        setVoiceStatus('');
        onComplete();
    };
    const handleRecordingStop = async () => {
        setVoiceStatus('Converting speech to text...');
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const fd = new FormData();
        fd.append('audio', blob, 'recording.webm');
        try {
            const resp = await fetch('/api/interview/speech-to-text', { method: 'POST', body: fd });
            const data = await resp.json();
            if (data.text && data.text.trim().length > 2) {
                const userMsg = data.text.trim();
                setInput('');
                const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
                setMessages(cur);
                await sendToAI(cur);
            }
            else {
                setVoiceStatus('No speech detected. Try again.');
            }
        }
        catch (err) {
            setVoiceStatus('Failed: ' + err.message);
        }
    };
    const toggleRecording = async () => {
        unlockAudio();
        if (isRecording) {
            const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (SR && !mediaRecorderRef.current) {
                setIsRecording(false);
                return;
            }
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                setIsRecording(false);
                return;
            }
            setIsRecording(false);
            return;
        }
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        remainingTextRef.current = '';
        setSpeakingIdx(-1);
        const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SR) {
            const recognition = new SR();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            let lastProcessedIdx = 0;
            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = lastProcessedIdx; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript;
                        lastProcessedIdx = i + 1;
                    }
                }
                if (transcript)
                    setInput(prev => prev + (prev ? ' ' : '') + transcript);
            };
            recognition.onend = () => {
                setIsRecording(false);
                const text = inputRef.current;
                if (text.trim().length > 2) {
                    const userMsg = text.trim();
                    setInput('');
                    const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
                    setMessages(cur);
                    sendToAI(cur);
                }
            };
            recognition.onerror = () => {
                setIsRecording(false);
                toggleRecordingFallback();
            };
            try {
                recognition.start();
                setIsRecording(true);
                setVoiceStatus('Listening... Speak now');
                return;
            }
            catch { }
        }
        toggleRecordingFallback();
    };
    const toggleRecordingFallback = async () => {
        if (isRecording && mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mr = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
            audioChunksRef.current = [];
            mr.ondataavailable = (e) => { if (e.data.size > 0)
                audioChunksRef.current.push(e.data); };
            mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); handleRecordingStop(); };
            mediaRecorderRef.current = mr;
            mr.start();
            setIsRecording(true);
            setVoiceStatus('Listening... Speak now');
        }
        catch {
            setVoiceStatus('Microphone denied.');
        }
    };
    const sendMessage = async () => {
        if (!input.trim())
            return;
        const userMsg = input.trim();
        setInput('');
        const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
        setMessages(cur);
        await sendToAI(cur);
    };
    const close = () => {
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setTimerActive(false);
        if (timerRef.current)
            clearInterval(timerRef.current);
        if (isRecording && mediaRecorderRef.current) {
            try {
                mediaRecorderRef.current.stop();
            }
            catch { }
        }
        onClose();
    };
    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    return (_jsx("div", { className: "interview-overlay", children: _jsxs("div", { className: "interview-container", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "interview-header", children: [_jsxs("div", { className: "interview-header-left", children: [_jsx("div", { className: "interview-ai-badge", children: '\u2605' }), _jsxs("div", { children: [_jsx("div", { className: "interview-title", children: "SURYA" }), _jsx("div", { className: "interview-subtitle", children: problem.title })] })] }), _jsxs("div", { className: "interview-header-right", children: [!ended && _jsx("div", { className: `interview-timer ${timer < 60 ? 'danger' : ''}`, children: fmt(timer) }), _jsx("button", { className: "interview-icon-btn", onClick: () => { setVoiceEnabled(v => !v); if (voiceEnabled)
                                        window.speechSynthesis?.cancel(); }, children: voiceEnabled ? (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }), _jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }), _jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })] })) : (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }), _jsx("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }), _jsx("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.5-.35 2.18" }), _jsx("line", { x1: "12", y1: "19", x2: "12", y2: "23" }), _jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })] })) }), _jsx("button", { className: "interview-icon-btn close", onClick: close, children: _jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] })] }), ended ? (_jsxs("div", { className: "interview-score-screen", children: [_jsxs("div", { className: "score-circle", children: [_jsx("div", { className: "score-circle-number", children: score.split('/')[0] || '?' }), _jsx("div", { className: "score-circle-label", children: "out of 10" })] }), _jsx("div", { className: "score-title", children: "Interview Complete" }), _jsx("div", { className: "score-details", children: score.split('\n').slice(1).join('\n') }), _jsx("button", { className: "score-close-btn", onClick: close, children: "Close" })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "interview-messages", ref: scrollRef, children: [messages.map((msg, i) => (_jsxs("div", { className: `interview-msg-row ${msg.role === 'user' ? 'user' : 'ai'}`, children: [msg.role === 'assistant' && _jsx("div", { className: "interview-msg-avatar ai", children: '\u2605' }), _jsxs("div", { className: `interview-msg-bubble ${msg.role}`, children: [msg.content, msg.role === 'assistant' && (_jsx("span", { className: `msg-run-hold ${speakingIdx === i ? 'playing' : ''}`, onClick: () => {
                                                        if (speakingIdx === i) {
                                                            window.speechSynthesis?.cancel();
                                                            if (currentAudioRef.current) {
                                                                currentAudioRef.current.pause();
                                                                currentAudioRef.current = null;
                                                            }
                                                            remainingTextRef.current = '';
                                                            setSpeakingIdx(-1);
                                                        }
                                                        else {
                                                            window.speechSynthesis?.cancel();
                                                            if (currentAudioRef.current) {
                                                                currentAudioRef.current.pause();
                                                                currentAudioRef.current = null;
                                                            }
                                                            speak(msg.content, i, true);
                                                        }
                                                    }, children: speakingIdx === i ? '\u23F8' : '\u25B6' }))] }), msg.role === 'user' && _jsx("div", { className: "interview-msg-avatar user", children: "U" })] }, i))), loading && (_jsxs("div", { className: "interview-msg-row ai", children: [_jsx("div", { className: "interview-msg-avatar ai", children: '\u2605' }), _jsx("div", { className: "interview-msg-bubble assistant", children: _jsx("span", { className: "chat-run-dot" }) })] })), voiceStatus && (_jsxs("div", { className: `interview-status ${isRecording ? 'recording' : ''}`, children: [isRecording && _jsx("span", { className: "recording-dot" }), voiceStatus] }))] }), _jsx("div", { className: "interview-input-bar", children: _jsxs("div", { className: "interview-input-row", children: [_jsx("input", { type: "text", value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key === 'Enter' && sendMessage(), placeholder: isRecording ? 'Listening...' : 'Type your answer...', disabled: loading, className: "interview-text-input" }), _jsx("button", { className: `interview-mic-btn ${isRecording ? 'active' : ''}`, onClick: toggleRecording, children: isRecording ? (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }) })) : (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), _jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }), _jsx("line", { x1: "12", y1: "19", x2: "12", y2: "22" })] })) }), _jsx("button", { className: "interview-send-btn", onClick: sendMessage, disabled: loading || !input.trim(), children: _jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" }) }) }), _jsx("button", { className: "interview-end-btn", onClick: endInterview, children: "End Interview" })] }) })] }))] }) }));
}
// ============================================================
// DSA CONCEPTS DATA
// ============================================================
const dsaConcepts = [
    { name: 'Arrays & Hashing', icon: '\u{1F4CA}', color: '#3b82f6', desc: 'Master array manipulation, hash maps, and frequency counting techniques.' },
    { name: 'Two Pointers', icon: '\u{1F504}', color: '#8b5cf6', desc: 'Solve array problems with two-pointer technique for O(n) solutions.' },
    { name: 'Sliding Window', icon: '\u{1F4C8}', color: '#06b6d4', desc: 'Efficiently process subarrays using the sliding window pattern.' },
    { name: 'Stack', icon: '\u{1F4E6}', color: '#f59e0b', desc: 'Leverage LIFO data structure for parsing, monotonic stacks, and more.' },
    { name: 'Binary Search', icon: '\u{1F50D}', color: '#10b981', desc: 'Divide and conquer with O(log n) search on sorted data.' },
    { name: 'Linked List', icon: '\u{1F517}', color: '#ec4899', desc: 'Navigate pointer manipulation, reversal, and cycle detection.' },
    { name: 'Trees', icon: '\u{1F333}', color: '#22c55e', desc: 'Traverse BSTs, binary trees, and solve recursive tree problems.' },
    { name: 'Tries', icon: '\u{1F9E0}', color: '#a855f7', desc: 'Build prefix trees for efficient string search and autocomplete.' },
    { name: 'Heap / Priority Queue', icon: '\u{1F3AF}', color: '#ef4444', desc: 'Use heaps for top-K problems, merging, and scheduling.' },
    { name: 'Backtracking', icon: '\u{1F500}', color: '#f97316', desc: 'Explore all possibilities with constraint-based recursive search.' },
    { name: 'Graphs', icon: '\u{1F310}', color: '#14b8a6', desc: 'Master BFS, DFS, shortest path, and connectivity algorithms.' },
    { name: 'Advanced Graphs', icon: '\u{1F5FA}', color: '#6366f1', desc: 'Tackle topological sort, MST, union-find, and network flow.' },
    { name: '1-D Dynamic Programming', icon: '\u{1F4C9}', color: '#22c55e', desc: 'Solve optimization problems with memoization and tabulation.' },
    { name: '2-D Dynamic Programming', icon: '\u{1F5FA}', color: '#0ea5e9', desc: 'Extend DP to grids and multi-dimensional state spaces.' },
    { name: 'Greedy', icon: '\u{1F3AF}', color: '#eab308', desc: 'Make locally optimal choices for globally optimal solutions.' },
    { name: 'Intervals', icon: '\u{1F4C5}', color: '#d946ef', desc: 'Merge, overlap, and schedule intervals efficiently.' },
    { name: 'Math & Geometry', icon: '\u{1F522}', color: '#64748b', desc: 'Apply math fundamentals, number theory, and geometric algorithms.' },
    { name: 'Bit Manipulation', icon: '\u{1F4A1}', color: '#fbbf24', desc: 'Use bitwise operations for optimization and clever tricks.' },
];
// ============================================================
// SHARED TOPBAR
// ============================================================
function AppTopbar({ activePage, userName, onNavigate, }) {
    return (_jsx("header", { className: "topbar", children: _jsxs("div", { className: "topbar-inner", children: [_jsxs("div", { className: "topbar-left", children: [_jsxs("a", { href: "#", className: "topbar-logo", onClick: e => { e.preventDefault(); onNavigate('home'); }, children: [_jsx("span", { className: "topbar-logo-icon", style: { background: '#6366f1' }, children: "\u2211" }), _jsxs("span", { className: "topbar-logo-text", children: ["DSA ", _jsx("span", { style: { color: '#38bdf8' }, children: "INSIGHTS" })] })] }), _jsxs("nav", { className: "topbar-center", children: [_jsx("span", { className: `topbar-link ${activePage === 'problems' ? 'active' : ''}`, onClick: () => onNavigate('problems'), children: "Problems" }), _jsx("span", { className: `topbar-link ${activePage === 'interview' ? 'active' : ''}`, onClick: () => onNavigate('interview'), children: "Interview" }), _jsx("span", { className: `topbar-link ${activePage === 'leaderboard' ? 'active' : ''}`, onClick: () => onNavigate('leaderboard'), children: "Leaderboard" })] })] }), _jsx("div", { className: "topbar-right", children: _jsx("div", { className: "topbar-user", children: _jsx("div", { className: `topbar-avatar ${activePage === 'profile' ? 'active' : ''}`, onClick: () => onNavigate('profile'), children: userName.charAt(0).toUpperCase() }) }) })] }) }));
}
// ============================================================
// HOME PAGE (concepts dashboard)
// ============================================================
function HomePage({ userName, solvedProblems, profile, onNavigate, }) {
    const getCatStats = (cat) => {
        const catProblems = problems.filter(p => p.category === cat);
        const solved = catProblems.filter(p => solvedProblems.has(p.id)).length;
        const easy = catProblems.filter(p => p.difficulty === 'Easy').length;
        const medium = catProblems.filter(p => p.difficulty === 'Medium').length;
        const hard = catProblems.filter(p => p.difficulty === 'Hard').length;
        return { total: catProblems.length, solved, easy, medium, hard };
    };
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "home-shell", children: [_jsx("div", { className: "home-hero", children: _jsxs("div", { className: "home-hero-left", children: [_jsx("div", { className: "home-hero-avatar", children: userName.charAt(0).toUpperCase() }), _jsxs("div", { className: "home-hero-text", children: [_jsx("span", { className: "home-hero-greeting", children: "Welcome back," }), _jsxs("h1", { children: [userName.split(' ')[0], " ", _jsx("span", { className: "wave-emoji", children: "\uD83D\uDC4B" })] }), _jsx("p", { children: "Master DSA concepts and ace your next technical interview." })] })] }) }), _jsxs("div", { className: "home-concepts-section", children: [_jsxs("div", { className: "home-section-header", children: [_jsx("h2", { children: "DSA Concepts" }), _jsx("p", { className: "home-section-sub", children: "Click a concept to explore related problems" })] }), (() => {
                            const renderCard = (concept) => {
                                const stats = getCatStats(concept.name);
                                const pct = stats.total ? (stats.solved / stats.total) * 100 : 0;
                                const complete = stats.total > 0 && stats.solved === stats.total;
                                return (_jsxs("div", { className: "road-card", onClick: () => onNavigate('problems'), children: [_jsx("div", { className: "road-card-icon", style: { background: (concept.color || '#888') + '1a', color: concept.color || '#888' }, children: concept.icon }), _jsx("div", { className: "road-card-title", children: concept.name }), _jsx("div", { className: "road-card-desc", children: concept.desc }), _jsxs("div", { className: "road-card-progress", children: [_jsx("div", { className: "road-card-track", style: { background: (concept?.color || '#888') + '20' }, children: _jsx("div", { className: "road-card-fill", style: { width: `${pct}%`, background: complete ? '#10b981' : concept?.color || '#888' } }) }), _jsxs("div", { className: "road-card-meta", children: [stats.solved, " / ", stats.total] })] })] }, concept.name));
                            };
                            return (_jsx("div", { className: "roadmap-grid", children: dsaConcepts.map(renderCard) }));
                        })()] }), _jsxs("div", { className: "home-actions-row", children: [_jsxs("div", { className: "home-action-card", onClick: () => onNavigate('problems'), children: [_jsx("div", { className: "home-action-icon", children: '\u{1F4DD}' }), _jsx("div", { className: "home-action-title", children: "Practice Problems" }), _jsxs("div", { className: "home-action-desc", children: [problems.length, " curated DSA problems from easy to hard"] })] }), _jsxs("div", { className: "home-action-card", onClick: () => onNavigate('interview'), children: [_jsx("div", { className: "home-action-icon", children: "AI" }), _jsx("div", { className: "home-action-title", children: "AI Interview" }), _jsx("div", { className: "home-action-desc", children: "Upload resume and practice with a 15-min AI interview" })] }), _jsxs("div", { className: "home-action-card", onClick: () => onNavigate('leaderboard'), children: [_jsx("div", { className: "home-action-icon", children: '\u{1F3C6}' }), _jsx("div", { className: "home-action-title", children: "Leaderboard" }), _jsx("div", { className: "home-action-desc", children: "See how you rank among other practitioners" })] })] })] }) }));
}
// ============================================================
// PROBLEMS PAGE (full problem list)
// ============================================================
function ProblemsPage({ solvedProblems, onSelectProblem, onBack, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [diffFilter, setDiffFilter] = useState('all');
    const [catFilter, setCatFilter] = useState('all');
    const filtered = problems.filter(p => {
        if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()))
            return false;
        if (diffFilter !== 'all' && p.difficulty.toLowerCase() !== diffFilter)
            return false;
        if (catFilter !== 'all' && p.category !== catFilter)
            return false;
        return true;
    });
    const filteredCats = Array.from(new Set(filtered.map(p => p.category)));
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "home-shell", children: [_jsx("div", { className: "page-back-row", children: _jsxs("button", { className: "page-back-btn", onClick: onBack, children: ['\u2190', " Back"] }) }), _jsxs("div", { className: "problems-page-header", children: [_jsx("h1", { children: "Problems" }), _jsxs("p", { children: [problems.length, " problems across ", categories.length, " DSA topics"] })] }), _jsxs("div", { className: "problems-page-filters", children: [_jsx("input", { className: "home-search", type: "text", placeholder: "Search problems...", value: searchQuery, onChange: e => setSearchQuery(e.target.value) }), _jsxs("select", { className: "home-diff-select", value: diffFilter, onChange: e => setDiffFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Difficulties" }), _jsx("option", { value: "easy", children: "Easy" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "hard", children: "Hard" })] }), _jsxs("select", { className: "home-diff-select", value: catFilter, onChange: e => setCatFilter(e.target.value), children: [_jsx("option", { value: "all", children: "All Topics" }), categories.map(c => _jsx("option", { value: c, children: c }, c))] })] }), _jsxs("div", { className: "home-problems-list", children: [filteredCats.map(cat => {
                            const catProblems = filtered.filter(p => p.category === cat);
                            return (_jsxs("div", { className: "home-problem-group", children: [_jsx("div", { className: "home-problem-group-title", children: cat }), catProblems.map(p => (_jsxs("div", { className: "home-problem-row", onClick: () => onSelectProblem(p.id), children: [_jsxs("div", { className: "home-problem-left", children: [_jsx("span", { className: "home-problem-id", children: p.id }), _jsx("span", { className: "home-problem-name", children: p.title }), solvedProblems.has(p.id) && _jsx("span", { className: "home-solved-check", children: '\u2713' })] }), _jsxs("div", { className: "home-problem-right", children: [_jsx("div", { className: "home-problem-tags", children: p.tags.slice(0, 2).map(t => _jsx("span", { className: "home-problem-tag", children: t }, t)) }), _jsx("span", { className: `home-problem-diff ${p.difficulty.toLowerCase()}`, children: p.difficulty })] })] }, p.id)))] }, cat));
                        }), filtered.length === 0 && (_jsx("div", { className: "problems-empty", children: "No problems match your filters." }))] })] }) }));
}
// ============================================================
// LEADERBOARD PAGE
// ============================================================
const MEDAL_THEMES = [
    { id: 'lbGold', cls: 'lb-badge-gold', stops: [{ c: '#ffe38a', o: 0 }, { c: '#ffd700', o: 0.5 }, { c: '#d4a017', o: 1 }], ring: '#b8860b', numFill: '#5b3a00' },
    { id: 'lbSilver', cls: 'lb-badge-silver', stops: [{ c: '#ffffff', o: 0 }, { c: '#d3dce6', o: 0.5 }, { c: '#9aa7b4', o: 1 }], ring: '#64748b', numFill: '#1e293b' },
    { id: 'lbBronze', cls: 'lb-badge-bronze', stops: [{ c: '#ffca80', o: 0 }, { c: '#cd7f32', o: 0.5 }, { c: '#8f5a1e', o: 1 }], ring: '#78350f', numFill: '#ffffff' },
];
function RankBadge({ rank, size = 40 }) {
    if (rank < 0 || rank > 2)
        return null;
    const theme = MEDAL_THEMES[rank];
    return (_jsx("span", { className: `lb-badge ${theme.cls}`, style: { width: size, height: size }, children: _jsxs("svg", { width: size, height: size, viewBox: "0 0 40 40", fill: "none", children: [_jsxs("defs", { children: [_jsx("linearGradient", { id: theme.id, x1: "0", y1: "0", x2: "1", y2: "1", children: theme.stops.map((s, i) => _jsx("stop", { offset: s.o, stopColor: s.c }, i)) }), _jsxs("radialGradient", { id: `${theme.id}-shine`, cx: "0.35", cy: "0.28", r: "0.65", children: [_jsx("stop", { offset: "0", stopColor: "#ffffff", stopOpacity: "0.65" }), _jsx("stop", { offset: "0.45", stopColor: "#ffffff", stopOpacity: "0" })] })] }), _jsx("circle", { cx: "20", cy: "20", r: "18", fill: `url(#${theme.id})`, stroke: theme.ring, strokeWidth: "1.5" }), _jsx("circle", { cx: "20", cy: "20", r: "18", fill: `url(#${theme.id}-shine)` }), _jsx("circle", { cx: "20", cy: "20", r: "12.5", fill: "none", stroke: theme.ring, strokeWidth: "1.2", opacity: "0.4" }), rank === 0 && (_jsx("path", { d: "M11.5 8.2 L13.2 6 L15.6 7.6 L15 4.6 H25 L24.4 7.6 L26.8 6 L28.5 8.2 L27 12 H13 Z", fill: "#fff7d6", opacity: "0.95" })), _jsx("text", { x: "20", y: "26", textAnchor: "middle", fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif", fontWeight: "800", fontSize: rank === 0 ? 14 : 16, fill: theme.numFill, children: rank + 1 })] }) }));
}
function LeaderboardPage({ userName, solvedProblems, profile, onBack, }) {
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => {
        const userEntry = { name: userName, solved: solvedProblems.size, streak: profile.currentStreak };
        const loadLeaderboard = async () => {
            const res = await apiGet('/leaderboard');
            if (!res.fallback && res.leaderboard) {
                let lb = res.leaderboard;
                lb = lb.filter(e => e.name === userName || e.solved > 0);
                if (!lb.some(e => e.name === userName))
                    lb = [userEntry, ...lb];
                setLeaderboard(lb);
            }
            else {
                setLeaderboard([userEntry]);
            }
        };
        loadLeaderboard();
    }, [userName, solvedProblems.size, profile.currentStreak]);
    const getRank = (i) => `${i + 1}`;
    const maxSolved = leaderboard.reduce((m, e) => Math.max(m, e.solved), 0);
    const podiumOrder = leaderboard.length === 1 ? [0] : leaderboard.length === 2 ? [1, 0] : [1, 0, 2];
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "home-shell", children: [_jsx("div", { className: "page-back-row", children: _jsxs("button", { className: "page-back-btn", onClick: onBack, children: ['\u2190', " Back"] }) }), _jsxs("div", { className: "leaderboard-page-header", children: [_jsxs("h1", { children: ['\u{1F3C6}', " Leaderboard"] }), _jsxs("p", { children: ["Top performers ranked by problems solved \u00B7 ", leaderboard.length, " ", leaderboard.length === 1 ? 'participant' : 'participants'] })] }), leaderboard.length > 0 && (_jsx("div", { className: "lb-podium", children: podiumOrder.map(idx => {
                        const entry = leaderboard[idx];
                        if (!entry)
                            return null;
                        const place = idx + 1;
                        const isYou = entry.name === userName;
                        return (_jsxs("div", { className: `lb-podium-card place-${place}${isYou ? ' you' : ''}`, children: [_jsx("div", { className: "lb-podium-medal", children: _jsx(RankBadge, { rank: idx, size: place === 1 ? 60 : 50 }) }), _jsx("span", { className: `lb-podium-avatar place-${place}`, children: entry.name.charAt(0).toUpperCase() }), _jsxs("span", { className: "lb-podium-name", children: [entry.name, isYou && _jsx("span", { className: "lb-you-pill", children: "You" })] }), _jsxs("span", { className: "lb-podium-stats", children: [_jsx("b", { children: entry.solved }), " solved"] }), _jsxs("span", { className: "lb-podium-streak", children: ['\u{1F525}', " ", entry.streak, " ", entry.streak === 1 ? 'day' : 'days'] }), _jsx("div", { className: `lb-podium-stand place-${place}`, children: _jsx("span", { children: place }) })] }, entry.name));
                    }) })), _jsxs("div", { className: "leaderboard-table", children: [_jsxs("div", { className: "lb-table-header", children: [_jsx("span", { className: "lb-col-rank", children: "Rank" }), _jsx("span", { className: "lb-col-name", children: "User" }), _jsx("span", { className: "lb-col-solved", children: "Solved" }), _jsx("span", { className: "lb-col-streak", children: "Streak" })] }), leaderboard.map((entry, i) => {
                            const isYou = entry.name === userName;
                            return (_jsxs("div", { className: `lb-table-row ${isYou ? 'you' : ''} ${i < 3 ? `top-${i + 1}` : ''}`, style: { animationDelay: `${i * 40}ms` }, children: [_jsx("span", { className: "lb-col-rank", children: i < 3 ? _jsx(RankBadge, { rank: i, size: 36 }) : _jsx("span", { className: "lb-rank-text", children: getRank(i) }) }), _jsxs("span", { className: "lb-col-name", children: [_jsx("span", { className: `lb-avatar${isYou ? ' you' : ''}${i < 3 ? ` top-${i + 1}` : ''}`, children: entry.name.charAt(0).toUpperCase() }), _jsxs("span", { className: "lb-name-text", children: [entry.name, isYou && _jsx("span", { className: "lb-you-pill", children: "You" })] })] }), _jsxs("span", { className: "lb-col-solved", children: [_jsx("span", { className: "lb-progress-track", children: _jsx("span", { className: "lb-progress-fill", style: { width: `${maxSolved ? (entry.solved / maxSolved) * 100 : 0}%` } }) }), entry.solved] }), _jsxs("span", { className: "lb-col-streak", children: [entry.streak > 0 && _jsx("span", { className: "lb-flame", children: '\u{1F525}' }), entry.streak, " ", entry.streak === 1 ? 'day' : 'days'] })] }, entry.name));
                        })] })] }) }));
}
// ============================================================
// PROFILE PAGE
// ============================================================
const SKILL_TIERS = [
    { min: 0, label: 'Novice', desc: 'Just getting started — every expert was once a beginner. Solve your first problem to begin the journey!' },
    { min: 1, label: 'Apprentice', desc: 'You have solved your first problem. Keep building momentum, one question at a time.' },
    { min: 10, label: 'Intermediate', desc: 'A solid foundation is forming. You are getting comfortable with common patterns and data structures.' },
    { min: 25, label: 'Advanced', desc: 'You handle tricky problems with confidence and can explain your approach clearly.' },
    { min: 50, label: 'Expert', desc: 'A top-tier problem solver. Interviewers would be impressed by your structured thinking.' },
    { min: 100, label: 'Master', desc: 'You have mastered the full DSA landscape. Truly outstanding!' },
];
function computeBestStreak(dailyHistory) {
    const sorted = [...dailyHistory].sort((a, b) => a.date.localeCompare(b.date));
    let best = 0;
    let run = 0;
    let prev = null;
    for (const day of sorted) {
        if (day.solved === 0) {
            run = 0;
            prev = null;
            continue;
        }
        const cur = new Date(day.date + 'T00:00:00');
        if (prev) {
            const diff = (cur.getTime() - prev.getTime()) / 86400000;
            run = diff === 1 ? run + 1 : 1;
        }
        else {
            run = 1;
        }
        prev = cur;
        best = Math.max(best, run);
    }
    return best;
}
function computeAchievements(solvedProblems, profile) {
    const solvedList = Array.from(solvedProblems).map(id => problems.find(p => p.id === id)).filter(Boolean);
    const easyCount = solvedList.filter(p => p.difficulty === 'Easy').length;
    const mediumCount = solvedList.filter(p => p.difficulty === 'Medium').length;
    const hardCount = solvedList.filter(p => p.difficulty === 'Hard').length;
    const bestStreak = computeBestStreak(profile.dailyHistory);
    const categories = Array.from(new Set(problems.map(p => p.category)));
    const completeCats = categories.filter(cat => {
        const catProblems = problems.filter(p => p.category === cat);
        return catProblems.length > 0 && catProblems.every(p => solvedProblems.has(p.id));
    }).length;
    return [
        { icon: '\u{1F680}', title: 'First Solve', desc: 'Solve your first problem', earned: solvedList.length >= 1 },
        { icon: '\u{1F525}', title: 'On Fire', desc: 'Reach a 3-day streak', earned: bestStreak >= 3 },
        { icon: '\u{1F4AA}', title: 'Week Warrior', desc: 'Reach a 7-day streak', earned: bestStreak >= 7 },
        { icon: '\u{1F3C3}', title: 'Marathoner', desc: 'Reach a 30-day streak', earned: bestStreak >= 30 },
        { icon: '\u{1F980}', title: 'Easy Rider', desc: 'Solve 10 Easy problems', earned: easyCount >= 10 },
        { icon: '\u{1F31F}', title: 'Rising Star', desc: 'Solve 10 Medium problems', earned: mediumCount >= 10 },
        { icon: '\u{1F4A5}', title: 'Hard Hitter', desc: 'Solve 5 Hard problems', earned: hardCount >= 5 },
        { icon: '\u{1F3C6}', title: 'Category Master', desc: 'Complete a category', earned: completeCats >= 1 },
        { icon: '\u{1F3AF}', title: 'Sharpshooter', desc: 'Complete 3 categories', earned: completeCats >= 3 },
        { icon: '\u{1F3C1}', title: 'Century Club', desc: 'Solve 50 problems', earned: solvedList.length >= 50 },
        { icon: '\u{1F451}', title: 'Legend', desc: 'Solve 100 problems', earned: solvedList.length >= 100 },
    ];
}
function ProfilePage({ userName, userEmail, solvedProblems, profile, onBack, onSignOut, onOpenProblem, }) {
    const [activityOpen, setActivityOpen] = useState(false);
    const todaySolved = profile.dailyHistory.find(e => e.date === getToday())?.solved ?? 0;
    const bestStreak = useMemo(() => computeBestStreak(profile.dailyHistory), [profile.dailyHistory]);
    const solvedList = useMemo(() => Array.from(solvedProblems).map(id => problems.find(p => p.id === id)).filter(Boolean), [solvedProblems]);
    const recentList = useMemo(() => [...solvedList].sort((a, b) => b.id - a.id), [solvedList]);
    const [expandedId, setExpandedId] = useState(null);
    const [userRank, setUserRank] = useState(0);
    useEffect(() => {
        const loadRank = async () => {
            const res = await apiGet('/leaderboard');
            if (res.fallback || !res.leaderboard) {
                const lb = JSON.parse(localStorage.getItem('dsa-leaderboard') || '[]');
                const i = lb.findIndex(e => e.name === userName) + 1;
                setUserRank(i);
                return;
            }
            const i = res.leaderboard.findIndex(e => e.name === userName) + 1;
            setUserRank(i);
        };
        loadRank();
    }, [userName, solvedProblems.size]);
    const total = problems.length;
    const completionPct = total ? Math.round((solvedList.length / total) * 100) : 0;
    const easyCount = solvedList.filter(p => p.difficulty === 'Easy').length;
    const mediumCount = solvedList.filter(p => p.difficulty === 'Medium').length;
    const hardCount = solvedList.filter(p => p.difficulty === 'Hard').length;
    const skillIndex = SKILL_TIERS.reduce((acc, t, i) => (solvedList.length >= t.min ? i : acc), 0);
    const currentTier = SKILL_TIERS[skillIndex];
    const nextTier = SKILL_TIERS[skillIndex + 1];
    const tierProgress = nextTier
        ? Math.min(100, Math.round(((solvedList.length - currentTier.min) / (nextTier.min - currentTier.min)) * 100))
        : 100;
    const achievements = computeAchievements(solvedProblems, profile);
    const earnedAchievements = achievements.filter(a => a.earned).length;
    const activityHeatmap = useMemo(() => {
        const map = new Map(profile.dailyHistory.map(d => [d.date, d.solved]));
        const today = new Date();
        const dow = today.getDay();
        const currentMonday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - ((dow + 6) % 7));
        const start = new Date(currentMonday);
        start.setDate(currentMonday.getDate() - 51 * 7);
        const todayKey = getToday();
        const months = [];
        let currentKey = '';
        let currentLabel = '';
        let currentWeeks = [];
        for (let w = 0; w < 52; w++) {
            const days = [];
            for (let d = 0; d < 7; d++) {
                const day = new Date(start);
                day.setDate(start.getDate() + w * 7 + d);
                const iso = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                const isFuture = iso > todayKey;
                days.push({ key: iso, count: isFuture ? -1 : (map.get(iso) || 0) });
            }
            const weekStart = new Date(start);
            weekStart.setDate(start.getDate() + w * 7);
            const mKey = `${weekStart.getFullYear()}-${weekStart.getMonth()}`;
            if (mKey !== currentKey) {
                if (currentWeeks.length)
                    months.push({ key: currentKey, label: currentLabel, weeks: currentWeeks });
                currentKey = mKey;
                currentLabel = weekStart.getMonth() === 0
                    ? weekStart.toLocaleString('en-US', { month: 'short', year: '2-digit' })
                    : weekStart.toLocaleString('en-US', { month: 'short' });
                currentWeeks = [];
            }
            currentWeeks.push({ key: `w${w}`, days });
        }
        if (currentWeeks.length)
            months.push({ key: currentKey, label: currentLabel, weeks: currentWeeks });
        return months;
    }, [profile.dailyHistory]);
    const heatmapRef = useRef(null);
    useEffect(() => {
        if (heatmapRef.current)
            heatmapRef.current.scrollLeft = heatmapRef.current.scrollWidth;
    }, [activityHeatmap]);
    const [linkCopied, setLinkCopied] = useState(false);
    const [shareOpen, setShareOpen] = useState(false);
    const buildShareText = () => [
        `DSA INSIGHTS Profile`,
        `Name: ${userName}`,
        `Email: ${userEmail}`,
        `Level: ${currentTier.label} (${solvedList.length} problems solved)`,
        `Current Streak: ${profile.currentStreak} days`,
        `Best Streak: ${bestStreak} days`,
        `Difficulty: ${easyCount} Easy / ${mediumCount} Medium / ${hardCount} Hard`,
        `Completion: ${completionPct}% (${solvedList.length}/${total})`,
        `Achievements: ${earnedAchievements}/${achievements.length} unlocked`,
    ].join('\n');
    const copyShareText = async () => {
        try {
            await navigator.clipboard.writeText(buildShareText());
        }
        catch { /* clipboard unavailable */ }
    };
    const copyShareLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setLinkCopied(true);
            setTimeout(() => setLinkCopied(false), 2000);
        }
        catch { /* clipboard unavailable */ }
    };
    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(buildShareText())}`, '_blank');
        setShareOpen(false);
    };
    const shareLinkedIn = () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${encodeURIComponent(buildShareText())}`, '_blank');
        setShareOpen(false);
    };
    const shareInstagram = async () => {
        await copyShareText();
        setShareOpen(false);
        window.open('https://www.instagram.com/', '_blank');
    };
    return (_jsxs(_Fragment, { children: [_jsxs("div", { className: "home-shell", children: [_jsx("div", { className: "page-back-row", children: _jsxs("button", { className: "page-back-btn", onClick: onBack, children: ['\u2190', " Back"] }) }), _jsxs("div", { className: "profile-hero", children: [_jsx("div", { className: "profile-hero-avatar-wrap", children: _jsx("div", { className: "profile-hero-avatar", children: userName.charAt(0).toUpperCase() }) }), _jsxs("div", { className: "profile-hero-info", children: [_jsxs("div", { className: "profile-hero-name-row", children: [_jsx("h1", { children: userName }), _jsxs("span", { className: "profile-hero-badge", children: ['\u2713', " Online"] })] }), _jsx("p", { children: userEmail }), _jsxs("span", { className: "profile-tier-tag", style: { background: 'linear-gradient(135deg, #6366f1, #38bdf8)' }, children: [currentTier.label, " Level"] })] }), _jsxs("div", { className: "profile-hero-actions", children: [_jsx("button", { className: "profile-share-btn", onClick: () => setShareOpen(true), children: "Share Profile" }), _jsx("button", { className: "profile-signout-btn", onClick: onSignOut, children: "Sign Out" })] })] }), _jsxs("div", { className: "profile-stats-row", children: [_jsxs("div", { className: "profile-stat-card", children: [_jsx("div", { className: "profile-stat-value", children: solvedList.length }), _jsx("div", { className: "profile-stat-label", children: "Solved" })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx("div", { className: "profile-stat-value", children: profile.currentStreak }), _jsx("div", { className: "profile-stat-label", children: "Current Streak" })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx("div", { className: "profile-stat-value", children: todaySolved }), _jsx("div", { className: "profile-stat-label", children: "Solved Today" })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsx("div", { className: "profile-stat-value", children: userRank > 0 ? `#${userRank}` : '--' }), _jsx("div", { className: "profile-stat-label", children: "Global Rank" })] }), _jsxs("div", { className: "profile-stat-card", children: [_jsxs("div", { className: "profile-stat-value", children: [completionPct, "%"] }), _jsx("div", { className: "profile-stat-label", children: "Completion" })] })] }), _jsxs("div", { className: "profile-level-card", children: [_jsxs("div", { className: "profile-level-left", children: [_jsx("div", { className: "profile-level-title", children: currentTier.label }), _jsx("div", { className: "profile-level-desc", children: currentTier.desc })] }), _jsx("div", { className: "profile-level-track", children: _jsx("div", { className: "profile-level-fill", style: { width: `${tierProgress}%` } }) }), _jsxs("div", { className: "profile-level-pct", children: [tierProgress, "%"] })] }), _jsxs("div", { className: "profile-main-grid", children: [_jsxs("div", { className: "profile-section profile-section-spread", children: [_jsxs("div", { children: [_jsx("h3", { children: "Difficulty Breakdown" }), _jsxs("div", { className: "profile-diff-list", children: [_jsxs("div", { className: "profile-diff-row", children: [_jsx("span", { className: "profile-diff-name diff-easy", children: "Easy" }), _jsx("div", { className: "profile-diff-track", children: _jsx("div", { className: "profile-diff-fill", style: { width: `${total ? (easyCount / total) * 100 : 0}%`, background: 'var(--difficulty-easy)' } }) }), _jsx("span", { className: "profile-diff-count", children: easyCount })] }), _jsxs("div", { className: "profile-diff-row", children: [_jsx("span", { className: "profile-diff-name diff-medium", children: "Medium" }), _jsx("div", { className: "profile-diff-track", children: _jsx("div", { className: "profile-diff-fill", style: { width: `${total ? (mediumCount / total) * 100 : 0}%`, background: 'var(--difficulty-medium)' } }) }), _jsx("span", { className: "profile-diff-count", children: mediumCount })] }), _jsxs("div", { className: "profile-diff-row", children: [_jsx("span", { className: "profile-diff-name diff-hard", children: "Hard" }), _jsx("div", { className: "profile-diff-track", children: _jsx("div", { className: "profile-diff-fill", style: { width: `${total ? (hardCount / total) * 100 : 0}%`, background: 'var(--difficulty-hard)' } }) }), _jsx("span", { className: "profile-diff-count", children: hardCount })] })] })] }), _jsxs("div", { children: [_jsx("h3", { style: { marginTop: '32px' }, children: "Activity Graph" }), _jsx("div", { className: "profile-heatmap-scroll", ref: heatmapRef, children: _jsx("div", { className: "profile-heatmap-inner", children: _jsx("div", { className: "profile-heatmap-body", children: activityHeatmap.map(m => (_jsxs("div", { className: "profile-heatmap-month", children: [_jsx("div", { className: "profile-heatmap-month-label", children: m.label }), _jsx("div", { className: "profile-heatmap-month-weeks", children: m.weeks.map(week => (_jsx("div", { className: "profile-heatmap-week", children: week.days.map(day => (day.count === -1
                                                                            ? _jsx("div", { className: "profile-heat-cell pad" }, day.key)
                                                                            : _jsx("div", { title: `${day.key}: ${day.count} solved`, className: `profile-heat-cell${day.count === 0 ? ' none' : day.count === 1 ? ' low' : day.count === 2 ? ' med' : ' high'}` }, day.key))) }, week.key))) })] }, m.key))) }) }) }), _jsxs("p", { className: "profile-heatmap-caption", children: ["Less", _jsx("span", { className: "profile-heat-swatch", style: { background: '#f9a8d4' } }), _jsx("span", { className: "profile-heat-swatch", style: { background: '#ec4899' } }), _jsx("span", { className: "profile-heat-swatch", style: { background: '#be185d' } }), "More"] })] })] }), _jsxs("div", { className: "profile-section", children: [_jsxs("div", { className: "profile-section-head", children: [_jsx("h3", { children: "Achievements" }), _jsxs("span", { className: "profile-ach-count", children: [earnedAchievements, " / ", achievements.length] })] }), _jsx("div", { className: "profile-ach-grid", children: achievements.map(a => (_jsxs("div", { className: `profile-ach-card${a.earned ? ' earned' : ''}`, children: [_jsx("div", { className: "profile-ach-icon", children: a.icon }), _jsxs("div", { className: "profile-ach-info", children: [_jsx("div", { className: "profile-ach-title", children: a.title }), _jsx("div", { className: "profile-ach-desc", children: a.desc })] })] }, a.title))) })] })] }), _jsx("div", { className: "profile-activity-center", children: _jsx("button", { className: "profile-activity-btn", onClick: () => setActivityOpen(true), children: "Recent Activity" }) })] }), activityOpen && (_jsx("div", { className: "activity-overlay", onClick: () => setActivityOpen(false), children: _jsxs("div", { className: "activity-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "activity-modal-header", children: [_jsx("h3", { children: "Recent Activity" }), _jsx("button", { className: "activity-modal-close", onClick: () => setActivityOpen(false), "aria-label": "Close", children: "\u2715" })] }), recentList.length === 0 ? (_jsx("p", { className: "activity-empty", children: "No solved problems yet. Solve your first problem!" })) : (_jsx("div", { className: "activity-modal-list", children: recentList.map((p, index) => {
                                const cx = getComplexity(p.id);
                                const open = expandedId === p.id;
                                return (_jsxs("div", { className: `activity-item${open ? ' open' : ''}`, style: { animationDelay: `${Math.min(index, 10) * 50}ms` }, children: [_jsxs("button", { className: "activity-item-head", onClick: () => setExpandedId(open ? null : p.id), children: [_jsx("span", { className: "activity-item-id", children: p.id }), _jsx("span", { className: "activity-item-name", children: p.title }), _jsx("span", { className: `home-problem-diff ${p.difficulty.toLowerCase()}`, children: p.difficulty }), _jsx("span", { className: "activity-item-chevron", children: open ? '\u2212' : '+' })] }), open && (_jsxs("div", { className: "activity-item-details", children: [_jsxs("div", { className: "activity-item-detail-row", children: [_jsx("span", { children: "Category" }), _jsx("strong", { children: p.category })] }), _jsxs("div", { className: "activity-item-detail-row", children: [_jsx("span", { children: "Tags" }), _jsx("strong", { children: p.tags.join(', ') })] }), _jsxs("div", { className: "activity-item-cx", children: [_jsxs("div", { className: "activity-item-cx-chip", children: [_jsx("span", { className: "activity-item-cx-label", children: "Time" }), _jsx("span", { className: "activity-item-cx-value", children: cx.time })] }), _jsxs("div", { className: "activity-item-cx-chip", children: [_jsx("span", { className: "activity-item-cx-label", children: "Space" }), _jsx("span", { className: "activity-item-cx-value", children: cx.space })] })] }), _jsxs("button", { className: "activity-item-open", onClick: () => onOpenProblem(p.id), children: ['\u{1F4BB}', " Open in Code Editor"] })] }))] }, p.id));
                            }) }))] }) })), shareOpen && (_jsx("div", { className: "share-overlay", onClick: () => setShareOpen(false), children: _jsxs("div", { className: "share-modal", onClick: e => e.stopPropagation(), children: [_jsx("div", { className: "share-modal-header", children: _jsx("h3", { children: "Share Profile" }) }), _jsxs("div", { className: "share-modal-options", children: [_jsxs("button", { className: "share-modal-opt linkedin", onClick: shareLinkedIn, children: [_jsx("span", { className: "share-modal-opt-chip", children: _jsx(LinkedInIcon, {}) }), _jsx("span", { className: "share-modal-opt-label", children: "LinkedIn" }), _jsx("span", { className: "share-modal-opt-arrow", children: '\u2192' })] }), _jsxs("button", { className: "share-modal-opt whatsapp", onClick: shareWhatsApp, children: [_jsx("span", { className: "share-modal-opt-chip", children: _jsx(WhatsAppIcon, {}) }), _jsx("span", { className: "share-modal-opt-label", children: "WhatsApp" }), _jsx("span", { className: "share-modal-opt-arrow", children: '\u2192' })] }), _jsxs("button", { className: "share-modal-opt instagram", onClick: shareInstagram, children: [_jsx("span", { className: "share-modal-opt-chip", children: _jsx(InstagramIcon, {}) }), _jsx("span", { className: "share-modal-opt-label", children: "Instagram" }), _jsx("span", { className: "share-modal-opt-arrow", children: '\u2192' })] }), _jsxs("button", { className: "share-modal-opt copy", onClick: copyShareLink, title: "Copy link", children: [_jsx("span", { className: "share-modal-opt-chip", children: _jsx(LinkIcon, {}) }), _jsx("span", { className: "share-modal-opt-label", children: linkCopied ? 'Link copied!' : 'Copy link' }), _jsx("span", { className: "share-modal-opt-arrow", children: '\u2192' })] })] })] }) }))] }));
}
// ============================================================
// EDITOR PAGE (coding)
// ============================================================
function EditorPage({ problemId, onBack, userName, userId, solvedProblems, setSolvedProblems, profile, setProfile, }) {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('java');
    const [testResults, setTestResults] = useState(null);
    const [selectedTc, setSelectedTc] = useState(-1);
    const [summary, setSummary] = useState('');
    const [running, setRunning] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showInterviewBtn, setShowInterviewBtn] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(340);
    const [termHeight, setTermHeight] = useState(200);
    const [showInterview, setShowInterview] = useState(false);
    const isDragging = useRef(false);
    const sel = problems.find(p => p.id === problemId) ?? problems[0];
    const isExec = language === 'javascript' || language === 'python' || language === 'java' || language === 'cpp';
    useEffect(() => {
        const javaReturnTypes = {
            twoSum: 'int[]', groupAnagrams: 'List<List<String>>', threeSum: 'List<List<Integer>>',
            containsDuplicate: 'boolean', isAnagram: 'boolean', validAnagram: 'boolean',
            validPalindrome: 'boolean', isPalindrome: 'boolean', validParentheses: 'boolean',
            maxAreaOfIsland: 'int', numIslands: 'int', cloneGraph: 'Node',
            mergeTwoSortedLists: 'ListNode', addTwoNumbers: 'ListNode', reverseList: 'ListNode',
            hasCycle: 'boolean', detectCycle: 'ListNode', getIntersectionNode: 'ListNode',
            maxDepth: 'int', diameterOfBinaryTree: 'int', isBalanced: 'boolean',
            isSameTree: 'boolean', isSubtree: 'boolean', lowestCommonAncestor: 'TreeNode',
            levelOrder: 'List<List<Integer>>', rightSideView: 'List<Integer>',
            goodNodes: 'int', isValidBST: 'boolean', kthSmallest: 'int',
            buildTree: 'TreeNode', maxPathSum: 'int', invertTree: 'TreeNode',
            subsets: 'List<List<Integer>>', combinationSum: 'List<List<Integer>>',
            permute: 'List<List<Integer>>', subsetsWithDup: 'List<List<Integer>>',
            combinationSum2: 'List<List<Integer>>', exist: 'boolean',
            partition: 'List<List<String>>', letterCombinations: 'List<String>',
            solveNQueens: 'List<List<String>>', canFinish: 'boolean',
            findOrder: 'int[]', findRedundantConnection: 'int[]',
            countComponents: 'int', validTree: 'boolean',
            ladderLength: 'int', findItinerary: 'List<String>',
            minCostConnectPoints: 'int', networkDelayTime: 'int',
            swimInWater: 'int', findOrder2: 'int[]', cheapestFlightsWithinKStops: 'int',
            climbStairs: 'int', minCostClimbingStairs: 'int',
            rob: 'int', rob2: 'int', longestPalindrome: 'String',
            countSubstrings: 'int', numDecodings: 'int', coinChange: 'int',
            maxProduct: 'int', wordBreak: 'boolean', lengthOfLIS: 'int',
            canPartition: 'boolean', uniquePaths: 'int', longestCommonSubsequence: 'int',
            maxProfitWithCooldown: 'int', change: 'int', findTargetSumWays: 'int',
            isInterleave: 'boolean', longestIncreasingPath: 'int',
            numDistinct: 'int', minDistance: 'int', maxCoins: 'int',
            isMatch: 'boolean', maxSubArray: 'int', canJump: 'boolean',
            jump: 'int', canCompleteCircuit: 'int', rearrangeBarcodes: 'int[]',
            mergeTriplets: 'List<List<Integer>>', partitionLabels: 'List<Integer>',
            checkValidString: 'boolean', merge: 'int[][]', insert: 'int[][]',
            eraseOverlapIntervals: 'int', minMeetingRooms: 'int',
            minInterval: 'List<Integer>', rotate: 'void', spiralOrder: 'List<Integer>',
            setZeroes: 'void', isHappy: 'boolean', plusOne: 'int[]',
            myPow: 'double', multiply: 'String',
            singleNumber: 'int', hammingWeight: 'int', countBits: 'int[]',
            reverseBits: 'int', missingNumber: 'int', getSum: 'int', reverse: 'int',
            trap: 'int', evalRPN: 'int', evalExpression: 'int',
            kthSmallestInMatrix: 'int', topKFrequent: 'int[]', frequencySort: 'int[]',
            productExceptSelf: 'int[]', isValidSudoku: 'boolean', solve: 'void',
            findMin: 'int', search: 'int', sortColors: 'void',
            mergeKLists: 'ListNode', reverseKGroup: 'ListNode',
            lruCache: 'void', randomPick: 'void', medianFinder: 'void',
            lastStoneWeight: 'int', kClosest: 'int[][]', findKthLargest: 'int',
            leastInterval: 'int', tweetCounts: 'void',
            minArea: 'int', updateMatrix: 'int[][]', maxDistance: 'int',
            shortestBridge: 'int', orangesRotting: 'int',
            wallsAndGates: 'void', updateBoard: 'char[][]',
            findCircleNum: 'int', validMountainArray: 'boolean',
            findMedianSortedArrays: 'double', removeNthFromEnd: 'ListNode',
            reorderList: 'void', deleteDuplicates: 'ListNode',
            searchMatrix: 'boolean', searchMatrix2: 'boolean',
            minEatingSpeed: 'int', timeMapGetValue: 'String',
        };
        const fallbackJava = (fn) => {
            if (fn.startsWith('is') || fn.startsWith('has') || fn.startsWith('can') || fn.startsWith('valid'))
                return 'boolean';
            if (fn.startsWith('max') || fn.startsWith('min') || fn.startsWith('count') || fn.startsWith('find'))
                return 'int';
            return 'int';
        };
        const savedKey = `dsa-code-${problemId}-${language}`;
        const saved = localStorage.getItem(savedKey);
        if (saved) {
            setCode(saved);
            setTestResults(null);
            setSummary('');
            setSelectedTc(-1);
            return;
        }
        apiGet(`/user/${userId}/code/${problemId}/${language}`).then(res => {
            if (!res.fallback && res.code) {
                setCode(res.code);
                setTestResults(null);
                setSummary('');
                setSelectedTc(-1);
                return;
            }
            const templates = {
                javascript: sel.starterCode && sel.starterCode.includes('javascript') ? sel.starterCode : `function ${sel.funcName}(${sel.funcArgs}) {\n  \n}`,
                python: sel.starterCode && sel.starterCode.includes('def ') ? sel.starterCode : `def ${sel.funcName}(${sel.funcArgs}):\n    pass\n`,
                java: `class Solution {\n    public static ${javaReturnTypes[sel.funcName] || fallbackJava(sel.funcName)} ${sel.funcName}(${sel.funcArgs}) {\n        \n    }\n}`,
                cpp: sel.starterCode && sel.starterCode.includes('vector') ? sel.starterCode : `class Solution {\npublic:\n    int ${sel.funcName}(${sel.funcArgs}) {\n        \n    }\n};`,
            };
            setCode(templates[language] || templates.javascript);
            setTestResults(null);
            setSummary('');
            setSelectedTc(-1);
        });
    }, [problemId, language, userId]);
    const handleCodeChange = useCallback((newCode) => {
        setCode(newCode);
        localStorage.setItem(`dsa-code-${problemId}-${language}`, newCode);
        apiPut(`/user/${userId}/code`, { problemId, language, code: newCode });
    }, [problemId, language, userId]);
    const parseError = (err, lang) => {
        const cleaned = err.replace(/^(Error|error|ERROR):\s*/i, '').replace(/Traceback \(most recent call last\):\s*/g, '').replace(/File ".*?script\.\w+", line \d+, in .+\n/g, '');
        const lineMatch = cleaned.match(/(?:line|Line)\s+(\d+)/i) || cleaned.match(/:(\d+)/);
        const line = lineMatch ? parseInt(lineMatch[1]) : undefined;
        let title = 'Error';
        let message = cleaned.trim();
        if (cleaned.includes('SyntaxError') || cleaned.includes('Syntax')) {
            title = 'Syntax Error';
        }
        else if (cleaned.includes('TypeError') || cleaned.includes('Type')) {
            title = 'Type Error';
        }
        else if (cleaned.includes('ReferenceError') || cleaned.includes('Reference')) {
            title = 'Reference Error';
        }
        else if (cleaned.includes('compile error') || cleaned.includes('Compile')) {
            title = 'Compile Error';
        }
        else if (cleaned.includes('Runtime error') || cleaned.includes('runtime')) {
            title = 'Runtime Error';
        }
        else if (cleaned.includes('NameError') || cleaned.includes('name')) {
            title = 'Name Error';
        }
        else if (cleaned.includes('IndexError') || cleaned.includes('index')) {
            title = 'Index Error';
        }
        else if (cleaned.includes('KeyError') || cleaned.includes('key')) {
            title = 'Key Error';
        }
        else if (cleaned.includes('ValueError') || cleaned.includes('value')) {
            title = 'Value Error';
        }
        else if (cleaned.includes('AttributeError')) {
            title = 'Attribute Error';
        }
        else if (cleaned.includes('MemoryError') || cleaned.includes('memory')) {
            title = 'Memory Error';
        }
        else if (cleaned.includes('Timeout') || cleaned.includes('timeout')) {
            title = 'Time Limit Exceeded';
        }
        message = message.split('\n').filter(l => l.trim()).slice(0, 3).join('\n');
        return { title, message, line };
    };
    const runRemote = async () => {
        setTestResults(null);
        setSummary('Running...');
        try {
            const valid = sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0);
            if (!valid.length) {
                setSummary('No test cases defined');
                return;
            }
            const resp = await fetch('/execute', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, language, funcName: sel.funcName, testCases: valid }),
            });
            const data = await resp.json();
            if (data.error) {
                setSummary(`__ERR__${data.error}`);
                return;
            }
            const results = data.results.map((r, i) => ({ ...r, index: i }));
            setTestResults(results);
            const pass = results.filter((r) => r.passed).length;
            setSummary(`${pass}/${results.length} passed`);
            return { passed: pass, total: results.length };
        }
        catch (e) {
            setSummary(`__ERR__${e.message}`);
        }
    };
    const runCode = async () => { setRunning(true); if (isExec)
        await runRemote();
    else
        setSummary('Not supported'); setRunning(false); };
    const submitCode = async () => {
        setSubmitting(true);
        if (isExec) {
            const res = await runRemote();
            if (res && res.passed === res.total) {
                setShowSuccess(true);
                setShowInterviewBtn(true);
                setTimeout(() => setShowSuccess(false), 3000);
                if (!solvedProblems.has(sel.id)) {
                    const newSolved = new Set([...solvedProblems, sel.id]);
                    setSolvedProblems(newSolved);
                    const today = getToday();
                    const h = [...profile.dailyHistory];
                    const todayEntry = h.find(e => e.date === today);
                    if (todayEntry)
                        todayEntry.solved++;
                    else
                        h.push({ date: today, solved: 1 });
                    setProfile({ ...profile, totalSolved: profile.totalSolved + 1, currentStreak: profile.lastActiveDate === today ? profile.currentStreak : profile.lastActiveDate === getYesterday() ? profile.currentStreak + 1 : 1, lastActiveDate: today, dailyHistory: h });
                }
            }
        }
        setSubmitting(false);
    };
    const handleSplitDown = (e) => {
        e.preventDefault();
        isDragging.current = true;
        const startX = e.clientX, startW = sidebarWidth;
        const onMove = (ev) => { if (isDragging.current)
            setSidebarWidth(Math.max(200, Math.min(600, startW + ev.clientX - startX))); };
        const onUp = () => { isDragging.current = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; document.body.style.userSelect = ''; };
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };
    const handleTermDown = (e) => {
        e.preventDefault();
        isDragging.current = true;
        const startY = e.clientY, startH = termHeight;
        const onMove = (ev) => { if (isDragging.current)
            setTermHeight(Math.max(80, Math.min(400, startH + startY - ev.clientY))); };
        const onUp = () => { isDragging.current = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; document.body.style.userSelect = ''; };
        document.body.style.cursor = 'row-resize';
        document.body.style.userSelect = 'none';
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    };
    return (_jsxs(_Fragment, { children: [_jsx("header", { className: "topbar", children: _jsxs("div", { className: "topbar-inner", children: [_jsx("div", { className: "topbar-left", children: _jsxs("a", { href: "#", className: "topbar-logo", onClick: e => { e.preventDefault(); onBack(); }, children: [_jsx("span", { className: "topbar-logo-icon", style: { background: '#6366f1' }, children: "\u2211" }), _jsxs("span", { className: "topbar-logo-text", children: ["DSA ", _jsx("span", { style: { color: '#38bdf8' }, children: "INSIGHTS" })] })] }) }), _jsx("div", { className: "topbar-right", children: _jsx("div", { className: "topbar-user", children: _jsx("div", { className: "topbar-avatar", children: userName.charAt(0).toUpperCase() }) }) })] }) }), _jsx("div", { className: "app-shell", children: _jsxs("div", { className: "problem-layout", children: [_jsxs("aside", { className: "sidebar", style: { width: sidebarWidth }, children: [_jsxs("button", { className: "back-button", onClick: onBack, children: ['\u2190', " Back"] }), _jsxs("div", { className: "problem-detail-header", children: [_jsx("h1", { children: sel.title }), _jsxs("div", { className: "badge-row", children: [_jsx("span", { className: `badge ${sel.difficulty.toLowerCase()}`, children: sel.difficulty }), sel.tags.map(t => _jsx("span", { className: "question-tag", children: t }, t))] })] }), _jsx("div", { className: "problem-description-scroll", children: _jsxs("div", { className: "question-card", children: [_jsx("p", { children: sel.description }), _jsxs("div", { className: "examples", children: [_jsx("h3", { children: "Examples" }), sel.examples.filter(ex => ex.input !== '-' || ex.output !== '-').map((ex, i) => (_jsxs("div", { className: "example-block", children: [_jsxs("div", { className: "example-label", children: ["Example ", i + 1] }), _jsxs("div", { className: "example-io", children: [_jsxs("div", { className: "example-row", children: [_jsx("span", { className: "example-key", children: "Input:" }), " ", _jsx("code", { children: ex.input })] }), _jsxs("div", { className: "example-row", children: [_jsx("span", { className: "example-key", children: "Output:" }), " ", _jsx("code", { children: ex.output })] }), ex.explanation && _jsxs("div", { className: "example-row", children: [_jsx("span", { className: "example-key", children: "Explanation:" }), " ", _jsx("code", { children: ex.explanation })] })] })] }, i))), sel.examples.filter(ex => ex.input !== '-' || ex.output !== '-').length === 0 && (_jsx("p", { style: { color: 'var(--text-muted)', fontSize: '13px' }, children: "See the problem description above for examples." }))] }), _jsxs("div", { className: "constraints", children: [_jsx("h3", { children: "Constraints" }), _jsx("ul", { children: sel.constraints.map((c, i) => _jsx("li", { children: c }, i)) })] })] }) })] }), _jsx("div", { className: "sidebar-splitter", onMouseDown: handleSplitDown }), _jsxs("section", { className: "problem-detail", children: [_jsxs("div", { className: "editor-card", children: [_jsxs("div", { className: "editor-header", children: [_jsx("strong", { children: "Code" }), _jsxs("select", { className: "lang-select", value: language, onChange: e => setLanguage(e.target.value), children: [_jsx("option", { value: "javascript", children: "JavaScript" }), _jsx("option", { value: "python", children: "Python" }), _jsx("option", { value: "java", children: "Java" }), _jsx("option", { value: "cpp", children: "C++" })] }), _jsxs("div", { className: "editor-actions", children: [_jsx("button", { className: "btn-run", onClick: runCode, disabled: running || submitting, children: running ? 'Running...' : '\u25B6 Run' }), _jsx("button", { className: "btn-submit", onClick: submitCode, disabled: running || submitting, children: submitting ? 'Submitting...' : '\u2601 Submit' }), showInterviewBtn && _jsx("button", { className: "btn-interview", onClick: () => setShowInterview(true), style: { background: '#7c3aed' }, children: "Interview" })] })] }), _jsx(CodeEditor, { code: code, onChange: handleCodeChange, language: language })] }), _jsx("div", { className: "terminal-splitter", onMouseDown: handleTermDown }), _jsxs("div", { className: "terminal-panel", style: { height: termHeight }, children: [_jsxs("div", { className: "terminal-header", children: [_jsx("div", { className: "terminal-tabs", children: sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0).map((_, i) => {
                                                        let cls = 'terminal-tab';
                                                        const r = testResults?.[i];
                                                        if (r)
                                                            cls += r.passed ? ' tab-pass' : ' tab-fail';
                                                        return _jsxs("button", { className: `${cls}${i === selectedTc ? ' active' : ''}`, onClick: () => setSelectedTc(i), children: [r && _jsx("span", { className: "tab-icon", children: r.passed ? '\u2713' : '\u2717' }), " Case ", i + 1] }, i);
                                                    }) }), testResults && (_jsxs("div", { className: "terminal-progress", children: [_jsx("div", { className: "terminal-progress-bar", children: (() => { const p = testResults.filter(r => r.passed).length; const f = testResults.filter(r => !r.passed).length; const t = testResults.length; return (_jsxs(_Fragment, { children: [p > 0 && _jsx("div", { className: "terminal-progress-fill pass", style: { width: `${(p / t) * 100}%` } }), f > 0 && _jsx("div", { className: "terminal-progress-fill fail", style: { width: `${(f / t) * 100}%` } })] })); })() }), _jsx("span", { className: "terminal-progress-text", children: summary })] }))] }), _jsx("div", { className: "terminal-body", children: selectedTc >= 0 ? (() => {
                                                const valid = sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0);
                                                const tc = valid[selectedTc];
                                                if (!tc)
                                                    return null;
                                                return (_jsxs("div", { className: "tc-details", children: [_jsxs("div", { className: "tc-detail-row", children: [_jsx("span", { className: "tc-label", children: "Input:" }), _jsx("code", { className: "tc-value", children: JSON.stringify(tc.input) })] }), _jsxs("div", { className: "tc-detail-row", children: [_jsx("span", { className: "tc-label", children: "Expected:" }), _jsx("code", { className: "tc-value", children: JSON.stringify(tc.output) })] }), _jsxs("div", { className: "tc-detail-row", children: [_jsx("span", { className: "tc-label", children: "Actual:" }), testResults ? _jsx("code", { className: `tc-value ${testResults[selectedTc]?.passed ? 'tc-pass' : 'tc-fail'}`, children: JSON.stringify(testResults[selectedTc]?.actual) }) : _jsx("code", { className: "tc-value tc-pending", children: "not run yet" })] })] }));
                                            })() : summary ? (summary.startsWith('__ERR__') ? (() => {
                                                const raw = summary.slice(7);
                                                const err = parseError(raw, language);
                                                const lines = code.split('\n');
                                                const errLine = err.line && err.line <= lines.length ? err.line : null;
                                                return (_jsxs("div", { className: "tc-error-box", children: [_jsxs("div", { className: "tc-error-header", children: [_jsx("span", { className: "tc-error-icon", children: "!" }), _jsx("span", { className: "tc-error-title", children: err.title }), errLine && _jsxs("span", { className: "tc-error-line", children: ["Line ", errLine] })] }), _jsx("pre", { className: "tc-error-msg", children: err.message }), errLine && (_jsx("div", { className: "tc-error-code", children: _jsxs("div", { className: "tc-error-code-line", children: [_jsx("span", { className: "tc-error-code-ln", children: errLine }), _jsx("span", { className: "tc-error-code-text", children: lines[errLine - 1] || '' })] }) })), _jsx("div", { className: "tc-error-hint", children: err.title.includes('Compile') ? 'Fix the syntax error above and try again.' :
                                                                err.title.includes('Type') ? 'Check your data types and variable usage.' :
                                                                    err.title.includes('Reference') || err.title.includes('Name') ? 'This variable is not defined. Check spelling or declare it.' :
                                                                        err.title.includes('Index') ? 'Array index is out of bounds. Check your range.' :
                                                                            err.title.includes('Key') ? 'Key does not exist. Check the dictionary key.' :
                                                                                err.title.includes('Memory') ? 'Too much memory used. Optimize your approach.' :
                                                                                    err.title.includes('Time Limit') ? 'Too slow. Try a more efficient approach.' :
                                                                                        'Review your code and fix the issue above.' })] }));
                                            })() : (_jsx("div", { className: "tc-summary", children: testResults ? (_jsxs(_Fragment, { children: [_jsx("div", { className: `tc-summary-icon ${testResults.every(r => r.passed) ? 'pass' : 'fail'}`, children: testResults.every(r => r.passed) ? '\u2713' : '\u2717' }), _jsxs("div", { children: [_jsx("div", { className: `tc-summary-text ${testResults.every(r => r.passed) ? 'pass' : 'fail'}`, children: testResults.every(r => r.passed) ? 'All passed' : 'Some failed' }), _jsx("div", { className: "tc-summary-sub", children: summary })] })] })) : _jsx("div", { className: "tc-error", children: summary }) }))) : (_jsxs("div", { className: "tc-summary", children: [_jsx("div", { className: "tc-summary-icon neutral", children: '\u25C9' }), _jsxs("div", { children: [_jsx("div", { className: "tc-summary-text", children: "Ready" }), _jsx("div", { className: "tc-summary-sub", children: "Click Run to test your solution" })] })] })) })] })] })] }) }), showInterview && _jsx(InterviewModal, { problem: sel, onClose: () => setShowInterview(false), onComplete: () => { } }), showSuccess && (_jsx("div", { className: "success-overlay", onClick: () => setShowSuccess(false), children: _jsxs("div", { className: "success-modal", children: [_jsx("div", { className: "success-ring", children: _jsxs("svg", { className: "success-check-svg", viewBox: "0 0 100 100", children: [_jsx("circle", { className: "success-circle", cx: "50", cy: "50", r: "45", fill: "none", strokeWidth: "4" }), _jsx("path", { className: "success-check-path", d: "M30 52 L44 66 L70 36", fill: "none", strokeWidth: "5", strokeLinecap: "round", strokeLinejoin: "round" })] }) }), _jsx("div", { className: "success-title", children: "Accepted" }), _jsx("div", { className: "success-sub", children: "All test cases passed!" }), _jsx("div", { className: "success-problem", children: sel.title })] }) }))] }));
}
// ============================================================
// LANDING PAGE (guests)
// ============================================================
function LandingPage({ onGuest }) {
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    return (_jsxs("div", { className: "landing-shell", id: "top", children: [_jsx("header", { className: "landing-header", children: _jsxs("div", { className: "landing-header-inner", children: [_jsx("div", { className: "landing-header-left", children: _jsxs("a", { href: "#top", className: "landing-header-logo", children: [_jsx("div", { className: "landing-logo-icon", children: "\u2211" }), _jsxs("span", { children: ["DSA ", _jsx("span", { style: { color: '#818cf8' }, children: "INSIGHTS" })] })] }) }), _jsxs("nav", { className: "landing-header-center", children: [_jsx("a", { href: "#features", className: "landing-header-link", children: "Features" }), _jsx("a", { href: "#problems", className: "landing-header-link", children: "Problems" }), _jsx("a", { href: "#interview", className: "landing-header-link", children: "Interview" })] }), _jsx("div", { className: "landing-header-right", children: _jsx("button", { className: "btn-signin", onClick: () => setShowSignIn(true), children: "Sign In" }) })] }) }), _jsxs("section", { className: "landing-hero", children: [_jsxs("div", { className: "hero-copy", children: [_jsxs("div", { className: "eyebrow", children: ['\u2728', " Trusted by 10,000+ developers"] }), _jsxs("h1", { children: ["Where Code Meets", _jsx("br", {}), "Confidence."] }), _jsx("p", { children: "150+ curated DSA problems, real-time code execution, and AI-powered mock interviews \u2014 everything you need to land your dream tech job." }), _jsxs("div", { className: "hero-actions", children: [_jsx("button", { className: "primary-button", onClick: () => setShowSignUp(true), children: "Create Account" }), onGuest && _jsx("button", { className: "secondary-button", onClick: onGuest, children: "Try as Guest" })] }), _jsxs("div", { className: "hero-stats", children: [_jsxs("div", { className: "hero-stat", children: [_jsx("strong", { children: "150+" }), _jsx("span", { children: "Problems" })] }), _jsx("div", { className: "hero-stat-divider" }), _jsxs("div", { className: "hero-stat", children: [_jsx("strong", { children: "4" }), _jsx("span", { children: "Languages" })] }), _jsx("div", { className: "hero-stat-divider" }), _jsxs("div", { className: "hero-stat", children: [_jsx("strong", { children: "AI" }), _jsx("span", { children: "Interviews" })] })] })] }), _jsx("div", { className: "hero-visual", children: _jsxs("div", { className: "hero-panel", children: [_jsxs("div", { className: "panel-top", children: [_jsx("span", { children: "BinarySearch.java" }), _jsx("span", { style: { color: '#22c55e' }, children: "Accepted" })] }), _jsxs("div", { className: "panel-card", children: [_jsx("div", { className: "panel-label", children: "Problem" }), _jsx("div", { className: "panel-title", children: "Two Sum" }), _jsxs("div", { className: "panel-tags", children: [_jsx("span", { children: "Arrays" }), _jsx("span", { children: "Hash Table" })] })] }), _jsxs("div", { className: "panel-grid", children: [_jsx("div", { className: "panel-item", children: "JavaScript" }), _jsx("div", { className: "panel-item highlight", children: "O(n) Time" }), _jsx("div", { className: "panel-item", children: "Python" }), _jsx("div", { className: "panel-item highlight", children: "O(n) Space" })] })] }) })] }), _jsxs("section", { className: "landing-features", id: "features", children: [_jsxs("div", { className: "feature-card", children: [_jsx("div", { className: "feature-card-icon", children: '\u{1F4BB}' }), _jsx("strong", { children: "Code Editor" }), _jsx("p", { children: "Write solutions in JavaScript, Python, Java, or C++. Run your code against test cases instantly." })] }), _jsxs("div", { className: "feature-card", children: [_jsx("div", { className: "feature-card-icon", children: "AI" }), _jsx("h3", { children: "AI-Powered" }), _jsx("p", { children: "Get instant, intelligent feedback on your solutions with detailed explanations." })] }), _jsxs("div", { className: "feature-card", children: [_jsx("div", { className: "feature-card-icon", children: "MIC" }), _jsx("strong", { children: "Voice Input" }), _jsx("p", { children: "Skip typing. Speak your answers and the AI responds with voice, just like a real interview." })] })] }), _jsxs("section", { id: "problems", className: "landing-problems-section", children: [_jsxs("div", { className: "landing-problems-header", children: [_jsx("h2", { children: "Practice Problems" }), _jsx("p", { children: "Curated DSA problems from Easy to Hard" })] }), _jsx("div", { className: "landing-problems-grid", children: [{ t: 'Two Sum', d: 'Easy', c: '#22c55e' }, { t: 'Reverse Linked List', d: 'Easy', c: '#22c55e' }, { t: 'Valid Parentheses', d: 'Easy', c: '#22c55e' }, { t: 'Merge K Sorted Lists', d: 'Hard', c: '#ef4444' }, { t: 'Word Search', d: 'Medium', c: '#f59e0b' }, { t: 'Binary Tree Level Order', d: 'Medium', c: '#f59e0b' }].map(p => (_jsx("div", { className: "feature-card", style: { padding: 20 }, children: _jsxs("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx("strong", { style: { fontSize: 15 }, children: p.t }), _jsx("span", { style: { color: p.c, fontSize: 12, fontWeight: 600 }, children: p.d })] }) }, p.t))) })] }), _jsx("section", { id: "interview", className: "landing-interview-section", children: _jsxs("div", { className: "landing-interview-card", children: [_jsx("div", { className: "landing-interview-icon", children: "AI" }), _jsx("h2", { children: "Resume-Based AI Interview" }), _jsx("p", { children: "Upload your resume. Get asked questions tailored to your skills and experience. 15 minutes. Real feedback." }), _jsx("button", { className: "primary-button", onClick: () => setShowSignUp(true), children: "Get Started" })] }) }), _jsxs("footer", { className: "landing-footer", children: [_jsx("span", { children: "DSA INSIGHTS \u00A9 2026" }), _jsxs("div", { className: "landing-footer-links", children: [_jsx("a", { href: "#", children: "Privacy" }), _jsx("a", { href: "#", children: "Terms" })] })] }), showSignIn && (_jsx("div", { className: "auth-overlay", onClick: () => setShowSignIn(false), children: _jsxs("div", { className: "auth-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "auth-modal-logo", children: [_jsx("div", { className: "auth-modal-logo-icon", children: "\u25C6" }), _jsx("span", { children: "DSA Insights AI" })] }), _jsx(SignIn, { routing: "hash", appearance: clerkAppearance }), _jsxs("div", { className: "auth-switch", children: [_jsx("span", { children: "Don't have an account? " }), _jsx("button", { onClick: () => { setShowSignIn(false); setShowSignUp(true); }, children: "Sign up" })] })] }) })), showSignUp && (_jsx("div", { className: "auth-overlay", onClick: () => setShowSignUp(false), children: _jsxs("div", { className: "auth-modal", onClick: e => e.stopPropagation(), children: [_jsxs("div", { className: "auth-modal-logo", children: [_jsx("div", { className: "auth-modal-logo-icon", children: "\u25C6" }), _jsx("span", { children: "DSA Insights AI" })] }), _jsx(SignUp, { routing: "hash", appearance: clerkAppearance }), _jsxs("div", { className: "auth-switch", children: [_jsx("span", { children: "Already have an account? " }), _jsx("button", { onClick: () => { setShowSignUp(false); setShowSignIn(true); }, children: "Sign in" })] })] }) }))] }));
}
// ============================================================
// RESUME INTERVIEW SETUP (upload resume, start interview)
// ============================================================
function ResumeInterviewSetup({ onStart, onBack }) {
    const [resumeText, setResumeText] = useState('');
    const [fileName, setFileName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const fileRef = useRef(null);
    const handleFile = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        setFileName(file.name);
        setError('');
        setLoading(true);
        try {
            const text = await file.text();
            setResumeText(text);
        }
        catch {
            setError('Failed to read file. Try pasting your resume text instead.');
        }
        setLoading(false);
    };
    const handleStart = () => {
        if (!resumeText.trim()) {
            setError('Please upload or paste your resume.');
            return;
        }
        onStart(resumeText);
    };
    return (_jsxs("div", { className: "home-shell", children: [_jsx("div", { className: "page-back-row", children: _jsxs("button", { className: "page-back-btn", onClick: onBack, children: ['\u2190', " Back"] }) }), _jsxs("div", { className: "resume-setup", children: [_jsx("div", { className: "resume-setup-left", children: _jsxs("div", { className: "resume-setup-hero", children: [_jsx("div", { className: "resume-setup-badge", children: "AI Interview" }), _jsxs("h1", { children: ["Mock Interview", _jsx("br", {}), "Based on Your Resume"] }), _jsx("p", { children: "Upload your resume and our AI will ask tailored questions about your skills, projects, and experience." }), _jsxs("div", { className: "resume-features", children: [_jsxs("div", { className: "resume-feature", children: [_jsx("span", { className: "resume-feature-icon", children: '\u{1F4DD}' }), _jsxs("div", { children: [_jsx("strong", { children: "Resume-Based Questions" }), _jsx("span", { children: "AI reads your resume and asks relevant questions" })] })] }), _jsxs("div", { className: "resume-feature", children: [_jsx("span", { className: "resume-feature-icon", children: '\u23F1' }), _jsxs("div", { children: [_jsx("strong", { children: "15-Minute Session" }), _jsx("span", { children: "Timed interview like a real screening round" })] })] }), _jsxs("div", { className: "resume-feature", children: [_jsx("span", { className: "resume-feature-icon", children: '\u{1F4CA}' }), _jsxs("div", { children: [_jsx("strong", { children: "Instant Feedback" }), _jsx("span", { children: "Get scored on communication, depth, and alignment" })] })] })] })] }) }), _jsx("div", { className: "resume-setup-right", children: _jsxs("div", { className: "resume-upload-card", children: [_jsxs("div", { className: "resume-upload-header", children: [_jsx("h2", { children: "Upload Resume" }), _jsx("span", { className: "resume-upload-step", children: "Step 1 of 1" })] }), _jsxs("div", { className: "resume-upload-zone", onClick: () => fileRef.current?.click(), children: [_jsx("input", { ref: fileRef, type: "file", accept: ".txt,.pdf,.doc,.docx", onChange: handleFile, style: { display: 'none' } }), fileName ? (_jsxs(_Fragment, { children: [_jsx("div", { className: "resume-zone-icon success", children: '\u2713' }), _jsx("div", { className: "resume-zone-filename", children: fileName }), _jsx("div", { className: "resume-zone-change", children: "Click to change file" })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "resume-zone-icon", children: '\u{1F4C4}' }), _jsxs("div", { className: "resume-zone-text", children: ["Drop your resume here or ", _jsx("span", { className: "resume-zone-browse", children: "browse" })] }), _jsx("div", { className: "resume-zone-hint", children: "Supports .txt, .pdf, .doc, .docx" })] }))] }), _jsx("div", { className: "resume-or-divider", children: _jsx("span", { children: "or paste below" }) }), _jsx("textarea", { className: "resume-textarea", placeholder: "Paste your resume content here...", value: resumeText, onChange: e => { setResumeText(e.target.value); setFileName(''); setError(''); }, rows: 7 }), error && _jsx("div", { className: "resume-error", children: error }), _jsx("button", { className: "resume-start-btn", onClick: handleStart, disabled: loading || !resumeText.trim(), children: loading ? 'Processing...' : 'Start Interview \u2192' })] }) })] })] }));
}
// ============================================================
// RESUME INTERVIEW PAGE (15-min chat, separate from editor interview)
// ============================================================
function ResumeInterviewPage({ resumeText, userName, onBack, onBackToSetup, profile, setProfile, }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(900);
    const [timerActive, setTimerActive] = useState(true);
    const [ended, setEnded] = useState(false);
    const [score, setScore] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [speakingIndex, setSpeakingIndex] = useState(null);
    const remainingTextRef = useRef('');
    const messagesRef = useRef([]);
    const scrollRef = useRef(null);
    const timerRef = useRef(null);
    const systemPromptRef = useRef('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const currentAudioRef = useRef(null);
    const audioUnlockedRef = useRef(false);
    const unlockAudio = () => {
        if (audioUnlockedRef.current)
            return;
        audioUnlockedRef.current = true;
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const buf = ctx.createBuffer(1, 1, 22050);
            const src = ctx.createBufferSource();
            src.buffer = buf;
            src.connect(ctx.destination);
            src.start(0);
        }
        catch { }
        try {
            const u = new SpeechSynthesisUtterance(' ');
            u.volume = 0;
            window.speechSynthesis?.speak(u);
        }
        catch { }
    };
    useEffect(() => { messagesRef.current = messages; }, [messages]);
    useEffect(() => {
        if (scrollRef.current) {
            setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
        }
    }, [messages, loading]);
    const speakFallbackBrowser = (text, index) => {
        if (!window.speechSynthesis)
            return;
        window.speechSynthesis.cancel();
        remainingTextRef.current = '';
        const clean = text.replace(/[*_`#\[\]{}|]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
        if (!clean)
            return;
        const utterance = new SpeechSynthesisUtterance(clean);
        utterance.rate = 0.92;
        utterance.pitch = 1.15;
        const voices = window.speechSynthesis.getVoices();
        const v = voices.find(x => x.lang.startsWith('en') && x.name.includes('Google') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en') && x.name.includes('Google'))
            || voices.find(x => x.lang.startsWith('en') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en-') && x.name.includes('Female'))
            || voices.find(x => x.lang.startsWith('en'))
            || voices[0];
        if (v)
            utterance.voice = v;
        utterance.onstart = () => setSpeakingIndex(index);
        utterance.onboundary = (e) => {
            if (e.name === 'word')
                remainingTextRef.current = clean.slice(e.charIndex);
        };
        utterance.onend = () => { remainingTextRef.current = ''; setSpeakingIndex(prev => prev === index ? null : prev); };
        utterance.onerror = () => { remainingTextRef.current = ''; setSpeakingIndex(prev => prev === index ? null : prev); };
        window.speechSynthesis.speak(utterance);
    };
    const speakText = (text, index, force = false) => {
        if (!force && (!voiceEnabled || !window.speechSynthesis))
            return;
        unlockAudio();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        remainingTextRef.current = '';
        setSpeakingIndex(index);
        const clean = text.replace(/[*_`#\[\]]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
        if (!clean)
            return;
        fetch('/api/interview/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: clean }),
        })
            .then(async (resp) => {
            const ct = resp.headers.get('content-type') || '';
            if (!resp.ok || ct.includes('application/json')) {
                speakFallbackBrowser(clean, index);
                return;
            }
            const blob = await resp.blob();
            window.speechSynthesis?.cancel();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            currentAudioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                remainingTextRef.current = '';
                setSpeakingIndex(prev => prev === index ? null : prev);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                speakFallbackBrowser(clean, index);
            };
            audio.play().catch(() => speakFallbackBrowser(clean, index));
        })
            .catch(() => speakFallbackBrowser(clean, index));
    };
    const resumeFromRemaining = (index) => {
        if (!remainingTextRef.current)
            return;
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        window.speechSynthesis?.cancel();
        setSpeakingIndex(index);
        const text = remainingTextRef.current;
        remainingTextRef.current = '';
        fetch('/api/interview/voice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text }),
        })
            .then(async (resp) => {
            const ct = resp.headers.get('content-type') || '';
            if (!resp.ok || ct.includes('application/json')) {
                speakFallbackBrowser(text, index);
                return;
            }
            const blob = await resp.blob();
            const url = URL.createObjectURL(blob);
            const audio = new Audio(url);
            currentAudioRef.current = audio;
            audio.onended = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                remainingTextRef.current = '';
                setSpeakingIndex(prev => prev === index ? null : prev);
            };
            audio.onerror = () => {
                URL.revokeObjectURL(url);
                currentAudioRef.current = null;
                speakFallbackBrowser(text, index);
            };
            audio.play().catch(() => speakFallbackBrowser(text, index));
        })
            .catch(() => speakFallbackBrowser(text, index));
    };
    const stopSpeaking = () => {
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        setSpeakingIndex(null);
    };
    const resumeSpeaking = (index) => {
        const msg = messages[index];
        if (msg)
            speakText(msg.content, index);
    };
    // Start interview
    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch('/api/resume-interview/start', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ resumeText, userName }),
                });
                const data = await resp.json();
                if (data.systemPrompt)
                    systemPromptRef.current = data.systemPrompt;
                if (data.initialMessage) {
                    setMessages([{ role: 'assistant', content: data.initialMessage }]);
                    setTimeout(() => speakText(data.initialMessage, 0), 500);
                }
            }
            catch {
                const firstName = userName.split(' ')[0];
                const fullResume = resumeText.slice(0, 8000);
                const fallbackPrompt = `You are Surya, a senior technical interviewer at a FAANG company conducting a 15-minute mock interview for ${firstName}. 

CANDIDATE'S FULL RESUME (read every line carefully):
========================================
${fullResume}
========================================

YOUR TASK:
1. READ EVERY LINE of the resume above. Extract ALL skills, technologies, tools, frameworks, projects, certifications, education, work experience, and achievements.
2. Ask questions ONLY about what is explicitly mentioned in the resume above.
3. Start with a warm greeting using the candidate's FIRST NAME only, mention something specific from their resume, then ask your first question.
4. After each answer the candidate gives:
   a. First evaluate their answer clearly - say if it is CORRECT, PARTIALLY CORRECT, or NEEDS IMPROVEMENT.
   b. Provide BRIEF FEEDBACK (2-3 sentences): what was good, what was wrong, and exactly how to improve.
   c. If their answer is WRONG, give them the correct approach or concept briefly, then ask a follow-up on the same topic.
   d. If their answer is GOOD, acknowledge it and move to a DEEPER question on a different resume aspect.
   e. Then ask a FOLLOW-UP question about a DIFFERENT aspect of their resume.
5. Go DEEP into each topic - ask about implementation details, architecture decisions, challenges faced.
6. Mix question types: resume-specific, technical deep-dive, behavioral, problem-solving.
7. Keep each response SHORT (2-3 sentences). Ask ONE question at a time.
8. Reference SPECIFIC details from their resume in every question.
9. NEVER ask generic questions not related to their resume.
10. After 8-10 exchanges, provide a detailed summary with score and thank them.
11. ALWAYS refer to yourself as "Surya" when introducing yourself.
12. You MUST extract and use keywords from the resume - if it mentions "Python", ask about Python. Match their EXACT technologies.

ANSWER EVALUATION GUIDELINES:
- WRONG answer: Say "That's not quite right", explain the correct concept briefly, then ask a follow-up to verify understanding.
- PARTIAL answer: Say "That's a good start, but..." and guide them to the complete answer.
- CORRECT answer: Say "Excellent!" or "That's spot on!" then go deeper or move to next topic.`;
                systemPromptRef.current = fallbackPrompt;
                const greeting = `Hi ${firstName}! I'm Surya, your interviewer today. I've carefully reviewed your resume. I can see you have experience with ${fullResume.split(',').slice(0, 3).join(', ').trim() || 'several technologies'}. Let's dive in - can you tell me about one of your most challenging projects and walk me through the technical decisions you made?`;
                setMessages([{ role: 'assistant', content: greeting }]);
                setTimeout(() => speakText(greeting, 0), 500);
            }
        })();
    }, []);
    // Timer
    useEffect(() => {
        if (timerActive && timer > 0) {
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        setTimeout(() => endInterview(), 0);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => { if (timerRef.current)
                clearInterval(timerRef.current); };
        }
    }, [timerActive]);
    const sendToAI = async (msgs) => {
        setLoading(true);
        try {
            const resp = await fetch('/api/interview/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [{ role: 'system', content: systemPromptRef.current }, ...msgs] }),
            });
            const data = await resp.json();
            if (data.reply) {
                const newIdx = msgs.length;
                setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
                setTimeout(() => speakText(data.reply, newIdx), 300);
            }
        }
        catch {
            const lastUserMsg = msgs[msgs.length - 1]?.content || '';
            const fallbackReplies = [
                `Good answer. Based on your resume, I noticed you've worked with several technologies. Can you explain how you handled error handling and edge cases in your most recent project?`,
                `That's interesting. Your resume mentions specific achievements. Can you dive deeper into the algorithms or data structures you used and why you chose them over alternatives?`,
                `Nice response. How did you measure the performance of your solution? What specific metrics did you track and what were the results?`,
                `I see. Your resume shows team experience. How did you collaborate with your team on the architecture? What was your specific contribution to technical decisions?`,
                `Good point. If you had to scale your most complex project 10x, what changes would you make to the design and infrastructure?`,
            ];
            const reply = fallbackReplies[messagesRef.current.length % fallbackReplies.length];
            const newIdx = msgs.length;
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
            setTimeout(() => speakText(reply, newIdx), 300);
        }
        finally {
            setLoading(false);
        }
    };
    const endInterview = async () => {
        setTimerActive(false);
        if (timerRef.current)
            clearInterval(timerRef.current);
        setEnded(true);
        const today = getToday();
        const yesterday = getYesterday();
        const newStreak = profile.lastActiveDate === today ? profile.currentStreak
            : profile.lastActiveDate === yesterday ? profile.currentStreak + 1 : 1;
        setProfile({ ...profile, currentStreak: newStreak, lastActiveDate: today });
        try {
            const resp = await fetch('/api/resume-interview/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messagesRef.current, resumeText }),
            });
            const data = await resp.json();
            const raw = data.score || '';
            const match = raw.match(/(\d+(?:\.\d+)?)\s*\/\s*100/);
            const outOf10 = match ? Math.round(parseFloat(match[1]) / 10) : Math.min(10, Math.max(1, messagesRef.current.filter(m => m.role === 'user').length));
            setScore(`${outOf10}/10\n\n${raw}`);
        }
        catch {
            const qCount = messagesRef.current.filter(m => m.role === 'user').length;
            const scoreVal = Math.min(10, Math.max(1, Math.round(qCount * 1.5)));
            setScore(`${scoreVal}/10`);
        }
    };
    const sendMessage = async () => {
        if (!input.trim() || loading)
            return;
        const userMsg = input.trim();
        setInput('');
        const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
        setMessages(cur);
        await sendToAI(cur);
    };
    const startRecording = async () => {
        unlockAudio();
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        remainingTextRef.current = '';
        setSpeakingIndex(null);
        // Try browser-based speech recognition first (no API needed)
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';
            let lastProcessedIdx = 0;
            recognition.onresult = (event) => {
                let transcript = '';
                for (let i = lastProcessedIdx; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript;
                        lastProcessedIdx = i + 1;
                    }
                }
                if (transcript)
                    setInput(prev => prev + (prev ? ' ' : '') + transcript);
            };
            recognition.onend = () => setIsRecording(false);
            recognition.onerror = () => {
                setIsRecording(false);
                startRecordingFallback();
            };
            try {
                recognition.start();
                setIsRecording(true);
                return;
            }
            catch { }
        }
        startRecordingFallback();
    };
    const startRecordingFallback = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];
            mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);
            mediaRecorder.onstop = async () => {
                stream.getTracks().forEach(t => t.stop());
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const formData = new FormData();
                formData.append('audio', blob, 'audio.webm');
                try {
                    const resp = await fetch('/api/interview/speech-to-text', { method: 'POST', body: formData });
                    const data = await resp.json();
                    if (data.text) {
                        setInput(prev => prev + (prev ? ' ' : '') + data.text);
                    }
                }
                catch { }
            };
            mediaRecorder.start();
            setIsRecording(true);
        }
        catch {
            alert('Microphone access denied. Please allow microphone access in your browser settings.');
        }
    };
    const stopRecording = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition && isRecording) {
            // Browser speech recognition stops automatically
            setIsRecording(false);
            return;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };
    const close = () => {
        window.speechSynthesis?.cancel();
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current = null;
        }
        if (timerRef.current)
            clearInterval(timerRef.current);
        setTimerActive(false);
        onBack();
    };
    const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
    return (_jsxs("div", { className: "resume-interview-shell", children: [_jsx("header", { className: "topbar", children: _jsxs("div", { className: "topbar-inner", children: [_jsxs("div", { className: "topbar-left", children: [_jsxs("button", { className: "page-back-btn", onClick: onBackToSetup, style: { marginRight: 8 }, children: ['\u2190', " Back"] }), _jsxs("a", { href: "#", className: "topbar-logo", onClick: e => { e.preventDefault(); onBack(); }, children: [_jsx("span", { className: "topbar-logo-icon", style: { background: '#6366f1' }, children: "\u2211" }), _jsxs("span", { className: "topbar-logo-text", children: ["DSA ", _jsx("span", { style: { color: '#38bdf8' }, children: "INSIGHTS" })] })] }), _jsxs("div", { className: "resume-interview-badge", children: ['\u2605', " SURYA"] })] }), _jsx("div", { className: "topbar-right", children: !ended && (_jsxs(_Fragment, { children: [_jsx("div", { className: `interview-timer ${timer < 60 ? 'danger' : ''}`, children: fmt(timer) }), _jsx("button", { className: "interview-end-btn", onClick: endInterview, children: "End Interview" })] })) })] }) }), _jsx("div", { className: "resume-interview-body", children: ended ? (_jsxs("div", { className: "resume-interview-score", children: [_jsxs("div", { className: "score-circle", children: [_jsx("div", { className: "score-circle-number", children: score.split('/')[0] || '?' }), _jsx("div", { className: "score-circle-label", children: "out of 10" })] }), _jsx("div", { className: "score-title", children: "Interview Complete" }), _jsx("div", { className: "score-details", children: score.split('\n').slice(1).join('\n') }), _jsx("button", { className: "landing-btn primary", onClick: close, children: "Back to Home" })] })) : (_jsxs("div", { className: "resume-interview-chat", children: [_jsxs("div", { className: "resume-interview-messages", ref: scrollRef, children: [messages.map((msg, i) => (_jsxs("div", { className: `resume-msg-row ${msg.role === 'user' ? 'user' : 'ai'}`, children: [msg.role === 'assistant' && _jsx("div", { className: "resume-msg-avatar ai", children: '\u2605' }), _jsxs("div", { className: `resume-msg-bubble ${msg.role}`, children: [msg.content, msg.role === 'assistant' && (_jsx("span", { className: `msg-run-hold ${speakingIndex === i ? 'playing' : ''}`, onClick: () => {
                                                        if (speakingIndex === i) {
                                                            window.speechSynthesis?.cancel();
                                                            if (currentAudioRef.current) {
                                                                currentAudioRef.current.pause();
                                                                currentAudioRef.current = null;
                                                            }
                                                            remainingTextRef.current = '';
                                                            setSpeakingIndex(null);
                                                        }
                                                        else {
                                                            window.speechSynthesis?.cancel();
                                                            if (currentAudioRef.current) {
                                                                currentAudioRef.current.pause();
                                                                currentAudioRef.current = null;
                                                            }
                                                            speakText(msg.content, i, true);
                                                        }
                                                    }, children: speakingIndex === i ? '\u23F8' : '\u25B6' }))] }), msg.role === 'user' && _jsx("div", { className: "resume-msg-avatar user", children: userName.charAt(0) })] }, i))), loading && (_jsxs("div", { className: "resume-msg-row ai", children: [_jsx("div", { className: "resume-msg-avatar ai", children: '\u2605' }), _jsx("div", { className: "resume-msg-bubble assistant", children: _jsx("span", { className: "chat-run-dot" }) })] }))] }), _jsxs("div", { className: "resume-interview-input", children: [_jsx("button", { className: `resume-voice-btn ${isRecording ? 'recording' : ''}`, onClick: isRecording ? stopRecording : startRecording, title: isRecording ? 'Stop recording' : 'Voice input', children: isRecording ? (_jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("rect", { x: "6", y: "6", width: "12", height: "12", rx: "2" }) })) : (_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" }), _jsx("path", { d: "M19 10v2a7 7 0 0 1-14 0v-2" }), _jsx("line", { x1: "12", y1: "19", x2: "12", y2: "22" })] })) }), _jsx("button", { className: `resume-voice-toggle ${voiceEnabled ? 'active' : ''}`, onClick: () => setVoiceEnabled(!voiceEnabled), title: voiceEnabled ? 'Mute AI voice' : 'Enable AI voice', children: voiceEnabled ? (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("polygon", { points: "11 5 6 9 2 9 2 15 6 15 11 19 11 5" }), _jsx("path", { d: "M15.54 8.46a5 5 0 0 1 0 7.07" }), _jsx("path", { d: "M19.07 4.93a10 10 0 0 1 0 14.14" })] })) : (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "1", y1: "1", x2: "23", y2: "23" }), _jsx("path", { d: "M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" }), _jsx("path", { d: "M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.5-.35 2.18" }), _jsx("line", { x1: "12", y1: "19", x2: "12", y2: "22" }), _jsx("line", { x1: "8", y1: "23", x2: "16", y2: "23" })] })) }), _jsx("input", { type: "text", value: input, onChange: e => setInput(e.target.value), onKeyDown: e => e.key === 'Enter' && sendMessage(), placeholder: isRecording ? 'Listening...' : 'Type or speak your answer...', disabled: loading }), _jsx("button", { className: "resume-send-btn", onClick: sendMessage, disabled: loading || !input.trim(), children: _jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" }) }) })] })] })) })] }));
}
// ============================================================
// MAIN APP
// ============================================================
function AuthenticatedApp({ userId, userName, userEmail, onGoHome, }) {
    const [page, setPage] = useState('home');
    const [selectedId, setSelectedId] = useState(problems[0].id);
    const [solvedProblems, setSolvedProblems] = useState(new Set());
    const [profile, setProfile] = useState(emptyProfile());
    const [loaded, setLoaded] = useState(false);
    const [resumeText, setResumeText] = useState('');
    const [celebrations, setCelebrations] = useState([]);
    useEffect(() => {
        loadProfile(userId).then(p => { setProfile(p); setLoaded(true); });
        loadSolved(userId).then(s => setSolvedProblems(s));
    }, [userId]);
    useEffect(() => { if (loaded)
        saveProfile(userId, profile); }, [profile, loaded, userId]);
    useEffect(() => { if (loaded)
        saveSolved(userId, solvedProblems); }, [solvedProblems, loaded, userId]);
    useEffect(() => {
        const achievements = computeAchievements(solvedProblems, profile);
        const key = CELEB_KEY(userId);
        let done = [];
        try {
            done = JSON.parse(localStorage.getItem(key) || '[]');
        }
        catch { /* ignore */ }
        const newly = achievements
            .map((a, idx) => ({ ...a, idx }))
            .filter(a => a.earned && !done.includes(a.idx));
        if (newly.length === 0)
            return;
        const palette = ['#f9a8d4', '#ec4899', '#be185d', '#f59e0b', '#10b981', '#38bdf8'];
        const toSave = [...done, ...newly.map(n => n.idx)];
        localStorage.setItem(key, JSON.stringify(toSave));
        newly.forEach((a, i) => {
            const id = Date.now() + i;
            window.setTimeout(() => {
                setCelebrations(cs => [...cs, { id, icon: a.icon, title: a.title, desc: a.desc, color: palette[a.idx % palette.length] }]);
                window.setTimeout(() => setCelebrations(cs => cs.filter(c => c.id !== id)), 2000);
            }, i * 600);
        });
    }, [solvedProblems, profile, userId]);
    const selectProblem = (id) => { setSelectedId(id); setPage('editor'); };
    const renderCelebrations = () => (_jsx(_Fragment, { children: celebrations.map(c => (_jsx("div", { className: "global-celebrate", children: _jsxs("div", { className: "global-celebrate-card", style: { borderColor: `${c.color}88` }, children: [_jsx("div", { className: "global-celebrate-icon", style: { color: c.color }, children: c.icon }), _jsxs("div", { className: "global-celebrate-body", children: [_jsx("div", { className: "global-celebrate-title", children: '\u{1F389} Congratulations!' }), _jsxs("div", { className: "global-celebrate-sub", children: ["You unlocked ", _jsx("b", { style: { color: c.color }, children: c.title })] }), _jsx("div", { className: "global-celebrate-desc", children: c.desc })] })] }) }, c.id))) }));
    if (page === 'editor') {
        return (_jsxs(_Fragment, { children: [renderCelebrations(), _jsx(EditorPage, { problemId: selectedId, onBack: () => setPage('home'), userName: userName, userId: userId, solvedProblems: solvedProblems, setSolvedProblems: setSolvedProblems, profile: profile, setProfile: setProfile })] }));
    }
    if (page === 'resume-interview') {
        return (_jsxs(_Fragment, { children: [renderCelebrations(), _jsx(ResumeInterviewPage, { resumeText: resumeText, userName: userName, onBack: () => setPage('home'), onBackToSetup: () => setPage('interview'), profile: profile, setProfile: setProfile })] }));
    }
    const navigate = (p) => setPage(p);
    return (_jsxs(_Fragment, { children: [renderCelebrations(), _jsx(AppTopbar, { activePage: page, userName: userName, onNavigate: navigate }), page === 'home' && (_jsx(HomePage, { userName: userName, solvedProblems: solvedProblems, profile: profile, onNavigate: navigate })), page === 'problems' && (_jsx(ProblemsPage, { solvedProblems: solvedProblems, onSelectProblem: selectProblem, onBack: () => setPage('home') })), page === 'leaderboard' && (_jsx(LeaderboardPage, { userName: userName, solvedProblems: solvedProblems, profile: profile, onBack: () => setPage('home') })), page === 'profile' && (_jsx(ProfilePage, { userName: userName, userEmail: userEmail, solvedProblems: solvedProblems, profile: profile, onBack: () => setPage('home'), onSignOut: onGoHome, onOpenProblem: selectProblem })), page === 'interview' && (_jsx(ResumeInterviewSetup, { onStart: (text) => { setResumeText(text); setPage('resume-interview'); }, onBack: () => setPage('home') }))] }));
}
function LocalApp() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [showLogin, setShowLogin] = useState(true);
    if (user) {
        return _jsx(AuthenticatedApp, { userId: user.id, userName: user.name, userEmail: user.email, onGoHome: () => setUser(null) });
    }
    return (_jsxs("div", { className: "landing-shell", id: "top", children: [_jsx("header", { className: "landing-header", children: _jsx("div", { className: "landing-header-inner", children: _jsx("div", { className: "landing-header-left", children: _jsxs("a", { href: "#top", className: "landing-header-logo", children: [_jsx("div", { className: "landing-logo-icon", children: "\u2211" }), _jsxs("span", { children: ["DSA ", _jsx("span", { style: { color: '#818cf8' }, children: "INSIGHTS" })] })] }) }) }) }), _jsx("section", { className: "landing-hero", children: _jsxs("div", { className: "hero-copy", children: [_jsxs("div", { className: "eyebrow", children: ['\u2728', " Trusted by 10,000+ developers"] }), _jsxs("h1", { children: ["Where Code Meets", _jsx("br", {}), "Confidence."] }), _jsx("p", { children: "150+ curated DSA problems, real-time code execution, and AI-powered mock interviews." }), _jsx("div", { className: "hero-actions", children: _jsx("button", { className: "primary-button", onClick: () => setShowLogin(!showLogin), children: showLogin ? 'Create Account' : 'Sign In' }) })] }) }), _jsx("div", { className: "auth-overlay", style: { display: 'flex' }, children: _jsxs("div", { className: "auth-modal", children: [_jsxs("div", { className: "auth-modal-logo", children: [_jsx("div", { className: "auth-modal-logo-icon", children: "\u25C6" }), _jsx("span", { children: "DSA Insights AI" })] }), _jsxs("div", { style: { padding: '20px' }, children: [_jsxs("div", { style: { marginBottom: '14px' }, children: [_jsx("label", { style: { display: 'block', color: '#b0b0b0', fontSize: '13px', marginBottom: '6px' }, children: "Name" }), _jsx("input", { type: "text", value: name, onChange: e => setName(e.target.value), placeholder: "Your name", style: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #3a3a5c', background: '#12121f', color: '#f0f0f0', fontSize: '13px', boxSizing: 'border-box' } })] }), _jsxs("div", { style: { marginBottom: '14px' }, children: [_jsx("label", { style: { display: 'block', color: '#b0b0b0', fontSize: '13px', marginBottom: '6px' }, children: "Email" }), _jsx("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "Your email", style: { width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #3a3a5c', background: '#12121f', color: '#f0f0f0', fontSize: '13px', boxSizing: 'border-box' } })] }), _jsx("button", { className: "primary-button", style: { width: '100%' }, onClick: () => {
                                        if (!name.trim())
                                            return;
                                        setUser({ id: `local-${Date.now()}`, name: name.trim(), email: email.trim() || `${name.trim().toLowerCase()}@local` });
                                    }, children: showLogin ? 'Sign In' : 'Create Account' }), _jsxs("div", { className: "auth-switch", style: { marginTop: '12px' }, children: [_jsx("span", { children: showLogin ? "Don't have an account? " : "Already have an account? " }), _jsx("button", { onClick: () => setShowLogin(!showLogin), children: showLogin ? 'Sign up' : 'Sign in' })] })] })] }) })] }));
}
function ClerkApp() {
    const { isLoaded, isSignedIn, user } = useUser();
    const { signOut } = useClerk();
    const [guestMode, setGuestMode] = useState(false);
    if (guestMode) {
        return _jsx(AuthenticatedApp, { userId: "guest-user", userName: "Guest", userEmail: "guest@local", onGoHome: () => setGuestMode(false) });
    }
    if (!isLoaded)
        return _jsx("div", { className: "loading-screen", children: "Loading..." });
    if (!isSignedIn || !user)
        return _jsx(LandingPage, { onGuest: () => setGuestMode(true) });
    const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? '';
    const name = user.fullName || user.firstName || 'User';
    return _jsx(AuthenticatedApp, { userId: user.id, userName: name, userEmail: email, onGoHome: () => signOut() });
}
function App({ useClerk: useClerkAuth = false }) {
    if (useClerkAuth)
        return _jsx(ClerkApp, {});
    return _jsx(LocalApp, {});
}
export default App;
