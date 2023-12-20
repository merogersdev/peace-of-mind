import "./Form.scss";

export default function Form({ children, handler }) {
  return (
    <form className="form" onSubmit={handler}>
      {children}
    </form>
  );
}
