import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function RankAccuracy(props){
    const [user] = useState(props.user)
    const [title, setTitle] = useState()
    const [badge, setBadge] = useState()
    const [username, setUsername] = useState()
    const [correct, setCorrect] = useState()
    const [totalQuestions, setTotalQuestions] = useState()
    const [playCount, setPlayCount] = useState()
    const [userRank, setUserRank] = useState()
    const [level, setLevel] = useState()
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(()=> {
        axios
            .get("/api/v1")
            .then(res => {
                setLoading(true);
                setUsers(res.data);
                setLoading(false);
                return;
            })
            .catch(error => {
                setError("Error loading users");
                setLoading(false);
                console.log("Error loading users");
            });
        users.sort((b, a) => (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions))
        setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
    }, [])

    useEffect(() => {
        if (props.user != undefined){
            setTitle(props.user.title)
            setBadge(props.user.badge)
            setUsername(props.user.username)
            setCorrect(props.user.correct)
            setTotalQuestions(props.user.totalQuestions)
            setPlayCount(props.user.playCount)
            setLevel(props.user.level)
            users.sort((b, a) => (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions))
            setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
        }
    }, [props.user])
    
    return(
        <div>
            <div className="userRank">
                <p>{userRank}</p>
                <div className="userProfile">
                    <div className="userTitle">
                        <p style={{ textAlign: "center"}}>{title}</p>
                    </div>                    
                    <div className="usernameBadge">
                        <img src={badge}/>
                        <span>{username}</span>
                    </div>
                </div>
                <p>{level}</p>
                <p>{Math.round(( correct / totalQuestions) * 100)}%</p>
                <p>{playCount}</p>
            </div>
            <div className="rankAccuracy">
                <div className="leaderboardHeader">
                    <p>Rank</p>
                    <p>Username</p>
                    <p>Level</p>
                    <p>Accuracy</p>
                    <p>Play Count</p>
                </div>
                {users.map((user, index) => 
                    <div className="userRank">
                        <p>{index+1}</p>
                        <div className="userProfile">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{user.title}</p>
                            </div>                    
                            <div className="usernameBadge">
                                <img src={user.badge}/>
                                <span>{user.username}</span>
                            </div>
                        </div>
                    <p>{user.level}</p>
                    <p>{Math.round(( user.correct / user.totalQuestions) * 100)}%</p>
                    <p>{user.playCount}</p>
                </div>)}
            </div>
        </div>
    )

}

export default RankAccuracy