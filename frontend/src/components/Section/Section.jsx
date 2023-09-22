import "./Section.scss";

const Section = ({ children, mini }) => {
  return (
    <section className={`section${mini ? " section--mini" : ""}`}>
      {children}
    </section>
  );
};

export default Section;
