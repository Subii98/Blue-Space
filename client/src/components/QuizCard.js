import React, { useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Typography, CardActionArea, Button } from "@mui/material";
import { Link, useHistory } from "react-router-dom";

function QuizCard(props) {
   const history = useHistory();
    useEffect(() => {
        console.log(props.quiz);
    }, [props.quiz]);

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
                            <Typography className="quizHeart" variant="subtitle1" color="text.secondary">
                                <img src="/images/icon/like2.png" style={{width: "1rem"}}/>
                                {props.quiz.likes}
                            </Typography>
                        </div>
                        <Typography variant="body2" color="text.secondary">
                            {props.quiz.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Button onClick={()=>history.push("/CreateQuestion/"+props.quiz._id)}>Create Question</Button>
            </Card>
            <br />
        </div>
    );
}

export default QuizCard;
