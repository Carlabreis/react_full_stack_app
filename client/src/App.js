import { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((result) => {
        setCourses(result)
      });
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
