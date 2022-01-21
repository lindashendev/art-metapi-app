import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import firebase from './firebase.js';
// Components 
import Header from './Components/Header.js';
import MainContent from './Components/MainContent.js';
import Footer from './Components/Footer.js';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import SavedArt from './Components/SavedArt';

function App() {
  const [art, setArt] = useState({}); 
  const [userInput, setUserInput] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");

  // stateful array for firebase to store images
  const [save, setSave] = useState([]);
  const [userSave, setUserSave] = useState([]);

  function randomIndex(array) {
      return Math.floor(Math.random() * array.length);      
  }

  // firebase
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      const newState = [];
      const data = response.val();
      for(let key in data) {
        newState.push({key: key, title: key, name: data[key]});
      }
      setSave(newState);
    })

  }, [])

  const handleUserSave = (url, title) => {
    const saveArtObj = {url, title};
    setUserSave(saveArtObj);
  }
  
  useEffect(() => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, userSave);    
  }, [userSave])

  function getData() {
    console.log("our app is running!")
    axios({
      url: "https://collectionapi.metmuseum.org/public/collection/v1/search",
      method: "GET",
      dataResponse: "json",
      params: {
        q: userInput
      },
    })
    .then((response) => {
      const randomID = randomIndex(response.data.objectIDs);
      return axios({
        url: `https://collectionapi.metmuseum.org/public/collection/v1/objects/${response.data.objectIDs[randomID]}`,
      });
    })
    .then((response) => {
      setArt(response.data);
    })
    .catch(() => {
      alert("Sorry we don't have that in our database!")
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

  const handleRemove = (artId) => {
    const database = getDatabase(firebase);
    const dbRef = ref(database,`/${artId}`);
    remove(dbRef);
  }
  
  return (
    <div className="App">
      <Header input={handleInput} submit={handleSubmit} value={userInput} />
      <MainContent art={art} search={searchTerm} save={handleUserSave} />
      <SavedArt save={save} handleRemove={handleRemove}/>
      <Footer />
    </div>
  );
}

export default App;