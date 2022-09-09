import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken'

const Dashboard = () => {
  const navigate = useNavigate();

  const [quote, setQuote] = useState("");
  const [tempQuote, setTempQuote] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = {};
      // const user = jwt.decode(token)
      if (!user) {
        localStorage.removeItem("token");
        // navigate("/login")
        navigate("/");
      } else {
        populateQuote(user.quote);
      }
    } else {
      navigate("/");
    }
  }, []);


  async function populateQuote() {
    const req = await fetch("http://localhost:4000/api/dashboard", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const data = await req.json();

    if (data.status === "ok"){
        console.log("HEREE")
        setQuote(data.quote)
    }else{
        alert(data.error)
    }
    setQuote(data.quote);
  }


  async function updateQuote(event) {
    event.preventDefault();

    const req = await fetch("http://localhost:4000/api/dashboard", {
        method:"POST",
        headers: {
         'Content-Type': 'application/json',
          "x-access-token": localStorage.getItem("token"),
        },
        body:JSON.stringify({
            quote: tempQuote,
            }),
      });
      const data = await req.json();
      console.log(data)
      if (data.status === "ok"){
        setQuote(tempQuote)
          setTempQuote('')
      }else{
          alert(data.error)
      }  
    }
  

  return (
    <div>
      <h1>Your Quote: {quote}</h1>
      <form onSubmit={updateQuote}>
        <input
          type="text"
          placeholder="Quote"
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <input type="submit" value ="Update Quote"/>
      </form>
    </div>
  );
};
export default Dashboard;
