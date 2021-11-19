import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useContext, useEffect, useState } from "react";

function ContactHelp() {
    return (
        <div>
            <Grid container sx={{ color: "text.primary" }}>
                <Grid item xs={4}>
                    <EmailIcon />
                </Grid>
                <Grid item xs={8}>
                    <Typography>support_blue@bluespace.com</Typography>
                </Grid>

                <Grid item xs={4}>
                    <PhoneAndroidIcon />
                </Grid>
                <Grid item xs={8}>
                    <Typography>1 631.123.1234</Typography>
                </Grid>

                <Grid item xs={4}>
                    <LocationOnIcon />
                </Grid>
                <Grid item xs={8}>
                    <Typography>1234 Red Circle, Stonybrook, NY</Typography>
                </Grid>
            </Grid>
            
        </div>
    );
}

export default ContactHelp;
