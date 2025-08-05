import { Button, Input, Link } from "@chakra-ui/react";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

// type LoginFormProps = {
//   onLogin: any;
// }

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        // onLogin?.(); // Callback if needed
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
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <Button type="submit">Login</Button>
      </form>
      {/* <Link href="/users/auth/google_oauth2">
        <Button>Login with Google</Button>
      </Link> */}
    </>
  );
}
