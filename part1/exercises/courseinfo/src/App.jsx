const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.course.name}: {props.course.exercises} exercises
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part course={props.courses[0]} />
      <Part course={props.courses[1]} />
      <Part course={props.courses[2]} />
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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };
  const courses = [part1, part2, part3];

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total courses={courses} />
    </div>
  );
};

export default App;
