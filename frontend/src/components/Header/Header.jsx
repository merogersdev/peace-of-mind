import "./Header.scss";

import Container from "../Container/Container";

export default function Header({ title }) {
  return (
    <header className="header">
      <Container>
        <span className="header__title">{title}</span>
      </Container>
    </header>
  );
}
