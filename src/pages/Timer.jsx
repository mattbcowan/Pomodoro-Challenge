import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import styled from "styled-components";
import { Button } from "../components/atoms";

const StyledTimer = styled.div`
  font-size: 8rem;
  color: white;
  padding-bottom: 2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Timer = () => {
  const [seconds, setSeconds] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [user, error] = useAuthState(auth);

  const navigate = useNavigate();

  let minutes = Math.floor(seconds / 60);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(10);
    setIsActive(false);
  }

  useEffect(() => {
    if (!user) return navigate("/login");

    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, user]);

  return (
    <Container>
      <StyledTimer>
        {seconds < 0 ? (
          <p>Time to Rest</p>
        ) : (
          <>
            {minutes}:{seconds % 60 <= 9 ? `0${seconds % 60}` : seconds % 60}
          </>
        )}
      </StyledTimer>
      <ButtonContainer>
        <Button primary onClick={toggle}>
          {isActive ? "Pause" : "Start"}
        </Button>
        <Button onClick={reset}>Reset</Button>
      </ButtonContainer>
    </Container>
  );
};

export default Timer;
