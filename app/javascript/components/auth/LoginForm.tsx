import { Button, Heading, HStack, Input } from "@chakra-ui/react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStatus, useCurrentUser } from "~/javascript/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useCurrentUser();

  const isLoggedIn = useAuthStatus();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/users/sign_in", {
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
        throw new Error(err.error || "Login failed");
      }

      const token = res.headers.get("Authorization")?.split("Bearer ")[1];
      if (token) {
        localStorage.setItem("token", token);
      } else {
        throw new Error("No token received");
      }

      const data = await res.json();

      if (data.user) {
        setUser(data.user);
      }

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Heading mb={4}>Login</Heading>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <HStack justify="space-between" mt={4} mb={4}>
          <Button colorScheme="blue" type="submit">
            Login
          </Button>
          <Button colorScheme="blue" onClick={() => navigate("/register")}>
            Register
          </Button>
        </HStack>
      </form>
      {/* <Link href="/users/auth/google_oauth2">
        <Button>Login with Google</Button>
      </Link> */}
    </>
  );
}
