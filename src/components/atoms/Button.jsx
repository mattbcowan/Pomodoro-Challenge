import React from "react";
import styled, {css} from 'styled-components'

const StyledButton = styled.button`
  width: 11rem;
  padding: 1rem 1.5rem;
  font-size: 1.25rem;
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  outline: none;
  border-radius: 0.5rem;
  cursor: pointer;
  margin: 0 1rem;

  ${props => props.primary && css`
    background: #fff;
    border: 2px solid #fff;
    color: #c0392b;
  `}
`


const Button = ({ primary, children, onClick}) => {
  return (
    <StyledButton onClick={onClick} primary={primary}>{children}</StyledButton>
  );
};

export default Button