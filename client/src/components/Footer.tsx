import { API_NINJAS_URL, CURRENT_YEAR } from '../utils/constants';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">© {CURRENT_YEAR} Manuel Aleman</p>
        <p className="footer__credit">
          Datos de motocicletas proporcionados por{' '}
          <a className="footer__link" href={API_NINJAS_URL} target="_blank" rel="noreferrer">
            API Ninjas
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
