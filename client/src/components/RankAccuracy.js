import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import RankLevel from './RankLevel';
import RankPlayCount from './RankPlayCount';

function RankAccuracy(props){
    const [user] = useState(props.user)
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState()
    const [badge, setBadge] = useState()
    const [username, setUsername] = useState()
    const [correct, setCorrect] = useState()
    const [totalQuestions, setTotalQuestions] = useState()
    const [playCount, setPlayCount] = useState()
    const [userRank, setUserRank] = useState()
    const [level, setLevel] = useState()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [rankAccuracy, setRankAccuracy] = useState(true)
    const [rankLevel, setRankLevel] = useState(false)
    const [rankPlayCount, setRankPlayCount] = useState(false)


    useEffect(()=> {
        axios
            .get("/api/v1")
            .then(res => {
                setLoading(true);
                setUsers(res.data.sort((b, a) => (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions)));
                setLoading(false);
                return;
            })
            .catch(error => {
                setError("Error loading users");
                setLoading(false);
                console.log("Error loading users");
            });
        setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
        setRankAccuracy(true)
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
            setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
            setRankAccuracy(true)
        }
    }, [props.user, users])

    const onClickSortLevel = () => {
        setRankPlayCount(false)
        setRankAccuracy(false)
        setRankLevel(true)
    }

    const onClickSortPlayCount = () => {
        setRankAccuracy(false)
        setRankLevel(false)
        setRankPlayCount(true)
    }

    if (rankAccuracy){
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
                    <p>{totalQuestions != 0 ? Math.round(( correct / totalQuestions) * 100) : 0}%</p>
                    <p>{playCount}</p>
                </div>
                <div className="rankSorted">
                    <div className="leaderboardHeader">
                        <p>Rank</p>
                        <p>Username</p>
                        <button disabled={false} onClick={() => onClickSortLevel()}>Level</button>
                        <button disabled={true}>Accuracy</button>
                        <button disabled={false} onClick={()=> onClickSortPlayCount()}>Play Count</button>
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
                        <p>{user.totalQuestions != 0 ? Math.round(( user.correct / user.totalQuestions) * 100) : 0}%</p>
                        <p>{user.playCount}</p>
                    </div>)}
                </div>
            </div>
        )
    }
    else if (rankPlayCount){
        return(
            <RankPlayCount user={props.user} users={users.sort((b, a) => a.playCount - b.playCount)}></RankPlayCount>
        )
    }
    else{
        return(
            <RankLevel user={props.user} users={users.sort((b, a) => a.level - b.level)}></RankLevel>
        )
    }
    

}

export default RankAccuracy