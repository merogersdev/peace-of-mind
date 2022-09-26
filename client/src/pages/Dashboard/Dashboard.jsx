import "./Dashboard.scss";
import "../../components/Button/Button.scss";

import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import { useEffect } from "react";
import axios from "axios";

const Dashboard = ({ icon }) => {
  const { user, setUser, getUser } = useContext(UserContext);
  const token = sessionStorage.getItem("token");

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const navigate = useNavigate();

  const logoutUser = () => {
    setUser(null);
    sessionStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    if (token && !user) {
      getUser();
    }

    const getQuote = async () => {
      try {
        const response = await axios.get("/users/quote/");
        setQuote(response.data.quote.quote);
        setAuthor(response.data.quote.author);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getQuote();
  }, []);

  // If no token, return to home

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    user && (
      <>
        <Section>
          <div className="section__icon-container">{icon}</div>
          <h1 className="section__h1">Dashboard</h1>
          <p>{user.firstName}</p>
          <p>{user.lastName}</p>
          <p>{user.email}</p>
          {user.entries.length > 0 && user.entries[0].description}
          <div className="section__button-container">
            <button className="button button--dark" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </Section>
        <Section>
          <h1 className="section__h1">Words of Wisdom</h1>
          <p className="section__p">{quote}</p>
          <p className="section__p">{author}</p>
        </Section>
      </>
    )
  );
};

export default Dashboard;
