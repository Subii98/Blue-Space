import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { useIsMounted } from "../components/useIsMounted.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

function Quiz(props) {
    const [quizId, setQuizId] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isMounted = useIsMounted();
    const history = useHistory();

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (props.platformId) fetchQuiz();
    }, [props.platformId]);

    function fetchQuiz() {
        axios
            .get("/api/quizzes/" + props.platformId)
            .then(res => {
                setLoading(true);
                if (isMounted.current) {
                    const data = res.data;
                    setQuizzes(data);
                    setLoading(false);
                    return;
                }
            })
            .catch(error => {
                setError("Error loading quiz");
                setLoading(false);
                console.log("Error loading quiz");
            });
    }

    return (
        <div className="quizCardArea">
            {loading ? (
                <LoadingModal></LoadingModal>
            ) : error ? (
                <MessageModal variant="danger">{error}</MessageModal>
            ) : (
                <div className="platformQuiz">
                    <div className="quizHeader">
                        <p>Quiz</p>
                        <Button onClick={() => history.push("/CreateQuiz/" + props.platformId)}>
                            Create
                        </Button>
                    </div>
                    {quizzes.map(quiz => (
                        <QuizCard quiz={quiz} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Quiz;
