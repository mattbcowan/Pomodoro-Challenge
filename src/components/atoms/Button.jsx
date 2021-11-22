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

  ${props => props.inverted && css`
    background: transparent;
    border: 2px solid #c0392b;
    color: #c0392b;
  `}
`


const Button = ({ primary, inverted, children, onClick}) => {
  return (
    <StyledButton onClick={onClick} primary={primary} inverted={inverted}>{children}</StyledButton>
  );
};

export default Button