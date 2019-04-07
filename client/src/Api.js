/*
    This is a static class to handle data from and to database.
    It is based on CRUD principle.
*/
class apiClass {
     static statusCheck = async () => {
        return await fetch(`http://localhost:9000/users`)
            .then(res => res)
            .catch(err => err);
    }

    static getUser = async (email, password, data) => {
        const options = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                data: {
                    date: new Date(),
                    action: 'login',
                    os: data.os + ' ' + data.osVersion,
                    device: data.ua,
                }
            }),
        };
        return await fetch(`http://localhost:9000/users/login`, options)
            .then(res => res.json())
            .catch(err => err.json());
    }

    static getHistory = async (userId) => {
        return await fetch(`http://localhost:9000/history/${userId}`)
            .then(res => res.json())
            .catch(err => err.json())
    }

    static resetPass = async (email, data) => {
        const options = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                data: data,
            }),
        };
        return await fetch(`http://localhost:9000/users/reset}`, options)
            .then(res => res.json())
            .catch(err => err);
    }

    static createUser = async (username, email, password, data) => {
        console.log(data.os);        
        const options = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                createdAt: new Date(),
                data: {
                    date: new Date(),
                    action: 'create',
                    os: data.os + ' ' + data.osVersion,
                    device: data.ua,
                },
            }),
        };
        return await fetch(`http://localhost:9000/users/create`, options)
            .then(res => res.status !== 403 ? res.json() : res)
            .catch(err => err);
    }

    static deleteUser = async (id) => {
        const options = {
            method: 'DELETE',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        };
        return await fetch(`http://localhost:9000/users/${id}/delete`, options)
            .then(res => res.json())
            .catch(err => console.log(err));
    }
}

export default apiClass;