export const problems = [];

export async function loadProblems() {
    try {
        const res = await fetch('/api/problems');
        if (!res.ok) {
            return;
        }
        const data = await res.json();
        problems.splice(0, problems.length, ...data);
    }
    catch {
        // keep the list empty; the app renders a loading state
    }
}
