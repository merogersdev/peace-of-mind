import "./Home.scss";
import "../../components/Button/Button.scss";

import { useContext } from "react";

import UserContext from "../../context/UserContext";

import Section from "../../components/Section/Section";
import Form from "../../components/Form/Form";
import Message from "../../components/Message/Message";

const Home = ({ icon }) => {
  const { user } = useContext(UserContext);
  return (
    <Section mini={true}>
      <div className="section__icon-container">{icon}</div>
      <div>
        <a href="#" className="button button--primary">
          Button
        </a>
        <br />
        <a href="#" className="button button--primary-outline">
          Button
        </a>
        <br />
        <a href="#" className="button button--dark">
          Button
        </a>
        <br />
        <a href="#" className="button button--dark-outline">
          Button
        </a>
        <br />
      </div>
      <Form>
        <label className="form__label">
          Email
          <input className="form__input" placeholder="Email"></input>
        </label>
        <label className="form__label">
          Password
          <input
            className="form__input form__input--error"
            placeholder="Password"
            type="password"
          ></input>
        </label>
      </Form>
      <br />
      <Message message="Error" type="error" />
      <br />
      <Message message="Information" type="info" />
      <br />
      <Message message="Success" type="success" />
      <br />
      <Message message="Warning" type="warn" />
      <br />
      <h1 className="section__h1">Header 1</h1>
      <h2 className="section__h2">Header 1</h2>
      <h3 className="section__h3">Header 1</h3>
      <p className="section__p">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non, quam quo?
        Doloremque sequi, perspiciatis consectetur animi vel ut culpa laboriosam
        et aperiam, non labore quas ipsa vero? Maiores, sapiente optio.
      </p>
    </Section>
  );
};

export default Home;
