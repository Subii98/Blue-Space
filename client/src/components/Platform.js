import React, { useState, useEffect } from 'react'
import PlatformCard from './PlatformCard.js'

function Platform(props){
    const [platforms, setPlatforms] = useState(props.platforms)

    useEffect(() => {
        setPlatforms(props.platforms)
    }, [props.platforms]);
    
    return(
        <div className="platformCard">
        {props.platforms.map((platform)=> (
            <PlatformCard platform={platform}></PlatformCard>)
        )}
        </div>
    )
}

export default Platform