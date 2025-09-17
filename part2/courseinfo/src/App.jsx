import { useEffect, useState } from "react";
import Course from "./components/Course.jsx";
import Header from "./components/Header.jsx";
import { getCourses } from "./services/api.js";

const App = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (e) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading courses…</p>;
  if (error) return <p style={{ color: "crimson" }}>{error}</p>;

  return (
    <div>
      <Header name={"Web development curriculum"} />
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default App;
