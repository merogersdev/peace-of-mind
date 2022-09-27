import "./Dashboard.scss";
import "../../components/Button/Button.scss";

import { useState, useContext } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";

import UserContext from "../../context/UserContext";

import Section from "../../components/Section/Section";
import Message from "../../components/Message/Message";

import { useEffect } from "react";
import axios from "axios";

import { MdInsertEmoticon, MdModeEdit, MdDelete } from "react-icons/md";

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
    getUser();

    const getQuote = async () => {
      try {
        const response = await axios.get("/users/quote/", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setQuote(response.data.quote.quote);
        setAuthor(response.data.quote.author);
      } catch (error) {
        console.error(error);
      }
    };
    getQuote();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/entries/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const updatedEntries = user.entries.filter((entry) => entry.id !== id);
      setUser({ ...user, entries: updatedEntries });
    } catch (error) {
      console.error(error);
    }
  };

  // Format Timestamp

  const formatDate = (date) => {
    const dateTime = date;

    let splitDate = dateTime.split(/[- :]/); //
    let dayOfWeek = splitDate[2].split(/[T]/);

    let formattedDate = `${splitDate[1]}/${dayOfWeek[0]}/${splitDate[0]}`;

    return formattedDate;
  };

  // If no token, return to home

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    user && (
      <>
        <Section>
          <div className="section__icon-container">{icon}</div>
          <h1 className="section__h1 ">Dashboard</h1>
          <h2 className="section__h2">
            Hello, {user.firstName}
            <MdInsertEmoticon className="section__icon--space" />
          </h2>
          <div className="section__button-container">
            <Link
              to="/add-entry"
              className="button button--primary button--top"
            >
              Add Entry
            </Link>
            <button className="button button--dark" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </Section>
        <Section>
          <h1 className="section__h1 section__h1--no-icon">Words of Wisdom</h1>
          <p className="section__p section__p--quote">{quote}</p>
          <p className="section__p section__p--author">{author}</p>
        </Section>
        <Section>
          <h1 className="section__h1 section__h1--no-icon">Entry Archive</h1>
          <ul className="section__entry-list">
            {user.entries.length === 0 ? (
              <Message type="info" message="No messages to display..." />
            ) : (
              ""
            )}
            {user.entries.map((entry) => (
              <li key={entry.id} className="section__entry-listitem">
                <div className="section__entry-info">
                  <h3 className="section__h3">{entry.title}</h3>
                  {entry.updated_at ? (
                    <p className="section__p--author">
                      Updated: {formatDate(entry.updated_at)}
                    </p>
                  ) : (
                    <p className="section__p--author">
                      Created: {formatDate(entry.created_at)}
                    </p>
                  )}
                </div>
                <div className="section__entry-interact">
                  <Link
                    to={`/edit-entry/${entry.id}`}
                    className="button button--dark button--big-icon button--spacer"
                  >
                    <MdModeEdit />
                  </Link>
                  <button className="button button--delete button--big-icon">
                    <MdDelete onClick={() => handleDelete(entry.id)} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      </>
    )
  );
};

export default Dashboard;
