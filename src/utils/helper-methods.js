    export async function fetchWithRefresh(url, options = {}) {
        let res = await fetch(url, { ...options, credentials: "include" });
    
        if (res.status === 401) {
        const refreshRes = await fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
        });
    
        if (refreshRes.ok) {
            res = await fetch(url, { ...options, credentials: "include" });
        } else {
            throw new Error("Session expired. Please log in again.");
        }
        }
    
        if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || `Request failed: ${res.status}`);
        }
    
        return res.json();
    }
    