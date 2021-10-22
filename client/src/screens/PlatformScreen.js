import React, { useEffect, useState } from "react";
import axios from "axios";
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
//import Question from "../components/Question.js";
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import PlatformListArea from "../components/PlatformListArea.js";


function PlatformScreen(props) {
  //to check quiz _id matches _id of the url /quiz/_id
  //const quiz = data.quizzes.find( x => x._id === props.match.params._id)

  /*
  if (!quiz) {
    return <div> Quiz Not Found </div>
  }
  */

  //use react hooks to set data (empty array by default)
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/questions");
        setLoading(false);
        setQuestions(data);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log("hello");
  return (
    <div>
      <Tags />
      <PostArea />

      <div>
        {loading ? (
          <LoadingModal></LoadingModal>
        ) : error ? (
          <MessageModal variant="danger">{error}</MessageModal>
        ) : (
          <PlatformListArea />
          //<PlatformListArea />
        )}
      </div>
    </div>
  );
}

export default PlatformScreen;
