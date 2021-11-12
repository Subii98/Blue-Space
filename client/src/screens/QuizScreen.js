import React, { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";

function QuizScreen(props) {
    const [quiz, setQuiz] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (props.match.params.quizId) fetchQuiz();
    }, []);

    function fetchQuiz() {
        axios
            .get("/api/questions/get_question/" + props.match.params.quizId)
            .then(res => {
                setLoading(true);
                const data = res.data;
                console.log(data)
                setQuiz(data);
                setLoading(false);
                return;
            })
            .catch(error => {
                setError("Error loading quiz");
                setLoading(false);
                console.log("Error loading quiz");
            });
    }
    return (
        <div>
            {loading ? (
                <LoadingModal></LoadingModal>
            ) : error ? (
                <MessageModal variant="danger">{error}</MessageModal>
            ) : (
                <div className="platformQuiz">
                    {quiz && quiz.length > 0 ? <Question question={quiz}></Question> : <></>}
                </div>
            )}
        </div>
    );
}

export default QuizScreen;
