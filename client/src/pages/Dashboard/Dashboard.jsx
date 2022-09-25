import "./Dashboard.scss";
import "../../components/Button/Button.scss";

import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import UserContext from "../../context/UserContext";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import { useEffect } from "react";

const Dashboard = ({ icon }) => {
  const { user, setUser, getUser } = useContext(UserContext);
  const token = sessionStorage.getItem("token");
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
  }, []);

  // If no token, return to home

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    user && (
      <Section mini={true}>
        <div className="section__icon-container">{icon}</div>
        <p>{user.firstName}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        {user.entries[0].description}
        <button onClick={logoutUser}>Logout</button>
      </Section>
    )
  );
};

export default Dashboard;
