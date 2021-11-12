import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


function PostArea(props) {
    const [platform, setPlatform] = useState(props.platform);
    console.log("????", platform._id)
    return (
        <div className="postArea">
            <div className="banner">
                <img src={platform.banner} />
            </div>
            <div className="platformInfoArea">
                <img src="/images/platformprofile.jpg" alt="platformprofile" />
                <div className="platformInfo">
                    <div className="platformTop">
                        <a href="">{platform.title}</a>
                        <span>{platform.userName}</span>
                    </div>
                    <div className="platformBottom">
                        <span>{platform.description}</span>
                        <button type="button">SUBSCRIBE</button>
                    </div>
                    <div className="platformBottom">
                        <span>{platform.description}</span>
        
                        {/* <Link to={`/platform/${props.match.params.platformId}`}>
                          <button type="button">EDIT</button>
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostArea;
