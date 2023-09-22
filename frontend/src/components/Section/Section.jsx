import "./Section.scss";

export default function Section({ children, mini }) {
  return (
    <section className={`section${mini ? " section--mini" : ""}`}>
      {children}
    </section>
  );
}
