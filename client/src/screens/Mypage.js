import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiGet } from "../utils/Network";
import Platform from "../components/Platform.js";
import PlatformCard from "../components/PlatformCard.js";
import { Link, useHistory } from "react-router-dom";
import PaginatedItems from "../components/PaginatedItems";

function MyPage(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [platforms, setPlatforms] = useState([]);
    const [user, setUser] = useState();
    const [title, settitle] = useState("");
    const [exp, setExp] = useState();
    const [points, setPoints] = useState();
    const [totalQuestions, setTotalQuestions] = useState("");
    const [correct, setCorrect] = useState("");
    const [badge, setBadge] = useState("");
    const [level, setLevel] = useState()
    const [expBarAmount, setExpBarAmount] = useState()
    const [subscribingPlatforms, setSubscribingPlatforms] = useState([]);
    const expRange = [15, 49, 106, 198, 333, 705, 9999]
    const [userImage, setUserImage] = useState("");
    const [playCount, setUserPlayCount] = useState()
    const history = useHistory();

    useEffect(() => {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }, [history.location.pathname]);

    useEffect(() => {
        if (user) {
            if (user) {
                setName(user.username)
                settitle(user.title);
                setExp(user.exp);
                setPoints(user.points);
                setTotalQuestions(user.totalQuestions);
                setCorrect(user.correct);
                setBadge(user.badge)
                setLevel(user.level)            
                setExpBarAmount( user.exp / expRange[user.level - 1] * 100)
                setUserImage(user.userImage)
                setUserPlayCount(user.playCount)
            }
            const fetchData = async () => {
                setLoading(true);
                const { data } = await axios.get("/api/platforms/" + user._id);
                setLoading(false);
                setPlatforms(data);
                console.log("dataaaa", user.subscribedPlatforms);
                user.subscribedPlatforms.map((raw, idx) => {
                    subscribe(raw);
                });
                
                console.log("?",subscribingPlatforms);
                console.log("platforms", platforms);
            };
            fetchData();
        }
    }, [user]);

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

    // useEffect(() => {
    //     if (store && store.username) setName(store.username);
    // }, [store]);

    // useEffect(() => {
        
    // }, [platforms, subscribingPlatforms]);

    /*
    return (
        <div>
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}                
                <div className="side">
                    <div className="profile">
                        <div className="settingsGear">
                            <img src="/images/icon/gear.png" style={{opacity: "0%"}}/>
                            <button onClick={() => history.push(`/ProfileSetting/${user._id}`)}><img src="/images/icon/gear.png"/></button>
                        </div>
                        <div className="profile-image">
                            <img src={userImage} />
                        </div>
                        <div className="userPreview">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{title}</p>
                            </div>
                            <div className="usernameBadge">
                                <img src={badge}/>
                                <span>{name}</span>
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
            </div>
        </div>
    );
    */
//    if (subscribingPlatforms)
    return(
        <div>
            {loading && <LoadingModal />}
            {error && <MessageModal variant="danger">{error}</MessageModal>}
            <div className="myPage">
                <div className="sideArea">
                    <div className="settingsGear">
                        <button onClick={() => history.push(`/ProfileSetting/${user._id}`)}><img src="/images/icon/gear.png"/></button>
                    </div>
                    <div className="sideAreaInfo">
                        <div className="profileImage">
                            <img src={userImage} alt="profile"/>
                        </div>
                        <div className="userPreview">
                            <div className="userTitle">
                                <p style={{ textAlign: "center"}}>{title}</p>
                            </div>
                            <div className="usernameBadgeMyPage">
                                <img src={badge}/>
                                <span>{name}</span>
                            </div>
                        </div>
                        <div className="expBarWithLevel2">
                            <p>Lv.{level}</p>
                            <div className="expBarContainer2">
                                <div className="expBar2" style={{width: `${expBarAmount}%`}}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="myPageDetails">
                    <div className="myPageDetailsList">
                        <div className="myPageDetailsListTitle">
                            <p>STATS</p>
                            <div className="lineStats"/>
                        </div>
                        <div className="myPageStats">
                            <div className="myPageStatsInfo">
                                <p>ACCURACY</p>
                                <h1>{Math.round(totalQuestions != 0 ? (correct / totalQuestions) * 100 : 0)}%</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>PLAY COUNT</p>
                                <h1>{playCount}</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>TITLE</p>
                                <h1>{title}</h1>
                            </div>
                            <div className="myPageStatsInfo">
                                <p>POINTS</p>
                                <h1>{points}p</h1>
                            </div>
                        </div>
                    </div>
                    <div className="myPageDetailsList2">
                        <div className="myPagePlatformsHeader">
                            <p>OWNED PLATFORMS</p>
                            <div className="linePlatforms"/>
                        </div>                        
                        <PaginatedItems itemsPerPage={4} items={platforms} row={true}/>
                    </div>
                    <div className="myPageDetailsList2">
                        <div className="myPagePlatformsHeader">
                            <p>SUBSCRIBED PLATFORMS</p>
                            <div className="linePlatforms"/>
                        </div>
                        <PaginatedItems itemsPerPage={4} items={subscribingPlatforms} row={true}/>
                    </div>
                </div>
            </div>
        </div>
          
    )
}

export default MyPage;
