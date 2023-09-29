import "../../components/Button/Button.scss";
import axios from "axios";
import { useState, useEffect, useContext, useRef } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { checkEmail, checkPassword } from "../../utils/validation";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";
import UserContext from "../../context/UserContext";

export default function Home({ icon }) {
  const { user, getUser } = useContext(UserContext);

  const initialErrorState = {
    email: false,
    password: false,
    login: false,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);

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

  // If token, get user details
  useEffect(() => {
    if (!token) return;
    getUser();
    emailRef.current.focus();
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

    const isEmailValid = checkEmail(emailRef.current.value);
    const isPasswordValid = checkPassword(passwordRef.current.value);

    if (!isEmailValid) setError("email");
    if (!isPasswordValid) setError("password");

    // If validation fails, exit
    if (!isEmailValid || !isPasswordValid) return;

    try {
      const response = await axios.post("/users/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      // If successful login, store JWT token in browser
      if (response.data.success === true) {
        const currentToken = response.data.token.split(" ")[1];
        sessionStorage.setItem("token", currentToken);
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
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
          {formErrors.login && (
            <Message type="error" message="Invalid credentials" />
          )}
        </div>
        <div className="form__button-container">
          <button
            type="submit"
            className="button button--primary button--expand"
          >
            Login
          </button>
          <Link to="/register" className="button button--dark button--expand">
            Register
          </Link>
        </div>
      </Form>
    </Section>
  );
}
