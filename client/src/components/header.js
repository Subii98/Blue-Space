import React from 'react'
import { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalStoreContext } from "../store";
import LoginComponent from "./Login";
import LogoutComponent from "./Logout";

function Header(props) {
    const { store } = useContext(GlobalStoreContext);
    const [data, setData] = useState();
    //console.log(GlobalStoreContext);
    let history = useHistory();
    //const loginData = localStorage.getItem('data');
    /*
    if (loginData){
      if (!store.loggedIn){
        console.log("entered loginData assignment: ", loginData);
        store.logIn(loginData);
      }
    } */
  
    let userName = "hello";
    console.log(store)
    if (store.loggedIn){
      userName = store.username;
    }
    //console.log('username for header: ', userName);

    const handleSubmit = (event) => {
      event.preventDefault();
      store.setSearch(data);
      console.log("printing search query: ", store.search);
      history.push("/search");
    }

    return (
      <header>
        <div className="all">
          <img
            src="/images/hamburger.png"
            className="hamburger"
            alt="hamburger"
            width="25"
          />
          <a href="/">
            <img
              src="/images/logo11.png"
              className="logo"
              alt="logo"
              width="85"
            />
          </a>
          <div className="headerItems">
            <div className="topLine">
              <div className="searchBar">
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="search"
                    className="searchInput"
                    placeholder="search categories"
                    id="searchInput"
                    onChange={(e) => setData(e.target.value)}
                  />
                  <button type="submit">
                    <img src="./images/magnifyingglass.png" width="13" />
                  </button>
                </form>
              </div>
              <div className="login">
                {store.loggedIn ? (
                  <a href="/MyPage">{userName} </a>
                ) : (
                  <LoginComponent />
                )}

                <LogoutComponent />
              </div>
            </div>
            <div className="mainButtons">
              <Link to="/categories">
                <button type="button">CATEGORIES</button>
              </Link>
              <Link to="/createplatform">
                <button type="button">CREATE</button>
              </Link>
              <Link to="leaderboard">
                <button type="button">LEADERBOARD</button>
              </Link>
              <Link to="/store">
                <button type="button">STORE</button>
              </Link>
              <Link to="/help">
                <button type="button">HELP</button>
              </Link>
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header
