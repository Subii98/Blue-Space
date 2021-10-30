import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Header from './components/Header.js'
import HomeScreen from './screens/HomeScreen.js';
import QuizScreen from './screens/QuizScreen.js';
import createQuiz from './screens/createQuiz';
import PlatformScreen from './screens/PlatformScreen.js';
import Login from "./components/Login.js";
import Logout from "./components/Logout.js";
import createUser from "./components/CreateUser.js";
//import { createContext, userState } from "react";
//import { Provider } from "react-redux";


function App() {
  /*
  const UserContext = React.createContext("");
  const EmailContext = React.createContext("light");
  const LoggedState = React.createContext("light");
  const ThemeContext = React.createContext("light");
  */
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/quiz/:id" component={QuizScreen}></Route>
          <Route path="/quizCreate" component={createQuiz}></Route>
          <Route path="/platform" component={PlatformScreen}></Route>
          <Route path="/createuser" component={createUser}></Route>
        </main>
      </div> 

      <Login />
      <Logout />
    </BrowserRouter>
  );
}

export default App;
