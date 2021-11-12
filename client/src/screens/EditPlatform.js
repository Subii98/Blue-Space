import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { FetchApiPost } from "../utils/Network";
import { useHistory } from "react-router-dom";


function EditPlatform(props) {
    const history = useHistory();
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [platform, setPlatform] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [createPlatform, setCreatePlatform] = useState(null);

    // const [id, setId] = useState("0");
    // const [userId, setUserId] = useState("0");
    const [userName, setUserName] = useState(store.username);
    // const [name, setName] = useState(store.username);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [banner, setBanner] = useState("");
    const [bannerURL, setBannerURL] = useState("");

    const [subscriber, setSubscriber] = useState("");
    // const [banner, setBanner] = useState("");
    // const [icon, setIcon] = useState("");
    // const [fontFamily, setFontFamily] = useState("");
    // const [titleFontSize, setTitleFontSize] = useState(0);
    // const [descFontSize, setDescFontSize] = useState(0);
    const [fontColor, setFontColor] = useState("");
    const [tag1, setTag1] = useState("");
    const [tag2, setTag2] = useState("");
    const [tag3, setTag3] = useState("");
    // const [quizId, setQuizId] = useState("");

    useEffect(()=>{
        if(platform){
            setTitle(platform.title)
            setDescription(platform.description)
            setFontColor(platform.fontColor)
            setTag1(platform.tag1)
            setTag2(platform.tag2)
            setTag3(platform.tag3)
        }
    },[platform]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(
                    "/api/platforms/by_id/" + props.match.params.platformId
                );
                console.log(data);
                setLoading(false);
                setPlatform(data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [ props.match.params.platformId ]);

    useEffect(() => {
        console.log(store);
        // setName(store.username)
        setUserName(store.username);
    }, [store]);

    const onClickSubmit = async () => {
        let res = await FetchApiPost("/api/platforms/edit", {
            platformId : platform._id,
            // userId : userId,
            userName: userName,
            // name : name,
            title: title,
            description: description,
            // subscriber : subscriber,
            // icon : icon,
            banner: banner,
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
        alert("platform edit");
        history.goBack()
    };

    return (
        <div>
            <div>
                {loading && <LoadingModal />}
                {error && <MessageModal variant="danger">{error}</MessageModal>}
                <div className="platform_insert_box">
                    {/* <div className="platform_insert_box-data">
                        <span>userId</span>
                        <input value={userId} onChange={(e)=>setUserId(e.target.value)} />
                    </div> */}
                    {/* <div className="platform_insert_box-data">
                        <span>name</span>
                        <input value={name} onChange={(e)=>setName(e.target.value)} />
                    </div> */}
                    <div className="platform_insert_box-data">
                        <span>title</span>
                        <input value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className="platform_insert_box-data">
                        <span>description</span>
                        <input value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="platform_insert_box-data">
                        <span>banner</span>
                        <input
                            type="file"
                            name="bannerImage"
                            onChange={e => setBannerURL(URL.createObjectURL(e.target.files[0]))}
                        />
                        <img src={bannerURL} width="10%"></img>
                    </div>
                    <div className="platform_insert_box-data">
                        <span>font color</span>
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
                    <button onClick={()=>history.goBack()}>Cancel</button>
                    {/* <span style={{ border : "1px solid blue"}}>CREATE RESULT :: {createPlatform}</span> */}
                </div>
                {/* <div style={{ border : "1px solid red"}}>
                    <div>PLATFORMS :: {platforms}</div>
                </div> */}
                {/* <PlatformListArea /> */}
            </div>
        </div>
    );
}

export default EditPlatform;
