import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useObjectVal } from "react-firebase-hooks/database";
import { db } from "../firebase";
import { ref } from "firebase/database";
import Loading from "../components/atoms/Loading";

const Greeting = styled.h1`
  font-size: 6em;
  padding-bottom: 2rem;
  color: #fff;
`;

const Score = styled.div`
  color: #fff;
  font-size: 2em;
`;

const Dashboard = ({ user }) => {
  const [value, loading] = useObjectVal(ref(db, `/users/`));
  const [userObject, setUserObject] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }

    if (value !== undefined) {
      for (let [key, values] of Object.entries(value)) {
        if (user.uid === key) {
          setUserObject(values);
        }
      }
    }
  }, [value, userObject]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {loading ? (
        <Greeting>
          <Loading />
        </Greeting>
      ) : (
        <>
          <Greeting>Hey {userObject.username}!</Greeting>
          <Score>Your current score is {userObject.pomScore}</Score>
        </>
      )}
    </div>
  );
};

export default Dashboard;
