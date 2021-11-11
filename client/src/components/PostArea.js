import React, { useEffect, useState } from 'react'

function PostArea(props) {
  const [platform, setPlatform] = useState(props.platform)

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
              <span>john_1234</span>
            </div>
            <div className="platformBottom">
              <span>{platform.description}</span>
              <button type="button">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PostArea
