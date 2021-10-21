import React from 'react'
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";
import data from '../data.js'

export default function QuizScreen(props) {   
  //to check quiz _id matches _id of the url /quiz/_id  
  //const quiz = data.quizzes.find( x => x._id === props.match.params._id)

  /*
  if (!quiz) {
    return <div> Quiz Not Found </div>
  }
  */
  
  return(
    <div>
      <Tags/>
      <PostArea/>
      {data.questions.map((question) => (
        <Question question = {question}></Question>
      ))}
    </div>
  )
}

export default QuizScreen