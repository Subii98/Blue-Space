import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/header.js'
import HomeScreen from './screens/HomeScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import createQuiz from './screens/createQuiz';
import PlatformScreen from './screens/PlatformScreen.js';


function App() {
  return (
   <BrowserRouter> 
    <div className="grid-container">
        <Header/>
          <main>
            <Route path="/" component = { HomeScreen } exact></Route>
            <Route path="/quiz/:id" component = { QuizScreen }></Route>
            <Route path="/quizCreate" component = { createQuiz }></Route>
            <Route path="/platform" component = { PlatformScreen }></Route>
            </main>
        </div>
      </BrowserRouter>
  );
}

export default App;
