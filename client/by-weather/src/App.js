import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import DataUpdatePage from "./pages/DataUpdatePage";
import Manager from "./pages/Manager";
import Weather from "./pages/Weather";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/manager" element={<Manager />} />
        <Route path="/manager/:list" element={<Manager />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/" element={<Main />} />
        <Route exact path="/DataUpdatePage" element={<DataUpdatePage />} />
        <Route exact path="/weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
