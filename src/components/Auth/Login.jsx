import React, { useState } from "react";
import "./Login.css";

const Login = ({handleLogin}) => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
   

handleLogin(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="left-section">
          <img
            src="https://img.icons8.com/?size=100&id=m0c1h1XS3gNM&format=png&color=000000"
            alt="User Icon"
            className="user-icon"
          />
          <h2 className="login-title">Login</h2>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="text"
                placeholder="Enter your email"
                className="input-field"
                required
              />
            </div>
            <div>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Password"
                className="input-field"
                required
              />
            </div>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="signup-text">
              Don’t have an account? <a href="#">Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
