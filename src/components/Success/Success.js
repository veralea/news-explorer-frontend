function Success(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          className="button popup__close-button"
          aria-label="close button"
          onClick={props.onClose}
        ></button>
        <form className={`popup__form popup__form_type_${props.name}`}>
          <h2 className="popup__title">{`${props.title}`}</h2>
          <p className="popup__link" onClick={props.onSigninLinkSuccessClick}>
            <span className="popup__link_blue">Sign in</span>
          </p>
        </form>
      </div>
    </section>

  );
}

export default Success;
