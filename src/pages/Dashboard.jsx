import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, logout, db } from "../firebase";
import { onValue, ref } from "firebase/database";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
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
    if (loading) return;
    if (!user) return navigate("/");
    getUserData(db, user);
  }, [user, loading]);

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
