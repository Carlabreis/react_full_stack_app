import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";
import ErrorsDisplay from "./ErrorsDisplay";

/**
 * It provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses.
 * The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route.
 * This component also renders a "Cancel" button that returns the user to the "Course Detail" screen.
 * 
 * @returns UpdateCourse component
 */

const UpdateCourse = () => {
  const { authUser } = useContext(UserContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // STATE
  const title = useRef(null);
  const description = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);

  // ON LOAD
  // Fetch course data and set course
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(`/courses/${id}`, 'GET')
        const courseJson = await response.json();

        if (response.status === 200) {
          if (authUser.id === courseJson.userId) { // if user logged in is same as course author
            setCourse(courseJson);
          } else {
            navigate("/forbidden");
          }
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [id, authUser.id, navigate]);

  // Update course info
  const handleSubmit = async (event) => {
    event.preventDefault();

    const currentCourse = {
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
      userId: authUser.id,
    };

    try {
      const response = await api(`/courses/${id}`, "PUT", currentCourse, authUser);

      if (response.status === 204) {
        console.log(`${course.title} is successfully updated!`);
        navigate(`/courses/${id}`)
      } else if (response.status === 400) { // bad request (e.i. wrong name or password)
        const data = await response.json();
        setErrors(data.errors);
      } else if (response.status === 403) { // forbidden 
        navigate("/forbidden")
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                ref={title}
                defaultValue={course.title == null ? "" : course.title}
              />

              <p>By {authUser.firstName + " " + authUser.lastName}</p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                ref={description}
                defaultValue={course.description}
              />
            </div>
            <div>
              <label htmlFor="estimatedTime">Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                ref={estimatedTime}
                defaultValue={
                  course.estimatedTime == null ? "" : course.estimatedTime
                }
              />

              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                ref={materialsNeeded}
                defaultValue={course.materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
