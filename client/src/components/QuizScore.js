import { CallReceivedOutlined } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { FetchApiPost } from '../utils/Network';

function QuizScore(props){
    const user = props.user
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)
    const [level, setLevel] = useState(10)
    const [expRate] = useState(3)
    const history = useHistory();

    useEffect(()=> {
        calcLevel()
    }, [])

    useEffect (() => {
        console.log(level)
        editPoints()
    }, [level])

    function calcLevel(){
        const tmpExp = props.user.exp + (props.count * expRate)
        console.log(tmpExp)
        if ( 0 <= tmpExp && tmpExp <= 15){
            console.log("why?")
            setLevel(1)
        }
        else if ( 15 < tmpExp && tmpExp <= 49){
            setLevel(2)
        }
        else if ( 49 < tmpExp && tmpExp <= 106){
            setLevel(3)
        }
        else if ( 106 < tmpExp && tmpExp <= 198){
            setLevel(4)
        }
        else if ( 198 < tmpExp && tmpExp <= 333){
            setLevel(5)
        }
        else if ( 333 < tmpExp && tmpExp <= 705){
            setLevel(6)
        }
        else {
            setLevel(7)
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
            <p>Score</p>
            <div className="questionsCorrect">
                <p>Questions Correct {props.count}/{questions.length}</p>
            </div>
            <p>Points Earned +{props.count * 10}</p>
            <p>Points Spent -{props.usedPoints}</p>
            <p>Exp +{props.count * expRate}</p>
            <p>Lv.{level}</p>
            <p>Rate this quiz!</p>
            <button type="button" onClick={onClickClose}>CLOSE</button>
        </div>
    )
}
export default QuizScore