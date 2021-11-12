import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

function QuizScore(props){
    const [questions, setQuestions] = useState(props.questions)
    const [platformId, setPlatformId] = useState(props.platformId)

    const onCloseClick = () => {
        console.log("back to platform page")
    }

    return(
        <div className="score">
            <p>Score</p>
            <div className="questionsCorrect">
                <p>Questions Correct {props.correct}/{questions.length}</p>
            </div>
            <p>Points Spent</p>
            <p>Points Earned</p>
            <p>Lv.</p>
            <p>Rate this quiz!</p>
            <Link to={`/platform/${platformId}`}>CLOSE</Link>
        </div>
    )
}
export default QuizScore