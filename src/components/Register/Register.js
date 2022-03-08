import React from 'react';
import { useState } from "react";

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const useFormObj = props.useForm();
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
    useFormObj.handleChange(e);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    useFormObj.handleChange(e);
  }

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    useFormObj.handleChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (useFormObj.isValid) {
      props.register(e, useFormObj.values.email, useFormObj.values.password, useFormObj.values.username );
      useFormObj.resetForm();
    }
  }

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
            <button 
                className="button popup__close-button" 
                aria-label="close button"
                onClick={props.onClose}
            ></button>
            <form className={`popup__form popup__form_type_${props.name}`} onSubmit={handleSubmit}>
            <h2 className="popup__title">{`${props.title}`}</h2>
            <label className="popup__label" htmlFor="emailReg">Email</label>
            <input type="email" id="emailReg" className="popup__input" 
            onChange = {handleEmailChange}
            name="email" value={email} placeholder="Enter your email" required />
            <span className="popup__error"></span>
            <label className="popup__label" htmlFor="passwordReg">Password</label>
            <input type="password" id="passwordReg" className="popup__input" 
            onChange = {handlePasswordChange}
            name="password" value={password} placeholder="Enter your password" required />
            <span className="popup__error"></span>
            <label className="popup__label" htmlFor="username">Username</label>
            <input type="text" id="username" className="popup__input" 
            onChange = {handleUsernameChange}
            name="username" value={username} placeholder="Enter your username" required />
            <span className="popup__error"></span>
            <p className={`popup__submit-error ${props.isErrorSubmitVisibled ? '' : 'popup__submit-error_hidden'}`}>
              {props.errorText}
            </p>            
            <button type={useFormObj.isValid ? "submit" : "button"} name="submit"
                className={`popup__button ${useFormObj.isValid ? '' : 'popup__button_disabled'}`}>
                {props.buttonText}
            </button>
            <p className="popup__link" onClick={props.onSigninLinkClick}>
                or <span className="popup__link_blue">Sign in</span>
            </p>
            </form>
        </div>
        </section>

  );
}
  
export default Register;