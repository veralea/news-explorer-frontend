function Preloader(props) {
    return (
        <section className={props.sectionClassName}>
            <i className="preloader__circle-preloader"/>
            <p className="preloader__text">Searching for news...</p>
        </section>
    );
}

export default Preloader;