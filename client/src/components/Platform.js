import React, { useState, useEffect } from 'react'
import PlatformCard from './PlatformCard.js'

function Platform(props){
    const [platforms, setPlatforms] = useState(props.platforms)

    return(
        <div>
        {props.platforms.map((platform)=> (
            <PlatformCard platform={platform}></PlatformCard>)
        )}
        </div>
    )
}

export default Platform