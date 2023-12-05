import React from "react";
import { useState, useEffect } from "react";

const CourseDetail = ({ id }) => {
  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCourse(result);
      });
  }, [id]);

  return (
    <>
      <div class="actions--bar">
        <div class="wrap">
          <a class="button" href="/UpdateCourse">
            Update Course
          </a>
          <a class="button" href="/Courses">
            Delete Course
          </a>
          <a class="button button-secondary" href="/Courses">
            Return to List
          </a>
        </div>
      </div>

      <div class="wrap">
        <h2>Course Detail</h2>
        <form>
          <div class="main--flex">
            <div>
              <h3 class="course--detail--title">Course</h3>
              <h4 class="course--name">{course.title}</h4>
              <p>By {course.User.firstName} {course.User.lastName}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 class="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 class="course--detail--title">Materials Needed</h3>
              <ul class="course--detail--list">
                {course.materialsNeeded
                  ? course.materialsNeeded
                      .replace(/\*/g, "")
                      .split("\n")
                      .map((item) => <li key={item.index}>{item}</li>)
                  : ""}
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
