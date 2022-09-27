import "./styles/App.scss";

import { UserProvider } from "./context/UserContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import AddEntry from "./pages/AddEntry/AddEntry";
import EditEntry from "./pages/EditEntry/EditEntry";

// Components
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import { MdEditNote, MdPersonAdd, MdLogin, MdDashboard } from "react-icons/md";

console.log;

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Header title="Peace of Mind" />
        <Main>
          <Routes>
            <Route
              path="/"
              element={<Home icon={<MdLogin className="section__icon" />} />}
            />
            <Route
              path="/dashboard"
              element={
                <Dashboard icon={<MdDashboard className="section__icon" />} />
              }
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
    </UserProvider>
  );
};

export default App;
