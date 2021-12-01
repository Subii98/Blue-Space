import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

function PlatformCard(props) {
    console.log(props.platform);
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea component={Link} to={`/platform/${props.platform._id}`}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={
                            props.platform.banner && props.platform.banner != ""
                                ? props.platform.banner
                                : "./images/sample.jpeg"
                        }
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
            <br />
        </div>
    );
}

export default PlatformCard;
