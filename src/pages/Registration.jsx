import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import { InputWithLabel } from "../components/molecules";
import { Button } from "../components/atoms";

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

const RegisterContainer = styled.div`
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

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading] = useAuthState(auth);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password, setError);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RegisterContainer>
      {error && <ErrorBox>{error}</ErrorBox>}
      <InputContainer>
        <InputWithLabel
          htmlFor="name"
          labelName="Name"
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <InputWithLabel
          htmlFor="email"
          labelName="Email"
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
        <Button fullwidth inverted onClick={register}>
          Register
        </Button>
        <GoogleButton onClick={signInWithGoogle}>
          Register with Google
        </GoogleButton>
        <div>
          Already have an account? <Link to="/login">Login Now.</Link>
        </div>
      </InputContainer>
    </RegisterContainer>
  );
};

export default Registration;
