import moment from "moment";

function NewsCard(props) {
    function formatDate(dateString) {
        const date = moment(dateString).format('MMMM DD, YYYY')
        return date;
    }

    function handleSaveClick() {
        props.onSaveButtonClick();
    }
    
    return (
        <li className="news-card">
          <a className="news-card__link"                         
            href={props.card.url}
            target="_blank"
            rel="noopener noreferrer"
          >    
            <div 
                className="news-card__picture" 
                style={{ backgroundImage: `url(${props.card.urlToImage})` }}
            >    
            </div>
            <div className="news-card__wrop">
                <p className="news-card__date">{formatDate(props.card.publishedAt)}</p>
                <h4 className="news-card__title">{props.card.title}</h4>
                <p className="news-card__text">{props.card.content}</p>
                <p className="news-card__source">{props.card.source.name}</p>
            </div>
          </a>  
          <div className={`news-card__bage news-card__like ${props.isLogged 
                    ? 'news-card__like_active' 
                    : 'news-card__like_unactive'}`}
                onClick={handleSaveClick}    
          >
          </div>
          <div className="news-card__bage news-card__tooltip">
              Sign in to save articles
          </div>
        </li>    
    );
}

export default NewsCard;