import axios from 'axios';
import React, { useState, useEffect } from 'react'
import QuizCard from './QuizCard.js'
import LoadingModal from "../components/LoadingModal.js";
import MessageModal from "../components/MessageModal.js";
import { useIsMounted } from "../components/useIsMounted.js";

function Quiz(props){
    const [quizId, setQuizId] = useState(props.quizId)
    const [quizzes, setQuizzes] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const isMounted = useIsMounted();

    useEffect(() => {
        isMounted.current = true
        fetchQuiz()
        return ()=> {isMounted.current = false};
    }, []);

    function fetchQuiz() {
      axios
             .get('/api/quizzes')
             .then((res) => {
                setLoading(true)
                if (isMounted.current){
                  const data = res?.data
                  quizId.map( (id) => (
                    setQuizzes(quizzes => [...quizzes, data.find( x => x._id === id)])
                  ))
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
      <div className="quizCardArea">
        {loading ? (
          <LoadingModal></LoadingModal>
        ) : error ? (
          <MessageModal variant="danger">{error}</MessageModal>
        ) : (
          <div className="platformQuiz">
            <div className="quizHeader">
              <p>Quiz</p>
              <div className="line"/>
            </div>
            {quizzes.map( (quiz) => (
              <QuizCard quiz={quiz}/>
            ))}
          </div>
        )}
    </div>
    )
}

export default Quiz