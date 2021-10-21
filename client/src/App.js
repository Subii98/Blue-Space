import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/header.js'
import HomeScreen from './screens/HomeScreen.js';
import QuizScreen from './screens/QuizScreen.js';

function App() {
  return (
   <BrowserRouter> 
    <div className="grid-container">
        <Header/>
          <main>
            <Route path="/" component = { HomeScreen } exact></Route>
            <Route path="/quiz/:id" component = { QuizScreen }></Route>
            </main>
        </div>
      </BrowserRouter>
  );
}

export default App;
