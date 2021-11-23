import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  font-size: 1.25em;
  margin: 1em 0;
  padding: 0.25em;
  border: none;
  border-bottom: 2px solid #000;
  border-radius: 0;
  outline: none;
`;
const HiddenLabel = styled.label`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const InputWithLabel = ({
  htmlFor,
  labelName,
  type,
  name,
  id,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <>
      <HiddenLabel htmlFor={htmlFor}>{labelName}</HiddenLabel>
      <StyledInput
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputWithLabel;
