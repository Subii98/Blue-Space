import React from 'react'
import axios from "axios";
import PlatformCard from "../components/PlatformCard.js";
import { useContext } from "react";
import { GlobalStoreContext } from "../store";

function SearchScreen() {
    const { store } = useContext(GlobalStoreContext);
    var body = {
        search: store.search
    }
    console.log("store value is ", store.search);
    console.log("entered search screen");
    const res = fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({
        search: store.search,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = res;
    console.log("message:", res.message);
    console.log("data var: ", data);
    return (
        <div>
            <span>HELLO</span>
        </div>
    )
}

export default SearchScreen
