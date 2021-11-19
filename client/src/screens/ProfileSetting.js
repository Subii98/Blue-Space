import React, { useEffect, useState, useContext } from "react";
import { GlobalStoreContext } from "../store";
import axios from "axios";
import { TextField, Button } from "@mui/material";

import { FetchApiPost } from "../utils/Network";

function ProfileSetting(props) {
    const { store } = useContext(GlobalStoreContext);
    //use react hooks to set data (empty array by default)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [name, setName] = useState("");
    const [userData, setUserData] = useState();

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
        if (userData) {
            setName(userData.username);
        }
    }, [userData]);

    const onClickUpdate = async () => {
        const res = await FetchApiPost("/api/v1/set_username", {
            newName: name,
            userId: userData._id,
        });

        if (res.err) {
            alert(`${name} is exist username!!`);
        } else {
            alert("Updated");
        }
    };

    return (
        <div className="profile-setting-main-container">
            <Button onClick={onClickUpdate}>UPDATE</Button>
            <div className="profile-setting-box">
                username
                <TextField value={name} onChange={e => setName(e.target.value)} />
            </div>
        </div>
    );
}

export default ProfileSetting;
