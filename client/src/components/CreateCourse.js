import React, { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import ErrorsDisplay from "./ErrorsDisplay";
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();

  // states
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const courseAuthor = authUser;
  const [errors, setErrors] = useState([]);

  // EVENT HANDLERS
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const course = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: courseAuthor.id
    };

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(course),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/courses",
        fetchOptions
      );

      if (response.status === 201) {
        console.log(
          `${course.title} is successfully created!`
        );
      } else if (response.status === 400) {
        const data = await response.json();
        setErrors(data.errors)
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <main>
      <div className="wrap">
      <h2>Create Course</h2>
      <ErrorsDisplay errors={errors} />
      {/* <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>{errors.title}</li>
          <li>{errors.description}</li>
        </ul>
      </div> */}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input id="courseTitle" name="courseTitle" type="text" ref={title} />

            <p>By {courseAuthor.firstName + " " + courseAuthor.lastName}</p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={description}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              ref={estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
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

export default CreateCourse;