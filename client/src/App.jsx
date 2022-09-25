import "./styles/App.scss";

// Axios
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("token")}`;

import { useState, useEffect } from "react";

import { UserProvider } from "./context/UserContext";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import { MdPerson } from "react-icons/md";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header title="Peace of Mind" />
        <Main>
          <Routes>
            <Route
              path="/"
              element={<Home icon={<MdPerson className="section__icon" />} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard icon={<MdPerson className="section__icon" />} />
              }
            />
          </Routes>
        </Main>
      </Router>
    </UserProvider>
  );
};

export default App;
