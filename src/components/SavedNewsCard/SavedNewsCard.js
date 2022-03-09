function SavedNewsCard(props) {
  function handleDeleteClick() {
    props.onDeleteButtonClick();
}  
  
  return (
        <li className="news-card">
          <a className="news-card__link"                         
            href={props.card.link}
            target="_blank"
            rel="noopener noreferrer"
          >    
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
          </a>  
          <div className="news-card__bage news-card__delete" onClick={handleDeleteClick}>
          </div>
          <div className="news-card__bage news-card__keyword">
              {props.card.keyword}
          </div>
          <div className="news-card__bage news-card__tooltip_delete">
              Remove from saved
          </div>
        </li>
    );
}

export default SavedNewsCard;