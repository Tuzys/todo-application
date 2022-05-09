import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("check ur inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <div>
      <div>
        <div>
          <h2 className="">Reset Password</h2>
          {error && <p>{error}</p>}
          {message && <p>{message}</p>}
          <form onSubmit={handleSubmit}>
            <div id="email">
              <div>Email</div>
              <input type="email" ref={emailRef} required></input>
            </div>
            <button disabled={loading} className="" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
      <div className="">
        Go back to <Link to="/signup">Log In</Link>
      </div>
    </div>
  );
}
