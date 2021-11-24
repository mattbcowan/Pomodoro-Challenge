import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, emailAuth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/atoms";
import { InputWithLabel } from "../components/molecules";

const GoogleButton = styled.button`
  background-color: transparent;
  border: 2px solid #27ae60;
  color: #27ae60;
  width: 100%;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0.25rem 1rem;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background-color: #fff;
  width: 100%;
  padding: 2rem;
  border-radius: 0.5em;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // Loading animation goes here
      return;
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <LoginContainer>
      <h2>Log In</h2>
      <InputContainer>
        <InputWithLabel
          htmlFor="email"
          labelName="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <InputWithLabel
          htmlFor="password"
          labelName="Password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button inverted fullwidth onClick={() => emailAuth(email, password)}>
          Log In
        </Button>
        <GoogleButton onClick={signInWithGoogle}>
          Sign In With Google
        </GoogleButton>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register Now.</Link>
        </div>
      </InputContainer>
    </LoginContainer>
  );
};

export default Login;
