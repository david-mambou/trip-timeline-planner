export async function checkAuthStatus(): Promise<boolean> {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const response = await fetch("/api/auth/status", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  } catch {
    return false;
  }
}
