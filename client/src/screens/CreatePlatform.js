import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiPost, FetchApiPostWithFile } from "../utils/Network";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function CreatePlatform(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [createPlatform, setCreatePlatform] = useState(null);
    const [bannerImageRef, setBannerImageRef] = useState();

    // const [id, setId] = useState("0");
    const [userId, setUserId] = useState("0");
    const [userName, setUserName] = useState(store.username);
    // const [name, setName] = useState(store.username);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [bannerURL, setBannerURL] = useState("/images/noimage.png");

    const [subscriber, setSubscriber] = useState("");
    const [icon, setIcon] = useState("");
    const [iconURL, setIconURL] = useState("/images/noimage.png");
    const [iconImageRef, setIconImageRef] = useState();

    // const [fontFamily, setFontFamily] = useState("");
    // const [titleFontSize, setTitleFontSize] = useState(0);
    // const [descFontSize, setDescFontSize] = useState(0);
    const [fontColor, setFontColor] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    // const [quizId, setQuizId] = useState("");
    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("/api/platforms");
                console.log(data);
                setLoading(false);
                setPlatforms(JSON.stringify(data));
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        console.log(store);
        // setName(store.username)
        setUserName(store.username);
        fetchUser();
    }, [store]);

    function fetchUser() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }
    const onClickSubmit = async () => {
        let res = await FetchApiPostWithFile("/api/platforms/insert", [banner,icon], {
            userId: user._id,
            // userId : userId,
            userName: userName,
            // name : name,
            title: title,
            description: description,
            // subscriber : subscriber,
            // icon : icon,
            // fontFamily : fontFamily,
            // titleFontSize : titleFontSize,
            // descFontSize : descFontSize,
            fontColor: fontColor,
            tag1: tag1,
            tag2: tag2,
            tag3: tag3,
            // quizId : quizId.split(','),
        });
        // setCreatePlatform(JSON.stringify(res));
        alert("platform created!");
    };

    const onChangeBanner = e => {
        setBannerURL(URL.createObjectURL(e.target.files[0]));
        setBanner(e.target.files[0]);
    };

    const onChangeIcon = e => {
        setIconURL(URL.createObjectURL(e.target.files[0]));
        setIcon(e.target.files[0]);
    }

    const onClickBanner = ()=>{
        if(bannerImageRef) bannerImageRef.click();
    }
    
    const onClickIcon = () => {
        if(iconImageRef) iconImageRef.click();
    }

    return (
        <div className="create-plaform-main">
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                <div className="postArea">
                    <div className="cp-banner">
                        {/* <img src="/images/platformprofile.jpg"  height="10%"/> */}
                        <img src={bannerURL} onClick={onClickBanner}/>

                        <input
                            ref={ref => setBannerImageRef(ref)}
                            id="file-input"
                            type="file"
                            onChange={onChangeBanner}
                        />
                    </div>
                    <div className="platformInfoArea">
                    <div>
                        {/* <img src="/images/platformprofile.jpg"  height="10%"/> */}
                        <img src={iconURL} onClick={onClickIcon}/>

                        <input
                            ref={ref => setIconImageRef(ref)}
                            id="file-input"
                            type="file"
                            onChange={onChangeIcon}
                        />
                    </div>
                        {/* <img src="/images/noimage.png" alt="platformprofile" align="center" /> */}
                        <div className="platformInfo">
                            <div className="platformTop">
                                <input
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="Title"
                                    style={{ fontSize: "40px", width: "70%" }}
                                />
                                {/* <span>title font color</span> */}
                                <input
                                    type="color"
                                    value={fontColor}
                                    onChange={e => setFontColor(e.target.value)}
                                />

                                <span>{store.username}</span>
                            </div>
                            <div className="platformBottom">
                                {/* <span>{platform.description}</span> */}
                                <input
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                    placeholder="description"
                                    style={{ fontSize: "12px", width: "70%" }}
                                />
                                <Button
                                    style={{
                                        backgroundColor: "#00aeef",
                                        color: "white",
                                        float: "right",
                                    }}
                                >
                                    {"SUBSCRIBE"}
                                </Button>
                            </div>
                            <div className="platformBottom">
                                <span></span>

                                <button type="button">EDIT</button>
                            </div>
                        </div>
                    </div>
                    <div className="platform_insert_box">
                        <div className="platform_insert_box-data">
                            <span>title font color</span>
                            <input
                                type="color"
                                value={fontColor}
                                onChange={e => setFontColor(e.target.value)}
                            />
                        </div>
                        <div className="platform_insert_box-data">
                            <span>tag1</span>
                            <input value={tag1} onChange={e => setTag1(e.target.value)} />
                        </div>
                        <div className="platform_insert_box-data">
                            <span>tag2</span>
                            <input value={tag2} onChange={e => setTag2(e.target.value)} />
                        </div>
                        <div className="platform_insert_box-data">
                            <span>tag1</span>
                            <input value={tag3} onChange={e => setTag3(e.target.value)} />
                        </div>
                        <button onClick={onClickSubmit}>submit</button>
                        {/* <span style={{ border : "1px solid blue"}}>CREATE RESULT :: {createPlatform}</span> */}
                    </div>
                    {/* <div style={{ border : "1px solid red"}}>
                    <div>PLATFORMS :: {platforms}</div>
                </div> */}
                    {/* <PlatformListArea /> */}
                </div>
                <div>
                    <Button
                        className="asd"
                        onClick={onClickSubmit}
                        style={{
                            backgroundColor: "#00aeef",
                            color: "white",
                            float: "right",
                        }}
                    >
                        {"SAVE"}
                    </Button>
                    <Button
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
                    <button onClick={() => history.goBack()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default CreatePlatform;
