const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Content = (props) => {
  return (
    <>
      <p>
        {props.courses[0].name}: {props.courses[0].exercises} exercises
      </p>
      <p>
        {props.courses[1].name}: {props.courses[1].exercises} exercises
      </p>
      <p>
        {props.courses[2].name}: {props.courses[2].exercises} exercises
      </p>
    </>
  );
};

const Total = (props) => {
  let sum = 0;
  for (let i = 0; i < props.courses.length; i++) {
    sum += props.courses[i].exercises;
  }
  return <p>Number of exercises: {sum}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const courses = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  );
};

export default App;
