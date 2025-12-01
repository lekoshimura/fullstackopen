const Hello = (props) => (
  <div>
    <p>Hello, {props.name}!</p>
  </div>
)

const App = () => (
  <div>
    <h1>Greetings</h1>
    <Hello name="World" />
    <Hello name="Mom" />
    <Hello name="Daddy" />
  </div>
);
export default App;
