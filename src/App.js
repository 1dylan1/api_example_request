import './App.css';
import { useEffect, useState } from 'react';
import userRequests from './requests/userRequests';
import { Badge } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Image, Heading } from '@chakra-ui/react'
/*
 * Do NOT use class based components, use functional components instead. (Class based are outdated and 'legacy'.) You'll find it much easier to make things with functional components.
 * Use hooks to manage state and side effects. Keep in mind re-renders occurr on updates to state.
 * Use axios to make requests to the API.
 * Build your components with react-bootstrap, not reactstrap. https://react-bootstrap.github.io/ ChakraUI is also a nice UI library for a first project (but does have default CSS and a setup)
 * The 'official' react docs are outdated, they now update the beta docs instead. (https://beta.reactjs.org/)
*/
function App() {

  var dummyItem = {
    id: -1,
    src: "../public/logo192.png",
    name: "React-Ball",
    description: "This is my react pokemon item",
    cost: -1
  }

  const [item, setItem] = useState(dummyItem); 
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(1);

  useEffect(() => {
    var randomNum = Math.floor(Math.random() * 10) + 1; //generate random number between 1 and 100, we are using this an id
    userRequests.getUser(randomNum).then((response) => {
        console.log("response.data:");
        console.log(response.data);
        console.log("name:");
        console.log(response.data.name);

        var temp = {
          id: randomNum,
          name: response.data.name,
          src: response.data.sprites.default,
          description: response.data.flavor_text_entries[3].text,
          cost: response.data.cost
        }

        setItem(temp);
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
        <Card maxW='sm'>
          <CardBody>
            <Image alt='item-icon' width={200} size={200} src={item.src}/>
            <Heading>
              <Badge colorScheme='green'>name</Badge> 
              <h1>{item.name}</h1>
            </Heading>
            <Badge colorScheme='purple'>description</Badge>
            <h3>{item.description}</h3>
            <Badge colorScheme='red'>cost</Badge>
            <h3>{item.cost}</h3>
          </CardBody>
        </Card>
      </div>
      }

    </div>
  );
}

export default App;
