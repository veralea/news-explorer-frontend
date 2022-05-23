import Navigation from '../Navigation/Navigation';
import { withRouter, Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className={`header__content ${window.location.href.includes("/saved-news")
        ? "header__content_black" : ""}`}>
        <Link className={`header__logo ${window.location.href.includes("/saved-news")
        ? "header__logo_black" : ""}`} to="/">NewsExplorer</Link>
        <Navigation
          isLogged={props.isLogged}
          name="Elise"
          onLoginButtonClick={props.onLoginButtonClick}
          onLogoutButtonClick={props.onLogoutButtonClick}
          onSavedNewsClick={props.onSavedNewsClick}
        />
        <div
          className={window.location.href.includes("/saved-news")
            ? "header__menu-icon header__menu-icon_black"
            : "header__menu-icon"}
        ></div>
      </div>
    </header>
  );
}

export default withRouter(Header);
