export async function apiFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
    },
  });

  if (res.status === 401) {
    return null;
  }

  return res.json();
}
