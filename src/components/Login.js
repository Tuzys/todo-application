import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="h-screen w-screen bg-indigo-400 overflow-hidden absolute flex items-center">
        <div>
          <h2 className="">Log In</h2>
          {error && <p variant="danger">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <div>Email</div>
              <input type="email" ref={emailRef} required></input>
            </div>
            <div id="password">
              <div>Password</div>
              <input type="password" ref={passwordRef} required></input>
            </div>
            <button disabled={loading} className="" type="submit">
              Log In
            </button>
          </form>
          <div>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
      <div className="">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
