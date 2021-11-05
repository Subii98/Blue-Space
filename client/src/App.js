import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/header.js";
import HomeScreen from "./screens/HomeScreen.js";
import QuizScreen from "./screens/QuizScreen.js";
import createQuiz from "./screens/createQuiz";
import PlatformScreen from "./screens/PlatformScreen.js";
import CreatePlatform from "./screens/CreatePlatform.js";
import Categories from "./components/CategoriesCard/Categories.js"
import MyPage from "./screens/Mypage.js";

function App() {
  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header />
        <main>
          <Route path="/quiz" component={QuizScreen}></Route>
          <Route path="/quizCreate" component={createQuiz}></Route>
          <Route path="/platform" component={PlatformScreen}></Route>
          <Route path="/CreatePlatform" component={CreatePlatform}></Route>
          <Route path="/categories" component={Categories}></Route>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/mypage" component={MyPage}></Route>
        </main>
      </div>

    </BrowserRouter>
  );
}

export default App;
