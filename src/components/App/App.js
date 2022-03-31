import './App.css';
import { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NewsCardList from '../NewsCardList/NewsCardList';
import ErrorSearch from '../ErrorSearch/ErrorSearch';
import Login from '../Login/Login';
import Register from '../Register/Register'
import Success from '../Success/Success'
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import newsApi from '../../utils/NewsApi';
import mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() { 
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [strKeywords, setStrKeywords] = useState(' ');
  const [isSigninPopupOpen, setIsSigninPopupOpen] = useState(false);
  const [isSignupPopupOpen, setIsSignupPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState(false);
  const [isErrorSearchOpen, setIsErrorSearchOpen] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [isCardListOpen, setIsCardListOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(localStorage.getItem('token')  ? true : false);
  const [cards, setCards] = useState([]);
  const [isErrorSubmitVisibled, setIsErrorSubmitVisibled] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [currentKeyword, setCurrentKeyword] = useState(''); 
  const [savedCards, setSavedCards] = useState([]);
  const [links, setLinks] = useState([]);
  
  function closeAllPopups() {
    setIsSigninPopupOpen(false);
    setIsSignupPopupOpen(false);
    setIsSuccessPopupOpen(false);
    setErrorText("");
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
  
  function getSavedAtricles(tok) {
    if (tok) {
      mainApi.getAllArticles(tok)
      .then((res) => {
        setSavedCards(res);
      })
      .catch((err) => console.log(err))
    }
  }

  function handleLogupFormSubmit(e, email, password, username) {
    e.preventDefault();
    setIsErrorSubmitVisibled(false);
    auth.register(email, password, username).then((res) => {
      setIsSignupPopupOpen(false);
      setIsSuccessPopupOpen(true);
      setIsErrorSubmitVisibled(false);
      setErrorText("");
    })
    .catch((err) => {
      setIsErrorSubmitVisibled(true);
      setErrorText(err);
    });
  } 

  function handleLoginFormSubmit(e,email, password) {
    e.preventDefault();
    setIsErrorSubmitVisibled(false);
    if(!token) {
      auth.authorize(email, password)
      .then((res) => {
        setToken(res.token);
        localStorage.setItem("token", res.token);
        setIsSigninPopupOpen(false);
        setIsErrorSubmitVisibled(false);        
        return res.token;
      })
      .then((tok) => {
        auth.checkToken(tok)
        .then((res) => {
          setCurrentUser(res);
          setIsLogged(true);
          getSavedAtricles(tok);
          setErrorText("");         
        })
        .catch((err) => console.log(err))
      })
      .catch((err) => {
      setIsErrorSubmitVisibled(true);
      setErrorText(err);
      setIsLogged(false);
    });
    }
  }

  function handleLoginButtonClick() {
    setIsSigninPopupOpen(true);
  }

  function handleLogoutButtonClick() {
    localStorage.removeItem("token");
    setToken(null);
    setIsLogged(false);
    setCurrentUser({});
    setSavedCards([]);
    setStrKeywords(" ");
    setLinks([]);
  }

  function handleDeleteButtonClick(card) {
    let id = '';
    if (token) {    
      if(card._id){
        id = card._id;
      } 
      else if (savedCards.find(i => i.link === card.url)) {
        id = savedCards.find(i => i.link === card.url)._id;
      } 
      mainApi.deleteCard(id, token)
      .then(() => {
        getSavedAtricles(token);
      })
      .catch((err) => console.log(err)); 
    }
  }

  function handleSaveButtonClick(card) {
    mainApi.saveCard(card, currentKeyword, token)
    .then(() => {
      getSavedAtricles(token);
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
    });
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
    if(token){
      auth.checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          setIsLogged(true);
          getSavedAtricles(token);
        })
        .catch((err) => console.log(err)); 
    }    
  },[token]);

  useEffect(() => {
    const keywords = savedCards.reduce((previousValue, item) => {
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
      setStrKeywords(` ${keywords[0].keyword}, ${keywords[1].keyword}, and ${keywords.length - 2} other`)
    } else {
      const str = keywords.reduce((previousValue, item) => {
        previousValue.push(item.keyword);
        return previousValue;
      },[]);
      setStrKeywords(" "+str.join(", "));
    }    
  },[savedCards])

  useEffect(() => {
    if (savedCards.length > 0) {
      const currLinks = savedCards.reduce((previousValue, item) => {
        previousValue.push(item.link);
        return previousValue;
      },[]);
      setLinks(currLinks);
    }  
  },[savedCards]); 

  return (
    <div className="page">
      {/* <CurrentUserContext.Provider value={currentUser}>
        <Header 
          onLoginButtonClick={handleLoginButtonClick}
          onLogoutButtonClick={handleLogoutButtonClick}
          isLogged={isLogged}
        />
        <Main search={handleSearchSubmit}/>
        <Preloader 
          isOpen={isPreloaderOpen}
        />
        <ErrorSearch
          errorText={errorText}
          isOpen={isErrorSearchOpen}
        />
        {isCardListOpen ? 
        <NewsCardList 
          cards={cards} 
          isLogged={isLogged}
          onSaveButtonClick={handleSaveButtonClick}
          onDeleteButtonClick={handleDeleteButtonClick}
          savedCards={savedCards} 
          links={links}           
        /> : <div></div>
        }
        <SavedNews
            name={currentUser.name}
            isLogged={isLogged}            
            cards={savedCards}
            quantitySavedCards={savedCards.length}
            onDeleteButtonClick={handleDeleteButtonClick}
            strKeywords={strKeywords}
        />            
        <div>Token {token}</div>
        <div>localStorage token {localStorage.getItem("token")}</div>
        <div>isLogged {isLogged.toString()}</div>
        <div>Name {currentUser.name}</div>
        <div>SavedNews {savedCards.length}</div>
        <div>strKeywords {strKeywords}</div>
        <div>currentKeyword {currentKeyword}</div>
        <div>Links {links.join(", ")}</div>
        <div>Saved cards {savedCards.length > 0 ? savedCards[0]._id : " "} </div>
        <button onClick={handleLogoutButtonClick}>Log out</button>
        <button onClick={handleLoginFormSubmit}>Log in</button>
        <button onClick={handleDeleteButtonClick}>Delete card</button>
        <button onClick={handleSaveButtonClick}>Save card</button>
        <Login 
          name='signin'  
          isOpen={isSigninPopupOpen}
          onClose={closeAllPopups}
          onLinkClick={handleSignupLinkClick}
          action={handleLoginFormSubmit}
          isErrorSubmitVisibled = {isErrorSubmitVisibled}
          errorText = {errorText}
        />
        <Register 
          name='signup'  
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          onLinkClick={handleSigninLinkClick}
          action={handleLogupFormSubmit}
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
      </CurrentUserContext.Provider> */}
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
            {isCardListOpen ? 
            <NewsCardList 
              cards={cards} 
              isLogged={isLogged}
              onSaveButtonClick={handleSaveButtonClick}
              onDeleteButtonClick={handleDeleteButtonClick}
              savedCards={savedCards} 
              links={links}           
            /> : <div></div>
            }
            <About />         
          </Route>
          <ProtectedRoute
              exact
              path="/saved-news" 
              isLogged={isLogged}            
              cards={savedCards}
              quantitySavedCards={savedCards.length}
              onDeleteButtonClick={handleDeleteButtonClick}
              strKeywords={strKeywords}
              component={SavedNews}
              token={token}
          /> 
        </Switch>
        <Login 
          name='signin'  
          isOpen={isSigninPopupOpen}
          onClose={closeAllPopups}
          onLinkClick={handleSignupLinkClick}
          action={handleLoginFormSubmit}
          isErrorSubmitVisibled = {isErrorSubmitVisibled}
          errorText = {errorText}
        />
        <Register 
          name='signup'  
          isOpen={isSignupPopupOpen}
          onClose={closeAllPopups}
          onLinkClick={handleSigninLinkClick}
          action={handleLogupFormSubmit}
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
