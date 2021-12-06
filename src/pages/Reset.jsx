import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../components/atoms";
import { auth, resetEmail } from "../firebase";

const Container = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
`;

const ResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmailInput = styled.input`
  border: 1px solid #fff;
  margin: 0.25rem 1rem;
  width: 100%;
  font-size: 1em;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const SignUpText = styled.div`
  color: #fff;
  margin: 0.25rem 1rem;
`;

const Register = styled(Link)`
  font-weight: 700;
  color: #fff;
`;

const ResetMessage = styled.span`
  color: #fff;
  font-size: 1.25rem;
`;

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const [hasResetSent, setHasResetSent] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <ResetContainer>
        {hasResetSent && (
          <ResetMessage>Reset email has been sent.</ResetMessage>
        )}
        <EmailInput
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <Button fullwidth onClick={() => resetEmail(email, setHasResetSent)}>
          Submit
        </Button>
        <SignUpText>
          Don't have an account? <Register to="/register">Register</Register>{" "}
          now.
        </SignUpText>
      </ResetContainer>
    </Container>
  );
}
export default Reset;
