import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import statCards from '../../utils/constants';
import newsApi from '../../utils/NewsApi';

function App() {
  const currentUser = localStorage.getItem('currentUser');

  const [strKeywords, setStrKeywords] = useState(' ');
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [cards, setCards] = useState(statCards);
  const [cardListClassName, setCardListClassName] = useState("news-card-list news-card-list_hidden");
  const [errorSearchClassName, setErrorSearchClassName] = useState("preloader preloader_hidden");
  const [preloaderClassName, setPreloaderClassName] = useState("preloader preloader_hidden");
  
  function handleSearchSubmit(tag) {
    setPreloaderClassName("preloader");
    newsApi.getNews(tag)
    .then(result => {
      setCards(result.articles);
      return result.articles;
    })
    .then( articles => {
      setPreloaderClassName("preloader preloader_hidden");
      if (articles.length > 0) {
        setCardListClassName("news-card-list");
      } else {
        setErrorSearchClassName("preloader");
      }
    })
    .catch((err) => console.log(err));
  }

  function closeAllPopups() {
    setIsSigninPopupOpen(false);
  }

  useEffect(() => {
    const keywords = cards.reduce((previousValue, item, index, array) => {
      const result = previousValue.find(el => {
        if (el) {
          return el.keyword === item.keyword;
        } else {
          return false;
        }
      });
      if (!result) {
        previousValue.push({keyword: item.keyword, count: 1})
      } else {
        previousValue[previousValue.indexOf(result)].count++;
      }      
      return previousValue.sort((a, b) => a.count < b.count ? 1 : -1);
    },[]);
    if (keywords.length > 3) {
      setStrKeywords(`${keywords[0].keyword}, ${keywords[1].keyword}, and ${keywords.length - 2} other`)
    } else {
      const str = keywords.reduce((previousValue, item) => {
        previousValue.push(item.keyword);
        return previousValue;
      },[]);
      setStrKeywords(str.join(", "));
    }    
  })

  function handleLoginButtonClick() {
    setIsSigninPopupOpen(true);
  }

  function handleLoginFormSubmit(e) {
    e.preventDefault();
    setIsLogged(true);
    setIsSigninPopupOpen(false);
  }

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape);  
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [])

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          onLoginButtonClick={handleLoginButtonClick}
          isLogged={isLogged}
        />
        <Switch>
          <Route exact path="/">
            <Main search={handleSearchSubmit}/>
            <Preloader 
              sectionClassName={preloaderClassName}
            />
            <ErrorSearch
              sectionClassName={errorSearchClassName}
            />
            <NewsCardList 
              cards={cards}
              sectionClassName={cardListClassName}
            /> 
            <About />         
          </Route> 
          <Route exact path="/saved-news">
            <SavedNewsHeader  
              name="Elise" 
              quantitySavedCards={cards.length}
              strKeywords={strKeywords}
            /> 
            <SavedNews cards={cards}/>
          </Route>         
        </Switch>
        <PopupWithForm 
                name='signin' 
                title='Sign in' 
                isOpen={isSigninPopupOpen}
                onClose={closeAllPopups}
                buttonText='Sign in'
                onSubmit={handleLoginFormSubmit}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
