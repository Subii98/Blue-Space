import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";

function HomeScreen(props) {   
  //to check quiz _id matches _id of the url /quiz/_id  
  //const quiz = data.quizzes.find( x => x._id === props.match.params._id)

  /*
  if (!quiz) {
    return <div> Quiz Not Found </div>
  }
  */

  //use react hooks to set data (empty array by default)
  const [questions, setQuestions] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/questions');
      setQuestions(data);
    };
    fetchData();
  }, [])
  
  return(
    <div>
      <Tags/>
      <PostArea/>
      {questions.map((question) => (
        <Question question = {question}></Question>
      ))}
    </div>
  )
}

export default HomeScreen