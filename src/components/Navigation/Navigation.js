import { withRouter, Link } from "react-router-dom";
import LoginButton from '../LoginButton/LoginButton';

function Navigation(props) {
  return (
    <nav className="navigation">
      <ul 
        className={props.isLogged 
          ? "navigation__content navigation_state_logged" 
          : "navigation__content navigation_state_not-logged"}
      >
        <li className="navigation__item">
          <Link className={`navigation__link ${window.location.href.includes("/saved-news") 
            ? "navigation__link_black" : ""}`} to="/">Home</Link>
        </li>
        <li 
          className={ props.isLogged 
            ? "navigation__item" 
            : "navigation__item_hidden" }
        >
          <Link className={`navigation__link ${window.location.href.includes("/saved-news") 
            ? "navigation__link_black" : ""}`} to="/saved-news">Saved articles</Link>  
        </li> 
        <li className="navigation__item">
          <LoginButton 
            isLogged={props.isLogged} 
            name={props.name} 
            onLoginButtonClick={props.onLoginButtonClick}
            onLogoutButtonClick={props.onLogoutButtonClick}
          />  
        </li>           
      </ul>  
        
        
    </nav>
  );
}

export default withRouter(Navigation);