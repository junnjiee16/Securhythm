// import logo from "./logo.svg";
import React, { useState,useRef } from "react";

import "./App.css";
// import Stopwatch from "./stopwatch";

// create stopwatch function
  // create state variables




const users = [
  {
    username: "Joel",
    password: "youthxhack",
    rhythm:[0,0,0,0,0,2,2,2,2,2],

  },
  {
    username: "Edison",
    password: "lol",
    rhythm:[0,0,0,0,2,2,2,2,2]
  },
  {
    username: "Aldrich",
    password: "lol",
    rhythm:[0,0,0,0,2,2,2,2,2]
  },
];

function App() {
  const [seconds, setSeconds] = useState(0);
  const timerID = useRef(0);
  
  const startTimer=(e)=>{
    if(timerID.current===0){
      timerID.current = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
  }
  
  
  const stopTimer=(e)=>{
    clearInterval(timerID.current);
    setSeconds(0);

  }


  const [username, setUsername] = useState(() => {
    return "";
  });
  const [password, setPassword] = useState(() => {
    return "";
  });
  const [rhythm, setRhythm] = useState(() => {
    return [];
  });

  function login() {
    const user = users.find(
      (user) => {
        return username === user.username && password === user.password && JSON.stringify(rhythm) === JSON.stringify(user.rhythm)
          ? true
          : false;
      }
     
    )
    user? alert("successfully login") :alert(`failed to login`);
  }


  


  return (
    <div className="App">
    {/* <Stopwatch/> */}
    <button onClick={startTimer}>Start</button>
    <button onClick={stopTimer}>Stop</button>
    <p>{seconds}</p>
    <form>
      <label>Username:</label> <br />
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />{" "}
      <br />
      <label>Password:</label> <br />
      <input
        type="text"
        value={password}
        onChange={(e) => {
          
          setPassword(e.target.value);
          startTimer();
          setRhythm((rhythm) => [...rhythm, seconds]);
          console.log(rhythm);
        }}
      />
      <button onClick={()=>login()}>Login</button>
    </form>
    </div>
  );
}

export default App;
