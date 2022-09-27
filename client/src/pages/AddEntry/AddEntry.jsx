import "./AddEntry.scss";
import "../../components/Button/Button.scss";

import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate, Link } from "react-router-dom";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

import axios from "axios";

import UserContext from "../../context/UserContext";

const AddEntry = ({ icon }) => {
  const { user, getUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [entry, setEntry] = useState("");

  const [titleError, setTitleError] = useState(false);
  const [gratitudeError, setGratitudeError] = useState(false);
  const [entryError, setEntryError] = useState(false);

  const [addEntrySuccess, setAddEntrySuccess] = useState(false);
  const [addEntryError, setAddEntryError] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) return;
    getUser();
  }, []);

  useEffect(() => {
    if (addEntrySuccess) {
      navigate("/dashboard");
    }
  }, [addEntrySuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setAddEntryError(false);
    setTitleError(false);
    setGratitudeError(false);
    setEntryError(false);

    if (handleValidateForm() === false) {
      return;
    }

    // Register User

    try {
      const response = await axios.post(
        "/entries/",
        {
          user_id: user.id,
          title: title,
          gratitude: gratitude,
          entry: entry,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success === true) {
        setAddEntrySuccess(true);
      }
    } catch (error) {
      console.error(error);
      setAddEntryError(true);
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

  //If user session exists, go straight to dashboard.
  // if (!user) {
  //   return <Navigate to="/dashboard" />;
  // }

  return (
    <Section mini={true}>
      <div className="section__icon-container">{icon}</div>

      <h1 className="section__h1">Add Entry</h1>
      <Form handler={handleSubmit}>
        <label className="form__label">
          Title
          <input
            className={`form__input${titleError ? " form__input--error" : ""}`}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
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
          ></textarea>
          <div className="form__message-container">
            {entryError && (
              <Message type="error" message="Entry cannot be blank" />
            )}
          </div>
        </label>

        <div className="form__message-container">
          {addEntryError && <Message type="error" message="Add entry failed" />}
          {addEntrySuccess && <Message type="success" message="Added entry" />}
        </div>
        <div className="form__button-container">
          <button className="button button--primary">Add Entry</button>
        </div>
        <div className="form__button-container">
          <Link to="/" className="button button--dark">
            Back
          </Link>
        </div>
      </Form>
    </Section>
  );
};

export default AddEntry;
