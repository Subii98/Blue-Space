import React from 'react'

function Question(props) {
    const { question } = props;
    var questionNum = 1;
    return(
        <div className="quizArea">
            <p>Question {questionNum++}</p>
            <form className="questionSet">
                <span key={question._id} className="question">{question.text}</span><br/>

                <div className="options">
                    {question.option.length >=1 
                        ?
                        [<input type="radio" id="option1" name="option" value="option1"></input>,
                        <label for="option1">{question.option[0]}</label>,
                        <br/>
                        ]
                       : []} 

                    {question.option.length >=2
                        ?
                        [<input type="radio" id="option2" name="option" value="option2"></input>,
                        <label for="option2">{question.option[1]}</label>,
                        <br/>
                        ]
                       : []} 
                    {question.option.length >=3
                        ?
                        [<input type="radio" id="option3" name="option" value="option3"></input>,
                        <label for="option3">{question.option[2]}</label>,
                        <br/>
                        ]
                       : []} 
                    {question.option.length >=4
                        ?
                        [<input type="radio" id="option4" name="option" value="option4"></input>,
                        <label for="option4">{question.option[3]}</label>,
                        <br/>
                        ]
                       : []} 
                </div>
                <button type="submit">NEXT</button>
            </form>
        </div>
    )
}

export default Question