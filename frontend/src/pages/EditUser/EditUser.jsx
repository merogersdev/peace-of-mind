import { useState, useEffect, useContext, useRef } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
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

export default function EditUser({ icon }) {
  const { user, refreshAuth, setUser, setQuote, setEntries } =
    useContext(AuthContext);

  const initialErrorState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    updatedUser: null,
  };

  const [formErrors, setFormErrors] = useState(initialErrorState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keepPassword, setKeepPassword] = useState(true);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

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
    if (keepPassword === false) {
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  }

  const logoutUser = () => {
    setUser(null);
    setQuote(null);
    setEntries(null);
    sessionStorage.clear();
    navigate("/login");
  };

  // If token, get user details.
  useEffect(() => {
    firstNameRef.current.value = user.first_name;
    lastNameRef.current.value = user.last_name;
    emailRef.current.value = user.email;

    if (!token) return;
    refreshAuth();
  }, []);

  // Set focus on first form field
  useEffect(() => {
    if (firstNameRef) {
      firstNameRef.current.focus();
    }
  }, [firstNameRef]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormErrors(initialErrorState);

    setErrorMessage("");
    setSuccessMessage("");

    const isFirstNameValid = checkString(firstNameRef.current.value, 1);
    const isLastNameValid = checkString(lastNameRef.current.value, 1);
    const isEmailValid = checkEmail(emailRef.current.value);

    function isPasswordValid() {
      // Just return true if keep password is checked
      if (keepPassword) return true;
      return checkPassword(passwordRef.current.value);
    }

    function passwordsMatch() {
      // Just return true if keep password is checked
      if (keepPassword) return true;
      return matchPasswords(
        passwordRef.current.value,
        confirmPasswordRef.current.value
      );
    }

    const password = isPasswordValid();
    const match = passwordsMatch();

    if (!isFirstNameValid) setError("firstName");
    if (!isLastNameValid) setError("lastName");
    if (!isEmailValid) setError("email");
    if (!password) setError("password");
    if (!match) setError("confirmPassword");

    // If validations fail, exit
    if (
      !isFirstNameValid ||
      !isLastNameValid ||
      !isEmailValid ||
      !password ||
      !match
    )
      return;

    // Update User
    try {
      setLoading(true);
      const response = await axios.patch(
        `/users/${user.id}`,
        {
          firstName: firstNameRef.current.value,
          lastName: lastNameRef.current.value,
          email: emailRef.current.value,
          password: keepPassword ? null : passwordRef.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success === true) {
        setFormErrors((prev) => ({
          ...prev,
          updatedUser: false,
        }));
        setSuccessMessage(response.data.message);
        resetForm();
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data.message);
      setLoading(false);
    }
  };

  // If no user, go home
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <Section mini>
      <div className="section__icon-container">{icon}</div>
      <h1 className="section__h1">Edit User</h1>
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
        <div className="form__radio-group">
          <label className="form__radio-item" htmlFor="password-choice">
            Keep Current Password
            <input
              type="radio"
              name="password-choice"
              className={`form__radio ${
                keepPassword === true ? "form__radio--selected" : ""
              }`}
              checked={keepPassword === true}
              onChange={() => setKeepPassword(true)}
            />
          </label>
          <label className="form__radio-item" htmlFor="password-choice">
            Change Password
            <input
              type="radio"
              name="password-choice"
              value={false}
              className={`form__radio ${
                keepPassword === false ? "form__radio--selected" : ""
              }`}
              checked={keepPassword === false}
              onChange={() => setKeepPassword(false)}
            />
          </label>
        </div>
        {keepPassword === false && (
          <>
            <h2 className="form__h2">Change Password</h2>
            <label className="form__label" htmlFor="password">
              New Password
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
          </>
        )}

        <div className="form__message-container">
          {errorMessage && <Message type="error" message={errorMessage} />}
          {successMessage && (
            <Message type="success" message={successMessage} />
          )}
        </div>
        <div className="form__button-container">
          {successMessage ? (
            <button
              type="button"
              onClick={() => logoutUser()}
              className={`form__button form__button${
                loading ? "--disabled" : "--primary"
              }`}
            >
              Logout
            </button>
          ) : (
            <button
              type="submit"
              className={`form__button form__button${
                loading ? "--disabled" : "--primary"
              }`}
            >
              Edit
            </button>
          )}
          {!successMessage && (
            <Link to="/" className="form__button form__button--dark">
              Go Back
            </Link>
          )}
        </div>
      </Form>
    </Section>
  );
}
