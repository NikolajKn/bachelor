import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {Navbar, Button} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'



const Navigation = () => {
    return(
       <Navbar bg="dark" variant= "dark" expand="lg">

            <LinkContainer to = '/'>
                <Navbar.Brand className="text-white">PokemonPlan</Navbar.Brand>
            </LinkContainer>
           
       </Navbar>
    )
}

export default Navigation;


/*
 <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to = '/' className = "brand-logo">PokemonPlan</Link>
                <SignedInLinks/>
                <SignedOutLinks/>
            </div>
        </nav>
        */