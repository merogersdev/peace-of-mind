import "./Card.scss";

export default function Card({ children, right }) {
  return <div className={`card ${right ? "card--right" : ""}`}>{children}</div>;
}
