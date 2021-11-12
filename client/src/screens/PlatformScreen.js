import React, { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
//import Question from "../components/Question.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import PlatformListArea from "../components/PlatformListArea.js";
import { useIsMounted } from "../components/useIsMounted.js";
import Quiz from "../components/Quiz.js";


function PlatformScreen(props) {
  //to check quiz _id matches _id of the url /quiz/_id
  const [quizId, setQuizId] = useState(["001", "002"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [platform, setPlatform] = useState()
  const isMounted = useIsMounted();
  //const platform = data.platforms.find( x => x._id === props.match.params._id)


  useEffect(() => {
    isMounted.current = true
    fetchPlatform()
    return () => {isMounted.current = false}
}, []);

  function fetchPlatform(){
    axios
         .get('/api/platforms')
         .then((res) => {
            if (isMounted.current){
              setLoading(true)
              console.log(props.match.params.id)
              setPlatform(res.data.find( x => x._id === props.match.params.id))
              setLoading(false)
              return
            }
            
         })
         .catch((error) => {
           setError(
             "Error loading platform"
           );
           setLoading(false)
   console.log("Error loading platform");
         });
  }

  return (
    <div>
        {loading ? (
            <LoadingModal></LoadingModal>
        ) : error ? (
            <MessageModal variant="danger">{error}</MessageModal>
        ) : (
            <div className="platform">
                {platform && <Tags platform={platform} />}
                {platform && <PostArea platform={platform} />}
                <Quiz platformId={platform ? platform._id : null} />
            </div>
        )}
    </div>
  );  
}

export default PlatformScreen;
