import "../../components/Button/Button.scss";

import { useState, useEffect, useContext } from "react";

import { Navigate, useNavigate, Link } from "react-router-dom";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

import axios from "axios";

import UserContext from "../../context/UserContext";

const Home = ({ icon }) => {
  const { user, getUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  // If token, get user details
  useEffect(() => {
    if (!token) return;
    getUser();
  }, []);

  // If user logs in, go to dashboard
  useEffect(() => {
    if (loginSuccess) {
      navigate("/dashboard");
    }
  }, [loginSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError(false);

    if (handleValidateForm() === false) {
      return;
    }

    // Login User
    try {
      const response = await axios.post("/users/login", {
        email: email,
        password: password,
      });

      // If successful login, store JWT token in browser
      if (response.data.success === true) {
        const token = response.data.token.split(" ")[1];
        sessionStorage.setItem("token", token);
        setLoginSuccess(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  // Check for blanks and proper email
  const handleValidateForm = () => {
    let ready = true;
    setEmailError(false);
    setPasswordError(false);

    if (email.length < 1 || !email.includes("@")) {
      setEmailError(true);
      ready = false;
    }

    if (password.length < 6) {
      setPasswordError(true);
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
      <h1 className="section__h1">Login</h1>
      <Form handler={handleSubmit}>
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
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="form__message-container">
            {passwordError && (
              <Message
                type="error"
                message="Password must be more than 6 letters"
              />
            )}
          </div>
        </label>
        <div className="form__message-container">
          {loginError && <Message type="error" message="Invalid credentials" />}
        </div>
        <div className="form__button-container">
          <button className="button button--primary button--expand">
            Login
          </button>
        </div>
        <div className="form__button-container">
          <Link to="/register" className="button button--dark button--expand">
            Register
          </Link>
        </div>
      </Form>
    </Section>
  );
};

export default Home;
