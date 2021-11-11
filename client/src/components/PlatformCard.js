import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function PlatformCard(props) {

    /*
<Typography variant="subtitle1" color="text.secondary" component="div">
            {props.user}
          </Typography>
    */
    
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={`/platform/${props.platform._id}`}>
            <CardMedia
              component="img"
              height="140"
              image={"./images/sample.jpeg"}
              alt="category"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.platform.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.platform.description}
              </Typography>     
            </CardContent>
          </CardActionArea>
          </Card>
          <br/>
        </div>
    )
}

export default PlatformCard
