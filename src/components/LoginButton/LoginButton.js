import { useContext } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function LoginButton(props) {
  const user = useContext(CurrentUserContext);

  if(props.isLogged){
    return (
      <div className={window.location.href.includes("/saved-news")
        ? "login-button login-button_black"
        : "login-button "}>
        <span className="login-button__text">{user.name}</span>
        <div
          className={window.location.href.includes("/saved-news")
            ? "login-button__exit-icon login-button__exit-icon_black"
            :"login-button__exit-icon"}
          onClick={props.onLogoutButtonClick}
        >
        </div>
      </div>
    );
  } else {
    return (
      <button className={window.location.href.includes("/saved-news")
      ? "login-button login-button_not-logged login-button_black"
      : "login-button login-button_not-logged"} onClick={props.onLoginButtonClick}>
        <span className="login-button__text">Sign in</span>
      </button>
    );
  }

}

export default LoginButton;
