import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCourse(result);
      });
  }, [id]);

  const handleSubmit = () => {
    console.log(course);
  }

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                // value={course.title == null ? "" : course.title}
                placeholder={course.title}
              />

              <p>By {authUser.firstName + " " + authUser.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                // value={course.description}
                placeholder={course.description}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                // value={course.estimatedTime == null ? "" : course.estimatedTime}
                placeholder={course.estimatedTime}
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                // value={course.materialsNeeded}
                placeholder={course.materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
