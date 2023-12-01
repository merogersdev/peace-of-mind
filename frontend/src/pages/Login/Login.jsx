import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { checkEmail, checkPassword } from "../../utils/validation";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import AuthContext from "../../context/AuthContext";

export default function Login({ icon }) {
  const { user, setQuote, setUser, setEntries, refreshAuth } =
    useContext(AuthContext);

  const initialErrorState = {
    email: false,
    password: false,
    login: false,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  function setError(name) {
    setFormErrors((prev) => ({
      ...prev,
      [name]: true,
    }));
  }

  function resetForm() {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  // If token, refresh Auth State
  useEffect(() => {
    if (!token) return;
    refreshAuth();
  }, []);

  // Set focus on first form field
  useEffect(() => {
    if (emailRef) {
      emailRef.current.focus();
    }
  }, [emailRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset Errors
    setFormErrors(initialErrorState);
    setErrorMessage("");
    setSuccessMessage("");

    // Enter loading state
    setLoading(true);

    const isEmailValid = checkEmail(emailRef.current.value);
    const isPasswordValid = checkPassword(passwordRef.current.value);

    if (!isEmailValid) setError("email");
    if (!isPasswordValid) setError("password");

    // If validation fails, exit
    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await axios.post("/auth", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      // If successful login, store JWT token in browser
      if (response.data.success === true) {
        setSuccessMessage("Login Successful");
        const currentToken = response.data.token.split(" ")[1];
        sessionStorage.setItem("token", currentToken);
        setUser(response.data.user);
        setQuote(response.data.quote);
        setEntries(response.data.entries);
        setLoading(false);
        resetForm();
        navigate("/dashboard");
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
      <h1 className="section__h1">Login</h1>
      <Form handler={handleSubmit}>
        <label className="form__label" htmlFor="email">
          Email
          <input
            className={`form__input${
              formErrors.email ? " form__input--error" : ""
            }`}
            name="email"
            ref={emailRef}
            disabled={loading}
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
            type="password"
            name="password"
            ref={passwordRef}
            disabled={loading}
          />
          <div className="form__message-container">
            {formErrors.password && (
              <Message
                type="error"
                message="Password must be more than 6 letters"
              />
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
            Login
          </button>
          <Link to="/" className="form__button form__button--dark">
            Go Back
          </Link>
        </div>
      </Form>
    </Section>
  );
}
