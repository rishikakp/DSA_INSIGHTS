import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { SignUp, SignIn, useUser, useClerk } from '@clerk/react';
import { Problem, problems } from './problems';
import { getComplexity } from './complexity';

interface DayActivity { date: string; solved: number; }
interface ProfileData { totalSolved: number; currentStreak: number; lastActiveDate: string; dailyHistory: DayActivity[]; }
interface TestResult { index: number; passed: boolean; expected: any; actual: any; }
interface LeaderboardEntry { name: string; solved: number; streak: number; }

const PROFILE_KEY = (id: string) => `dsa-profile-${id}`;
const SOLVED_KEY = (id: string) => `dsa-solved-${id}`;
const LB_KEY = 'dsa-leaderboard';
const CELEB_KEY = (id: string) => `dsa-celebrated-${id}`;

const LinkedInIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const CopyIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const LinkIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

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
const emptyProfile = (): ProfileData => ({ totalSolved: 0, currentStreak: 0, lastActiveDate: '', dailyHistory: [] });


const API = '/api';

const apiGet = async (path: string) => {
  try { const r = await fetch(`${API}${path}`); return await r.json(); } catch { return { fallback: true }; }
};
const apiPost = async (path: string, body: any) => {
  try { const r = await fetch(`${API}${path}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return await r.json(); } catch { return { fallback: true }; }
};
const apiPut = async (path: string, body: any) => {
  try { const r = await fetch(`${API}${path}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); return await r.json(); } catch { return { fallback: true }; }
};

const loadProfile = async (id: string): Promise<ProfileData> => {
  const res = await apiGet(`/user/${id}`);
  if (res.fallback) { try { const s = localStorage.getItem(`dsa-profile-${id}`); if (!s) return emptyProfile(); return JSON.parse(s); } catch { return emptyProfile(); } }
  return res.user?.profile || emptyProfile();
};
const saveProfile = async (id: string, p: ProfileData) => {
  await apiPut(`/user/${id}`, { profile: p });
  localStorage.setItem(`dsa-profile-${id}`, JSON.stringify(p));
};
const loadSolved = async (id: string): Promise<Set<number>> => {
  const res = await apiGet(`/user/${id}/solved`);
  if (res.fallback) { try { const s = localStorage.getItem(`dsa-solved-${id}`); return s ? new Set(JSON.parse(s)) : new Set(); } catch { return new Set(); } }
  return new Set(res.solved || []);
};
const saveSolved = async (id: string, s: Set<number>) => {
  await apiPost(`/user/${id}/solved`, { problemId: -1 });
  localStorage.setItem(`dsa-solved-${id}`, JSON.stringify([...s]));
};

const categories = Array.from(new Set(problems.map(p => p.category)));

// ============================================================
// SYNTAX HIGHLIGHTING
// ============================================================
function highlightCode(code: string, language: string): string {
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const keywords: Record<string, string> = {
    javascript: 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|this|class|extends|import|export|default|from|try|catch|finally|throw|async|await|yield|typeof|instanceof|in|of|true|false|null|undefined|void|delete|static|super',
    python: 'def|return|if|elif|else|for|while|class|import|from|as|try|except|finally|raise|with|lambda|yield|pass|break|continue|True|False|None|and|or|not|is|in|del|global|nonlocal|assert|print',
    java: 'public|private|protected|static|final|class|interface|extends|implements|new|this|super|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|void|int|long|double|float|boolean|char|String|byte|short|Object|null|true|false|enum|abstract|synchronized|native|transient|volatile',
    cpp: 'int|long|double|float|bool|char|void|string|vector|map|set|pair|auto|const|static|return|if|else|for|while|do|switch|case|break|continue|class|struct|public|private|protected|new|delete|this|true|false|nullptr|namespace|using|template|typename|virtual|override|enum|typedef|#include',
  };

  const kw = keywords[language] || keywords.javascript;
  const kwRegex = new RegExp(`\\b(${kw})\\b`, 'g');

  const placeholder = '\x00';

  const protectedRegions: string[] = [];

  const protect = (match: string): string => {
    protectedRegions.push(match);
    return `${placeholder}${placeholder}${protectedRegions.length - 1}${placeholder}${placeholder}`;
  };

  let protected_text = escaped;

  if (language === 'python') {
    protected_text = protected_text.replace(/"""[\s\S]*?"""/g, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
    protected_text = protected_text.replace(/(#[^\n]*)/gm, (m) => protect(`<span style="color:#6a737d">${m}</span>`));
  } else {
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
const KEYWORDS: Record<string, string[]> = {
  javascript: ['const','let','var','function','return','if','else','for','while','do','switch','case','break','continue','new','this','class','extends','import','export','default','from','try','catch','finally','throw','async','await','yield','typeof','instanceof','in','of','true','false','null','undefined','void','delete','static','super','console','Math','Array','Object','String','Number','Boolean','Map','Set','Promise','JSON','Date','RegExp','Error','setTimeout','parseInt','parseFloat','includes','indexOf','push','pop','shift','unshift','splice','slice','map','filter','reduce','forEach','find','sort','reverse','join','split','trim','replace','startsWith','endsWith','charAt','charCodeAt','toString','length','keys','values','entries','from','assign','create','has','get','set','add','delete','clear','size','isArray','keys','entries','prototype','constructor','toString','valueOf','isPrototypeOf','propertyIsEnumerable'],
  python: ['def','return','if','elif','else','for','while','class','import','from','as','try','except','finally','raise','with','lambda','yield','pass','break','continue','True','False','None','and','or','not','is','in','del','global','nonlocal','assert','print','range','len','str','int','float','list','dict','tuple','set','bool','type','input','open','map','filter','zip','enumerate','sorted','reversed','any','all','sum','min','max','abs','round','isinstance','issubclass','hasattr','getattr','setattr','super','staticmethod','classmethod','property','self','append','extend','pop','insert','remove','index','count','sort','reverse','join','split','strip','replace','startswith','endswith','find','format','upper','lower','title','capitalize','encode','decode','items','keys','values','get','update','copy','clear','discard','add','union','intersection','difference','symmetric_difference'],
  java: ['public','private','protected','static','final','class','interface','extends','implements','new','this','super','return','if','else','for','while','do','switch','case','break','continue','try','catch','finally','throw','throws','void','int','long','double','float','boolean','char','String','byte','short','Object','null','true','false','enum','abstract','synchronized','native','transient','volatile','List','ArrayList','LinkedList','Map','HashMap','TreeMap','Set','HashSet','TreeSet','Queue','Deque','Stack','PriorityQueue','Collections','Arrays','Stream','Optional','Integer','Double','Float','Boolean','Character','Long','Short','Byte','System','Math','String','StringBuilder','BufferedReader','Scanner','System.out.println','System.out.print','Arrays.sort','Arrays.toString','Collections.sort','Collections.reverse','Collections.shuffle','Collections.unmodifiableList','Collections.unmodifiableMap','Collections.unmodifiableSet','Collections.synchronizedList','Collections.synchronizedMap','Collections.synchronizedSet','Collections.singletonList','Collections.singletonMap','Collections.singleton','Collections.emptyList','Collections.emptyMap','Collections.emptySet','Collections.frequency','Collections.max','Collections.min','Collections.rotate','Collections.swap','Collections.addAll','Collections.disjoint','Collections.indexOfSubList','Collections.lastIndexOfSubList','Collections.replaceAll','Collections.fill','Collections.copy','Collections.nCopies','Collections.singletonIterator','Collections.reverseOrder','Collections.reverseOrder Comparator','Collections.checkedCollection','Collections.checkedList','Collections.checkedMap','Collections.checkedSet','Collections.checkedSortedMap','Collections.checkedSortedSet','Collections.emptyListIterator','Collections.singletonList','Collections.singletonMap','Collections.singletonMap','Collections.singletonMap','Collections.singletonMap'],
  cpp: ['int','long','double','float','bool','char','void','string','vector','map','set','pair','auto','const','static','return','if','else','for','while','do','switch','case','break','continue','class','struct','public','private','protected','new','delete','this','true','false','nullptr','namespace','using','template','typename','virtual','override','enum','typedef','cout','cin','endl','include','algorithm','iostream','string','vector','map','set','stack','queue','priority_queue','pair','tuple','array','list','deque','unordered_map','unordered_set','multimap','multiset','numeric','cmath','cstring','cstdlib','cstdio','cassert','climits','cfloat','functional','memory','utility','iostream','fstream','sstream','iomanip','bitset','regex','thread','mutex','atomic','future','chrono','random','limits','type_traits','remove_reference','enable_if','is_same','is_integral','is_floating_point','is_array','is_pointer','is_reference','is_const','is_volatile','is_function','is_class','is_enum','is_arithmetic','is_signed','is_unsigned','is_void','is_null_pointer','is_pod','is_trivial','is_standard_layout','is_polymorphic','is_abstract','is_final','is_constructible','is_default_constructible','is_copy_constructible','is_move_constructible','is_destructible','is_nothrow_constructible','is_nothrow_default_constructible','is_nothrow_copy_constructible','is_nothrow_move_constructible','is_nothrow_destructible','is_convertible','is_assignable','is_nothrow_assignable','is_swappable','is_nothrow_swappable','is_same_v','is_integral_v','is_floating_point_v','is_array_v','is_pointer_v','is_reference_v','is_const_v','is_volatile_v','is_function_v','is_class_v','is_enum_v','is_arithmetic_v','is_signed_v','is_unsigned_v','is_void_v','is_null_pointer_v','is_pod_v','is_trivial_v','is_standard_layout_v','is_polymorphic_v','is_abstract_v','is_final_v','is_constructible_v','is_default_constructible_v','is_copy_constructible_v','is_move_constructible_v','is_destructible_v','is_nothrow_constructible_v','is_nothrow_default_constructible_v','is_nothrow_copy_constructible_v','is_nothrow_move_constructible_v','is_nothrow_destructible_v','is_convertible_v','is_assignable_v','is_nothrow_assignable_v','is_swappable_v','is_nothrow_swappable_v'],
};

const SNIPPETS: Record<string, Record<string, string>> = {
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

function CodeEditor({
  code, onChange, language,
}: {
  code: string; onChange: (v: string) => void; language: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const preRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [cursorLine, setCursorLine] = useState(1);
  const [cursorCol, setCursorCol] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [sugPos, setSugPos] = useState({ top: 0, left: 0 });
  const [sugIdx, setSugIdx] = useState(0);
  const [sugPrefix, setSugPrefix] = useState('');
  const [sugType, setSugType] = useState<'keyword' | 'snippet'>('keyword');
  const sugRef = useRef<HTMLDivElement>(null);

  const lineCount = code.split('\n').length;

  const updateCursorPos = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
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

  const showAutoComplete = useCallback((pos: number) => {
    const before = code.substring(0, pos);
    const match = before.match(/(\w+)$/);
    if (!match) { hideSuggestions(); return; }
    const prefix = match[1].toLowerCase();
    if (prefix.length < 1) { hideSuggestions(); return; }

    const kwList = KEYWORDS[language] || KEYWORDS.javascript;
    const snippets = SNIPPETS[language] || {};
    const kwMatches = kwList.filter(k => k.toLowerCase().startsWith(prefix) && k !== prefix).slice(0, 15);
    const snipMatches = Object.keys(snippets).filter(k => k.toLowerCase().startsWith(prefix) && k !== prefix).slice(0, 5);
    const all = [...kwMatches.map(k => ({ label: k, type: 'keyword' as const })), ...snipMatches.map(k => ({ label: k + '()', type: 'snippet' as const }))];

    if (all.length === 0) { hideSuggestions(); return; }

    const ta = textareaRef.current;
    if (!ta) return;
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

  const insertSnippet = useCallback((label: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
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
    } else {
      const newVal = val.substring(0, wordStart) + label + after;
      onChange(newVal);
      const newPos = wordStart + label.length;
      setTimeout(() => { ta.selectionStart = ta.selectionEnd = newPos; ta.focus(); }, 0);
    }
    hideSuggestions();
  }, [sugPrefix, language, onChange, hideSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const val = ta.value;
    const hasSelection = start !== end;

    if (suggestions.length > 0) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSugIdx(i => Math.min(i + 1, suggestions.length - 1)); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSugIdx(i => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertSnippet(suggestions[sugIdx]);
        return;
      }
      if (e.key === 'Escape') { e.preventDefault(); hideSuggestions(); return; }
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
        } else {
          const newLines = lines.map(l => '  ' + l);
          const added = newLines.join('\n').length - selectedBlock.length;
          onChange(val.substring(0, lineStart) + newLines.join('\n') + val.substring(actualEnd));
          setTimeout(() => { ta.selectionStart = start + 2; ta.selectionEnd = end + added; }, 0);
        }
      } else {
        if (e.shiftKey) {
          const lineStart = val.lastIndexOf('\n', start - 1) + 1;
          const line = val.substring(lineStart, start);
          if (line.startsWith('  ')) {
            onChange(val.substring(0, lineStart) + line.substring(2) + val.substring(start));
            setTimeout(() => { ta.selectionStart = ta.selectionEnd = start - 2; }, 0);
          }
        } else {
          onChange(val.substring(0, start) + '  ' + val.substring(end));
          setTimeout(() => { ta.selectionStart = ta.selectionEnd = start + 2; }, 0);
        }
      }
      return;
    }

    const pairs: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
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
      const matchPairs: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
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
      if (lineEnd === -1) lineEnd = val.length;
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
        if (lastChar === '{' && nextChar === '}') addClosing = '\n' + indent;
        if (lastChar === '(' && nextChar === ')') addClosing = '\n' + indent;
        if (lastChar === '[' && nextChar === ']') addClosing = '\n' + indent;
      } else if (lastChar === ':') {
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

  const handleInput = () => {};

  const handleScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    if (preRef.current) {
      preRef.current.scrollTop = ta.scrollTop;
      preRef.current.scrollLeft = ta.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = ta.scrollTop;
    }
  }, []);

  const highlighted = highlightCode(code, language);

  return (
    <div className="code-editor-wrap" ref={wrapRef}>
      <div className="code-editor-gutter" ref={lineNumbersRef}>
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i + 1} className={`code-line-num${i + 1 === cursorLine ? ' active' : ''}`}>{i + 1}</div>
        ))}
      </div>
      <div className="code-editor-content">
        <div ref={preRef} className="code-editor-highlight" aria-hidden="true" dangerouslySetInnerHTML={{ __html: highlighted + '\n' }} />
        <textarea
          ref={textareaRef}
          className="code-editor-textarea"
          value={code}
          onChange={e => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={updateCursorPos}
          onClick={updateCursorPos}
          onInput={handleInput}
          onScroll={handleScroll}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          placeholder="Write your solution..."
        />
      </div>
      <div className="code-editor-statusbar">
        <span>Ln {cursorLine}, Col {cursorCol}</span>
        <span className="statusbar-lang">{language.charAt(0).toUpperCase() + language.slice(1)}</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

// ============================================================
// INTERVIEW MODAL (shared between home and editor)
// ============================================================
function InterviewModal({
  problem, onClose, onComplete,
}: {
  problem: Problem;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
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
  const messagesRef = useRef<Array<{role: string, content: string}>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerActiveRef = useRef(true);
  const systemPromptRef = useRef('');
  const mediaRecorderRef = useRef<any>(null);
  const audioChunksRef = useRef<any[]>([]);
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
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {}
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis?.speak(u);
    } catch {}
  }, []);

  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  const speakFallbackBrowser = (text: string, idx?: number) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    remainingTextRef.current = '';
    const clean = text.replace(/[*_`#\[\]{}|]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 0.92; u.pitch = 1.15; u.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const v = voices.find(x => x.lang.startsWith('en') && x.name.includes('Google') && x.name.includes('Female'))
      || voices.find(x => x.lang.startsWith('en') && x.name.includes('Google'))
      || voices.find(x => x.lang.startsWith('en') && x.name.includes('Female'))
      || voices.find(x => x.lang.startsWith('en-') && x.name.includes('Female'))
      || voices.find(x => x.lang.startsWith('en'))
      || voices[0];
    if (v) u.voice = v;
    u.onboundary = (e: any) => {
      if (e.name === 'word') remainingTextRef.current = clean.slice(e.charIndex);
    };
    u.onend = () => { remainingTextRef.current = ''; setSpeakingIdx(prev => prev === idx ? -1 : prev); };
    u.onerror = () => { remainingTextRef.current = ''; setSpeakingIdx(prev => prev === idx ? -1 : prev); };
    window.speechSynthesis.speak(u);
  };

  const speak = useCallback((text: string, idx?: number, force = false) => {
    if (!force && !voiceEnabled) return;
    unlockAudio();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    window.speechSynthesis?.cancel();
    if (idx !== undefined) setSpeakingIdx(idx);
    remainingTextRef.current = '';
    const clean = text.replace(/[*_`#\[\]]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    if (!clean) return;

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

  const resumeFromRemaining = useCallback((idx: number) => {
    if (!remainingTextRef.current) return;
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
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
          if (prev <= 1) { setTimeout(() => endInterview(), 0); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
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
        if (data.systemPrompt) systemPromptRef.current = data.systemPrompt;
        if (data.initialMessage) {
          setMessages([{ role: 'assistant', content: data.initialMessage }]);
          speak(data.initialMessage);
          setVoiceStatus('Click microphone or type your answer');
        }
      } catch {
        setVoiceStatus('Failed to start interview');
      }
    })();
  }, []);

  const sendToAI = async (msgs: Array<{role: string, content: string}>) => {
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
      } else if (data.error) {
        const fallback = getFallbackReply(msgs.length);
        setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
        speak(fallback, msgs.length);
        setVoiceStatus('');
      }
    } catch {
      const fallback = getFallbackReply(msgs.length);
      setMessages(prev => [...prev, { role: 'assistant', content: fallback }]);
      speak(fallback, msgs.length);
      setVoiceStatus('');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackReply = (msgCount: number) => {
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
    if (timerRef.current) clearInterval(timerRef.current);
    if (isRecording && mediaRecorderRef.current) { try { mediaRecorderRef.current.stop(); } catch {} setIsRecording(false); }
    window.speechSynthesis?.cancel();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
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
    } catch {
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
      } else {
        setVoiceStatus('No speech detected. Try again.');
      }
    } catch (err: any) {
      setVoiceStatus('Failed: ' + err.message);
    }
  };

  const toggleRecording = async () => {
    unlockAudio();
    if (isRecording) {
      const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SR && !mediaRecorderRef.current) { setIsRecording(false); return; }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') { mediaRecorderRef.current.stop(); setIsRecording(false); return; }
      setIsRecording(false);
      return;
    }
    window.speechSynthesis?.cancel();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    remainingTextRef.current = '';
    setSpeakingIdx(-1);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const recognition = new SR();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      let lastProcessedIdx = 0;
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = lastProcessedIdx; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
            lastProcessedIdx = i + 1;
          }
        }
        if (transcript) setInput(prev => prev + (prev ? ' ' : '') + transcript);
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
      } catch {}
    }
    toggleRecordingFallback();
  };

  const toggleRecordingFallback = async () => {
    if (isRecording && mediaRecorderRef.current) { mediaRecorderRef.current.stop(); setIsRecording(false); return; }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
      audioChunksRef.current = [];
      mr.ondataavailable = (e: any) => { if (e.data.size > 0) audioChunksRef.current.push(e.data); };
      mr.onstop = () => { stream.getTracks().forEach(t => t.stop()); handleRecordingStop(); };
      mediaRecorderRef.current = mr;
      mr.start();
      setIsRecording(true);
      setVoiceStatus('Listening... Speak now');
    } catch {
      setVoiceStatus('Microphone denied.');
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput('');
    const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
    setMessages(cur);
    await sendToAI(cur);
  };

  const close = () => {
    window.speechSynthesis?.cancel();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    if (isRecording && mediaRecorderRef.current) { try { mediaRecorderRef.current.stop(); } catch {} }
    onClose();
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="interview-overlay">
      <div className="interview-container" onClick={e => e.stopPropagation()}>
        <div className="interview-header">
          <div className="interview-header-left">
            <div className="interview-ai-badge">{'\u2605'}</div>
            <div>
              <div className="interview-title">SURYA</div>
              <div className="interview-subtitle">{problem.title}</div>
            </div>
          </div>
          <div className="interview-header-right">
            {!ended && <div className={`interview-timer ${timer < 60 ? 'danger' : ''}`}>{fmt(timer)}</div>}
            <button className="interview-icon-btn" onClick={() => { setVoiceEnabled(v => !v); if (voiceEnabled) window.speechSynthesis?.cancel(); }}>
              {voiceEnabled ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.5-.35 2.18"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
              )}
            </button>
            <button className="interview-icon-btn close" onClick={close}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
          </div>
        </div>

        {ended ? (
          <div className="interview-score-screen">
            <div className="score-circle">
              <div className="score-circle-number">{score.split('/')[0] || '?'}</div>
              <div className="score-circle-label">out of 10</div>
            </div>
            <div className="score-title">Interview Complete</div>
            <div className="score-details">{score.split('\n').slice(1).join('\n')}</div>
            <button className="score-close-btn" onClick={close}>Close</button>
          </div>
        ) : (
          <>
            <div className="interview-messages" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`interview-msg-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
                   {msg.role === 'assistant' && <div className="interview-msg-avatar ai">{'\u2605'}</div>}
                  <div className={`interview-msg-bubble ${msg.role}`}>
                    {msg.content}
                    {msg.role === 'assistant' && (
                      <span className={`msg-run-hold ${speakingIdx === i ? 'playing' : ''}`} onClick={() => {
                        if (speakingIdx === i) {
                          window.speechSynthesis?.cancel();
                          if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
                          remainingTextRef.current = '';
                          setSpeakingIdx(-1);
                        } else {
                          window.speechSynthesis?.cancel();
                          if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
                          speak(msg.content, i, true);
                        }
                      }}>
                        {speakingIdx === i ? '\u23F8' : '\u25B6'}
                      </span>
                    )}
                  </div>
                  {msg.role === 'user' && <div className="interview-msg-avatar user">U</div>}
                </div>
              ))}
              {loading && (
                <div className="interview-msg-row ai">
                   <div className="interview-msg-avatar ai">{'\u2605'}</div>
                  <div className="interview-msg-bubble assistant">
                    <span className="chat-run-dot" />
                  </div>
                </div>
              )}
              {voiceStatus && (
                <div className={`interview-status ${isRecording ? 'recording' : ''}`}>
                  {isRecording && <span className="recording-dot" />}
                  {voiceStatus}
                </div>
              )}
            </div>
            <div className="interview-input-bar">
              <div className="interview-input-row">
                <input type="text" value={input} onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder={isRecording ? 'Listening...' : 'Type your answer...'}
                  disabled={loading} className="interview-text-input" />
                <button className={`interview-mic-btn ${isRecording ? 'active' : ''}`} onClick={toggleRecording}>
                  {isRecording ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                  )}
                </button>
                <button className="interview-send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
                </button>
                <button className="interview-end-btn" onClick={endInterview}>
                  End Interview
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
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
function AppTopbar({
  activePage, userName, onNavigate,
}: {
  activePage: string; userName: string; onNavigate: (page: string) => void;
}) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          <a href="#" className="topbar-logo" onClick={e => { e.preventDefault(); onNavigate('home'); }}>
            <span className="topbar-logo-icon" style={{ background: '#6366f1' }}>&#8721;</span>
            <span className="topbar-logo-text">DSA <span style={{color:'#38bdf8'}}>INSIGHTS</span></span>
          </a>
            <nav className="topbar-center">
              <span className={`topbar-link ${activePage === 'problems' ? 'active' : ''}`} onClick={() => onNavigate('problems')}>Problems</span>
              <span className={`topbar-link ${activePage === 'interview' ? 'active' : ''}`} onClick={() => onNavigate('interview')}>Interview</span>
              <span className={`topbar-link ${activePage === 'leaderboard' ? 'active' : ''}`} onClick={() => onNavigate('leaderboard')}>Leaderboard</span>
            </nav>
        </div>
        <div className="topbar-right">
          <div className="topbar-user">
            <div className={`topbar-avatar ${activePage === 'profile' ? 'active' : ''}`} onClick={() => onNavigate('profile')}>
              {userName.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// ============================================================
// HOME PAGE (concepts dashboard)
// ============================================================
function HomePage({
  userName, solvedProblems, profile, onNavigate,
}: {
  userName: string;
  solvedProblems: Set<number>; profile: ProfileData;
  onNavigate: (page: string) => void;
}) {
  const getCatStats = (cat: string) => {
    const catProblems = problems.filter(p => p.category === cat);
    const solved = catProblems.filter(p => solvedProblems.has(p.id)).length;
    const easy = catProblems.filter(p => p.difficulty === 'Easy').length;
    const medium = catProblems.filter(p => p.difficulty === 'Medium').length;
    const hard = catProblems.filter(p => p.difficulty === 'Hard').length;
    return { total: catProblems.length, solved, easy, medium, hard };
  };

  return (
    <>
      <div className="home-shell">
        <div className="home-hero">
          <div className="home-hero-left">
            <div className="home-hero-avatar">{userName.charAt(0).toUpperCase()}</div>
            <div className="home-hero-text">
              <span className="home-hero-greeting">Welcome back,</span>
              <h1>{userName.split(' ')[0]} <span className="wave-emoji">&#x1F44B;</span></h1>
              <p>Master DSA concepts and ace your next technical interview.</p>
            </div>
          </div>
        </div>

        {/* DSA Concepts Grid */}
        <div className="home-concepts-section">
          <div className="home-section-header">
            <h2>DSA Concepts</h2>
            <p className="home-section-sub">Click a concept to explore related problems</p>
          </div>
          {(() => {
            const renderCard = (concept: typeof dsaConcepts[number]) => {
              const stats = getCatStats(concept.name);
              const pct = stats.total ? (stats.solved / stats.total) * 100 : 0;
              const complete = stats.total > 0 && stats.solved === stats.total;
              return (
                <div key={concept.name} className="road-card"
                  onClick={() => onNavigate('problems')}>
                  <div className="road-card-icon" style={{ background: (concept.color || '#888') + '1a', color: concept.color || '#888' }}>
                    {concept.icon}
                  </div>
                  <div className="road-card-title">{concept.name}</div>
                  <div className="road-card-desc">{concept.desc}</div>
                  <div className="road-card-progress">
                    <div className="road-card-track" style={{ background: (concept?.color || '#888') + '20' }}>
                      <div className="road-card-fill" style={{ width: `${pct}%`, background: complete ? '#10b981' : concept?.color || '#888' }} />
                    </div>
                    <div className="road-card-meta">{stats.solved} / {stats.total}</div>
                  </div>
                </div>
              );
            };
            return (
              <div className="roadmap-grid">
                {dsaConcepts.map(renderCard)}
              </div>
            );
          })()}
        </div>

        {/* Quick Actions Row */}
        <div className="home-actions-row">
          <div className="home-action-card" onClick={() => onNavigate('problems')}>
            <div className="home-action-icon">{'\u{1F4DD}'}</div>
            <div className="home-action-title">Practice Problems</div>
            <div className="home-action-desc">{problems.length} curated DSA problems from easy to hard</div>
          </div>
          <div className="home-action-card" onClick={() => onNavigate('interview')}>
            <div className="home-action-icon">AI</div>
            <div className="home-action-title">AI Interview</div>
            <div className="home-action-desc">Upload resume and practice with a 15-min AI interview</div>
          </div>
          <div className="home-action-card" onClick={() => onNavigate('leaderboard')}>
            <div className="home-action-icon">{'\u{1F3C6}'}</div>
            <div className="home-action-title">Leaderboard</div>
            <div className="home-action-desc">See how you rank among other practitioners</div>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// PROBLEMS PAGE (full problem list)
// ============================================================
function ProblemsPage({
  solvedProblems, onSelectProblem, onBack,
}: {
  solvedProblems: Set<number>; onSelectProblem: (id: number) => void; onBack: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [diffFilter, setDiffFilter] = useState<string>('all');
  const [catFilter, setCatFilter] = useState<string>('all');

  const filtered = problems.filter(p => {
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (diffFilter !== 'all' && p.difficulty.toLowerCase() !== diffFilter) return false;
    if (catFilter !== 'all' && p.category !== catFilter) return false;
    return true;
  });

  const filteredCats = Array.from(new Set(filtered.map(p => p.category)));

  return (
    <>
      <div className="home-shell">
        <div className="page-back-row">
          <button className="page-back-btn" onClick={onBack}>{'\u2190'} Back</button>
        </div>
        <div className="problems-page-header">
          <h1>Problems</h1>
          <p>{problems.length} problems across {categories.length} DSA topics</p>
        </div>

        <div className="problems-page-filters">
          <input className="home-search" type="text" placeholder="Search problems..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          <select className="home-diff-select" value={diffFilter} onChange={e => setDiffFilter(e.target.value)}>
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select className="home-diff-select" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
            <option value="all">All Topics</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="home-problems-list">
          {filteredCats.map(cat => {
            const catProblems = filtered.filter(p => p.category === cat);
            return (
              <div key={cat} className="home-problem-group">
                <div className="home-problem-group-title">{cat}</div>
                {catProblems.map(p => (
                  <div key={p.id} className="home-problem-row" onClick={() => onSelectProblem(p.id)}>
                    <div className="home-problem-left">
                      <span className="home-problem-id">{p.id}</span>
                      <span className="home-problem-name">{p.title}</span>
                      {solvedProblems.has(p.id) && <span className="home-solved-check">{'\u2713'}</span>}
                    </div>
                    <div className="home-problem-right">
                      <div className="home-problem-tags">
                        {p.tags.slice(0, 2).map(t => <span key={t} className="home-problem-tag">{t}</span>)}
                      </div>
                      <span className={`home-problem-diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="problems-empty">No problems match your filters.</div>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================
// LEADERBOARD PAGE
// ============================================================
const MEDAL_THEMES = [
  { id: 'lbGold', cls: 'lb-badge-gold', stops: [{ c: '#ffe38a', o: 0 }, { c: '#ffd700', o: 0.5 }, { c: '#d4a017', o: 1 }], ring: '#b8860b', numFill: '#5b3a00' },
  { id: 'lbSilver', cls: 'lb-badge-silver', stops: [{ c: '#ffffff', o: 0 }, { c: '#d3dce6', o: 0.5 }, { c: '#9aa7b4', o: 1 }], ring: '#64748b', numFill: '#1e293b' },
  { id: 'lbBronze', cls: 'lb-badge-bronze', stops: [{ c: '#ffca80', o: 0 }, { c: '#cd7f32', o: 0.5 }, { c: '#8f5a1e', o: 1 }], ring: '#78350f', numFill: '#ffffff' },
];

function RankBadge({ rank, size = 40 }: { rank: number; size?: number }) {
  if (rank < 0 || rank > 2) return null;
  const theme = MEDAL_THEMES[rank];
  return (
    <span className={`lb-badge ${theme.cls}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <defs>
          <linearGradient id={theme.id} x1="0" y1="0" x2="1" y2="1">
            {theme.stops.map((s, i) => <stop key={i} offset={s.o} stopColor={s.c} />)}
          </linearGradient>
          <radialGradient id={`${theme.id}-shine`} cx="0.35" cy="0.28" r="0.65">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.65" />
            <stop offset="0.45" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="18" fill={`url(#${theme.id})`} stroke={theme.ring} strokeWidth="1.5" />
        <circle cx="20" cy="20" r="18" fill={`url(#${theme.id}-shine)`} />
        <circle cx="20" cy="20" r="12.5" fill="none" stroke={theme.ring} strokeWidth="1.2" opacity="0.4" />
        {rank === 0 && (
          <path d="M11.5 8.2 L13.2 6 L15.6 7.6 L15 4.6 H25 L24.4 7.6 L26.8 6 L28.5 8.2 L27 12 H13 Z" fill="#fff7d6" opacity="0.95" />
        )}
        <text x="20" y="26" textAnchor="middle" fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontWeight="800" fontSize={rank === 0 ? 14 : 16} fill={theme.numFill}>{rank + 1}</text>
      </svg>
    </span>
  );
}

function LeaderboardPage({
  userName, solvedProblems, profile, onBack,
}: {
  userName: string; solvedProblems: Set<number>; profile: ProfileData; onBack: () => void;
}) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const userEntry = { name: userName, solved: solvedProblems.size, streak: profile.currentStreak };

    const loadLeaderboard = async () => {
      const res = await apiGet('/leaderboard');
      if (!res.fallback && res.leaderboard) {
        let lb = res.leaderboard as LeaderboardEntry[];
        lb = lb.filter(e => e.name === userName || e.solved > 0);
        if (!lb.some(e => e.name === userName)) lb = [userEntry, ...lb];
        setLeaderboard(lb);
      } else {
        setLeaderboard([userEntry]);
      }
    };
    loadLeaderboard();
  }, [userName, solvedProblems.size, profile.currentStreak]);

  const getRank = (i: number) => `${i + 1}`;
  const maxSolved = leaderboard.reduce((m, e) => Math.max(m, e.solved), 0);
  const podiumOrder = leaderboard.length === 1 ? [0] : leaderboard.length === 2 ? [1, 0] : [1, 0, 2];

  return (
    <>
      <div className="home-shell">
        <div className="page-back-row">
          <button className="page-back-btn" onClick={onBack}>{'\u2190'} Back</button>
        </div>
        <div className="leaderboard-page-header">
          <h1>{'\u{1F3C6}'} Leaderboard</h1>
          <p>Top performers ranked by problems solved &middot; {leaderboard.length} {leaderboard.length === 1 ? 'participant' : 'participants'}</p>
        </div>

        {leaderboard.length > 0 && (
          <div className="lb-podium">
            {podiumOrder.map(idx => {
              const entry = leaderboard[idx];
              if (!entry) return null;
              const place = idx + 1;
              const isYou = entry.name === userName;
              return (
                <div key={entry.name} className={`lb-podium-card place-${place}${isYou ? ' you' : ''}`}>
                  <div className="lb-podium-medal">
                    <RankBadge rank={idx} size={place === 1 ? 60 : 50} />
                  </div>
                  <span className={`lb-podium-avatar place-${place}`}>{entry.name.charAt(0).toUpperCase()}</span>
                  <span className="lb-podium-name">
                    {entry.name}
                    {isYou && <span className="lb-you-pill">You</span>}
                  </span>
                  <span className="lb-podium-stats"><b>{entry.solved}</b> solved</span>
                  <span className="lb-podium-streak">{'\u{1F525}'} {entry.streak} {entry.streak === 1 ? 'day' : 'days'}</span>
                  <div className={`lb-podium-stand place-${place}`}>
                    <span>{place}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="leaderboard-table">
          <div className="lb-table-header">
            <span className="lb-col-rank">Rank</span>
            <span className="lb-col-name">User</span>
            <span className="lb-col-solved">Solved</span>
            <span className="lb-col-streak">Streak</span>
          </div>
          {leaderboard.map((entry, i) => {
            const isYou = entry.name === userName;
            return (
              <div key={entry.name} className={`lb-table-row ${isYou ? 'you' : ''} ${i < 3 ? `top-${i + 1}` : ''}`} style={{ animationDelay: `${i * 40}ms` }}>
                <span className="lb-col-rank">{i < 3 ? <RankBadge rank={i} size={36} /> : <span className="lb-rank-text">{getRank(i)}</span>}</span>
                <span className="lb-col-name">
                  <span className={`lb-avatar${isYou ? ' you' : ''}${i < 3 ? ` top-${i + 1}` : ''}`}>{entry.name.charAt(0).toUpperCase()}</span>
                  <span className="lb-name-text">{entry.name}{isYou && <span className="lb-you-pill">You</span>}</span>
                </span>
                <span className="lb-col-solved">
                  <span className="lb-progress-track">
                    <span className="lb-progress-fill" style={{ width: `${maxSolved ? (entry.solved / maxSolved) * 100 : 0}%` }} />
                  </span>
                  {entry.solved}
                </span>
                <span className="lb-col-streak">
                  {entry.streak > 0 && <span className="lb-flame">{'\u{1F525}'}</span>}
                  {entry.streak} {entry.streak === 1 ? 'day' : 'days'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
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

function computeBestStreak(dailyHistory: DayActivity[]): number {
  const sorted = [...dailyHistory].sort((a, b) => a.date.localeCompare(b.date));
  let best = 0;
  let run = 0;
  let prev: Date | null = null;
  for (const day of sorted) {
    if (day.solved === 0) { run = 0; prev = null; continue; }
    const cur = new Date(day.date + 'T00:00:00');
    if (prev) {
      const diff = (cur.getTime() - prev.getTime()) / 86400000;
      run = diff === 1 ? run + 1 : 1;
    } else {
      run = 1;
    }
    prev = cur;
    best = Math.max(best, run);
  }
  return best;
}

interface Achievement { icon: string; title: string; desc: string; earned: boolean; }

function computeAchievements(solvedProblems: Set<number>, profile: ProfileData): Achievement[] {
  const solvedList = Array.from(solvedProblems).map(id => problems.find(p => p.id === id)).filter(Boolean) as Problem[];
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

function ProfilePage({
  userName, userEmail, solvedProblems, profile, onBack, onSignOut, onOpenProblem,
}: {
  userName: string; userEmail: string; solvedProblems: Set<number>; profile: ProfileData; onBack: () => void; onSignOut: () => void; onOpenProblem: (id: number) => void;
}) {
  const [activityOpen, setActivityOpen] = useState(false);
  const todaySolved = profile.dailyHistory.find(e => e.date === getToday())?.solved ?? 0;
  const bestStreak = useMemo(() => computeBestStreak(profile.dailyHistory), [profile.dailyHistory]);
  const solvedList = useMemo(
    () => Array.from(solvedProblems).map(id => problems.find(p => p.id === id)).filter(Boolean) as Problem[],
    [solvedProblems]
  );
  const recentList = useMemo(() => [...solvedList].sort((a, b) => b.id - a.id), [solvedList]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [userRank, setUserRank] = useState<number>(0);

  useEffect(() => {
    const loadRank = async () => {
      const res = await apiGet('/leaderboard');
      if (res.fallback || !res.leaderboard) {
        const lb = JSON.parse(localStorage.getItem('dsa-leaderboard') || '[]') as LeaderboardEntry[];
        const i = lb.findIndex(e => e.name === userName) + 1;
        setUserRank(i);
        return;
      }
      const i = (res.leaderboard as LeaderboardEntry[]).findIndex(e => e.name === userName) + 1;
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
    const months: { key: string; label: string; weeks: { key: string; days: { key: string; count: number }[] }[] }[] = [];
    let currentKey = '';
    let currentLabel = '';
    let currentWeeks: { key: string; days: { key: string; count: number }[] }[] = [];
    for (let w = 0; w < 52; w++) {
      const days: { key: string; count: number }[] = [];
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
        if (currentWeeks.length) months.push({ key: currentKey, label: currentLabel, weeks: currentWeeks });
        currentKey = mKey;
        currentLabel = weekStart.getMonth() === 0
          ? weekStart.toLocaleString('en-US', { month: 'short', year: '2-digit' })
          : weekStart.toLocaleString('en-US', { month: 'short' });
        currentWeeks = [];
      }
      currentWeeks.push({ key: `w${w}`, days });
    }
    if (currentWeeks.length) months.push({ key: currentKey, label: currentLabel, weeks: currentWeeks });
    return months;
  }, [profile.dailyHistory]);

  const heatmapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (heatmapRef.current) heatmapRef.current.scrollLeft = heatmapRef.current.scrollWidth;
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
    } catch { /* clipboard unavailable */ }
  };

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
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

  return (
    <>
      <div className="home-shell">
        <div className="page-back-row">
          <button className="page-back-btn" onClick={onBack}>{'\u2190'} Back</button>
        </div>

        <div className="profile-hero">
          <div className="profile-hero-avatar-wrap">
            <div className="profile-hero-avatar">{userName.charAt(0).toUpperCase()}</div>
          </div>
          <div className="profile-hero-info">
            <div className="profile-hero-name-row">
              <h1>{userName}</h1>
              <span className="profile-hero-badge">{'\u2713'} Online</span>
            </div>
            <p>{userEmail}</p>
            <span className="profile-tier-tag" style={{ background: 'linear-gradient(135deg, #6366f1, #38bdf8)' }}>{currentTier.label} Level</span>
          </div>
          <div className="profile-hero-actions">
            <button className="profile-share-btn" onClick={() => setShareOpen(true)}>Share Profile</button>
            <button className="profile-signout-btn" onClick={onSignOut}>Sign Out</button>
          </div>
        </div>

        <div className="profile-stats-row">
          <div className="profile-stat-card">
            <div className="profile-stat-value">{solvedList.length}</div>
            <div className="profile-stat-label">Solved</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{profile.currentStreak}</div>
            <div className="profile-stat-label">Current Streak</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{todaySolved}</div>
            <div className="profile-stat-label">Solved Today</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{userRank > 0 ? `#${userRank}` : '--'}</div>
            <div className="profile-stat-label">Global Rank</div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-value">{completionPct}%</div>
            <div className="profile-stat-label">Completion</div>
          </div>
        </div>

        <div className="profile-level-card">
          <div className="profile-level-left">
            <div className="profile-level-title">{currentTier.label}</div>
            <div className="profile-level-desc">{currentTier.desc}</div>
          </div>
          <div className="profile-level-track">
            <div className="profile-level-fill" style={{ width: `${tierProgress}%` }} />
          </div>
          <div className="profile-level-pct">{tierProgress}%</div>
        </div>

        <div className="profile-main-grid">
          <div className="profile-section profile-section-spread">
            <div>
              <h3>Difficulty Breakdown</h3>
              <div className="profile-diff-list">
              <div className="profile-diff-row">
                <span className="profile-diff-name diff-easy">Easy</span>
                <div className="profile-diff-track">
                  <div className="profile-diff-fill" style={{ width: `${total ? (easyCount / total) * 100 : 0}%`, background: 'var(--difficulty-easy)' }} />
                </div>
                <span className="profile-diff-count">{easyCount}</span>
              </div>
              <div className="profile-diff-row">
                <span className="profile-diff-name diff-medium">Medium</span>
                <div className="profile-diff-track">
                  <div className="profile-diff-fill" style={{ width: `${total ? (mediumCount / total) * 100 : 0}%`, background: 'var(--difficulty-medium)' }} />
                </div>
                <span className="profile-diff-count">{mediumCount}</span>
              </div>
              <div className="profile-diff-row">
                <span className="profile-diff-name diff-hard">Hard</span>
                <div className="profile-diff-track">
                  <div className="profile-diff-fill" style={{ width: `${total ? (hardCount / total) * 100 : 0}%`, background: 'var(--difficulty-hard)' }} />
                </div>
                <span className="profile-diff-count">{hardCount}</span>
              </div>
            </div>
            </div>
            <div>
              <h3 style={{ marginTop: '32px' }}>Activity Graph</h3>
            <div className="profile-heatmap-scroll" ref={heatmapRef}>
              <div className="profile-heatmap-inner">
                <div className="profile-heatmap-body">
                  {activityHeatmap.map(m => (
                    <div key={m.key} className="profile-heatmap-month">
                      <div className="profile-heatmap-month-label">{m.label}</div>
                      <div className="profile-heatmap-month-weeks">
                        {m.weeks.map(week => (
                          <div key={week.key} className="profile-heatmap-week">
                            {week.days.map(day => (
                              day.count === -1
                                ? <div key={day.key} className="profile-heat-cell pad" />
                                : <div key={day.key} title={`${day.key}: ${day.count} solved`} className={`profile-heat-cell${day.count === 0 ? ' none' : day.count === 1 ? ' low' : day.count === 2 ? ' med' : ' high'}`} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="profile-heatmap-caption">
              Less
              <span className="profile-heat-swatch" style={{ background: '#f9a8d4' }} />
              <span className="profile-heat-swatch" style={{ background: '#ec4899' }} />
              <span className="profile-heat-swatch" style={{ background: '#be185d' }} />
              More
            </p>
            </div>
          </div>

          <div className="profile-section">
            <div className="profile-section-head">
              <h3>Achievements</h3>
              <span className="profile-ach-count">{earnedAchievements} / {achievements.length}</span>
            </div>
            <div className="profile-ach-grid">
              {achievements.map(a => (
                <div key={a.title} className={`profile-ach-card${a.earned ? ' earned' : ''}`}>
                  <div className="profile-ach-icon">{a.icon}</div>
                  <div className="profile-ach-info">
                    <div className="profile-ach-title">{a.title}</div>
                    <div className="profile-ach-desc">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="profile-activity-center">
          <button className="profile-activity-btn" onClick={() => setActivityOpen(true)}>
            Recent Activity
          </button>
        </div>
      </div>

      {activityOpen && (
        <div className="activity-overlay" onClick={() => setActivityOpen(false)}>
          <div className="activity-modal" onClick={e => e.stopPropagation()}>
            <div className="activity-modal-header">
              <h3>Recent Activity</h3>
              <button className="activity-modal-close" onClick={() => setActivityOpen(false)} aria-label="Close">&#x2715;</button>
            </div>
            {recentList.length === 0 ? (
              <p className="activity-empty">No solved problems yet. Solve your first problem!</p>
            ) : (
              <div className="activity-modal-list">
                {recentList.map((p, index) => {
                  const cx = getComplexity(p.id);
                  const open = expandedId === p.id;
                  return (
                    <div key={p.id} className={`activity-item${open ? ' open' : ''}`} style={{ animationDelay: `${Math.min(index, 10) * 50}ms` }}>
                      <button className="activity-item-head" onClick={() => setExpandedId(open ? null : p.id)}>
                        <span className="activity-item-id">{p.id}</span>
                        <span className="activity-item-name">{p.title}</span>
                        <span className={`home-problem-diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                        <span className="activity-item-chevron">{open ? '\u2212' : '+'}</span>
                      </button>
                      {open && (
                        <div className="activity-item-details">
                          <div className="activity-item-detail-row">
                            <span>Category</span>
                            <strong>{p.category}</strong>
                          </div>
                          <div className="activity-item-detail-row">
                            <span>Tags</span>
                            <strong>{p.tags.join(', ')}</strong>
                          </div>
                          <div className="activity-item-cx">
                            <div className="activity-item-cx-chip">
                              <span className="activity-item-cx-label">Time</span>
                              <span className="activity-item-cx-value">{cx.time}</span>
                            </div>
                            <div className="activity-item-cx-chip">
                              <span className="activity-item-cx-label">Space</span>
                              <span className="activity-item-cx-value">{cx.space}</span>
                            </div>
                          </div>
                          <button className="activity-item-open" onClick={() => onOpenProblem(p.id)}>
                            {'\u{1F4BB}'} Open in Code Editor
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {shareOpen && (
        <div className="share-overlay" onClick={() => setShareOpen(false)}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="share-modal-header">
              <h3>Share Profile</h3>
            </div>
            <div className="share-modal-options">
              <button className="share-modal-opt linkedin" onClick={shareLinkedIn}>
                <span className="share-modal-opt-chip"><LinkedInIcon /></span>
                <span className="share-modal-opt-label">LinkedIn</span>
                <span className="share-modal-opt-arrow">{'\u2192'}</span>
              </button>
              <button className="share-modal-opt whatsapp" onClick={shareWhatsApp}>
                <span className="share-modal-opt-chip"><WhatsAppIcon /></span>
                <span className="share-modal-opt-label">WhatsApp</span>
                <span className="share-modal-opt-arrow">{'\u2192'}</span>
              </button>
              <button className="share-modal-opt instagram" onClick={shareInstagram}>
                <span className="share-modal-opt-chip"><InstagramIcon /></span>
                <span className="share-modal-opt-label">Instagram</span>
                <span className="share-modal-opt-arrow">{'\u2192'}</span>
              </button>
              <button className="share-modal-opt copy" onClick={copyShareLink} title="Copy link">
                <span className="share-modal-opt-chip"><LinkIcon /></span>
                <span className="share-modal-opt-label">{linkCopied ? 'Link copied!' : 'Copy link'}</span>
                <span className="share-modal-opt-arrow">{'\u2192'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// EDITOR PAGE (coding)
// ============================================================
function EditorPage({
  problemId, onBack, userName, userId, solvedProblems, setSolvedProblems, profile, setProfile,
}: {
  problemId: number; onBack: () => void; userName: string; userId: string;
  solvedProblems: Set<number>; setSolvedProblems: (s: Set<number>) => void;
  profile: ProfileData; setProfile: (p: ProfileData) => void;
}) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('java');
  const [testResults, setTestResults] = useState<TestResult[] | null>(null);
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
    const javaReturnTypes: Record<string, string> = {
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
    const fallbackJava = (fn: string) => {
      if (fn.startsWith('is') || fn.startsWith('has') || fn.startsWith('can') || fn.startsWith('valid')) return 'boolean';
      if (fn.startsWith('max') || fn.startsWith('min') || fn.startsWith('count') || fn.startsWith('find')) return 'int';
      return 'int';
    };
    const savedKey = `dsa-code-${problemId}-${language}`;
    const saved = localStorage.getItem(savedKey);
    if (saved) {
      setCode(saved);
      setTestResults(null); setSummary(''); setSelectedTc(-1);
      return;
    }
    apiGet(`/user/${userId}/code/${problemId}/${language}`).then(res => {
      if (!res.fallback && res.code) {
        setCode(res.code);
        setTestResults(null); setSummary(''); setSelectedTc(-1);
        return;
      }
      const templates: Record<string, string> = {
        javascript: sel.starterCode && sel.starterCode.includes('javascript') ? sel.starterCode : `function ${sel.funcName}(${sel.funcArgs}) {\n  \n}`,
        python: sel.starterCode && sel.starterCode.includes('def ') ? sel.starterCode : `def ${sel.funcName}(${sel.funcArgs}):\n    pass\n`,
        java: `class Solution {\n    public static ${javaReturnTypes[sel.funcName] || fallbackJava(sel.funcName)} ${sel.funcName}(${sel.funcArgs}) {\n        \n    }\n}`,
        cpp: sel.starterCode && sel.starterCode.includes('vector') ? sel.starterCode : `class Solution {\npublic:\n    int ${sel.funcName}(${sel.funcArgs}) {\n        \n    }\n};`,
      };
      setCode(templates[language] || templates.javascript);
      setTestResults(null); setSummary(''); setSelectedTc(-1);
    });
  }, [problemId, language, userId]);

  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`dsa-code-${problemId}-${language}`, newCode);
    apiPut(`/user/${userId}/code`, { problemId, language, code: newCode });
  }, [problemId, language, userId]);

  const parseError = (err: string, lang: string): { title: string; message: string; line?: number } => {
    const cleaned = err.replace(/^(Error|error|ERROR):\s*/i, '').replace(/Traceback \(most recent call last\):\s*/g, '').replace(/File ".*?script\.\w+", line \d+, in .+\n/g, '');
    const lineMatch = cleaned.match(/(?:line|Line)\s+(\d+)/i) || cleaned.match(/:(\d+)/);
    const line = lineMatch ? parseInt(lineMatch[1]) : undefined;
    let title = 'Error';
    let message = cleaned.trim();
    if (cleaned.includes('SyntaxError') || cleaned.includes('Syntax')) { title = 'Syntax Error'; }
    else if (cleaned.includes('TypeError') || cleaned.includes('Type')) { title = 'Type Error'; }
    else if (cleaned.includes('ReferenceError') || cleaned.includes('Reference')) { title = 'Reference Error'; }
    else if (cleaned.includes('compile error') || cleaned.includes('Compile')) { title = 'Compile Error'; }
    else if (cleaned.includes('Runtime error') || cleaned.includes('runtime')) { title = 'Runtime Error'; }
    else if (cleaned.includes('NameError') || cleaned.includes('name')) { title = 'Name Error'; }
    else if (cleaned.includes('IndexError') || cleaned.includes('index')) { title = 'Index Error'; }
    else if (cleaned.includes('KeyError') || cleaned.includes('key')) { title = 'Key Error'; }
    else if (cleaned.includes('ValueError') || cleaned.includes('value')) { title = 'Value Error'; }
    else if (cleaned.includes('AttributeError')) { title = 'Attribute Error'; }
    else if (cleaned.includes('MemoryError') || cleaned.includes('memory')) { title = 'Memory Error'; }
    else if (cleaned.includes('Timeout') || cleaned.includes('timeout')) { title = 'Time Limit Exceeded'; }
    message = message.split('\n').filter(l => l.trim()).slice(0, 3).join('\n');
    return { title, message, line };
  };

  const runRemote = async () => {
    setTestResults(null); setSummary('Running...');
    try {
      const valid = sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0);
      if (!valid.length) { setSummary('No test cases defined'); return; }
      const resp = await fetch('/execute', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, funcName: sel.funcName, testCases: valid }),
      });
      const data = await resp.json();
      if (data.error) { setSummary(`__ERR__${data.error}`); return; }
      const results = data.results.map((r: any, i: number) => ({ ...r, index: i }));
      setTestResults(results);
      const pass = results.filter((r: any) => r.passed).length;
      setSummary(`${pass}/${results.length} passed`);
      return { passed: pass, total: results.length };
    } catch (e: any) { setSummary(`__ERR__${e.message}`); }
  };

  const runCode = async () => { setRunning(true); if (isExec) await runRemote(); else setSummary('Not supported'); setRunning(false); };
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
          if (todayEntry) todayEntry.solved++;
          else h.push({ date: today, solved: 1 });
          setProfile({ ...profile, totalSolved: profile.totalSolved + 1, currentStreak: profile.lastActiveDate === today ? profile.currentStreak : profile.lastActiveDate === getYesterday() ? profile.currentStreak + 1 : 1, lastActiveDate: today, dailyHistory: h });
        }
      }
    }
    setSubmitting(false);
  };

  const handleSplitDown = (e: React.MouseEvent) => {
    e.preventDefault(); isDragging.current = true;
    const startX = e.clientX, startW = sidebarWidth;
    const onMove = (ev: MouseEvent) => { if (isDragging.current) setSidebarWidth(Math.max(200, Math.min(600, startW + ev.clientX - startX))); };
    const onUp = () => { isDragging.current = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; document.body.style.userSelect = ''; };
    document.body.style.cursor = 'col-resize'; document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  };

  const handleTermDown = (e: React.MouseEvent) => {
    e.preventDefault(); isDragging.current = true;
    const startY = e.clientY, startH = termHeight;
    const onMove = (ev: MouseEvent) => { if (isDragging.current) setTermHeight(Math.max(80, Math.min(400, startH + startY - ev.clientY))); };
    const onUp = () => { isDragging.current = false; document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); document.body.style.cursor = ''; document.body.style.userSelect = ''; };
    document.body.style.cursor = 'row-resize'; document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', onMove); document.addEventListener('mouseup', onUp);
  };

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <a href="#" className="topbar-logo" onClick={e => { e.preventDefault(); onBack(); }}>
              <span className="topbar-logo-icon" style={{ background: '#6366f1' }}>&#8721;</span>
              <span className="topbar-logo-text">DSA <span style={{color:'#38bdf8'}}>INSIGHTS</span></span>
            </a>
          </div>
          <div className="topbar-right">
            <div className="topbar-user"><div className="topbar-avatar">{userName.charAt(0).toUpperCase()}</div></div>
          </div>
        </div>
      </header>

      <div className="app-shell">
        <div className="problem-layout">
          <aside className="sidebar" style={{ width: sidebarWidth }}>
            <button className="back-button" onClick={onBack}>{'\u2190'} Back</button>
            <div className="problem-detail-header">
              <h1>{sel.title}</h1>
              <div className="badge-row">
                <span className={`badge ${sel.difficulty.toLowerCase()}`}>{sel.difficulty}</span>
                {sel.tags.map(t => <span key={t} className="question-tag">{t}</span>)}
              </div>
            </div>
            <div className="problem-description-scroll">
              <div className="question-card">
                <p>{sel.description}</p>
                <div className="examples">
                  <h3>Examples</h3>
                  {sel.examples.filter(ex => ex.input !== '-' || ex.output !== '-').map((ex, i) => (
                    <div key={i} className="example-block">
                      <div className="example-label">Example {i + 1}</div>
                      <div className="example-io">
                        <div className="example-row"><span className="example-key">Input:</span> <code>{ex.input}</code></div>
                        <div className="example-row"><span className="example-key">Output:</span> <code>{ex.output}</code></div>
                        {ex.explanation && <div className="example-row"><span className="example-key">Explanation:</span> <code>{ex.explanation}</code></div>}
                      </div>
                    </div>
                  ))}
                  {sel.examples.filter(ex => ex.input !== '-' || ex.output !== '-').length === 0 && (
                    <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>See the problem description above for examples.</p>
                  )}
                </div>
                <div className="constraints">
                  <h3>Constraints</h3>
                  <ul>{sel.constraints.map((c, i) => <li key={i}>{c}</li>)}</ul>
                </div>
              </div>
            </div>
          </aside>

          <div className="sidebar-splitter" onMouseDown={handleSplitDown} />

          <section className="problem-detail">
            <div className="editor-card">
              <div className="editor-header">
                <strong>Code</strong>
                <select className="lang-select" value={language} onChange={e => setLanguage(e.target.value)}>
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>
                <div className="editor-actions">
                  <button className="btn-run" onClick={runCode} disabled={running || submitting}>{running ? 'Running...' : '\u25B6 Run'}</button>
                  <button className="btn-submit" onClick={submitCode} disabled={running || submitting}>{submitting ? 'Submitting...' : '\u2601 Submit'}</button>
                  {showInterviewBtn && <button className="btn-interview" onClick={() => setShowInterview(true)} style={{ background: '#7c3aed' }}>Interview</button>}
                </div>
              </div>
              <CodeEditor code={code} onChange={handleCodeChange} language={language} />
            </div>

            <div className="terminal-splitter" onMouseDown={handleTermDown} />

            <div className="terminal-panel" style={{ height: termHeight }}>
              <div className="terminal-header">
                <div className="terminal-tabs">
                  {sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0).map((_, i) => {
                    let cls = 'terminal-tab';
                    const r = testResults?.[i];
                    if (r) cls += r.passed ? ' tab-pass' : ' tab-fail';
                    return <button key={i} className={`${cls}${i === selectedTc ? ' active' : ''}`} onClick={() => setSelectedTc(i)}>{r && <span className="tab-icon">{r.passed ? '\u2713' : '\u2717'}</span>} Case {i + 1}</button>;
                  })}
                </div>
                {testResults && (
                  <div className="terminal-progress">
                    <div className="terminal-progress-bar">
                      {(() => { const p = testResults.filter(r => r.passed).length; const f = testResults.filter(r => !r.passed).length; const t = testResults.length; return (<>{p > 0 && <div className="terminal-progress-fill pass" style={{ width: `${(p/t)*100}%` }} />}{f > 0 && <div className="terminal-progress-fill fail" style={{ width: `${(f/t)*100}%` }} />}</>); })()}
                    </div>
                    <span className="terminal-progress-text">{summary}</span>
                  </div>
                )}
              </div>
              <div className="terminal-body">
                {selectedTc >= 0 ? (() => {
                  const valid = sel.testCases.filter(tc => tc.input && typeof tc.input === 'object' && Object.keys(tc.input).length > 0);
                  const tc = valid[selectedTc];
                  if (!tc) return null;
                  return (
                    <div className="tc-details">
                      <div className="tc-detail-row"><span className="tc-label">Input:</span><code className="tc-value">{JSON.stringify(tc.input)}</code></div>
                      <div className="tc-detail-row"><span className="tc-label">Expected:</span><code className="tc-value">{JSON.stringify(tc.output)}</code></div>
                      <div className="tc-detail-row"><span className="tc-label">Actual:</span>{testResults ? <code className={`tc-value ${testResults[selectedTc]?.passed ? 'tc-pass' : 'tc-fail'}`}>{JSON.stringify(testResults[selectedTc]?.actual)}</code> : <code className="tc-value tc-pending">not run yet</code>}</div>
                    </div>
                  );
                })() : summary ? (
                  summary.startsWith('__ERR__') ? (() => {
                    const raw = summary.slice(7);
                    const err = parseError(raw, language);
                    const lines = code.split('\n');
                    const errLine = err.line && err.line <= lines.length ? err.line : null;
                    return (
                      <div className="tc-error-box">
                        <div className="tc-error-header">
                          <span className="tc-error-icon">!</span>
                          <span className="tc-error-title">{err.title}</span>
                          {errLine && <span className="tc-error-line">Line {errLine}</span>}
                        </div>
                        <pre className="tc-error-msg">{err.message}</pre>
                        {errLine && (
                          <div className="tc-error-code">
                            <div className="tc-error-code-line">
                              <span className="tc-error-code-ln">{errLine}</span>
                              <span className="tc-error-code-text">{lines[errLine - 1] || ''}</span>
                            </div>
                          </div>
                        )}
                        <div className="tc-error-hint">
                          {err.title.includes('Compile') ? 'Fix the syntax error above and try again.' :
                           err.title.includes('Type') ? 'Check your data types and variable usage.' :
                           err.title.includes('Reference') || err.title.includes('Name') ? 'This variable is not defined. Check spelling or declare it.' :
                           err.title.includes('Index') ? 'Array index is out of bounds. Check your range.' :
                           err.title.includes('Key') ? 'Key does not exist. Check the dictionary key.' :
                           err.title.includes('Memory') ? 'Too much memory used. Optimize your approach.' :
                           err.title.includes('Time Limit') ? 'Too slow. Try a more efficient approach.' :
                           'Review your code and fix the issue above.'}
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="tc-summary">
                      {testResults ? (<><div className={`tc-summary-icon ${testResults.every(r => r.passed) ? 'pass' : 'fail'}`}>{testResults.every(r => r.passed) ? '\u2713' : '\u2717'}</div><div><div className={`tc-summary-text ${testResults.every(r => r.passed) ? 'pass' : 'fail'}`}>{testResults.every(r => r.passed) ? 'All passed' : 'Some failed'}</div><div className="tc-summary-sub">{summary}</div></div></>) : <div className="tc-error">{summary}</div>}
                    </div>
                  )
                ) : (
                  <div className="tc-summary"><div className="tc-summary-icon neutral">{'\u25C9'}</div><div><div className="tc-summary-text">Ready</div><div className="tc-summary-sub">Click Run to test your solution</div></div></div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>

      {showInterview && <InterviewModal problem={sel} onClose={() => setShowInterview(false)} onComplete={() => {}} />}
      {showSuccess && (
        <div className="success-overlay" onClick={() => setShowSuccess(false)}>
          <div className="success-modal">
            <div className="success-ring">
              <svg className="success-check-svg" viewBox="0 0 100 100">
                <circle className="success-circle" cx="50" cy="50" r="45" fill="none" strokeWidth="4"/>
                <path className="success-check-path" d="M30 52 L44 66 L70 36" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="success-title">Accepted</div>
            <div className="success-sub">All test cases passed!</div>
            <div className="success-problem">{sel.title}</div>
          </div>
        </div>
      )}
    </>
  );
}

// ============================================================
// LANDING PAGE (guests)
// ============================================================
function LandingPage({ onGuest }: { onGuest?: () => void }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="landing-shell" id="top">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-header-left">
            <a href="#top" className="landing-header-logo">
              <div className="landing-logo-icon">&#8721;</div>
              <span>DSA <span style={{color:'#818cf8'}}>INSIGHTS</span></span>
            </a>
          </div>
          <nav className="landing-header-center">
            <a href="#features" className="landing-header-link">Features</a>
            <a href="#problems" className="landing-header-link">Problems</a>
            <a href="#interview" className="landing-header-link">Interview</a>
          </nav>
          <div className="landing-header-right">
            <button className="btn-signin" onClick={() => setShowSignIn(true)}>Sign In</button>
          </div>
        </div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="eyebrow">{'\u2728'} Trusted by 10,000+ developers</div>
          <h1>Where Code Meets<br/>Confidence.</h1>
          <p>150+ curated DSA problems, real-time code execution, and AI-powered mock interviews — everything you need to land your dream tech job.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setShowSignUp(true)}>Create Account</button>
            {onGuest && <button className="secondary-button" onClick={onGuest}>Try as Guest</button>}
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>150+</strong><span>Problems</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>4</strong><span>Languages</span></div>
            <div className="hero-stat-divider" />
            <div className="hero-stat"><strong>AI</strong><span>Interviews</span></div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-panel">
            <div className="panel-top"><span>BinarySearch.java</span><span style={{color:'#22c55e'}}>Accepted</span></div>
            <div className="panel-card">
              <div className="panel-label">Problem</div>
              <div className="panel-title">Two Sum</div>
              <div className="panel-tags"><span>Arrays</span><span>Hash Table</span></div>
            </div>
            <div className="panel-grid">
              <div className="panel-item">JavaScript</div>
              <div className="panel-item highlight">O(n) Time</div>
              <div className="panel-item">Python</div>
              <div className="panel-item highlight">O(n) Space</div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-features" id="features">
        <div className="feature-card">
          <div className="feature-card-icon">{'\u{1F4BB}'}</div>
          <strong>Code Editor</strong>
          <p>Write solutions in JavaScript, Python, Java, or C++. Run your code against test cases instantly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">AI</div>
          <h3>AI-Powered</h3>
          <p>Get instant, intelligent feedback on your solutions with detailed explanations.</p>
        </div>
        <div className="feature-card">
          <div className="feature-card-icon">MIC</div>
          <strong>Voice Input</strong>
          <p>Skip typing. Speak your answers and the AI responds with voice, just like a real interview.</p>
        </div>
      </section>

      <section id="problems" className="landing-problems-section">
        <div className="landing-problems-header">
          <h2>Practice Problems</h2>
          <p>Curated DSA problems from Easy to Hard</p>
        </div>
        <div className="landing-problems-grid">
          {[{t:'Two Sum',d:'Easy',c:'#22c55e'},{t:'Reverse Linked List',d:'Easy',c:'#22c55e'},{t:'Valid Parentheses',d:'Easy',c:'#22c55e'},{t:'Merge K Sorted Lists',d:'Hard',c:'#ef4444'},{t:'Word Search',d:'Medium',c:'#f59e0b'},{t:'Binary Tree Level Order',d:'Medium',c:'#f59e0b'}].map(p => (
            <div key={p.t} className="feature-card" style={{padding:20}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <strong style={{fontSize:15}}>{p.t}</strong>
                <span style={{color:p.c, fontSize:12, fontWeight:600}}>{p.d}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="interview" className="landing-interview-section">
        <div className="landing-interview-card">
          <div className="landing-interview-icon">AI</div>
          <h2>Resume-Based AI Interview</h2>
          <p>Upload your resume. Get asked questions tailored to your skills and experience. 15 minutes. Real feedback.</p>
          <button className="primary-button" onClick={() => setShowSignUp(true)}>Get Started</button>
        </div>
      </section>

      <footer className="landing-footer">
        <span>DSA INSIGHTS &copy; 2026</span>
        <div className="landing-footer-links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </footer>

      {showSignIn && (
        <div className="auth-overlay" onClick={() => setShowSignIn(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-modal-logo">
              <div className="auth-modal-logo-icon">&#x25C6;</div>
              <span>DSA Insights AI</span>
            </div>
            <SignIn routing="hash" appearance={clerkAppearance} />
            <div className="auth-switch"><span>Don't have an account? </span><button onClick={() => { setShowSignIn(false); setShowSignUp(true); }}>Sign up</button></div>
          </div>
        </div>
      )}
      {showSignUp && (
        <div className="auth-overlay" onClick={() => setShowSignUp(false)}>
          <div className="auth-modal" onClick={e => e.stopPropagation()}>
            <div className="auth-modal-logo">
              <div className="auth-modal-logo-icon">&#x25C6;</div>
              <span>DSA Insights AI</span>
            </div>
            <SignUp routing="hash" appearance={clerkAppearance} />
            <div className="auth-switch"><span>Already have an account? </span><button onClick={() => { setShowSignUp(false); setShowSignIn(true); }}>Sign in</button></div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// RESUME INTERVIEW SETUP (upload resume, start interview)
// ============================================================
function ResumeInterviewSetup({ onStart, onBack }: { onStart: (resumeText: string) => void; onBack: () => void }) {
  const [resumeText, setResumeText] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setError('');
    setLoading(true);
    try {
      const text = await file.text();
      setResumeText(text);
    } catch {
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

  return (
    <div className="home-shell">
      <div className="page-back-row">
        <button className="page-back-btn" onClick={onBack}>{'\u2190'} Back</button>
      </div>

      <div className="resume-setup">
        <div className="resume-setup-left">
          <div className="resume-setup-hero">
            <div className="resume-setup-badge">AI Interview</div>
            <h1>Mock Interview<br/>Based on Your Resume</h1>
            <p>Upload your resume and our AI will ask tailored questions about your skills, projects, and experience.</p>

            <div className="resume-features">
              <div className="resume-feature">
                <span className="resume-feature-icon">{'\u{1F4DD}'}</span>
                <div>
                  <strong>Resume-Based Questions</strong>
                  <span>AI reads your resume and asks relevant questions</span>
                </div>
              </div>
              <div className="resume-feature">
                <span className="resume-feature-icon">{'\u23F1'}</span>
                <div>
                  <strong>15-Minute Session</strong>
                  <span>Timed interview like a real screening round</span>
                </div>
              </div>
              <div className="resume-feature">
                <span className="resume-feature-icon">{'\u{1F4CA}'}</span>
                <div>
                  <strong>Instant Feedback</strong>
                  <span>Get scored on communication, depth, and alignment</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="resume-setup-right">
          <div className="resume-upload-card">
            <div className="resume-upload-header">
              <h2>Upload Resume</h2>
              <span className="resume-upload-step">Step 1 of 1</span>
            </div>

            <div className="resume-upload-zone" onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" accept=".txt,.pdf,.doc,.docx" onChange={handleFile} style={{ display: 'none' }} />
              {fileName ? (
                <>
                  <div className="resume-zone-icon success">{'\u2713'}</div>
                  <div className="resume-zone-filename">{fileName}</div>
                  <div className="resume-zone-change">Click to change file</div>
                </>
              ) : (
                <>
                  <div className="resume-zone-icon">{'\u{1F4C4}'}</div>
                  <div className="resume-zone-text">Drop your resume here or <span className="resume-zone-browse">browse</span></div>
                  <div className="resume-zone-hint">Supports .txt, .pdf, .doc, .docx</div>
                </>
              )}
            </div>

            <div className="resume-or-divider">
              <span>or paste below</span>
            </div>

            <textarea
              className="resume-textarea"
              placeholder="Paste your resume content here..."
              value={resumeText}
              onChange={e => { setResumeText(e.target.value); setFileName(''); setError(''); }}
              rows={7}
            />

            {error && <div className="resume-error">{error}</div>}

            <button className="resume-start-btn" onClick={handleStart} disabled={loading || !resumeText.trim()}>
              {loading ? 'Processing...' : 'Start Interview \u2192'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// RESUME INTERVIEW PAGE (15-min chat, separate from editor interview)
// ============================================================
function ResumeInterviewPage({
  resumeText, userName, onBack, onBackToSetup, profile, setProfile,
}: {
  resumeText: string; userName: string; onBack: () => void; onBackToSetup: () => void;
  profile: ProfileData; setProfile: (p: ProfileData) => void;
}) {
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(900);
  const [timerActive, setTimerActive] = useState(true);
  const [ended, setEnded] = useState(false);
  const [score, setScore] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const remainingTextRef = useRef('');
  const messagesRef = useRef<Array<{role: string, content: string}>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const systemPromptRef = useRef('');
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioUnlockedRef = useRef(false);

  const unlockAudio = () => {
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {}
    try {
      const u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      window.speechSynthesis?.speak(u);
    } catch {}
  };

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' }), 100);
    }
  }, [messages, loading]);

  const speakFallbackBrowser = (text: string, index: number) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    remainingTextRef.current = '';
    const clean = text.replace(/[*_`#\[\]{}|]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    if (!clean) return;
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
    if (v) utterance.voice = v;
    utterance.onstart = () => setSpeakingIndex(index);
    utterance.onboundary = (e: any) => {
      if (e.name === 'word') remainingTextRef.current = clean.slice(e.charIndex);
    };
    utterance.onend = () => { remainingTextRef.current = ''; setSpeakingIndex(prev => prev === index ? null : prev); };
    utterance.onerror = () => { remainingTextRef.current = ''; setSpeakingIndex(prev => prev === index ? null : prev); };
    window.speechSynthesis.speak(utterance);
  };

  const speakText = (text: string, index: number, force = false) => {
    if (!force && (!voiceEnabled || !window.speechSynthesis)) return;
    unlockAudio();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    window.speechSynthesis?.cancel();
    remainingTextRef.current = '';
    setSpeakingIndex(index);
    const clean = text.replace(/[*_`#\[\]]/g, '').replace(/\n+/g, '. ').replace(/\s+/g, ' ').trim();
    if (!clean) return;

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

  const resumeFromRemaining = (index: number) => {
    if (!remainingTextRef.current) return;
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
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
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    setSpeakingIndex(null);
  };

  const resumeSpeaking = (index: number) => {
    const msg = messages[index];
    if (msg) speakText(msg.content, index);
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
        if (data.systemPrompt) systemPromptRef.current = data.systemPrompt;
        if (data.initialMessage) {
          setMessages([{ role: 'assistant', content: data.initialMessage }]);
          setTimeout(() => speakText(data.initialMessage, 0), 500);
        }
      } catch {
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
          if (prev <= 1) { setTimeout(() => endInterview(), 0); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }
  }, [timerActive]);

  const sendToAI = async (msgs: Array<{role: string, content: string}>) => {
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
    } catch {
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
    } finally {
      setLoading(false);
    }
  };

  const endInterview = async () => {
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
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
    } catch {
      const qCount = messagesRef.current.filter(m => m.role === 'user').length;
      const scoreVal = Math.min(10, Math.max(1, Math.round(qCount * 1.5)));
      setScore(`${scoreVal}/10`);
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    const cur = [...messagesRef.current, { role: 'user', content: userMsg }];
    setMessages(cur);
    await sendToAI(cur);
  };

  const startRecording = async () => {
    unlockAudio();
    window.speechSynthesis?.cancel();
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    remainingTextRef.current = '';
    setSpeakingIndex(null);
    // Try browser-based speech recognition first (no API needed)
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';
      let lastProcessedIdx = 0;
      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = lastProcessedIdx; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript;
            lastProcessedIdx = i + 1;
          }
        }
        if (transcript) setInput(prev => prev + (prev ? ' ' : '') + transcript);
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
      } catch {}
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
        } catch {}
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch {
      alert('Microphone access denied. Please allow microphone access in your browser settings.');
    }
  };

  const stopRecording = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
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
    if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    onBack();
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="resume-interview-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <button className="page-back-btn" onClick={onBackToSetup} style={{ marginRight: 8 }}>{'\u2190'} Back</button>
            <a href="#" className="topbar-logo" onClick={e => { e.preventDefault(); onBack(); }}>
              <span className="topbar-logo-icon" style={{ background: '#6366f1' }}>&#8721;</span>
              <span className="topbar-logo-text">DSA <span style={{color:'#38bdf8'}}>INSIGHTS</span></span>
            </a>
            <div className="resume-interview-badge">{'\u2605'} SURYA</div>
          </div>
          <div className="topbar-right">
            {!ended && (
              <>
                <div className={`interview-timer ${timer < 60 ? 'danger' : ''}`}>{fmt(timer)}</div>
                <button className="interview-end-btn" onClick={endInterview}>
                  End Interview
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="resume-interview-body">
        {ended ? (
          <div className="resume-interview-score">
            <div className="score-circle">
              <div className="score-circle-number">{score.split('/')[0] || '?'}</div>
              <div className="score-circle-label">out of 10</div>
            </div>
            <div className="score-title">Interview Complete</div>
            <div className="score-details">{score.split('\n').slice(1).join('\n')}</div>
            <button className="landing-btn primary" onClick={close}>Back to Home</button>
          </div>
        ) : (
          <div className="resume-interview-chat">
            <div className="resume-interview-messages" ref={scrollRef}>
              {messages.map((msg, i) => (
                <div key={i} className={`resume-msg-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {msg.role === 'assistant' && <div className="resume-msg-avatar ai">{'\u2605'}</div>}
                  <div className={`resume-msg-bubble ${msg.role}`}>
                    {msg.content}
                    {msg.role === 'assistant' && (
                      <span className={`msg-run-hold ${speakingIndex === i ? 'playing' : ''}`} onClick={() => {
                        if (speakingIndex === i) {
                          window.speechSynthesis?.cancel();
                          if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
                          remainingTextRef.current = '';
                          setSpeakingIndex(null);
                        } else {
                          window.speechSynthesis?.cancel();
                          if (currentAudioRef.current) { currentAudioRef.current.pause(); currentAudioRef.current = null; }
                          speakText(msg.content, i, true);
                        }
                      }}>
                        {speakingIndex === i ? '\u23F8' : '\u25B6'}
                      </span>
                    )}
                  </div>
                  {msg.role === 'user' && <div className="resume-msg-avatar user">{userName.charAt(0)}</div>}
                </div>
              ))}
              {loading && (
                <div className="resume-msg-row ai">
                  <div className="resume-msg-avatar ai">{'\u2605'}</div>
                  <div className="resume-msg-bubble assistant">
                    <span className="chat-run-dot" />
                  </div>
                </div>
              )}
            </div>
            <div className="resume-interview-input">
              <button className={`resume-voice-btn ${isRecording ? 'recording' : ''}`} onClick={isRecording ? stopRecording : startRecording} title={isRecording ? 'Stop recording' : 'Voice input'}>
                {isRecording ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
                )}
              </button>
              <button className={`resume-voice-toggle ${voiceEnabled ? 'active' : ''}`} onClick={() => setVoiceEnabled(!voiceEnabled)} title={voiceEnabled ? 'Mute AI voice' : 'Enable AI voice'}>
                {voiceEnabled ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.12 1.5-.35 2.18"></path><line x1="12" y1="19" x2="12" y2="22"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                )}
              </button>
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder={isRecording ? 'Listening...' : 'Type or speak your answer...'} disabled={loading} />
              <button className="resume-send-btn" onClick={sendMessage} disabled={loading || !input.trim()}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
function AuthenticatedApp({
  userId, userName, userEmail, onGoHome,
}: {
  userId: string; userName: string; userEmail: string; onGoHome: () => void;
}) {
  const [page, setPage] = useState<'home' | 'editor' | 'problems' | 'leaderboard' | 'interview' | 'resume-interview' | 'profile'>('home');
  const [selectedId, setSelectedId] = useState(problems[0].id);
  const [solvedProblems, setSolvedProblems] = useState<Set<number>>(new Set());
  const [profile, setProfile] = useState<ProfileData>(emptyProfile());
  const [loaded, setLoaded] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [celebrations, setCelebrations] = useState<{ id: number; icon: string; title: string; desc: string; color: string }[]>([]);

  useEffect(() => {
    loadProfile(userId).then(p => { setProfile(p); setLoaded(true); });
    loadSolved(userId).then(s => setSolvedProblems(s));
  }, [userId]);

  useEffect(() => { if (loaded) saveProfile(userId, profile); }, [profile, loaded, userId]);
  useEffect(() => { if (loaded) saveSolved(userId, solvedProblems); }, [solvedProblems, loaded, userId]);

  useEffect(() => {
    const achievements = computeAchievements(solvedProblems, profile);
    const key = CELEB_KEY(userId);
    let done: number[] = [];
    try { done = JSON.parse(localStorage.getItem(key) || '[]') as number[]; } catch { /* ignore */ }
    const newly = achievements
      .map((a, idx) => ({ ...a, idx }))
      .filter(a => a.earned && !done.includes(a.idx));
    if (newly.length === 0) return;
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

  const selectProblem = (id: number) => { setSelectedId(id); setPage('editor'); };

  const renderCelebrations = () => (
    <>
      {celebrations.map(c => (
        <div key={c.id} className="global-celebrate">
          <div className="global-celebrate-card" style={{ borderColor: `${c.color}88` }}>
            <div className="global-celebrate-icon" style={{ color: c.color }}>{c.icon}</div>
            <div className="global-celebrate-body">
              <div className="global-celebrate-title">{'\u{1F389} Congratulations!'}</div>
              <div className="global-celebrate-sub">You unlocked <b style={{ color: c.color }}>{c.title}</b></div>
              <div className="global-celebrate-desc">{c.desc}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  if (page === 'editor') {
    return (
      <>
        {renderCelebrations()}
        <EditorPage problemId={selectedId} onBack={() => setPage('home')} userName={userName} userId={userId}
          solvedProblems={solvedProblems} setSolvedProblems={setSolvedProblems} profile={profile} setProfile={setProfile} />
      </>
    );
  }

  if (page === 'resume-interview') {
    return (
      <>
        {renderCelebrations()}
        <ResumeInterviewPage resumeText={resumeText} userName={userName} onBack={() => setPage('home')} onBackToSetup={() => setPage('interview')} profile={profile} setProfile={setProfile} />
      </>
    );
  }

  const navigate = (p: string) => setPage(p as any);

  return (
    <>
      {renderCelebrations()}
      <AppTopbar activePage={page} userName={userName} onNavigate={navigate} />
      {page === 'home' && (
        <HomePage userName={userName} solvedProblems={solvedProblems} profile={profile}
          onNavigate={navigate} />
      )}
      {page === 'problems' && (
        <ProblemsPage solvedProblems={solvedProblems} onSelectProblem={selectProblem} onBack={() => setPage('home')} />
      )}
      {page === 'leaderboard' && (
        <LeaderboardPage userName={userName} solvedProblems={solvedProblems} profile={profile} onBack={() => setPage('home')} />
      )}
      {page === 'profile' && (
        <ProfilePage userName={userName} userEmail={userEmail} solvedProblems={solvedProblems} profile={profile} onBack={() => setPage('home')} onSignOut={onGoHome} onOpenProblem={selectProblem} />
      )}
      {page === 'interview' && (
        <ResumeInterviewSetup onStart={(text) => { setResumeText(text); setPage('resume-interview'); }} onBack={() => setPage('home')} />
      )}
    </>
  );
}

function LocalApp() {
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showLogin, setShowLogin] = useState(true);

  if (user) {
    return <AuthenticatedApp userId={user.id} userName={user.name} userEmail={user.email} onGoHome={() => setUser(null)} />;
  }

  return (
    <div className="landing-shell" id="top">
      <header className="landing-header">
        <div className="landing-header-inner">
          <div className="landing-header-left">
            <a href="#top" className="landing-header-logo">
              <div className="landing-logo-icon">&#8721;</div>
              <span>DSA <span style={{color:'#818cf8'}}>INSIGHTS</span></span>
            </a>
          </div>
        </div>
      </header>
      <section className="landing-hero">
        <div className="hero-copy">
          <div className="eyebrow">{'\u2728'} Trusted by 10,000+ developers</div>
          <h1>Where Code Meets<br/>Confidence.</h1>
          <p>150+ curated DSA problems, real-time code execution, and AI-powered mock interviews.</p>
          <div className="hero-actions">
            <button className="primary-button" onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Create Account' : 'Sign In'}</button>
          </div>
        </div>
      </section>
      <div className="auth-overlay" style={{display:'flex'}}>
        <div className="auth-modal">
          <div className="auth-modal-logo">
            <div className="auth-modal-logo-icon">&#x25C6;</div>
            <span>DSA Insights AI</span>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{marginBottom:'14px'}}>
              <label style={{display:'block',color:'#b0b0b0',fontSize:'13px',marginBottom:'6px'}}>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                style={{width:'100%',padding:'10px 14px',borderRadius:'8px',border:'1px solid #3a3a5c',background:'#12121f',color:'#f0f0f0',fontSize:'13px',boxSizing:'border-box'}} />
            </div>
            <div style={{marginBottom:'14px'}}>
              <label style={{display:'block',color:'#b0b0b0',fontSize:'13px',marginBottom:'6px'}}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email"
                style={{width:'100%',padding:'10px 14px',borderRadius:'8px',border:'1px solid #3a3a5c',background:'#12121f',color:'#f0f0f0',fontSize:'13px',boxSizing:'border-box'}} />
            </div>
            <button className="primary-button" style={{width:'100%'}} onClick={() => {
              if (!name.trim()) return;
              setUser({ id: `local-${Date.now()}`, name: name.trim(), email: email.trim() || `${name.trim().toLowerCase()}@local` });
            }}>{showLogin ? 'Sign In' : 'Create Account'}</button>
            <div className="auth-switch" style={{marginTop:'12px'}}>
              <span>{showLogin ? "Don't have an account? " : "Already have an account? "}</span>
              <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Sign up' : 'Sign in'}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ClerkApp() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [guestMode, setGuestMode] = useState(false);

  if (guestMode) {
    return <AuthenticatedApp userId="guest-user" userName="Guest" userEmail="guest@local" onGoHome={() => setGuestMode(false)} />;
  }

  if (!isLoaded) return <div className="loading-screen">Loading...</div>;
  if (!isSignedIn || !user) return <LandingPage onGuest={() => setGuestMode(true)} />;

  const email = user.primaryEmailAddress?.emailAddress ?? user.emailAddresses?.[0]?.emailAddress ?? '';
  const name = user.fullName || user.firstName || 'User';

  return <AuthenticatedApp userId={user.id} userName={name} userEmail={email} onGoHome={() => signOut()} />;
}

function App({ useClerk: useClerkAuth = false }: { useClerk?: boolean }) {
  if (useClerkAuth) return <ClerkApp />;
  return <LocalApp />;
}

export default App;
