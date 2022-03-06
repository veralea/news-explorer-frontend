function SavedNewsHeader(props) {

    return (
        <article className="saved-news-header">
            <div className="saved-news-heder__content">
                <p className="saved-news-heder__page-name">Saved articles</p> 
                <h1 className="saved-news-heder__title">
                    {props.name}, you have {props.quantitySavedCards} saved articles
                </h1>
                <p className="saved-news-heder__keywords">
                    By keywords:  
                    <span className="saved-news-heder__keywords-list">
                        {props.strKeywords}
                    </span>
                </p> 
            </div>
        </article>
    );
}

export default SavedNewsHeader;