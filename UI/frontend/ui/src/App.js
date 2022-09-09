import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/signup" element={<SignUp />} />
    </Routes>
      
    </BrowserRouter>
    </div>
  );
}

export default App;