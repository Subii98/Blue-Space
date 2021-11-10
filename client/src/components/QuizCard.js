import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function QuizCard(props) {

    /*
<Typography variant="subtitle1" color="text.secondary" component="div">
            {props.user}
          </Typography>
    */

    return (
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={`/quiz/${props.quiz._id}`}>
      <CardMedia
        component="img"
        height="140"
        image={"./images/sample.jpeg"}
        alt="quizPreview"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.quiz.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.quiz.description}
        </Typography>     
      </CardContent>
      </CardActionArea>
      </Card>  
    )
}

export default QuizCard
