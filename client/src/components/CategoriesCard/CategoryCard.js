import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function CategoryCard(props) {

    /*
<Typography variant="subtitle1" color="text.secondary" component="div">
            {props.user}
          </Typography>
    */
   console.log("name: ", props.category.name);
   console.log("description", props.category.description);
   console.log('props: ', props)
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={props.category.route}>
        <CardMedia
          component="img"
          height="140"
          image={props.category.image}
          alt="category"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.category.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.category.description}
          </Typography>     
        </CardContent>
      </CardActionArea>
    </Card>
        </div>
    )
}

export default CategoryCard
