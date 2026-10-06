export const problems = [];

const MAX_ATTEMPTS = 3;

export async function loadProblems() {
    let lastError = null;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const res = await fetch('/api/problems', { headers: { Accept: 'application/json' } });
            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('empty problem list');
            }
            problems.splice(0, problems.length, ...data);
            return problems;
        }
        catch (e) {
            lastError = e;
            if (attempt < MAX_ATTEMPTS) {
                await new Promise(r => setTimeout(r, attempt * 400));
            }
        }
    }
    throw lastError || new Error('failed to load problems');
}
