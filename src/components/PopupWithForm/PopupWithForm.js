import { useState } from "react";

function PopupWithForm(props) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    function handleEmailChange(e) {
      setEmail(e.target.value);
    }
  
    function handlePasswordChange(e) {
      setPassword(e.target.value);
    }
    
    return (
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button 
                className="button popup__close-button" 
                aria-label="close button"
                onClick={props.onClose}
            ></button>
            <form className={`popup__form popup__form_type_${props.name}`} onSubmit={props.onSubmit}>
            <h2 className="popup__title">{`${props.title}`}</h2>
            {/* {props.children} */}
            <label className="popup__label" htmlFor="email">Email</label>
            <input type="email" id="email" className="popup__input" onChange = {handleEmailChange}
            name="email" value={email} placeholder="Email" required />
            <span className="popup__error"></span>
            <label className="popup__label" htmlFor="password">Password</label>
            <input type="password" id="password" className="popup__input" onChange = {handlePasswordChange}
            name="password" value={password} placeholder="Password" required />
                <span className="popup__error"></span>
            <button type="submit" name="submit"
                className="button popup__button">
                {props.buttonText}
            </button>
            <p className="popup__link">
                or <span className="popup__link_blue">Sign up</span>
            </p>
            </form>
        </div>
        </section>

    );
}

export default PopupWithForm;