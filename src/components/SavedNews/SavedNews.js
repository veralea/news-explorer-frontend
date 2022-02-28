import NewsCard from "../NewsCard/NewsCard";

function SavedNews(props) {
    return (
        <section className="news-card-list">
            <div className='news-card-list__content'>
                <ul className="news-card-list__cards-grid">
                {
                    props.cards.map((card, ind) => {
                        return(<NewsCard card={card} key={ind}/>)
                    })
                }
                </ul>
            </div>
        </section>
    );
}

export default SavedNews;