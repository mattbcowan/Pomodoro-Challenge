import styled from "styled-components";
import { RightNav } from "../molecules";

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 1rem 1.5rem;
`;

const Logo = styled.img`
  height: 48px;
  width: 40px;
`;

const Navbar = () => {
  return (
    <StyledNav>
      <Logo
        src={process.env.PUBLIC_URL + "/tomato.svg"}
        alt="A cartoon tomato"
      />
      <RightNav />
    </StyledNav>
  );
};

export default Navbar;
