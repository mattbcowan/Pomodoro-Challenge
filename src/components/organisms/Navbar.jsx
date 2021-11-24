import React from "react";
import styled from "styled-components";
import { Hamburger } from "../atoms";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, logout } from "../../firebase";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 1.5rem;
`;

const NavMenu = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;

  @media (max-width: 768px) {
    position: fixed;
    left: -100%;
    top: 5rem;
    flex-direction: column;
    background-color: #fff;
    width: 100%;
    border-radius: 10px;
    text-align: center;
    transition: 0.3s;
    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);

    &.active {
      left: 0;
    }
  }
`;

const NavItem = styled.li`
  margin-left: 5rem;
  list-style: none;

  @media (max-width: 768px) {
    margin: 2.5rem 0;
  }
`;

const NavLink = styled(Link)`
  font-size: 1.25rem;
  font-weight: 400;
  color: #2c2c2c;
  text-decoration: none;
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
`;

const Logo = styled.img`
  height: 48px;
  width: 40px;
`;

const NavLoggedIn = () => {
  return (
    <StyledNav>
      <Link to="/">
        <Logo
          src={process.env.PUBLIC_URL + "/tomato.svg"}
          alt="A cartoon tomato"
        />
      </Link>
      <NavMenu>
        <NavItem>
          <NavLink to="/">Timer</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard">Account</NavLink>
        </NavItem>
        <NavItem>
          <LogOutButton onClick={logout}>Log Out</LogOutButton>
        </NavItem>
      </NavMenu>
      <Hamburger />
    </StyledNav>
  );
};

const NavLoggedOut = () => {
  return (
    <StyledNav>
      <Link to="/">
        <Logo
          src={process.env.PUBLIC_URL + "/tomato.svg"}
          alt="A cartoon tomato"
        />
      </Link>
      <NavMenu>
        <NavItem>
          <LogInButton to="/login">Log In</LogInButton>
        </NavItem>
      </NavMenu>
      <Hamburger />
    </StyledNav>
  );
};

const Navbar = () => {
  const [user] = useAuthState(auth);
  if (user) {
    return <NavLoggedIn />;
  }
  return <NavLoggedOut />;
};

export default Navbar;
