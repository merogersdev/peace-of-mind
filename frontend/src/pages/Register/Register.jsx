import "../../components/Button/Button.scss";

import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate, Link } from "react-router-dom";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

import axios from "axios";

import UserContext from "../../context/UserContext";

const Register = ({ icon }) => {
  const { user, getUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  // If token, get user details.
  useEffect(() => {
    if (!token) return;
    getUser();
  }, []);

  // On register success, go to login page
  useEffect(() => {
    if (registerSuccess) {
      navigate("/");
    }
  }, [registerSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRegisterError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (handleValidateForm() === false) {
      return;
    }

    // Register User
    try {
      const response = await axios.post("/users/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (response.data.success === true) {
        setRegisterSuccess(true);
      }
    } catch (error) {
      console.error(error);
      setRegisterError(true);
    }
  };

  // Check for blanks, proper email and password match
  const handleValidateForm = () => {
    let ready = true;
    setEmailError(false);
    setPasswordError(false);

    if (firstName.length < 1) {
      setFirstNameError(true);
      ready = false;
    }

    if (lastName.length < 1) {
      setLastNameError(true);
      ready = false;
    }

    if (email.length < 1 || !email.includes("@")) {
      setEmailError(true);
      ready = false;
    }

    if (password.length < 6) {
      setPasswordError(true);
      ready = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError(true);
      ready = false;
    }

    return ready;
  };

  //If user session exists, go straight to dashboard.
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Section mini={true}>
      <div className="section__icon-container">{icon}</div>
      <h1 className="section__h1">Register</h1>
      <Form handler={handleSubmit}>
        <label className="form__label">
          First Name
          <input
            className={`form__input${
              firstNameError ? " form__input--error" : ""
            }`}
            name="email"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <div className="form__message-container">
            {firstNameError && (
              <Message type="error" message="First name cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label">
          Last Name
          <input
            className={`form__input${
              lastNameError ? " form__input--error" : ""
            }`}
            name="email"
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="form__message-container">
            {lastNameError && (
              <Message type="error" message="Last name cannot be blank" />
            )}
          </div>
        </label>
        <label className="form__label">
          Email
          <input
            className={`form__input${emailError ? " form__input--error" : ""}`}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="form__message-container">
            {emailError && (
              <Message type="error" message="Must be a valid email address" />
            )}
          </div>
        </label>
        <label className="form__label">
          Password
          <input
            className={`form__input${
              passwordError ? " form__input--error" : ""
            }`}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <div className="form__message-container">
            {passwordError && (
              <Message
                type="error"
                message="Password must be longer than 6 letters"
              />
            )}
          </div>
        </label>
        <label className="form__label">
          Confirm Password
          <input
            className={`form__input${
              confirmPasswordError ? " form__input--error" : ""
            }`}
            name="confirm-password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <div className="form__message-container">
            {confirmPasswordError && (
              <Message type="error" message="Passwords must match" />
            )}
          </div>
        </label>

        <div className="form__message-container">
          {registerError && <Message type="error" message="Register failed" />}
          {registerSuccess && (
            <Message type="success" message="Registered User" />
          )}
        </div>
        <div className="form__button-container">
          <button className="button button--primary">Register</button>
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

export default Register;
