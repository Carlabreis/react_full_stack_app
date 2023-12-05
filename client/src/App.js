import "./App.css";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      {/* <Courses /> */}
      <CourseDetail id="2" />
      {/* <UserSignIn /> */}
      {/* <UserSignUp /> */}
      {/* <CreateCourse /> */}
      {/* <UpdateCourse /> */}
    </div>
  );
}

export default App;
