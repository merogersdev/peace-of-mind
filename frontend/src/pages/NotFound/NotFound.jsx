import { NavLink } from "react-router-dom";
import Section from "../../components/Section/Section";

export default function Home({ icon }) {
  return (
    <Section>
      <div className="section__icon-container">{icon}</div>
      <div className="section__container">
        <div className="section__column">
          <h1 className="section__h1 section__h1--custom">Page Not Found</h1>
          <p className="section__p section__p--center">
            The page you were looking for cannot be found.
          </p>
          <div className="section__cta-container">
            <NavLink
              to="/"
              className="section__button section__button--primary section__cta-button"
            >
              Go Back
            </NavLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
