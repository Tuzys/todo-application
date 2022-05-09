import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <div>
      <div>
        <div>
          <h2 className="">Sign up</h2>
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
            <div id="password-confirm">
              <div>Password Confirmation</div>
              <input type="password" ref={passwordConfirmRef} required></input>
            </div>
            <button disabled={loading} className="" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
      <div className="">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
