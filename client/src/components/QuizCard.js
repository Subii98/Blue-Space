import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

function QuizCard(props) {
    const history = useHistory();
    const [isOwner, setIsOwner] = useState(false);
    const [platform, setPlatform] = useState();
    const [user, setUser] = useState();
    const [error, setError] = useState(false);

    useEffect(() => {
        console.log("Quiz user ::::::", user);
        if (user && platform) {
            if (user._id == platform.userId) {
                setIsOwner(true);
            }
        }
        console.log("are you quiz?", isOwner);
    });

    useEffect(() => {
        console.log(props.quiz.platformId)
        if (props.quiz.platformId) {
            fetchPlatform();
        }
        fetchUser();
    }, [props.quiz]);

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
    function fetchPlatform() {
        axios
            .get("/api/platforms/by_id/" + props.quiz.platformId)
            .then(res => {
                setPlatform(res.data);
                return;
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={Link} to={`/quiz/${props.quiz._id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={"/images/sample.jpeg"}
                        alt="quizPreview"
                    />
                    <CardContent>
                        <div className="cardContentHeader">
                            <Typography gutterBottom variant="h5" component="div">
                                {props.quiz.title}
                            </Typography>
                            <Typography
                                className="quizHeart"
                                variant="subtitle1"
                                color="text.secondary"
                            >
                                <img src="/images/icon/like2.png" style={{ width: "1rem" }} />
                                {props.quiz.likes}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            {props.quiz.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Button
                    style={isOwner ? {} : { display: "none" }}
                    onClick={() => history.push("/CreateQuestion/" + props.quiz._id)}
                >
                    Create Question
                </Button>
            </Card>
            <br />
        </div>
    );
}

export default QuizCard;
