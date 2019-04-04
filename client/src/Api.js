/*
    This is a static class to handle data from and to database.
    It is based on CRUD principle.
*/
class apiClass {
     static statusCheck = async () => {
        return await fetch(`http://localhost:9000/`)
            .then(res => res)
            .catch(e => "OOPS");
    }

    static getUser = async (email, password) => {
        return await fetch(`http://localhost:9000/login`)
            .then(res => JSON.parse(res))
            .catch(err => err);
    }

    static resetPass = async (email) => {
        return await fetch(`http://localhost:9000/reset`)
            .then(res => JSON.parse(res))
            .catch(err => err);
    }
    static createUser = async (username, email, password) => {
        const options = {
            method: "post",
            headers: { 'Content-type' : 'application/json'},
            body: {
                username: username,
                email: email,
                password: password,
            }
        };
        return await fetch(`http://localhost:9000/create`, options)
            .then(res => JSON.parse(res))
            .catch(err => err);
    }
}

export default apiClass;