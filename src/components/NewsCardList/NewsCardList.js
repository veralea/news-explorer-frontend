import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
    const [quantityCards , setQuantityCards] = useState(Math.min(3,props.cards.length));
    const [showMoreButtonClassName, setShowMoreButtonClassName] = useState("news-card__show-more-button");
    
    function showMore() {
        if (props.cards.length > quantityCards) {
            let currQuantityCards = Math.min(quantityCards + 3, props.cards.length);
            setQuantityCards(currQuantityCards);
            if (currQuantityCards === props.cards.length) {
                setShowMoreButtonClassName("news-card__show-more-button news-card__show-more-button_disable");
            }
        }
    }

    return (        
        <section className='news-card-list'>        
            <div className='news-card-list__content'>
                <h2 className="news-card-list__title">Search results</h2>
                <ul className="news-card-list__cards-grid">
                    {
                        props.cards.slice(0,quantityCards).map((card, ind) => {
                            return(<NewsCard 
                                        card={card} 
                                        key={ind} 
                                        isLogged={props.isLogged}
                                        onSaveButtonClick={(e) => props.onSaveButtonClick(card)}
                                        onDeleteButtonClick={(e) => props.onDeleteButtonClick(card)}
                                        savedCards={props.savedCards}
                                        isSaved={props.links.some(i => i === card.url)}
                                    />)
                        })
                    }
                </ul>
                <button className={showMoreButtonClassName} onClick={showMore}>
                    Show more
                </button>
            </div>
        </section>
    );
}

export default NewsCardList;