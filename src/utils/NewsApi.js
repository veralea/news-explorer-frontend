class NewsApi {
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

  getNews(keyword) {
    let to = new Date();
    let from = new Date();
    from.setDate(to.getDate() - 7); 
    return fetch(`${this._baseUrl}?q=${keyword}&apiKey=329219e562bc478091bfd06a12801fe9`
    +`&from=${from.toISOString().split('T')[0]}&to=${to.toISOString().split('T')[0]}&pageSize=5`)
    .then(res => this._getResponseData(res));
  } 

}

const newsApi = new NewsApi({
  baseUrl: "https://newsapi.org/v2/everything",
}); 
  
export default newsApi;