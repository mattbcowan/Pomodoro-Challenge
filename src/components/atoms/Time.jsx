import styled from "styled-components";

const StyledTimer = styled.div`
  font-size: 8rem;
  color: white;
  padding-bottom: 2rem;
`;

const Time = (props) => {
  let minutes = Math.floor(props.seconds / 60);

  return (
    <StyledTimer>
      {props.seconds < 0 ? (
        <>Time to Rest</>
      ) : (
        <>
          {minutes}:
          {props.seconds % 60 <= 9
            ? `0${props.seconds % 60}`
            : props.seconds % 60}
        </>
      )}
    </StyledTimer>
  );
};

export default Time;
