import React, { useState, useEffect } from 'react'

function Platform(props){
    const [platforms, setPlatforms] = useState(props.platforms)
    const [platform, setPlatform] = useState(platforms[0])

    return(
        props.platforms.map((platform)=> (
            <div className="trendingPlatform">
                <img src={platform.icon} alt={platform.title}></img>
                <p>{platform.name}</p>
                <p>{platform.description}</p>
            </div>
            )
        )
    )
}

export default Platform