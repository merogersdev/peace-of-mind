import "./styles/App.scss";

import { UserProvider } from "./context/UserContext";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home/Home";

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
          </Routes>
        </Main>
      </Router>
    </UserProvider>
  );
};

export default App;
