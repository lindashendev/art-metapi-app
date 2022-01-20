import { useState } from 'react';
import axios from 'axios';
import './App.css';

// Components 
import Header from './Components/Header.js';
import MainContent from './Components/MainContent.js';
import Footer from './Components/Footer.js';

function App() {
  const [art, setArt] = useState({}); 
  const [userInput, setUserInput] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");

  function randomIndex(array) {
      return Math.floor(Math.random() * array.length);      
  }

  function getData() {
    console.log("our app is running!")
    axios({
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search",
      method: "GET",
      dataResponse: "json",
      params: {
        q: userInput,
      },
    })
    .then((response) => {
      const randomID = randomIndex(response.data.objectIDs);
      return axios({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${response.data.objectIDs[randomID]}`,
      });
    })
    .then((response) => {
      console.log(response.data);
      setArt(response.data);
    })
    .catch((error) => {
      alert("Sorry we don't have that in our database!")
      console.log(error);
    });
   }

  // input onChange - captures string
  const handleInput = (event) => {
    setUserInput(event.target.value); 
  };

  // when search is submitted - call the api
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput); 
    getData();
    setUserInput("");
  };

  // pass in functions as props to child
  return (
    <div className="App">
      <Header input={handleInput} submit={handleSubmit} value={userInput}/>
      <MainContent art={art} search={searchTerm}/>
      <Footer />
    </div>
  );
}

export default App;