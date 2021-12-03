import axios from "axios";
import React, { useState, useEffect } from "react";
import { FetchApiPost } from "../utils/Network";

function StoreScreen(){
    const badges = ["/images/badges/car.png", "/images/badges/sword.png", "/images/badges/abduction.png", "/images/badges/dog.png", "/images/badges/worldwide.png"]
    const badgeNames = ["car", "sword", "ufo", "doggo", "earth"]
    const badgeCost = 100
    const titleCost = 100
    const [currentBadge, setCurrentBadge] = useState("")
    const [currentTitle, setCurrentTitle] = useState("")

    const titles = ["Mastermind", "Invincible", "Specialist", "Expert"]
    const [user, setUser] = useState()
    const [error, setError] = useState(false);
    const [userPoints, setUserPoints] = useState()
    const [username, setUsername] = useState()

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then((res) => (setUser(res.data), setUserPoints(res.data.points), setCurrentBadge(res.data.badge), setCurrentTitle(res.data.title), setUsername(res.data.username)))
            .catch((error) => {
                setError(
                    "No userdata"
                );
            })
    }, [])

    useEffect(() => {

    }, [currentBadge, currentTitle, userPoints, user])

    const onClickBuyBadge = (e) => {
        let response = window.confirm("Purchase selected badge? Cost: 100 points")
        if (response && user.points >= badgeCost){
            setCurrentBadge(e)
            updateUserBadge(e)
            setUserPoints(userPoints-badgeCost)
        }
        else if (response && user.points < badgeCost){
            alert("Not enough points")
        }
        
    }

    const onClickBuyTitle = (e) => {
        let response = window.confirm("Purchase selected title? Cost: 100 points")
        if (response && user.points >= titleCost){
            setCurrentTitle(e)
            updateUserTitle(e)
            setUserPoints(userPoints-titleCost)
        }
        else if (response && user.points < titleCost){
            alert("Not enough points")
        }
    }

    const updateUserBadge = async (e) => {
        let res = await FetchApiPost("/api/v1/editBadge", {
            userId: user._id,
            badge: e,
            points: user.points - badgeCost,
        });
    }

    const updateUserTitle = async (e) => {
        let res = await FetchApiPost("/api/v1/editTitle", {
            userId: user._id,
            title: e,
            points: user.points - titleCost,
        });
    }

    const onClickPreviewBadge = (e) => {
        setCurrentBadge(e)
    }

    const onClickPreviewTitle = (e) => {
        setCurrentTitle(e)
    }

    return(
        <div className="storePage">
            <div className="storeHeader">
                <div className="storePoints">{userPoints}<p> Points</p></div>
                <div className="userPreview">
                    <div className="userTitle">
                        <p style={{ textAlign: "center"}}>{currentTitle}</p>
                    </div>                    
                    <div className="usernameBadge">
                        <img src={currentBadge}/>
                        <span>{username}</span>
                    </div>
                </div>
            </div>
            <div className="storeContent">
                <p style={{ textAlign: "center"}}>BADGE</p>
                <div className="line" />
                <div className="badges">
                    {badges.map( (badge, index) => 
                        <div className="storeBadges">
                            <p style={{ textAlign: "center", color: "#929292" }}>{badgeNames[index]}</p>
                            <input type="image" src={badge} alt={index} onClick={ () => onClickBuyBadge(badge)}></input>                        
                            <button onClick={() => onClickPreviewBadge(badge)}>preview</button>
                        </div>
                    )}
                </div>
                <div className="titles">
                    <p style={{ textAlign: "center"}}>TITLE</p>
                    <div className="line" />
                    {titles.map((title) => 
                        <div className="storeTitles">
                            <button onClick={() => onClickBuyTitle(title)}>{title}</button>
                            <div className="titlePreview">
                                <button onClick={() => onClickPreviewTitle(title)}>preview</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default StoreScreen