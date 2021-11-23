import React from "react";
import styled from "styled-components";

const HamburgerBar = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  margin: 5px auto;
  transition: all 0.3s ease-in-out;
  background-color: #101010;
`;

const HamburgerContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    cursor: pointer;

    &.active {
      ${HamburgerBar}:nth-child(2) {
        opacity: 0;
      }
      ${HamburgerBar}:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
      }
      ${HamburgerBar}:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
      }
    }
  }
`;

const Hamburger = () => {
  return (
    <HamburgerContainer>
      <HamburgerBar></HamburgerBar>
      <HamburgerBar></HamburgerBar>
      <HamburgerBar></HamburgerBar>
    </HamburgerContainer>
  );
};

export default Hamburger;
