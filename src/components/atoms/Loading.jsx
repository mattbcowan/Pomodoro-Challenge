import styled, { keyframes } from "styled-components";

const hopAnimation = keyframes`
  from {
    transform: translateY(0%);
  }
  20% {
    transform: translateY(-100%);
  }
  40% {
    transform: translateY(0%);
  }
  to {
    transform: translateY(0%);
  }
`;

const Dot = styled.span`
  display: inline-block;
  height: 16px;
  width: 16px;
  border-radius: 16px;
  background-color: #fff;
  margin-right: 4px;
  animation-duration: 2s;
  animation-name: ${hopAnimation};
  animation-iteration-count: infinite;

  &:nth-child(2) {
    animation-delay: 250ms;
  }
  &:nth-child(3) {
    animation-delay: 500ms;
  }
  &:nth-child(4) {
    animation-delay: 750ms;
  }
`;

const Loading = () => {
  return (
    <div>
      <Dot />
      <Dot />
      <Dot />
      <Dot />
    </div>
  );
};

export default Loading;
