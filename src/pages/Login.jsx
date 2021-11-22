import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import {auth, signInWithEmailAndPassword, signInWithGoogle} from '../firebase'
import {useAuthState} from "react-firebase-hooks/auth"
import {Button} from '../components/atoms'

const GoogleButton = styled.button`
    background-color: transparent;
    border: 2px solid #27ae60;
    color: #27ae60;
    width: 100%;
    padding: 1rem 1.5rem;
    font-size: 1.25rem;
    outline: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0.25rem 1rem;
`

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    background-color: #fff;
    width: 100%;
    padding: 2rem;
    border-radius: 0.5em;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const StyledInput = styled.input`
    width: 100%;
    font-size: 1.25em;
    margin: 1em 0;
    padding: 0.25em;
    border: none;
    border-bottom: 2px solid #000;
    border-radius: 0;
    outline: none;
`
const HiddenLabel = styled.label`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading] = useAuthState(auth)
    // const navigate = useNavigate()

    useEffect(() => {
        if(loading) {
            // Loading animation goes here
            return;
        }
        // if(user) navigate('/dashboard')
    }, [user, loading])

    return (
        <LoginContainer>
            <h2>Log In</h2>
            <InputContainer>
                <HiddenLabel htmlFor="email">Email</HiddenLabel>
                <StyledInput type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                <HiddenLabel htmlFor="password">Password</HiddenLabel>
                <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <Button inverted fullwidth onClick={() => signInWithEmailAndPassword(email, password)}>Log In</Button>
                <GoogleButton onClick={signInWithGoogle}>Sign In With Google</GoogleButton>
            </InputContainer>
        </LoginContainer>
    )
}

export default Login
