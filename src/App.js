import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import firebase from './firebase.js';
// Components 
import Header from './Components/Header.js';
import MainContent from './Components/MainContent.js';
import Footer from './Components/Footer.js';
import { Link, Routes, Route } from 'react-router-dom';
import { getDatabase, ref, onValue, push } from 'firebase/database';
// import SavedArt from './Components/SavedArt';

function App() {
  const [art, setArt] = useState({}); 
  const [userInput, setUserInput] = useState(""); 
  const [searchTerm, setSearchTerm] = useState("");

  // stateful array for firebase to store images
  const [save, setSave] = useState([]);
  const [userSave, setUserSave] = useState('');

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
        newState.push(data[key]);
      }
      setSave(newState);
    })
  }, [])

  const handleUserSave = (url) => {
    const saveUrl = url;
    setUserSave(saveUrl);
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    push(dbRef, userSave);    
  }

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
      console.log(response.data);
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

  const Home = () => {
    return (
      <>
        <Header input={handleInput} submit={handleSubmit} value={userInput} />
        <MainContent art={art} search={searchTerm} save={handleUserSave}/>
        <Footer />
      </>
    );
  }

  const SavedArt = () => {
    return (
      <div className="images wrapper">
        <h2>Your Saved Art</h2>
        <div className='saved'>
          <ul>
            {
              save.map((art, index) => {
                return(
                  <li key={index}>
                    <img src={art} alt="saved image" />                    
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
  // pass in functions as props to child
  return (
    <div className="App">
      <nav>
        <div className="wrapper">
          <ul>
            <li>
              <Link to="/">Met Highlights</Link>
            </li>
            <li>
              <Link to="/saved">Saved Art</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<SavedArt />} />
      </Routes>
    </div>
  );
}

export default App;