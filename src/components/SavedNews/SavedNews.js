import SavedNewsCard from "../SavedNewsCard/SavedNewsCard";

function SavedNews(props) {
    return (
        <section className="news-card-list">
            <div className='news-card-list__content'>
                <ul className="news-card-list__cards-grid">
                {
                    props.cards.map((card, ind) => {
                        return(<SavedNewsCard 
                                    card={card} 
                                    key={ind} 
                                    onDeleteButtonClick={(e) => props.onDeleteButtonClick(card)}
                                />)
                    })
                }
                </ul>
            </div>
        </section>
    );
}

export default SavedNews;