import { useState, useEffect, useContext, useRef } from "react";

import { useNavigate, Link, useParams } from "react-router-dom";

import axios from "axios";
import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

import AuthContext from "../../context/AuthContext";
import checkString from "../../utils/validation";

export default function EditEntry({ icon }) {
  const { id } = useParams();
  const { entries, setEntries, refreshAuth } = useContext(AuthContext);

  const initialErrorState = {
    title: false,
    gratitude: false,
    entry: false,
    edit: null,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const titleRef = useRef(null);
  const gratitudeRef = useRef(null);
  const entryRef = useRef(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function setError(name) {
    setFormErrors((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  // Check if token, get user and entry details
  useEffect(() => {
    if (!token) return;
    refreshAuth();
  }, []);

  // Check if token, get user and entry details
  useEffect(() => {
    if (!entries) navigate("/dashboard");
    const currentEntry = entries.filter(
      (filteredEntry) => filteredEntry.id === Number(id)
    );

    titleRef.current.value = currentEntry[0].title;
    gratitudeRef.current.value = currentEntry[0].gratitude;
    entryRef.current.value = currentEntry[0].entry;
  }, [entries]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(initialErrorState);
    setErrorMessage("");
    setSuccessMessage("");

    const isTitleValid = checkString(titleRef.current.value, 1);
    const isGratitudeValid = checkString(gratitudeRef.current.value, 1);
    const isEntryValid = checkString(entryRef.current.value, 1);

    if (!isTitleValid) setError("title");
    if (!isGratitudeValid) setError("gratitude");
    if (!isEntryValid) setError("entry");

    // If validation fails, exit
    if (!isTitleValid || !isGratitudeValid || !isEntryValid) return;

    try {
      setLoading(true);
      const response = await axios.patch(
        `/entries/${id}`,
        {
          id,
          title: titleRef.current.value,
          gratitude: gratitudeRef.current.value,
          entry: entryRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success === true) {
        setSuccessMessage("Entry edited successfully");
        const updatedEntries = entries.filter(
          (entry) => entry.id !== Number(id)
        );

        setEntries([response.data.entry.rows[0], ...updatedEntries]);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error: Entry edit unsuccessful");
      setLoading(false);
    }
  };

  // If no token or id passed, go straight to login.
  if (!token || !id) {
    navigate("/");
  }

  return (
    <Section mini>
      <div className="section__icon-container">{icon}</div>
      <h1 className="section__h1">Edit Entry</h1>
      <Form handler={handleSubmit}>
        <label className="form__label" htmlFor="title">
          Title
          <input
            className={`form__input${
              formErrors.title ? " form__input--error" : ""
            }`}
            name="title"
            ref={titleRef}
            disabled={loading}
          />
          <div className="form__message-container">
            {formErrors.title && (
              <Message type="error" message="Title cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label" htmlFor="gratitude">
          Gratitude
          <textarea
            className={`form__textarea form__textarea--mini${
              formErrors.gratitude ? " form__textarea--error" : ""
            }`}
            name="gratitude"
            ref={gratitudeRef}
            disabled={loading}
          />
          <div className="form__message-container">
            {formErrors.gratitude && (
              <Message type="error" message="Gratitude cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label" htmlFor="entry">
          Entry
          <textarea
            className={`form__textarea${
              formErrors.entry ? " form__textarea--error" : ""
            }`}
            name="entry"
            ref={entryRef}
            disabled={loading}
          />
          <div className="form__message-container">
            {formErrors.entry && (
              <Message type="error" message="Entry cannot be blank" />
            )}
          </div>
        </label>

        <div className="form__message-container">
          {errorMessage && <Message type="error" message={errorMessage} />}
          {successMessage && (
            <Message type="success" message={successMessage} />
          )}
        </div>
        <div className="form__button-container">
          <button
            type="submit"
            className={`form__button form__button${
              loading ? "--disabled" : "--primary"
            }`}
            disabled={loading}
          >
            Edit Entry
          </button>
          <Link
            to="/dashboard"
            className="form__button form__button--dark form__button--expand"
          >
            Back
          </Link>
        </div>
      </Form>
    </Section>
  );
}
