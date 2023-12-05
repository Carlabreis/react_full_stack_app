import React from "react";

const UpdateCourse = (course) => {
  return (
    <main>
      <div className="wrap">
      <h2>Update Course</h2>
      <form>
        <div className="main--flex">
          <div>
            <label for="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              value={course.title}
            />

            <p>By Joe Smith</p>

            <label for="courseDescription">Course Description</label>
            <textarea id="courseDescription" name="courseDescription">
              {course.description}
            </textarea>
          </div>
          <div>
            <label for="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              value={course.estimatedTime}
            />

            <label for="materialsNeeded">Materials Needed</label>
            <textarea id="materialsNeeded" name="materialsNeeded">
              {course.materialsNeeded}
            </textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Update Course
        </button>
        <button
          className="button button-secondary"
          //fix this
          onClick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
    </div>
    </main>
  );
};

export default UpdateCourse;