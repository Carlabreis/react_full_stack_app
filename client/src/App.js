import React from "react";
import { Route, Routes } from 'react-router-dom';

import "./App.css";

// Components
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />}/>
        <Route path="/courses/create" element={<CreateCourse />}/>
        <Route path="/courses/:id/update" element={<UpdateCourse />}/>
        <Route path="/courses/:id" element={<CourseDetail />}/>
        <Route path="/signin" element={<UserSignIn />}/>
        <Route path="/signup" element={<UserSignUp />}/>
        <Route path="/signout" element={<UserSignOut />}/>
        <Route path="/error" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
