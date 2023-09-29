import "./Header.scss";

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MdClass, MdMenu, MdClose } from "react-icons/md";
import Container from "../Container/Container";

export default function Header({ title }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleClick() {
    setMenuOpen(false);
  }

  function handleKeyDown(e) {
    console.log(e.keyCode);
    if (e.keyCode === 27) {
      handleClick();
    }
  }

  return (
    <header className="header">
      <Container>
        <div className="header__container">
          <Link to="/" className="header__title">
            <div className="header__icon">
              <MdClass />
            </div>
            {title}
          </Link>
          <nav className="header__nav">
            <ul
              className={`header__navlist ${
                menuOpen ? "" : "header__navlist--open"
              }`}
              // eslint-disable-next-line
              role="button"
              onClick={() => handleClick()}
              onKeyDown={() => handleKeyDown()}
            >
              <li>
                <NavLink to="/" className="header__link">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="header__link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="header__link">
                  Register
                </NavLink>
              </li>
            </ul>
            <button
              type="button"
              className="header__menu"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <MdClose size="1.5rem" /> : <MdMenu size="1.5rem" />}
            </button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
