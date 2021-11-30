import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import RankPlayCount from './RankPlayCount';
import RankAccuracy from './RankAccuracy';

function RankLevel(props){
    const [user] = useState(props.user)
    const [users, setUsers] = useState(props.users);

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
    const [rankAccuracy, setRankAccuracy] = useState(false)
    const [rankLevel, setRankLevel] = useState(true)
    const [rankPlayCount, setRankPlayCount] = useState(false)

    useEffect(()=> {
        setUserRank(users.indexOf(users.find( e => e.username == props.user.username))+ 1)
    }, [])

    useEffect(() => {
        setTitle(props.user.title)
        setBadge(props.user.badge)
        setUsername(props.user.username)
        setCorrect(props.user.correct)
        setTotalQuestions(props.user.totalQuestions)
        setPlayCount(props.user.playCount)
        setLevel(props.user.level)
    }, [props.user, props.users])

    const onClickSortAccuracy = () => {
        setRankLevel(false)
        setRankAccuracy(true)
        setRankPlayCount(false)
    }

    const onClickSortPlayCount = () => {
        setRankAccuracy(false)
        setRankLevel(false)
        setRankPlayCount(true)
    }
    
    if (rankLevel){
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
                <div className="rankAccuracy">
                    <div className="leaderboardHeader">
                        <p>Rank</p>
                        <p>Username</p>
                        <button disabled={true}>Level</button>
                        <button disabled={false} onClick={() => onClickSortAccuracy()}>Accuracy</button>
                        <button disabled={false} onClick={() => onClickSortPlayCount()}>Play Count</button>
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
            <RankAccuracy user={props.user}></RankAccuracy>
        )
    }

}

export default RankLevel