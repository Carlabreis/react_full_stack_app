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
    <main>
      <div className="actions--bar">
        <div className="wrap">
          <a className="button" href="/UpdateCourse">
            Update Course
          </a>
          <a className="button" href="/">
            Delete Course
          </a>
          <a className="button button-secondary" href="/">
            Return to List
          </a>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {course.User.firstName} {course.User.lastName}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
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
    </main>
  );
};

export default CourseDetail;
