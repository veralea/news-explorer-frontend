class MainApi {
    constructor (options){
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
//     _getResponseData(res) {
//       if (!res.ok) {
//           return Promise.reject(`Error: ${res.status}`);
//       }
//       return res.json();
//   }
  
//     getUserInfo() {
//       return fetch(`${this._baseUrl}/users/me`,{
//         headers: this._headers
//       }).then(res => this._getResponseData(res));
//     }
  
//     getCards() {
//       return fetch(`${this._baseUrl}/cards`,{
//         headers: this._headers
//       }).then(res => this._getResponseData(res));
//     }
  
    setUserInfo({ name, about }) {
      return fetch(`${this._baseUrl}/users/me`,{
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(res => this._getResponseData(res));
    }
  
    addNewCard({cardData}) {
      return fetch(`${this._baseUrl}/cards`,{
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: cardData.name,
          link: cardData.link
        })
      }).then(res => this._getResponseData(res));
    }
  
    deleteCard(id) {
     return fetch(`${this._baseUrl}/cards/${id}`,{
        method: "DELETE",
        headers: this._headers,
      }).then(res => this._getResponseData(res));
    }
  
    changeLikes(cardId, method) {
      return fetch (`${this._baseUrl}/cards/likes/${cardId}`,{
        method: method,
        headers: this._headers
      }).then(res => this._getResponseData(res));
    }
  
    setUserAvatar(avatar) {
      return fetch (`${this._baseUrl}/users/me/avatar`,{
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }).then(res => this._getResponseData(res));
    }
  }

  const mainApi = new MainApi({
    baseUrl: "https://api.veralea-news-explorer.students.nomoreparties.sbs",
    headers: {
    //   authorization: "79e7d2e5-160a-498a-95ef-9351a4cf4856",
      "Content-Type": "application/json"
    }
  }); 
  
  export default mainApi;