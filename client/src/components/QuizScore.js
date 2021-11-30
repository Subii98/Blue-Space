import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import { FetchApiPost } from '../utils/Network';

function QuizScore(props){
    const user = props.user
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)
    const history = useHistory();

    useEffect(()=> {
        editPoints()
    }, [])

    const editPoints = async () => {
        let res = await FetchApiPost("/api/v1/editPoints", {
            userId: user._id,
            points: user.points - props.usedPoints + (props.count * 10),
            correct: user.correct + props.count,
            totalQuestions: user.totalQuestions + questions.length,
            playCount: user.playCount + 1
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
            <p>Lv.</p>
            <p>Rate this quiz!</p>
            <button type="button" onClick={onClickClose}>CLOSE</button>
        </div>
    )
}
export default QuizScore