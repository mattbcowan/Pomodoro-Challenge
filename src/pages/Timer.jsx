import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ref, set } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../firebase";
import styled from "styled-components";
import { Button, Time } from "../components/atoms";

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

const Timer = ({ user }) => {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(10);
  const [value] = useObjectVal(ref(db, `/users/`));
  const [userObject, setUserObject] = useState({});
  const navigate = useNavigate();

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(10);
    setIsActive(false);
  }

  function updateDB() {
    set(ref(db, `/users/${user.uid}`), userObject)
      .then(() => {
        console.log("Data saved!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    if (!user) return navigate("/login");

    if (value !== undefined) {
      for (let [key, values] of Object.entries(value)) {
        if (user.uid === key) {
          setUserObject(values);
        }
      }
    }

    let interval = null;

    if (value !== undefined) {
      if (isActive && seconds > -1) {
        interval = setInterval(() => {
          setSeconds((seconds) => seconds - 1);
        }, 1000);
      } else if (!isActive && seconds !== 0) {
        clearInterval(interval);
      } else if (seconds < 0) {
        clearInterval(interval);
        setIsActive(false);
        userObject.pomScore++;
        updateDB();
      }
      return () => {
        clearInterval(interval);
      };
    }
  }, [user, isActive, seconds]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Time seconds={seconds} isActive={isActive} />
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
