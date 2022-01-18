import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Components 
import Header from './Components/Header.js';
import MainContent from './Components/MainContent.js';
import Footer from './Components/Footer.js';

function App() {
  const [art, setArt] = useState({}); // artArray, setArt
  const [userInput, setUserInput] = useState(""); // userInput, setUserInput
  const [searchTerm, setSearchTerm] = useState(""); // searchTerm, setSearchTerm

  function randomIndex(array) {
  return randomIndex = Math.floor(Math.random() * array.length)
  }

  useEffect(() => {
    axios({
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search",
      method: "GET",
      dataResponse: "json",
      params: {
        q: userInput,
        // isHighlight: true,
      },
    })
      .then((response) => {
        console.log(response.data.objectIDs);
        const randomID = randomIndex(response.data.objectIDs);
        console.log(randomID);
        return axios({
          url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${response.data.objectIDs[randomID]}`,
        });
      })
      .then((response) => {
        console.log(response.data);
        setArt(response.data); // use setArt
      });
  }, [searchTerm]); 

  // input onChange - captures string
  const handleInput = (event) => {
    setUserInput(event.target.value); // set userinput
  };

  // when search is submitted 
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(userInput); // get the input
  };

  // pass in functions as props to child
  return (
    <div className="App">
      <Header input={handleInput} submit={handleSubmit} value={userInput}/>
      <MainContent art={art}/>
      <Footer />
    </div>
  );
}

export default App;
