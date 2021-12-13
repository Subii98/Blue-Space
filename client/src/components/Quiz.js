import axios from "axios";
import React, { useState, useEffect } from "react";
import QuizCard from "./QuizCard.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { useIsMounted } from "../components/useIsMounted.js";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import { prop } from "dom7";

function Quiz(props) {
    const [quizId, setQuizId] = useState();
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const isMounted = useIsMounted();
    const history = useHistory();

    useEffect(() => {
        if (user && platform) {
            if (user._id == platform.userId) {
                setIsOwner(true);
            }
        }
        // console.log("is owner?", isOwner);
    });

    function fetchUser() {
        let userData = localStorage.getItem("data");
        userData = JSON.parse(userData);
        axios
            .get("/api/v1/get_user?user_id=" + userData.id)
            .then(res => setUser(res.data))
            .catch(error => {
                setError("No userdata");
            });
    }

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (props.platformId) {
            fetchPlatform();
        }
        fetchUser();
        if (props.platformId) fetchQuiz();
    }, [props.platformId]);

    function fetchPlatform() {
        axios
            .get("/api/platforms/by_id/" + props.platformId)
            .then(res => {
                setPlatform(res.data);
                return;
            })
            .catch(error => {
                console.log(error);
            });
    }
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
                        <Button
                            style={isOwner ? {} : { display: "none" }}
                            onClick={() => history.push("/CreateQuiz/" + props.platformId)}
                        >
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
