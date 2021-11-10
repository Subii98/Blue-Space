import React, { useEffect, useState } from 'react'

function PostArea(props) {
  const [platform, setPlatform] = useState()

  useEffect( () => {
    setPlatform(props.platform)
    console.log(platform)
  }, [])

    return (
      <div className="postArea">
        <div className="banner">
          <img src={platform.banner} />
        </div>
        <div className="platformInfoArea">
          <img src="/images/platformprofile.jpg" alt="platformprofile" />
          <div className="platformInfo">
            <div className="platformTop">
              <a href="">70s & 80s Rock</a>
              <span>john_1234</span>
            </div>
            <div className="platformBottom">
              <span>The ultimate old time Rock & Roll quiz</span>
              <button type="button">SUBSCRIBE</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default PostArea
