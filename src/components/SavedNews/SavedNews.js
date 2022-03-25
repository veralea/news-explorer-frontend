import SavedNewsCard from "../SavedNewsCard/SavedNewsCard";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";

function SavedNews(props) {  
    return (
      <>
        <SavedNewsHeader   
            quantitySavedCards={props.quantitySavedCards}
            strKeywords={props.strKeywords}
            token={props.token}
        />
        <section className="news-card-list">
            <div className='news-card-list__content'>
                <ul className="news-card-list__cards-grid">
                {
                    props.cards.map((card, ind) => {
                        return(
                        <SavedNewsCard 
                            card={card} 
                            key={ind} 
                            onDeleteButtonClick={(e) => props.onDeleteButtonClick(card)}
                        />
                        )
                    })
                }
                </ul>
            </div>
        </section> 
      </>  
    );
}

export default SavedNews;