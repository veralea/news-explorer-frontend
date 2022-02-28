import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <span className="footer__copy">
                    &copy; 2022 Supersite, Powered by News API
                </span>
                <nav className="footer__navigation">
                    <ul className="footer__navigation-content">
                        <li className="footer__navigation-item footer__navigation-item_home">
                            <Link className="footer__navigation-link" to="/">Home</Link>
                        </li>
                        <li className="footer__navigation-item footer__navigation-item_py">    
                            <a 
                                className="footer__navigation-link" 
                                href="https://practicum.yandex.com" 
                                target="_blank"
                                rel="noreferrer"
                            >
                                Practicum by Yandex
                            </a>
                        </li>
                        <li className="footer__navigation-item footer__navigation-item_gh">    
                            <a className="footer__navigation-link" href="//https://github.com/veralea">
                                <div className="footer__social footer__social-github"></div>
                            </a>
                        </li>
                        <li className="footer__navigation-item footer__navigation-item_fb">    
                            <a className="footer__navigation-link" href="https://www.facebook.com/profile.php?id=100015397681525">
                                <div className="footer__social footer__social-facebook"></div>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;