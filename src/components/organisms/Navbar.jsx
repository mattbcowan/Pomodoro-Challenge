import React from 'react'
import styled from 'styled-components'
import {Button} from '../atoms'

const StyledNav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 1rem 1.5rem;
`

const NavMenu = styled.ul`
    display: flex;
    justify-content: space-around;
    align-items: center;
    list-style: none;

    @media (max-width: 768px) {
        position: fixed;
        left: -100%;
        top: 5rem;
        flex-direction: column;
        background-color: #fff;
        width: 100%;
        border-radius: 10px;
        text-align: center;
        transition: 0.3s;
        box-shadow: 0 10px 27px rgba(0,0,0, 0.05);

        &.active {
            left: 0;
        }
    }
`

const NavItem = styled.li`
    margin-left: 5rem;
    list-style: none;

    @media (max-width: 768px) {
        margin: 2.5rem 0;
    }
`

const NavLink = styled.a`
    font-size: 1.25rem;
    font-weight: 400;
    color: #2c2c2c;
    text-decoration: none;
`

const HamburgerBar = styled.span`
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    transition: all 0.3s ease-in-out;
    background-color: #101010;
`

const Hamburger = styled.div`
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
`

const Logo = styled.img`
    height: 48px;
    width: 40px;
`

const HamburgerButton = () => {
    return (
        <Hamburger>
            <HamburgerBar></HamburgerBar>
            <HamburgerBar></HamburgerBar>
            <HamburgerBar></HamburgerBar>
        </Hamburger>
    )
}

const Navbar = () => {
    return (
        <StyledNav>
                <a href="/"><Logo src={process.env.PUBLIC_URL + "/tomato.svg"} alt="A cartoon tomato" /></a>
                <NavMenu>
                    <NavItem>
                        <NavLink href="">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="">Account</NavLink>
                    </NavItem>
                    <NavItem>
                        <Button inverted>Log Out</Button>
                    </NavItem>
                </NavMenu>
                <HamburgerButton />
        </StyledNav>
    )
}

export default Navbar
