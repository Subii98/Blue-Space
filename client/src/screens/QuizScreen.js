import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Tags from "../components/Tags.js";
import PostArea from "../components/PostArea.js";
import Question from "../components/Question.js";
import LoadingModal from '../components/LoadingModal.js';
import MessageModal from '../components/MessageModal.js';
import { load } from 'dotenv';
import { useIsMounted } from '../components/useIsMounted.js';


function QuizScreen(props) {   
  //to check quiz _id matches _id of the url /quiz/_id  
  //const quiz = data.quizzes.find( x => x._id === props.match.params._id)

  /*
  if (!quiz) {
    return <div> Quiz Not Found </div>
  }
  */

  //use react hooks to set data (empty array by default)
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const isMounted = useIsMounted();

  /*
  useEffect( () => {
    const fetchData = async () => {
      try{
        const { data } = await axios.get('/api/questions');
        setQuestions(data);
        setLoading(false)
      } catch (err){
        setError(err.message);
        setLoading(false);
      }
      
    };
    fetchData().then(data => {
      if (isMounted.current) { setQuestions(data); }
    });
  }, [])*/

  useEffect(() => {
    isMounted.current = true
    fetchQuiz()
    return () => {isMounted.current = false}
}, []);

  function fetchQuiz(){
    axios
         .get('/api/quizzes')
         .then((res) => {
            setLoading(true)
            if (isMounted.current){
              const data = res?.data
              setQuiz(data.find( x => x._id === props.match.params.id))
              setLoading(false)
              return
            } 
         })
         .catch((error) => {
           setError(
             "Error loading quiz"
           );
           setLoading(false)
   console.log("Error loading quiz");
         });
  }


  return(
    <div>
      {loading ? (
        <LoadingModal></LoadingModal>
      ) : error ? (
        <MessageModal variant="danger">{error}</MessageModal>
      ) : (
        <div className="platformQuiz">
          {quiz && <Question question = {quiz.questions}></Question>}
        </div>
      )}
    </div>
  )
}

export default QuizScreen