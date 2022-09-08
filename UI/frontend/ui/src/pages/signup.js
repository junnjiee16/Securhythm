import React from "react";
import { useState } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(event){
    event.preventDefault();

    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        username,
        password
      })
    })
    const data = await response.json();
    console.log(data);
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <br />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="Username"
        />
        <br />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <button type="submit">Register</button>

      </form>
    </>
  );
}

export default SignUp;
