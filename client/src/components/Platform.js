import React, { useState, useEffect } from 'react'
import PlatformCard from './PlatformCard.js'

function Platform(props){
    const [platforms, setPlatforms] = useState(props.platforms)

    useEffect(() => {
        setPlatforms(props.platforms)
    }, [props.platforms, props.row]);
    
    return(
        <div className="platformCard" style={props.row && {display:"flex", flexDirection: "row", alignItems:"flex-start", justifyContent:"space-evenly", width: "100%"}}>
        {props.platforms.map((platform)=> (
            <PlatformCard platform={platform} row={props.row}></PlatformCard>)
        )}
        </div>
    )
}

export default Platform