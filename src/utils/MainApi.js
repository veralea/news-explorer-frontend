import moment from "moment";

class MainApi {
  constructor (options){
    this._baseUrl = options.baseUrl;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getAllArticles(token) {
    if(token){
      return fetch(`${this._baseUrl}/articles`,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
      }).then(res => this._getResponseData(res));
    }
  }

  saveCard(cardData,keyword,token) {

    return fetch(`${this._baseUrl}/articles`,{
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
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

  deleteCard(id, token) {
    return fetch(`${this._baseUrl}/articles/${id}`,{
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }).then(res => this._getResponseData(res));
  }

}

const mainApi  = new MainApi({
  baseUrl: "https://api.vera-news-explorer.students.nomoreparties.sbs",
});


export default mainApi;
