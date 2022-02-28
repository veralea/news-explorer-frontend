function LoginButton(props) {
if(props.isLogged){
        return (
            <div className={window.location.href.includes("/saved-news") 
                ? "login-button login-button_black" 
                : "login-button "}>
                <span className="login-button__text">{props.name}</span>
                <div className={window.location.href.includes("/saved-news") ? "login-button__exit-icon login-button__exit-icon_black" :"login-button__exit-icon"}></div>
            </div>
        );
    } else {
        return (
            <button className={window.location.href.includes("/saved-news") 
            ? "login-button login-button_black" 
            : "login-button "} onClick={props.onLoginButtonClick}>
                <span className="login-button__text">Sign in</span>
            </button>
        );
    }

}

export default LoginButton;