import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { auth, emailAuth, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../components/atoms";
import { InputWithLabel } from "../components/molecules";
import Loading from "../components/atoms/Loading";

const fadeIn = keyframes`
  from {
    transform: scale(.25);
    opacity: 0;
  }

  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  background-color: #fff;
  width: 90%;
  padding: 2rem;
  border-radius: 0.5em;
  animation: ${fadeIn} 250ms linear;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorBox = styled.div`
  background-color: #c0392b;
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <LoginContainer>
          {error && <ErrorBox>{error}</ErrorBox>}
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
            <Button
              inverted
              fullwidth
              onClick={() => {
                emailAuth(email, password, setError);
              }}
            >
              Log In
            </Button>
            <GoogleButton onClick={() => signInWithGoogle(setError)}>
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
      )}
    </>
  );
};

export default Login;
