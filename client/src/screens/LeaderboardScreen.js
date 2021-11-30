import axios from "axios";
import React, { useState, useEffect } from "react";
import RankAccuracy from "../components/RankAccuracy.js";

function LeaderboardScreen(){
    const [user, setUser] = useState()
    const [userPoints, setUserPoints] = useState()
    const [currentBadge, setCurrentBadge] = useState()
    const [currentTitle, setCurrentTitle] = useState()
    const [username, setUsername] = useState()
    const [correct, setCorrect] = useState()
    const [totalQuestions, setTotalQuestions] = useState()
    const [playCount, setPlayCount] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => (setUser(res.data), setUserPoints(res.data.points), setCurrentBadge(res.data.badge), setCurrentTitle(res.data.title), setUsername(res.data.username), 
            setCorrect(res.data.correct), setTotalQuestions(res.data.totalQuestions), setPlayCount(res.data.playCount)))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
    }, [])

    return(
        <div className="leaderboard">
            <div className="userRank">
                <div className="userProfile">
                    <div className="userTitle">
                        <p style={{ textAlign: "center"}}>{currentTitle}</p>
                    </div>                    
                    <div className="usernameBadge">
                        <img src={currentBadge}/>
                        <span>{username}</span>
                    </div>
                </div>
                <p>{Math.round(( correct / totalQuestions) * 100)}%</p>
                <p>{playCount}</p>
            </div>
            <div className="leaderboardHeader">
                <p>Rank</p>
                <p>Username</p>
                <p>Level</p>
                <p>Accuracy</p>
                <p>Play Count</p>
            </div>
            <RankAccuracy></RankAccuracy>
        </div>
    )
}

export default LeaderboardScreen