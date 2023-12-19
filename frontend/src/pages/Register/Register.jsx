import { useState, useEffect, useContext, useRef } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import AuthContext from "../../context/AuthContext";

import checkString, {
  checkEmail,
  checkPassword,
  matchPasswords,
} from "../../utils/validation";

export default function Register({ icon }) {
  const { user, refreshAuth } = useContext(AuthContext);

  const initialErrorState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    register: null,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const token = sessionStorage.getItem("token");

  function setError(name) {
    setFormErrors((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function resetForm() {
    firstNameRef.current.value = "";
    lastNameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  }

  // If token, get user details.
  useEffect(() => {
    if (!token) return;
    refreshAuth();
  }, []);

  // Set focus on first form field
  useEffect(() => {
    if (firstNameRef) {
      firstNameRef.current.focus();
    }
  }, [emailRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(initialErrorState);

    setErrorMessage("");
    setSuccessMessage("");

    const isFirstNameValid = checkString(firstNameRef.current.value, 1);
    const isLastNameValid = checkString(lastNameRef.current.value, 1);
    const isEmailValid = checkEmail(emailRef.current.value);
    const isPasswordValid = checkPassword(passwordRef.current.value);
    const passwordsMatch = matchPasswords(
      passwordRef.current.value,
      confirmPasswordRef.current.value
    );

    if (!isFirstNameValid) setError("firstName");
    if (!isLastNameValid) setError("lastName");
    if (!isEmailValid) setError("email");
    if (!isPasswordValid) setError("password");
    if (!passwordsMatch) setError("confirmPassword");

    // If validations fail, exit
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !passwordsMatch
    )
      return;

    // Register User
    try {
      setLoading(true);
      const response = await axios.post("/users", {
        firstName: firstNameRef.current.value,
        lastName: lastNameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (response.data.success === true) {
        setFormErrors((prev) => ({
          ...prev,
          register: false,
        }));
        setSuccessMessage(response.data.message);
        resetForm();
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  // If user session exists, go straight to dashboard.
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Section mini>
      <div className="section__icon-container">{icon}</div>
      <h1 className="section__h1">Register</h1>
      <Form handler={handleSubmit}>
        <label className="form__label" htmlFor="firstName">
          First Name
          <input
            className={`form__input${
              formErrors.firstName ? " form__input--error" : ""
            }`}
            name="firstName"
            ref={firstNameRef}
          />
          <div className="form__message-container">
            {formErrors.firstName && (
              <Message type="error" message="First name cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label" htmlFor="lastName">
          Last Name
          <input
            className={`form__input${
              formErrors.lastName ? " form__input--error" : ""
            }`}
            name="lastName"
            ref={lastNameRef}
          />
          <div className="form__message-container">
            {formErrors.lastName && (
              <Message type="error" message="Last name cannot be blank" />
            )}
          </div>
        </label>

        <label className="form__label" htmlFor="email">
          Email
          <input
            className={`form__input${
              formErrors.email ? " form__input--error" : ""
            }`}
            name="email"
            ref={emailRef}
          />
          <div className="form__message-container">
            {formErrors.email && (
              <Message type="error" message="Must be a valid email address" />
            )}
          </div>
        </label>
        <label className="form__label" htmlFor="password">
          Password
          <input
            className={`form__input${
              formErrors.password ? " form__input--error" : ""
            }`}
            name="password"
            ref={passwordRef}
            type="password"
          />
          <div className="form__message-container">
            {formErrors.password && (
              <Message
                type="error"
                message="Password must be longer than 6 letters"
              />
            )}
          </div>
        </label>
        <label className="form__label" htmlFor="confirmPassword">
          Confirm Password
          <input
            className={`form__input${
              formErrors.confirmPassword ? " form__input--error" : ""
            }`}
            name="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
          />
          <div className="form__message-container">
            {formErrors.confirmPassword && (
              <Message type="error" message="Passwords must match" />
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
          {successMessage ? (
            <Link to="/login" className="form__button form__button--primary">
              Login
            </Link>
          ) : (
            <button
              type="submit"
              className={`form__button form__button${
                loading ? "--disabled" : "--primary"
              }`}
            >
              Register
            </button>
          )}
          <Link to="/" className="form__button form__button--dark">
            Go Back
          </Link>
        </div>
      </Form>
    </Section>
  );
}
