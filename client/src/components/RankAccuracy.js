import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

function RankAccuracy(){
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
    }, [])

    users.sort((b, a) => (a.correct / a.totalQuestions) - (b.correct / b.totalQuestions))

    return(
        <div className="rankAccuracy">
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
                <p>{Math.round(( user.correct / user.totalQuestions) * 100)}%</p>
                <p>{user.playCount}</p>
            </div>)}
        </div>
    )

}

export default RankAccuracy