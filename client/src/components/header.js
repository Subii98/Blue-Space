import React from 'react'
import { useContext } from "react";

import { GlobalStoreContext } from "../store";


function Header(props) {
    const { store } = useContext(GlobalStoreContext);
    console.log(GlobalStoreContext);
  
    let userName = "hello";
    console.log(store)
    if (store.loggedIn){
      userName = store.username;
      
    }
    console.log('username for header: ', userName);
    return (
      <header>
        <div className="all">
          <img
            src="./images/hamburger.png"
            className="hamburger"
            alt="hamburger"
            width="25"
          />
          <a href="index1.html">
            <img
              src="./images/logo11.png"
              className="logo"
              alt="logo"
              width="85"
            />
          </a>
          <div className="headerItems">
            <div className="topLine">
              <div className="searchBar">
                <input
                  type="text"
                  className="searchInput"
                  placeholder="search categories"
                  id="searchInput"
                />
                <button type="submit">
                  <img src="./images/magnifyingglass.png" width="13" />
                </button>
              </div>
              <div className="login">
                {store.loggedIn ? (
                  <a href="">{userName} </a>
                ) : (
                  <a href="">LOG IN</a>
                )}

                <a href="">SIGN OUT</a>
              </div>
            </div>
            <div className="mainButtons">
              <button type="button">CATEGORIES</button>
              <button type="button">CREATE</button>
              <button type="button">LEADERBOARD</button>
              <button type="button">STORE</button>
              <button type="button">HELP</button>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header
