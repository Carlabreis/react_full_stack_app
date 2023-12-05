import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();

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
          <Link className="button" to={`/courses/${id}/update`}>
            Update Course
          </Link>
          <Link className="button" to="/">
            Delete Course
          </Link>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              {/* <p>By {course.User.firstName} {course.User.lastName}</p> */}

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
