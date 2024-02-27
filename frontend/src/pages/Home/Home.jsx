import { useContext } from "react";
import { Navigate, NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import Section from "../../components/Section/Section";

export default function Home({ icon }) {
  const { user } = useContext(AuthContext);

  // If user session exists, go straight to dashboard.
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Section>
      <div className="section__icon-container">{icon}</div>
      <div className="section__container">
        <div className="section__column">
          <h1 className="section__h1 section__h1--custom">Welcome</h1>
          <p className="section__p">
            This application is meant to assist in the daily mental health of
            the individual by providing a safe space to journal, keep track of
            daily gratitudes and truly have peace of mind.
          </p>
          <div className="section__cta-container">
            <NavLink
              to="/register"
              className="section__button section__button--primary section__cta-button"
            >
              Get Started
            </NavLink>
          </div>
        </div>
        <div className="section__column section--optional">
          <img
            src="/undraw_Mindfulness_8gqa.png"
            alt="Mindfulness"
            className="section__hero-img"
          />
        </div>
      </div>
    </Section>
  );
}
