import moment from "moment";

class MainApi {
    constructor (options){
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }


  
    _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
  }
  
//     getUserInfo() {
//       return fetch(`${this._baseUrl}/users/me`,{
//         headers: this._headers
//       }).then(res => this._getResponseData(res));
//     }
  
    getAllArticles() {
      return fetch(`${this._baseUrl}/articles`,{
        headers: this._headers
      }).then(res => this._getResponseData(res));
    }
  
    // setUserInfo({ name, about }) {
    //   return fetch(`${this._baseUrl}/users/me`,{
    //     method: "PATCH",
    //     headers: this._headers,
    //     body: JSON.stringify({
    //       name: name,
    //       about: about
    //     })
    //   }).then(res => this._getResponseData(res));
    // }
  
    saveCard(cardData,keyword) {
      return fetch(`${this._baseUrl}/articles`,{
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          keyword: keyword,
          title: cardData.title,
          text: cardData.content,
          date: moment(cardData.publishedAt).format('MMMM DD, YYYY'),
          link: cardData.url,
          image: cardData.urlToImage,
          source: cardData.source.name,
        })
      }).then(res => this._getResponseData(res));
    }
  
    deleteCard(id) {
     return fetch(`${this._baseUrl}/articles/${id}`,{
        method: "DELETE",
        headers: this._headers,
      }).then(res => this._getResponseData(res));
    }
  
    // changeLikes(cardId, method) {
    //   return fetch (`${this._baseUrl}/cards/likes/${cardId}`,{
    //     method: method,
    //     headers: this._headers
    //   }).then(res => this._getResponseData(res));
    // }
  
  }

  
  const mainApi = new MainApi({
    baseUrl: "https://api.veralea-news-explorer.students.nomoreparties.sbs",
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json"
    }
  }); 
  
  export default mainApi;