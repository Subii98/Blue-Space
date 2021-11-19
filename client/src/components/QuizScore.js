import React, { useEffect, useState } from 'react'
import { Link, useHistory } from "react-router-dom";

function QuizScore(props){
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)
    const history = useHistory();

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
            <p>Points Spent</p>
            <p>Points Earned</p>
            <p>Lv.</p>
            <p>Rate this quiz!</p>
            <button type="button" onClick={onClickClose}>CLOSE</button>
        </div>
    )
}
export default QuizScore