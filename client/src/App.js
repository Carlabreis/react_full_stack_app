import React from "react";
import { Route, Routes } from 'react-router-dom';

import "./App.css";

// Components
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />}/>
        <Route path="/CoureseDetail" element={<CourseDetail />}/>
        <Route path="/UserSignIn" element={<UserSignIn />}/>
        <Route path="/UserSignUp" element={<UserSignUp />}/>
        <Route path="/CreateCourse" element={<CreateCourse />}/>
        <Route path="/UpdateCourse" element={<UpdateCourse />}/>
      </Routes>
    </div>
  );
}

export default App;
