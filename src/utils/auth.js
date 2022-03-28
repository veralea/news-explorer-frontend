export const BASE_URL = 'https://api.veralea-news-explorer.students.nomoreparties.sbs';

function getResponseData(res) {
  if (!res.ok) {
    return res.json()
    .then((res) => {
      if (res.validation) {
        return Promise.reject(res.validation.body.message);
      }
      else if (res.message) {
        return Promise.reject(res.message);
      }
    })
  } 
  else {
    return res.json();
  }

}

export const register = (email, password, username) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password, name: username})
  })
   .then((res) => getResponseData(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`,{
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password}) 
  })
   .then((res) => 
      getResponseData(res)
 );
};

export const checkToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
      }
    })
    .then((res) => getResponseData(res));
} 