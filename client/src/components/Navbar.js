import React from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '../context/AuthProvider.js'
import styled from 'styled-components'

const Navbar = props => {

    const logout = () => {
        props.history.push('/login')
        props.logout()
    }

    return(
        <NavContainer>
            <Title>
                Blog it up!
            </Title>
            <Nav>
                <NavLink to='/allblogposts'>Blog Posts</NavLink>
                <NavLink to='/publishablogpost'>Publish</NavLink>
                <NavLink to='/favorites'>Favorites</NavLink>
                <NavLink to='/profile'>Profile</NavLink>
            </Nav>
            <LogOutSection>
                <Button onClick={logout}>{localStorage.getItem('token') !== null ? 'logout' :  'login' } </Button>
            </LogOutSection>
        </NavContainer>
    )
}

export default withAuth(Navbar)

const NavContainer = styled.div`
    
    background-color: #CAEBF2;
    /* padding: 10px; */
    position: fixed;
    bottom: 0;
    width: 100%;
`

const Title = styled.h1`
    font-weight: 900;
    font-size: 20px;
    text-transform: uppercase;
    text-shadow: -.030em .030em #FFF6E6,   -.08em .08em #E7DCD7;
    color: #FF3B3F;
`

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
`

const NavLink = styled(Link)`
    color: #333333;
    margin-right: 10px;
`

const LogOutSection = styled.div`
    display: flex;
    justify-content: center;
`

const Button = styled.button`
    color: #FF3B3F;
    text-shadow: -.030em .030em #FFF6E6,   -.08em .08em #E7DCD7;
    margin: 10px 0;
`