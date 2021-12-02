import React from 'react'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HistoryIcon from "@mui/icons-material/History";
import CopyrightIcon from "@mui/icons-material/Copyright";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";


function NavElements() {
    
    return (
        <div className="navContainer">
            <div className="navHeaders navElement">
                <HomeOutlinedIcon sx={{ fontSize: 28 }}></HomeOutlinedIcon>
                Home
            </div>
            <div className="navHeaders navElement">
                <HistoryIcon sx={{ fontSize: 26 }}></HistoryIcon>
                Recent Quizzes
            </div>
            <div className="navHeaders navElement">
                <FolderSharedOutlinedIcon sx={{ fontSize: 28 }}> </FolderSharedOutlinedIcon>
                Subscribed Platforms
            </div>
            <div className="navHeaders navElement">
                <FolderSharedOutlinedIcon sx={{ fontSize: 28 }}> </FolderSharedOutlinedIcon>
                Suggested Platforms
            </div>
            <div className="navHeaders navElement">
                <AnnouncementOutlinedIcon sx={{ fontSize: 28 }}> </AnnouncementOutlinedIcon>
                Announcements on Twitter
            </div>
            <div className="navHeaders navElement">
                <TextsmsOutlinedIcon sx={{ fontSize: 28 }}> </TextsmsOutlinedIcon>
                Send Us Feedback
            </div>
            
            <div className="navHeaders navElement copyright">
                <CopyrightIcon sx={{ fontSize: 28 }}></CopyrightIcon>
                Blue-Space 2021
            </div>
        </div>
    );
}

export default NavElements
