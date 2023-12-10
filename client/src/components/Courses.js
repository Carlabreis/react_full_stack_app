import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { api } from "../utils/apiHelper";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api('/courses', 'GET');
        const coursesJson = await response.json();

        if (response.status === 200) {
          setCourses(coursesJson);
        } else if (response.status === 500) {
          navigate('/error');
        }
      } catch (error) {
        console.log('Error fetching and parsing courses data', error);
        navigate('/error');
      }
    }
    fetchData();
  }, [navigate]);


  return (
    <main>
      <div className="wrap main--grid">
        {courses.map((course) => (
          <Link
            key={course.id}
            className="course--module course--link"
            to={`/courses/${course.id}`}
          >
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          </Link>
        ))}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
