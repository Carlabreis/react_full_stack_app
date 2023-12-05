import React from "react";
import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";

const UpdateCourse = () => {
  const { id } = useParams();

  const [course, setCourse] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCourse(result);
        console.log(result);
      });
  }, [id]);

  // function handleCancel(event) {
  //   event.preventDefault();
  //   <Navigate to="/" />
  // }

  return (
    <main>
      <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={course.title}
            />

            {/* <p>By {course.User.firstName + " " + course.User.lastName}</p> */}

            <label htmlFor="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription" value={course.description}/>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" value={course.materialsNeeded}/>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          // onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
    </main>
  );
};

export default UpdateCourse;