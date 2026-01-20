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
  const initialValue = 0;
  let total = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue,
  );
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
