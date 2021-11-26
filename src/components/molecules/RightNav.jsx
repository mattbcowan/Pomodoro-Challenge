import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { auth, logout } from "../../firebase";
import { Hamburger } from "../atoms";

const NavMenu = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: #c0392b;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 100vw;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`;

const NavItem = styled.li`
  margin-left: 5rem;
  list-style: none;

  @media (max-width: 768px) {
    margin: 2.5rem;
    display: flex;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 400;
  color: #2c2c2c;
  text-decoration: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    color: #fff;
  }
`;

const LogInButton = styled(Link)`
  width: 11rem;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  background: #27ae60;
  border: 2px solid #27ae60;
  color: #fff;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0.25rem 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const LogOutButton = styled.button`
  width: 11rem;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  background: #c0392b;
  border: 2px solid #c0392b;
  color: #fff;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0.25rem 1rem;
  text-decoration: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background: #fff;
    border: 2px solid #fff;
    color: #c0392b;
  }
`;

const NavLoggedIn = ({ open, onClick, onLogoutClicked }) => {
  return (
    <>
      <Hamburger open={open} onClick={onClick} />
      <NavMenu open={open}>
        <NavItem>
          <NavLink to="/" onClick={onClick}>
            Timer
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard" onClick={onClick}>
            Account
          </NavLink>
        </NavItem>
        <NavItem>
          <LogOutButton onClick={onLogoutClicked}>Log Out</LogOutButton>
        </NavItem>
      </NavMenu>
    </>
  );
};

const NavLoggedOut = ({ open, onClick }) => {
  return (
    <>
      <Hamburger open={open} onClick={onClick} />
      <NavMenu open={open}>
        <NavItem>
          <LogInButton to="/login" onClick={onClick}>
            Log In
          </LogInButton>
        </NavItem>
      </NavMenu>
    </>
  );
};

const RightNav = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    setOpen(!open);
    logout();
    return navigate("/login");
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  if (user) {
    return (
      <NavLoggedIn
        open={open}
        onClick={handleOpen}
        onLogoutClicked={onLogoutClicked}
      />
    );
  }
  return <NavLoggedOut open={open} onClick={handleOpen} />;
};

export default RightNav;
