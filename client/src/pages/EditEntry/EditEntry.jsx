import "./EditEntry.scss";
import "../../components/Button/Button.scss";

import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate, Link, useParams } from "react-router-dom";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

import axios from "axios";

import UserContext from "../../context/UserContext";

const EditEntry = ({ icon }) => {
  const { id } = useParams();

  const { user, getUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [entry, setEntry] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [gratitudeError, setGratitudeError] = useState(false);
  const [entryError, setEntryError] = useState(false);

  const [editEntrySuccess, setEditEntrySuccess] = useState(false);
  const [editEntryError, setEditEntryError] = useState(false);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    getUser();
  }, []);

  useEffect(() => {
    if (user && user.entries) {
      const entry = user.entries.filter((entry) => entry.id === Number(id));
      if (!editEntrySuccess) {
        setTitle(entry[0].title);
        setGratitude(entry[0].gratitude);
        setEntry(entry[0].entry);
      }
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEditEntryError(false);
    setTitleError(false);
    setGratitudeError(false);
    setEntryError(false);

    if (handleValidateForm() === false) {
      return;
    }

    // Register User

    const editedEntry = {
      id: id,
      title: title,
      gratitude: gratitude,
      entry: entry,
    };

    try {
      const response = await axios.patch(`/entries/${id}`, editedEntry, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      if (response.data.success === true) {
        setEditEntrySuccess(true);
        getUser();
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setEditEntryError(true);
    }
  };

  const handleValidateForm = () => {
    let ready = true;
    setTitleError(false);
    setGratitudeError(false);
    setEntryError(false);

    if (title.length < 1) {
      setTitleError(true);
      ready = false;
    }

    if (gratitude.length < 1) {
      setGratitudeError(true);
      ready = false;
    }

    if (entry.length < 1) {
      setEntryError(true);
      ready = false;
    }

    return ready;
  };

  //If no token or id passed, go straight to login.
  if (!token || !id) {
    return <Navigate to="/" />;
  }

  return (
    <Section mini={true}>
      <div className="section__icon-container">{icon}</div>

      <h1 className="section__h1">Edit Entry</h1>
      <Form handler={handleSubmit}>
        <label className="form__label">
          Title
          <input
            className={`form__input${titleError ? " form__input--error" : ""}`}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <div className="form__message-container">
            {titleError && (
              <Message type="error" message="Title cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label">
          Gratitude
          <textarea
            className={`form__textarea form__textarea--mini${
              gratitudeError ? " form__textarea--error" : ""
            }`}
            name="gratitude"
            onChange={(e) => setGratitude(e.target.value)}
            value={gratitude}
          ></textarea>
          <div className="form__message-container">
            {gratitudeError && (
              <Message type="error" message="Gratitude cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label">
          Entry
          <textarea
            className={`form__textarea${
              entryError ? " form__textarea--error" : ""
            }`}
            name="entry"
            onChange={(e) => setEntry(e.target.value)}
            value={entry}
          ></textarea>
          <div className="form__message-container">
            {entryError && (
              <Message type="error" message="Entry cannot be blank" />
            )}
          </div>
        </label>

        <div className="form__message-container">
          {editEntryError && (
            <Message type="error" message="Edit entry failed" />
          )}
          {editEntrySuccess && (
            <Message type="success" message="Edit entry success" />
          )}
        </div>
        <div className="form__button-container">
          <button className="button button--primary">Edit Entry</button>
        </div>
        <div className="form__button-container">
          <Link to="/dashboard" className="button button--dark">
            Back
          </Link>
        </div>
      </Form>
    </Section>
  );
};

export default EditEntry;
