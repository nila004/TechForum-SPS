import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("volunteer"); // volunteer | participant
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    if (token && userRole === "volunteer") navigate("/eventd");
    else if (token && userRole === "participant") navigate("/participantd");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    // Choose correct API based on role
    const endpoint =
      role === "volunteer"
        ? "http://localhost:5000/api/volunteer/login"
        : "http://localhost:5000/api/participants/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed ❌");
        return;
      }

      // ✅ Store token, email, and role
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);

      setMessage("✅ Login successful! Redirecting...");

      // ✅ Navigate based on role
      setTimeout(() => {
        navigate(role === "volunteer" ? "/eventd" : "/participantd");
      }, 1200);
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to continue</p>

        {/* Role Selection */}
        <div className="role-select">
          <label>
            <input
              type="radio"
              name="role"
              value="volunteer"
              checked={role === "volunteer"}
              onChange={(e) => setRole(e.target.value)}
            />
            Volunteer
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="participant"
              checked={role === "participant"}
              onChange={(e) => setRole(e.target.value)}
            />
            Participant
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
}

export default Login;
