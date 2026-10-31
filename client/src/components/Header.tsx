import { Link, NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function getNavLinkClassName({ isActive }: { isActive: boolean }): string {
  return `header__link${isActive ? ' header__link_active' : ''}`;
}

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-icon" src={logo} alt="" width="32" height="32" />
          Moto Garage
        </Link>
        <nav className="header__nav" aria-label="Navegación principal">
          <NavLink to="/" end className={getNavLinkClassName}>
            Buscar
          </NavLink>
          <NavLink to="/about" className={getNavLinkClassName}>
            Sobre el autor
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
