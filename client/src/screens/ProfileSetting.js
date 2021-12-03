import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import { TextField, Button } from "@mui/material";

import { FetchApiPostWithFile,FetchApiPost } from "../utils/Network";
import { set } from "mongoose";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";
import Platform from "../components/Platform.js";
import PlatformCard from "../components/PlatformCard.js";
import { Link, useHistory } from "react-router-dom";

function ProfileSetting(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [userData, setUserData] = useState();
    const [userImage, setUserImage] = useState("");
    const [userImageURL, setUserImageURL] = useState("")
    const [userImageRef, setUserImageRef] = useState()
    const [platforms, setPlatforms] = useState([]);
    const [title, settitle] = useState("");
    const [exp, setExp] = useState();
    const [points, setPoints] = useState();
    const [totalQuestions, setTotalQuestions] = useState("");
    const [correct, setCorrect] = useState("");
    const [badge, setBadge] = useState("");
    const [level, setLevel] = useState()
    const [expBarAmount, setExpBarAmount] = useState()
    const [subscribingPlatforms, setSubscribingPlatforms] = useState([]);
    const expRange = [15, 49, 106, 198, 333, 705, 9999];
    const history = useHistory();


    useEffect(() => {
        let _userData = localStorage.getItem("data");
        _userData = JSON.parse(_userData);
        axios
            .get("/api/v1/get_user?user_id=" + _userData.id)
            .then(res => setUserData(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }, []);

    useEffect(() => {
        console.log("userDataaaa", userData);
        if (userData) {
            const fetchData = async () => {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/" + userData._id);
                setLoading(false);
                setPlatforms(data);
                userData.subscribedPlatforms.map((raw, idx) => {
                    subscribe(raw);
                });
                console.log(subscribingPlatforms);
                console.log("platforms", platforms);
            };
            fetchData();
        }
    }, [userData]);

    function subscribe(id) {
        axios
            .get("/api/platforms/by_id/" + id)
            .then(res =>{ 
                subscribingPlatforms.push(res.data);
                console.log("!!",subscribingPlatforms);
                setSubscribingPlatforms([...subscribingPlatforms]);
            })
            .catch(error => {
                setError("No userdata");
            });
    }

    useEffect(() => {
        if (userData) {
            setName(userData.username);
            settitle(userData.title);
            setExp(userData.exp);
            setPoints(userData.points);
            setTotalQuestions(userData.totalQuestions);
            setCorrect(userData.correct);
            setBadge(userData.badge);
            setLevel(userData.level);
            setExpBarAmount(userData.exp/expRange[userData.level -1] * 100);
            setUserImage(userData.userImage);
            setUserImageURL(userData.userImage);
        }
    }, [userData]);

    const onClickUserImage = () => {
        if (userImageRef) userImageRef.click();
    };

    const onChangeUserImage = e => {
        setUserImageURL(URL.createObjectURL(e.target.files[0]));
        setUserImage(e.target.files[0]);
    };

    const onClickUpdate = async () => {
        const res = await FetchApiPostWithFile("/api/v1/set_user", [userImage],{
            newName: name,
            userId: userData._id,
            userImage: userImage
        });

        if (res.err) {
            alert(`${name} is exist username!!`);
        } else {
            alert("Updated");
        }
        alert("user Updated");
        // history.goBack();
    };
    // console.log("!@#!@#!@#$!@",userData)
    // const onClickUpdate = async () => {
    //     const res = await FetchApiPost("/api/v1/set_username", {
    //         newName: name,
    //         userId: userData._id,
    //     });
    //     if (res.err) {
    //         alert(`${name} is exist username!!`);
    //         // alert("exist user")
    //     } else {
    //         alert("Updated");
    //     }
    // };

    return (
        <div>
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                <div className="side">
                    <div className="profile">
                        <div className="settingsGear">
                            <img src="/images/icon/gear.png" style={{opacity: "0%"}}/>
                            <button ><img src="/images/icon/gear.png"/></button>
                        </div>
                        <div className="profile-image">
                            <img src={userImageURL} onClick={onClickUserImage}/>
                            <input
                                ref={ref => setUserImageRef(ref)}
                                id="file-input"
                                type="file"
                                onChange={onChangeUserImage}
                            />
                        </div>
                        <div className="userPreview">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{title}</p>
                            </div>
                            <div className="usernameBadge">
                                <img src={badge}/>
                                {/* <span>{name}</span> */}
                                <TextField value={name} onChange={e => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className="expBarWithLevel2">
                            <p>Lv.{level}</p>
                            <div className="expBarContainer2">
                            <div className="expBar2 rate" style={{width: `${expBarAmount}%`}}></div>
                        </div>
                    </div>
                    </div>
                    <div className="platforms-list">
                        <div className="stat">STATS</div>
                        <div className="stat-value">
                            <div className="child">ACCURACY</div>
                            <div className="child">TITLE</div>
                            <div className="child">RANK</div>
                            <div className="child">POINTS</div>
                        </div>
                        <div className="stat-value">
                            <div className="child">
                                {totalQuestions != 0 ? (correct / totalQuestions) * 100 : 0}%
                            </div>
                            <div className="child">{title}</div>
                            <div className="child">{exp}</div>
                            <div className="child">{points}</div>
                        </div>

                        <div className="platform-box">
                            <p>Owned Platforms</p>
                            <Platform platforms={platforms} row={true}></Platform>
                        </div>
                        <div className="platform-box">
                            <p>Subscribed Platforms</p>
                            <Platform platforms={subscribingPlatforms} row={true}></Platform>
                        </div>
                    </div>
                </div>
                <Button
                    // component={Link} to="/"
                        className="asd"
                        onClick={onClickUpdate}
                        style={{
                            backgroundColor: "#00aeef",
                            color: "white",
                            float: "right",
                        }}
                    >
                        {"SAVE"}
                    </Button>
                    <Button
                        onClick={() => history.goBack()}
                        style={{
                            float: "right",
                            color: "#00aeef",
                            bordercolor: "#00aeef",
                            borderradius: "5px",
                            borderstyle: "solid",
                            borderwidth: "1px",
                        }}
                    >
                        {"CANCEL"}
                    </Button>
            </div>
        </div>
    );
}

export default ProfileSetting;
