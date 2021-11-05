import React, { useEffect, useState } from 'react'

function QuizScore(props){
    const [questions, setQuestions] = useState(props.questions)

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
            <button id="close" onClick={onCloseClick}>CLOSE</button>
        </div>
    )
}
export default QuizScore