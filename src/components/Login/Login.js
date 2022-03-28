import { useState } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const useFormObj = useFormWithValidation();
  
  function handleEmailChange(e) {
    setEmail(e.target.value);
    useFormObj.handleChange(e);
  }
  
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    useFormObj.handleChange(e);
  }

  
  return (
    <PopupWithForm 
      isOpen={props.isOpen}
      onClose={props.onClose}
      title='Sign in'
      buttonText='Sign in'
      onLinkClick={props.onLinkClick}
      useFormObj={useFormObj}
      action={props.action}
      val={[useFormObj.values.email, useFormObj.values.password]}
      textLink="Sign up"
    >
      <label className="popup__label" htmlFor="emailLog">Email</label>
      <input type="email" id="emailLog" className="popup__input" 
      onChange = {handleEmailChange}
      name="email" value={email} placeholder="Enter email" required/>
      <span className="popup__error"></span>
      <label className="popup__label" htmlFor="passwordLog">Password</label>
      <input type="password" id="passwordLog" className="popup__input" 
      onChange = {handlePasswordChange}
      name="password" value={password} placeholder="Enter password" required/>
      <span className="popup__error"></span>
      <p className={`popup__submit-error ${props.isErrorSubmitVisibled ? '' : 'popup__submit-error_hidden'}`}>                {props.errorText}
      </p>
    </PopupWithForm>

  );
}
    
export default Login;