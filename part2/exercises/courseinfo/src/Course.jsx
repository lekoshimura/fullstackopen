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
  return (
    <>
      <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  );
};

export default Course;
