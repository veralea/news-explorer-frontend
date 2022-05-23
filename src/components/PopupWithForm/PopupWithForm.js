function PopupWithForm(props) {
  function handleSubmit(e) {
    e.preventDefault();
    if (props.useFormObj.isValid) {
      props.action(
        e,
        props.useFormObj.values.email,
        props.useFormObj.values.password,
        props.useFormObj.values.username||null
        );
      props.useFormObj.resetForm();
    }
  }

  return (
    <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="button popup__close-button"
          aria-label="close button"
          onClick={props.onClose}
        ></button>
        <form className={`popup__form popup__form_type_${props.name}`} onSubmit={handleSubmit}>
          <h2 className="popup__title">{`${props.title}`}</h2>
          {props.children}
          <button type={props.useFormObj.isValid ? "submit" : "button"} name="submit"
              className={`popup__button ${props.useFormObj.isValid ? '' : 'popup__button_disabled'}`}>
              {props.buttonText}
          </button>
          <p className="popup__link" onClick={props.onLinkClick}>
            or <span className="popup__link_blue">
                {props.textLink}
               </span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
