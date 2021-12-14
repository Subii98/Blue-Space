import React from 'react'
import { useState, useContext } from 'react'
import { GlobalStoreContext } from "../../store";
import { Link } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu";
import NavElements from './NavElements.js';
import CopyrightIcon from "@mui/icons-material/Copyright";
import LoginHamburger from "../LoginHamburger.js";

function NavBar(children, ...rest) {
     const { store } = useContext(GlobalStoreContext);
    //was supposed to be layout
    //children is the rest of the elements
    //...rest is the rest of the classnames associated
    const [showNav, setShowNav] = useState(false);
    const toggle = () => setShowNav(!showNav);

        
/* <img src="/images/hamburger.png" className="hamburger" alt="hamburger" width="25" />*/
    
    return (
        <div className={`navigation ${showNav ? "expanded" : ""}`}>
            {!store.loggedIn ? 
                [<LoginHamburger>
                    <MenuIcon sx={{ fontSize: 36 }}> </MenuIcon>
                </LoginHamburger>] :
            [<div className="menuIcon" onClick={toggle}>
                <MenuIcon sx={{ fontSize: 36 }}> </MenuIcon>
            </div>] }

            {showNav ? <NavElements></NavElements> : null}
        </div>
    );
}

export default NavBar
