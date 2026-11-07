import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import logo from '../images/logo.svg';
import userIcon from '../images/user.svg';

interface HeaderProps {
  onSigninClick: () => void;
  onSignout: () => void;
}

function getNavLinkClassName({ isActive }: { isActive: boolean }): string {
  return `header__link${isActive ? ' header__link_active' : ''}`;
}

function Header({ onSigninClick, onSignout }: HeaderProps) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-icon" src={logo} alt="Logotipo de Moto Garage" width="32" height="32" />
          Moto Garage
        </Link>
        <nav className="header__nav" aria-label="Navegación principal">
          <NavLink to="/" end className={getNavLinkClassName}>
            Buscar
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/garage" className={getNavLinkClassName}>
              Mi garage
            </NavLink>
          )}
          <NavLink to="/about" className={getNavLinkClassName}>
            Sobre el autor
          </NavLink>
        </nav>
        <div className="header__session">
          {isLoggedIn ? (
            <>
              <span className="header__user">
                <img src={userIcon} alt="Ícono de usuario" width="20" height="20" />
                {currentUser?.name}
              </span>
              <button className="button button_type_secondary header__button" type="button" onClick={onSignout}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <button className="button header__button" type="button" onClick={onSigninClick}>
              <img
                className="header__button-icon"
                src={userIcon}
                alt="Ícono de usuario"
                width="20"
                height="20"
              />
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
