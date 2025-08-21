import { Button, Input, Text } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus } from "~/javascript/context/AuthContext";

export default function CreateUserForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Signup failed");
      }

      const token = res.headers.get("Authorization")?.split("Bearer ")[1];
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token received");
      }
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Register</Button>
        <Text>Already have an account?</Text>
        <Button onClick={() => navigate("/login")}>Login</Button>
      </form>
      {/* <Link href="/users/auth/google_oauth2">
        <Button>Sign up with Google</Button>
      </Link> */}
    </>
  );
}
