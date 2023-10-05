import { useState, useEffect, useContext, useRef } from "react";

import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import checkString from "../../utils/validation";

import UserContext from "../../context/UserContext";

export default function AddEntry({ icon }) {
  const { user, getUser } = useContext(UserContext);

  const initialErrorState = {
    title: false,
    gratitude: false,
    entry: false,
    add: null,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);
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

  // Check if token, then get use details
  useEffect(() => {
    if (!token) return;
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(initialErrorState);

    const isTitleValid = checkString(titleRef.current.value, 1);
    const isGratitudeValid = checkString(gratitudeRef.current.value, 1);
    const isEntryValid = checkString(entryRef.current.value, 1);

    if (!isTitleValid) setError("title");
    if (!isGratitudeValid) setError("gratitude");
    if (!isEntryValid) setError("entry");

    // If validation fails, exit
    if (!isTitleValid || !isGratitudeValid || !isEntryValid) return;

    // Add new post
    try {
      const response = await axios.post(
        "/entries/",
        {
          user_id: user.id,
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
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setFormErrors((prev) => ({
        ...prev,
        add: false,
      }));
    }
  };

  return (
    <Section mini>
      <div className="section__icon-container">{icon}</div>
      <h1 className="section__h1">Add Entry</h1>
      <Form handler={handleSubmit}>
        <label className="form__label" htmlFor="title">
          Title
          <input
            className={`form__input${
              formErrors.title ? " form__input--error" : ""
            }`}
            name="title"
            ref={titleRef}
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
          />
          <div className="form__message-container">
            {formErrors.entry && (
              <Message type="error" message="Entry cannot be blank" />
            )}
          </div>
        </label>

        <div className="form__message-container">
          {formErrors.add === false && (
            <Message type="error" message="Add entry failed" />
          )}
          {formErrors.add && <Message type="success" message="Added entry" />}
        </div>
        <div className="form__button-container">
          <button
            type="submit"
            className="form__button form__button--primary form__button--expand"
          >
            Add Entry
          </button>
          <Link
            to="/"
            className="form__button form__button--dark form__button--expand"
          >
            Back
          </Link>
        </div>
      </Form>
    </Section>
  );
}
