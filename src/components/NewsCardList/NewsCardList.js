import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
    const [quantityCards , setQuantityCards] = useState(Math.min(3,props.cards.length));
    
    function showMore() {
        if (props.cards.length > quantityCards) {
            setQuantityCards(Math.min(quantityCards + 3, props.cards.length));
        }
    }


    return (
        <section className="news-card-list">
            <div className='news-card-list__content'>
                <h2 className="news-card-list__title">Search results</h2>
                <ul className="news-card-list__cards-grid">
                    {
                        props.cards.slice(0,quantityCards).map((card, ind) => {
                            return(<NewsCard card={card} key={ind}/>)
                        })
                    }
                </ul>
                <button className="news-card__show-more-button" onClick={showMore}>
                    Show more
                </button>
            </div>
        </section>
    );
}

export default NewsCardList;