import React from 'react'
import { useState, useEffect } from 'react';

function Timer(props) {
    const [initialSeconds] = useState(props.time)
    const initialMinute = 0
    const [minutes, setMinutes ] = useState(initialMinute);
    const [seconds, setSeconds ] = useState(initialSeconds);
    const setTimeOut = props.setTimeOut
    const timeOut = props.timeOut

    useEffect(()=>{
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setInterval(0)
                    clearInterval(myInterval)
                    setTimeOut(true)
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            } 
        }, 1000)
        return ()=> {
            clearInterval(myInterval);
          };
    });

    useEffect(()=> {
        if (!timeOut)
            setSeconds(initialSeconds)
    }, [timeOut])

    return (
        <div>
        { minutes === 0 && seconds === 0
            ? <h1> 0:00 </h1> 
            : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
        }
        </div>
    )
}

export default Timer;