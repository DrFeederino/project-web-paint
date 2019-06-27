const URI = 'http://localhost:9000/';

class api {
  static getUser = async (email, password, data) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        data: {
          timestamp: new Date(),
          action: 'login',
          useragent: data.ua
        }
      })
    };
    return await fetch(`${URI}users/login`, options)
      .then(res => res.json())
      .catch(err => console.log(err));
  };

  static getHistory = async userId => {
    return await fetch(`${URI}history/${userId}`)
      .then(res => res.json())
      .catch(err => err.json());
  };

  static fetchUsers = async () => {
    return await fetch(`${URI}users/show`)
      .then(res => res.json())
      .catch(err => err);
  };

  static createUser = (username, email, password, data) => {
    console.log(data);
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
        timestamp: new Date(),
        data: {
          timestamp: new Date(),
          action: 'create',
          useragent: data.ua
        }
      })
    };
    return fetch(`${URI}users/create`, options)
      .then(res => (res.status !== 403 ? res.json() : res))
      .catch(err => err);
  };

  static deleteUser = async id => {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    };
    return await fetch(`${URI}users/${id}/delete`, options)
      .then(res => res.json())
      .catch(err => console.log(err));
  };
}

export default api;
