const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  console.log("Part", props);
  return (
    <p>
      {props.name}: {props.exercises} exercises
    </p>
  );
};

const Content = (props) => {
  console.log("Content", props.parts);
  return props.parts.map((part) => (
    <Part key={part.id} name={part.name} exercises={part.exercises} />
  ));
};

const Total = (props) => {
  let total =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises +
    props.parts[3].exercises;
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course;
