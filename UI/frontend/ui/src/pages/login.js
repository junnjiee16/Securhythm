import React from "react";
import { useState } from "react";


function Login() {
  const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event){
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
    const data = await response.json();

    if (data.user){
        localStorage.setItem("token", data.token)
        alert("Login Successful");
        window.location.href = "/quote";
    }else{
        alert("Login Failed");
    }
  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <br />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Login</button>

      </form>
    </>
  );
}

export default Login;
