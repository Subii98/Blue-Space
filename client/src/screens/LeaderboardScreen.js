import axios from "axios";
import React, { useState, useEffect } from "react";
import RankSort from "../components/RankSort.js";

function LeaderboardScreen(){
    const [user, setUser] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => (setUser(res.data)))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
    }, [])

    return(
        <div className="leaderboard">
            <RankSort user={user}></RankSort>
        </div>
    )
}

export default LeaderboardScreen