function ErrorSearch(props) {
  return (
    <section className={`preloader ${props.isOpen ? '' : 'preloader_hidden' }`}>
      <i className="error-search__icon"/>
      <h4 className="error-search__title">Nothing found</h4>
      <p className="preloader__text">
          {props.errorText}
      </p>
    </section>
  );
}

export default ErrorSearch;
