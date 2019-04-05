/*
    This is a static class to handle data from and to database.
    It is based on CRUD principle.
*/
class apiClass {
     static statusCheck = async () => {
        let res = fetch(`http://localhost:9000/users`)
        return res;
    }

    static getUser = async (email, password) => {
        const options = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        return await fetch(`http://localhost:9000/users/login`, options)
            .then(res => res.json())
            .catch(err => console.log(err));
    }

    static resetPass = async (id) => {
        return await fetch(`http://localhost:9000/users/${id}`)
            .then(res => res.json())
            .catch(err => err);
    }

    static createUser = async (username, email, password) => {
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
            }),
        };
        console.log(options);
        return await fetch(`http://localhost:9000/users/create`, options)
            .then(res => res.json())
            .catch(err => console.log(err));
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