import './App.css';
import { useEffect, useState } from 'react';
import userRequests from './requests/userRequests';
/*
 * Do NOT use class based components, use functional components instead. (Class based are outdated and 'legacy'.) You'll find it much easier to make things with functional components.
 * Use hooks to manage state and side effects. Keep in mind re-renders occurr on updates to state.
 * Use axios to make requests to the API.
 * Build your components with react-bootstrap, not reactstrap. https://react-bootstrap.github.io/ 
 * The 'official' react docs are outdated, they now update the beta docs instead. (https://beta.reactjs.org/)
*/
function App() {

  var dummyEmployee = {
    id: -1,
    name: "John Doe",
    salary: 0,
    age: 0
  }

  const [user, setUser] = useState(dummyEmployee); 
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);

  useEffect(() => {
    var randomNum = Math.floor(Math.random() * 10) + 1; //generate random number between 1 and 100, we are using this an id
    userRequests.getUser(randomNum).then((response) => {
        console.log("response.data:");
        console.log(response.data);
        console.log("response.data.data");
        console.log(response.data.data.id);
        var employee = {
          id: response.data.data.id,
          name: response.data.data.employee_name,
          salary: response.data.data.employee_salary,
          age: response.data.data.employee_age
        }
       // console.log(employee);
        setUser(employee); //set the user state to the employee object
    })
      .catch((error) => {
        console.log(error);
      });
      setLoading(false); // we are done loading the API, so set loading to false

  }, []); // <-- empty array means this effect will only run once when the component mounts, not on every re-render.


  return (
    <div className="App">
      <div className="loading">{loading ? "Loading..." : ""}</div>
      {loading === true ? null : 
      <div>
        <h1>id: {user.id}</h1>
        <h1>name: {user.name}</h1>
        <h1>salary: {user.salary}</h1>
        <h1>age: {user.age}</h1>
      </div>
      }

    </div>
  );
}

export default App;
