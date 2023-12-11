import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";

import UserContext from "../context/UserContext";
import { api } from "../utils/apiHelper";

/**
 * Fetch course data from the REST API's /api/courses/:id route and populate page.
 * If user is the course's author, "update course" and "delete course" buttons should display.
 * 
 * @returns CourseDetail component
 */

const CourseDetail = () => {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const { id } = useParams();

  const [course, setCourse] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // ON LOAD
  //fetch course data and populate the page after course is set
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api(`/courses/${id}`, "GET");

        if (response.status === 200) {
          const courseJson = await response.json();
          setCourse(courseJson);
          setIsLoaded(true);
        } else if (response.status === 404) {
          navigate("/notfound");
        } else {
          navigate("/error");
        }
      } catch (error) {
        console.log("Error fetching and parsing courses data", error);
        navigate("/error");
      }
    };
    fetchData();
  }, [id, navigate]);

  // EVENT HANDLERS
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await api(`/courses/${id}`, "DELETE", null, authUser);

      if (response.status === 204) {
        console.log("Course deleted.");
        navigate("/");
      } else if (response.status === 403) {
        navigate("/forbidden");
      } else if (response.status === 500) {
        navigate("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log("Error fetching and deleting course", error);
      navigate("/error");
    }
  };

  if (isLoaded) {
    return (
      <main>
        <div className="actions--bar">
          <div className="wrap">
            {authUser !== null && authUser.id === course.userId ? (
              <>
                <Link className="button" to={`/courses/${id}/update`}>
                  Update Course
                </Link>
                <Link className="button" to="/" onClick={handleDelete}>
                  Delete Course
                </Link>
              </>
            ) : (
              ""
            )}

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
                <p>
                  By {course.User.firstName} {course.User.lastName}
                </p>
                <Markdown children={course.description} />
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{course.estimatedTime}</p>

                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {course.materialsNeeded ? (
                    <Markdown children={course.materialsNeeded} />
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
};

export default CourseDetail;
