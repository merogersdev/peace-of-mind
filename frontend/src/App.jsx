import "./styles/App.scss";

import {
  MdEditNote,
  MdPersonAdd,
  MdLogin,
  MdWeekend,
  MdDashboard,
} from "react-icons/md";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import AddEntry from "./pages/AddEntry/AddEntry";
import EditEntry from "./pages/EditEntry/EditEntry";
import Login from "./pages/Login/Login";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Header title="Peace of Mind" />
        <Main>
          <Routes>
            <Route
              path="/"
              element={<Home icon={<MdWeekend className="section__icon" />} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard icon={<MdDashboard className="section__icon" />} />
              }
            />
            <Route
              path="/login"
              element={<Login icon={<MdLogin className="section__icon" />} />}
            />
            <Route
              path="/register"
              element={
                <Register icon={<MdPersonAdd className="section__icon" />} />
              }
            />
            <Route
              path="/add-entry"
              element={
                <AddEntry icon={<MdEditNote className="section__icon" />} />
              }
            />
            <Route
              path="/edit-entry/:id"
              element={
                <EditEntry icon={<MdEditNote className="section__icon" />} />
              }
            />
          </Routes>
        </Main>
      </Router>
    </AuthProvider>
  );
}
