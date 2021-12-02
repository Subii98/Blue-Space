import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import MenuIcon from "@mui/icons-material/Menu";
import NavElements from './NavElements.js';
import CopyrightIcon from "@mui/icons-material/Copyright";

function NavBar(children, ...rest) {
    //was supposed to be layout
    //children is the rest of the elements
    //...rest is the rest of the classnames associated
    const [showNav, setShowNav] = useState(false);
    const toggle = () => setShowNav(!showNav);

/* <img src="/images/hamburger.png" className="hamburger" alt="hamburger" width="25" />*/
    
    return (
        <div className={`navigation ${showNav ? "expanded" : ""}`}>
            <div className="menuIcon" onClick={toggle}>
                <MenuIcon sx={{ fontSize: 36 }}> </MenuIcon>
            </div>
            {showNav ? <NavElements></NavElements> : null}
        </div>
    );
}

export default NavBar
