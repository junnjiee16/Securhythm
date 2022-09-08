import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";

const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
      
    </BrowserRouter>
    </div>
  );
}

export default App;