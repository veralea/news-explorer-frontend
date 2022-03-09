import { useContext } from 'react'; 
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <article className="saved-news-header">
            <div className="saved-news-heder__content">
                <p className="saved-news-heder__page-name">Saved articles</p> 
                <h1 className="saved-news-heder__title">
                {currentUser.name}, you have {props.quantitySavedCards} saved articles
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