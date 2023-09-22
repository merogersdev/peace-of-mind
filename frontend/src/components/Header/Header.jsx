import "./Header.scss";

import Container from "../Container/Container";

const Header = ({ title }) => {
  return (
    <header className="header">
      <Container>
        <span className="header__title">{title}</span>
      </Container>
    </header>
  );
};

export default Header;
