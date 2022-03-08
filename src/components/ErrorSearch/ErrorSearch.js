function ErrorSearch(props) {
    return (
        <section className={props.sectionClassName}>
            <i className="error-search__icon"/>
            <h4 className="error-search__title">Nothing found</h4>
            <p className="preloader__text">
                Sorry, but nothing matched your search terms.
            </p>
        </section>
    );
}

export default ErrorSearch;