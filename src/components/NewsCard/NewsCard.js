function NewsCard(props) {
    return (
        <li className="news-card">
            <div 
                className="news-card__picture" 
                style={{ backgroundImage: `url(${props.card.image})` }}
            >    
            </div>
            <div className="news-card__wrop">
                <p className="news-card__date">{props.card.date}</p>
                <h4 className="news-card__title">{props.card.title}</h4>
                <p className="news-card__text">{props.card.text}</p>
                <p className="news-card__source">{props.card.source}</p>
            </div>
            <div className={window.location.href.includes("/saved-news") 
                    ? "news-card__bage news-card__like_hidden" 
                    : "news-card__bage news-card__like"}>
            </div>
            <div className="news-card__bage news-card__tooltip">
                Sign in to save articles
            </div>
            <div className={window.location.href.includes("/saved-news") 
                    ? "news-card__bage news-card__delete" 
                    : "news-card__bage news-card__delete_hidden"}>
            </div>
            <div className={window.location.href.includes("/saved-news") 
                    ? "news-card__bage news-card__keyword" 
                    : "news-card__bage news-card__keyword_hidden"}>
                {props.card.keyword}
            </div>
            <div className="news-card__bage news-card__tooltip_delete">
                Remove from saved
            </div>
        </li>    
    );
}

export default NewsCard;