import React, {useState} from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import FeedbackModal from "../components/FeedbackModal";

function Help() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <h2 className="contact">Contact Us</h2>
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
      <Button onClick={() => setOpenModal(true)} >Send Feedback</Button>
        {openModal && <FeedbackModal closeModal={setOpenModal}/>}
      <h2 className="contact">Platform</h2>
      <h3>How many platforms can users create</h3>
      <p>Any amount as long as they are logged in.</p>
      <h3>How many platforms can users subscribe to?</h3>
      <p>Any amount as long as they are logged in.</p>
      <h3>How can users create their own platform?</h3>
      <p>After logging in, they can tap on the Create button in order to create a new platform/</p>

      <h2 className="contact">Quizzes</h2>
      <h3>How many quizzes can users create?</h3>
      <p>Any amount they want but, they have to be a platform owner</p>
      <h3>How many answers can a question have?</h3>
      <p>Only up to 4.</p>
    </div>
  );
}

export default Help;
