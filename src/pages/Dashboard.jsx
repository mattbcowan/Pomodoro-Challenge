import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../firebase";
import { onValue, ref } from "firebase/database";
import { Button } from "../components/atoms";

const Greeting = styled.h1`
  font-size: 6em;
  padding-bottom: 2rem;
  color: #fff;
`;

const Score = styled.div`
  color: #fff;
  font-size: 2em;
`;

const Dashboard = () => {
  const [user, error] = useAuthState(auth);
  const [myUser, setMyUser] = useState({});
  const navigate = useNavigate();

  const getUserData = async (db, user) => {
    const userId = user.uid;
    onValue(ref(db, `/users/${userId}`), (snapshot) => {
      const data = snapshot.val();
      setMyUser(data);
    });
  };

  useEffect(() => {
    if (!user) return navigate("/login");
    getUserData(db, user);
  }, [user]);

  return (
    <div>
      <Greeting>Hey {myUser.username}!</Greeting>
      <Score>Your current score is 0</Score>
    </div>
  );
};

export default Dashboard;
