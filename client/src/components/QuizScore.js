import { CallReceivedOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { FetchApiPost } from '../utils/Network';

function QuizScore(props){
    const user = props.user
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)
    const [level, setLevel] = useState(props.user.level)
    const [expRate] = useState(3)
    const [levelUp, setLevelUp] = useState(false)
    const [expBarAmount, setExpBarAmount] = useState() 
    const history = useHistory();

    useEffect(()=> {
        calcLevel()
    }, [])

    useEffect (() => {
        editPoints()
    }, [level, expBarAmount, levelUp])

    function calcLevel(){
        const tmpExp = props.user.exp + (props.count * expRate)

        if ( 0 <= tmpExp && tmpExp <= 15){
            setLevel(1)
            setExpBarAmount( (tmpExp / 15) * 100)
            if ((tmpExp / 15) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 15) * 100) -100) / 49)
            }
        }
        else if ( 15 < tmpExp && tmpExp <= 49){
            setLevel(2)
            setExpBarAmount( (tmpExp / 49) * 100)
            if ((tmpExp / 49) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 49) * 100) -100) / 106)
            }
        }
        else if ( 49 < tmpExp && tmpExp <= 106){
            setLevel(3)
            setExpBarAmount( (tmpExp / 106) * 100)
            if ((tmpExp / 106) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                console.log("3")
                setExpBarAmount(( ((tmpExp / 106) * 100 )-100) / 198)
            }
        }
        else if ( 106 < tmpExp && tmpExp <= 198){
            setLevel(4)
            setExpBarAmount( (tmpExp / 198) * 100)
            if ((tmpExp / 198) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 198) * 100) -100) / 333)
            }
        }
        else if ( 198 < tmpExp && tmpExp <= 333){
            setLevel(5)
            setExpBarAmount( (tmpExp / 333) * 100)
            if ((tmpExp / 333) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(( ((tmpExp / 333) * 100)-100) / 705)
            }
        }
        else if ( 333 < tmpExp && tmpExp <= 705){
            setLevel(6)
            setExpBarAmount( (tmpExp / 705) * 100)
            if ((tmpExp / 705) * 100 >= 100){
                setLevel(level + 1)
                setLevelUp(true)
                setExpBarAmount(99.9)
            }
        }
        else {
            setLevel(7)
            setExpBarAmount( 99.9)
        }
    }

    const editPoints = async () => {
        let res = await FetchApiPost("/api/v1/editPoints", {
            userId: user._id,
            points: user.points - props.usedPoints + (props.count * 10),
            correct: user.correct + props.count,
            totalQuestions: user.totalQuestions + questions.length,
            playCount: user.playCount + 1,
            exp: user.exp + (props.count * expRate),
            level: level
        });
    }

    const onClickClose = () => {
        console.log("back to platform page")
        history.push("/platform/" + platformId);
    }

    return(
        <div className="score">
            <div className="scoreHeader">
                <div className="centered">Score</div>
                <img src="/images/confetti.png" alt="confetti"/>
            </div>
            <div className="userPreview2">
                <div className="userTitle2">
                    <p style={{ textAlign: "center"}}>{user.title}</p>
                </div>                    
                <div className="usernameBadge2">
                    <img src={user.badge}/>
                    <span>{user.username}</span>
                </div>
            </div>
            <div className="storeContent">
                <div className="scoreText">
                    <p>Questions Correct</p>
                    <div className="correctCount">
                        <div className="scoreInfoBlue">{props.count}</div>
                        <div className="scoreInfo">/{questions.length}</div>
                    </div>
                    
                </div>
                <div className="scoreText">
                    <p>Points Spent</p>
                    <div className="scoreInfo">-{props.usedPoints}</div>
                </div>
                <div className="scoreText">
                    <p>Points Earned</p>
                    <div className="scoreInfoBlue">+{props.count * 10}</div>
                </div>                
                <div className="expAndLevel">
                    <div className="levelUpInfo">
                        {levelUp ? <div className="expCount" style={{textAlign:'left', opacity: "100%"}}>
                            <p>Level Up!</p>
                        </div> : <div className="expCount" style={{textAlign:'left', opacity: "0%"}}>
                            <p>Level Up!</p>
                        </div>}
                        <div className="expCount" style={{textAlign:'right'}}>
                            <p>+{props.count * expRate}exp</p>
                        </div>
                    </div>
                    <div className="expBarWithLevel">
                        <p>Lv.{level}</p>
                        <div className="expBarContainer">
                            <div className="expBar rate" style={{width: `${expBarAmount}%`}}></div>
                        </div>
                    </div>
                </div>
                <div className="rateQuizText">Rate this quiz!</div>
            </div>
            
            <button type="button" onClick={onClickClose}>CLOSE</button>
        </div>
    )
}
export default QuizScore