import "./Hero.scss";
import { NavLink } from "react-router-dom";

export default function Hero({ title, content }) {
  return (
    <div className="hero">
      <div className="hero__section hero__section--center">
        <h1 className="hero__h1">{title}</h1>
        <p className="hero__p">{content}</p>
        <div className="hero__buttons">
          <NavLink
            to="/register"
            className="hero__button hero__button--primary"
          >
            Get Started
          </NavLink>
        </div>
      </div>
      <div className="hero__section hero__section--center">
        <div className="hero__image-container">
          <img
            src="/undraw_Mindfulness_8gqa.png"
            alt="Mindfulness"
            className="hero__image"
          />
        </div>
      </div>
    </div>
  );
}
