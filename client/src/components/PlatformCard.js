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
   console.log("name: ", props.platform.name);
   console.log("description", props.platform.description);
   console.log('props: ', props)
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
            <CardActionArea component={Link} to={'/quiz'}>
            <CardMedia
              component="img"
              height="140"
              image={"./images/sample.jpeg"}
              alt="category"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.platform.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.platform.description}
              </Typography>     
            </CardContent>
          </CardActionArea>
          </Card>
        </div>
    )
}

export default PlatformCard
