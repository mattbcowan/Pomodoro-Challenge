import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout, db } from "../firebase";
import { onValue, ref } from "firebase/database";

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
      <div>
        Logged in as <div>{myUser.username}</div>
        <div>{myUser.email}</div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
