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
import cards from '../../utils/constants';

function App() {
  const [strKeywords, setStrKeywords] = useState(' ');
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  function handleSearchSubmit(tag) {
    alert(tag);
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
      <Header 
        onLoginButtonClick={handleLoginButtonClick}
        isLogged={isLogged}
      />
      <Switch>
        <Route exact path="/">
          <Main search={handleSearchSubmit}/>
          <Preloader />
          <ErrorSearch />
          <NewsCardList cards={cards}/>
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
    </div>
  );
}

export default App;
