import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useAuthState} from "react-firebase-hooks/auth"
import { Link, useNavigate } from 'react-router-dom'
import {
    auth, registerWithEmailAndPassword, signInWithGoogle
} from '../firebase'
import { InputWithLabel } from '../components/molecules'
import { Button } from "../components/atoms"

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

const RegisterContainer = styled.div`
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

const Registration = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const register = () => {
        if(!name) alert("Please enter name");
        registerWithEmailAndPassword(name, email, password)
    }

    useEffect(() => {
        if(loading) return;
        if(user) navigate('/dashboard');
    }, [user, loading])

    return (
        <RegisterContainer>
            <InputContainer>
                <InputWithLabel htmlFor="name" labelName="Name" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <InputWithLabel htmlFor="email" labelName="Email" type="text" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <InputWithLabel htmlFor="password" labelName="Password" type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <Button fullwidth inverted onClick={register}>
                    Register
                </Button>
                 <GoogleButton onClick={signInWithGoogle}>
                     Register with Google
                 </GoogleButton>
                 <div>
                     Already have an account? <Link to="/">Login Now.</Link>
                 </div>
            </InputContainer>
        </RegisterContainer>
    )
}

export default Registration
