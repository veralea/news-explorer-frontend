import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const useFormObj = useFormWithValidation();

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

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Sign up'
      buttonText='Sign un'
      onLinkClick={props.onLinkClick}
      useFormObj={useFormObj}
      action={props.action}
      val={[useFormObj.values.email, useFormObj.values.password, useFormObj.values.username]}
      textLink="Sign in"
    >
      <label className="popup__label" htmlFor="emailReg">Email</label>
      <input
        type="email"
        id="emailReg"
        className="popup__input"
        onChange = {handleEmailChange}
        name="email"
        value={email}
        placeholder="Enter your email"
        required
      />
      <span className="popup__error"></span>
      <label className="popup__label" htmlFor="passwordReg">Password</label>
      <input
        type="password"
        id="passwordReg"
        className="popup__input"
        onChange = {handlePasswordChange}
        name="password"
        value={password}
        placeholder="Enter your password"
        required
      />
      <span className="popup__error"></span>
      <label className="popup__label" htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        className="popup__input"
        onChange = {handleUsernameChange}
        name="username"
        value={username}
        placeholder="Enter your username"
        required
      />
      <span className="popup__error"></span>
      <p
        className={`popup__submit-error ${props.isErrorSubmitVisibled ? '' : 'popup__submit-error_hidden'}`}>
        {props.errorText}
      </p>
    </PopupWithForm>
 );
}

export default Register;
