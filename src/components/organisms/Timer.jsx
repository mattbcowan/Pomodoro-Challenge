import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import {Button} from '../atoms'

const StyledTimer = styled.div`
    font-size: 8rem;
    color: white;
    padding-bottom: 2rem;    
`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`

const ButtonContainer = styled.div`
    display: flex;
    
    @media (max-width: 768px) {
        flex-direction: column;
    }
`


const Timer = () => {
    const [seconds, setSeconds] = useState(60 * 25);
    const [isActive, setIsActive] = useState(false)
    let minutes = Math.floor(seconds/60);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setSeconds(60 * 25);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;
        if(isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000)
        } else if(!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <Container>
            <StyledTimer>{minutes}:{(seconds%60) <= 0 ? `0${seconds%60}` : (seconds%60)}</StyledTimer>
            <ButtonContainer>
                <Button primary onClick={toggle}>
                    {isActive ? "Pause" : "Start"}
                </Button>
                <Button onClick={reset}>
                    Reset
                </Button>
            </ButtonContainer>
        </Container>
    )
}

export default Timer
