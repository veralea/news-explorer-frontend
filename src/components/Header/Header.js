import Navigation from '../Navigation/Navigation';
import { withRouter, Link} from "react-router-dom";

function Header(props) {
  
  // function changeMenuIcon(e) {
      
  //     const icon = e.target;
  //     const nav = document.querySelector(".navigation");
  //     const header = document.querySelector(".header");
  //     nav.classList.toggle("navigation_dropdown");
  //     header.classList.toggle("header_not-transparent");

  //     if (window.location.href.includes("/saved-news")) {

  //     }

  //     if (icon.classList.contains("header__menu-icon_black")
  //       ||icon.classList.contains("header__menu-icon_close_black") ) {
  //         icon.classList.toggle("header__menu-icon_black");
  //         icon.classList.toggle("header__menu-icon_close_black");
  //       }
  //     icon.classList.toggle("header__menu-icon");
  //     icon.classList.toggle("header__menu-icon_close");
      
  // }

  
  return (
        <header className="header">
          <div className={`header__content ${window.location.href.includes("/saved-news") 
            ? "header__content_black" : ""}`}>
            <Link className='header__logo' to="/">NewsExplorer</Link>
            <Navigation 
              isLogged={props.isLogged} 
              name="Elise" 
              onLoginButtonClick={props.onLoginButtonClick}
              onLogoutButtonClick={props.onLogoutButtonClick}
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