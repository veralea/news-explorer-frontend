import './App.css';
import { useState, useEffect, useCallback } from 'react';
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
import Register from '../Register/Register'
import Success from '../Success/Success'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../UseForm/UseForm';
import statCards from '../../utils/constants';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';

function App() {
  const token = localStorage.getItem('token'); 

  const [strKeywords, setStrKeywords] = useState(' ');
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [isErrorSearchOpen, setIsErrorSearchOpen] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isCardListOpen, setIsCardListOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(false);
  const [cards, setCards] = useState(statCards);
  const [isErrorSubmitVisibled, setIsErrorSubmitVisibled] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentKeyword, setCurrentKeyword] = useState(''); 
  const [savedCards, setSavedCards] = useState([])
  
  function handleSaveButtonClick(card) {
    mainApi.saveCard(card, currentKeyword)
    .then(() => {
      mainApi.getAllArticles()
      .then((result) => {
        setSavedCards(result);
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }

  function handleDeleteButtonClick(card) {
    mainApi.deleteCard(card._id)
    .then(() => {
      mainApi.getAllArticles()
      .then((result) => {
        setSavedCards(result);
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  }


  
  function handleSearchSubmit(tag) {
    setCurrentKeyword(tag);
    setIsCardListOpen(false);
    setIsErrorSearchOpen(false);
    setIsPreloaderOpen(true);
    newsApi.getNews(tag)
    .then(result => {
      setCards(result.articles);
      return result.articles;
    })
    .then( articles => {
      setIsPreloaderOpen(false);
      if (articles.length > 0) {
        setIsCardListOpen(true);
      } else {
        setIsErrorSearchOpen(true);
        setErrorText('Sorry, but nothing matched your search terms.');
      }
    })
    .catch((err) => {
      setIsPreloaderOpen(false);
      setIsErrorSearchOpen(true);
      setErrorText('Sorry, something went wrong during the request. There may be a connection issue'
      +' or the server may be down. Please try again later.');
      console.log(err);
    });
  }

  function closeAllPopups() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(false);
  }

  useEffect(() => {
    const keywords = savedCards.reduce((previousValue, item, index, array) => {
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

  function handleLogoutButtonClick() {
    setIsLogged(false);
    localStorage.removeItem('token');
  }

  function handleLoginFormSubmit(e,email, password) {
    e.preventDefault();
    setIsErrorSubmitVisibled(false);  
    auth.authorize(email, password)
    .then((res) => {
      console.log(res.token); 
      localStorage.setItem('token', res.token);
      setIsLogged(true);
      setIsSigninPopupOpen(false);
      setIsErrorSubmitVisibled(false);
      return res;
    })
    .then((res) => {
      auth.getContent(res.token)
      .then((res) => {
        setCurrentUser(res);
        setIsLogged(true);
      })
    })
    .catch((err) => {
      setIsErrorSubmitVisibled(true);
      setErrorText(err);
      setIsLogged(false);
    });
  }

  function handleLogupFormSubmit(e, email, password, username) {
    e.preventDefault();
    setIsErrorSubmitVisibled(false);
    auth.register(email, password, username).then((res) => {
      setIsSignupPopupOpen(false);
      setIsSuccessPopupOpen(true);
      setIsErrorSubmitVisibled(false);
    })
    .catch((err) => {
      setIsErrorSubmitVisibled(true);
      setErrorText(err);
    });
  }

  function handleSignupLinkClick(e) {
    e.preventDefault();
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(true);
    setIsErrorSubmitVisibled(false);
  }
  
  function handleSigninLinkClick(e) {
    e.preventDefault();
    setIsSigninPopupOpen(true);
    setIsSignupPopupOpen(false);
  }

  function handleSigninLinkSuccessClick(e) {
    e.preventDefault();
    setIsSigninPopupOpen(true);
    setIsSuccessPopupOpen(false);
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

  useEffect(() => {
    if (token) {   
      auth.getContent(token)
      .then((res) => {
        setCurrentUser(res);
        setIsLogged(true);
      })
      .catch((err) => {
        console.log(err);
       });
    } else {
      setIsLogged(false);
    }
  },[]);

  useEffect(() => {
    mainApi.getAllArticles()
    .then((result) => {
      setSavedCards(result);
    })
    .catch((err) => console.log(err));
  },[]);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header 
          onLoginButtonClick={handleLoginButtonClick}
          onLogoutButtonClick={handleLogoutButtonClick}
          isLogged={isLogged}
        />
        <Switch>
          <Route exact path="/">
            <Main search={handleSearchSubmit}/>
            <Preloader 
              isOpen={isPreloaderOpen}
            />
            <ErrorSearch
              errorText={errorText}
              isOpen={isErrorSearchOpen}
            />
            <NewsCardList 
              cards={cards}
              isOpen={isCardListOpen}
              isLogged={isLogged}
              onSaveButtonClick={handleSaveButtonClick}
            /> 
            <About />         
          </Route> 
          <Route exact path="/saved-news">
            <SavedNewsHeader   
              quantitySavedCards={savedCards.length}
              strKeywords={strKeywords}
            /> 
            <SavedNews cards={savedCards} onDeleteButtonClick={handleDeleteButtonClick}/>
          </Route>         
        </Switch>
        <PopupWithForm 
                name='signin' 
                title='Sign in' 
                isOpen={isSigninPopupOpen}
                onClose={closeAllPopups}
                buttonText='Sign in'
                onSignupLinkClick={handleSignupLinkClick}
                login={handleLoginFormSubmit}
                useForm={useFormWithValidation}
                isErrorSubmitVisibled = {isErrorSubmitVisibled}
                errorText = {errorText}
        />
        <Register 
                name='signup' 
                title='Sign up' 
                isOpen={isSignupPopupOpen}
                onClose={closeAllPopups}
                buttonText='Sign up'
                onSigninLinkClick={handleSigninLinkClick}
                register={handleLogupFormSubmit}
                useForm={useFormWithValidation}
                isErrorSubmitVisibled = {isErrorSubmitVisibled}
                errorText = {errorText}
        />
        <Success
          name='success' 
          title='Registration successfully completed!'
          isOpen={isSuccessPopupOpen}
          onClose={closeAllPopups}
          onSigninLinkSuccessClick={handleSigninLinkSuccessClick}
        />
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
