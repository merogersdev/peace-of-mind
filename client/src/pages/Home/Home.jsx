import "./Home.scss";
import "../../components/Button/Button.scss";

import { useContext } from "react";

import UserContext from "../../context/UserContext";

import Section from "../../components/Section/Section";

const Home = ({ icon }) => {
  const { user } = useContext(UserContext);
  return (
    <Section>
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
      </div>
    </Section>
  );
};

export default Home;
