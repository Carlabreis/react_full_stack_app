import { useState, useEffect } from "react";
// import logo from './logo.svg';
import "./App.css";

function App() {
  return (
    <div>
      <header>
        <div class="wrap header--flex">
          <h1 class="header--logo">
            <a href="index.html">Courses</a>
          </h1>
          <nav>
            <ul class="header--signedout">
              <li>
                <a href="sign-up.html">Sign Up</a>
              </li>
              <li>
                <a href="sign-in.html">Sign In</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div class="wrap main--grid">
          {courses.map((course) => (
            <a
              key={course.id}
              class="course--module course--link"
              href="course-detail.html"
            >
              <h2 class="course--label">Course</h2>
              <h3 class="course--title">{course.title}</h3>
            </a>
          ))}
          <a
            class="course--module course--add--module"
            href="create-course.html"
          >
            <span class="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                class="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </span>
          </a>
        </div>
      </main>
    </div>
  );
}

export default App;
