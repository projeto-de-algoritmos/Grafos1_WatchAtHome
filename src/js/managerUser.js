const binId = '5eeeb5e62406353b2e09962b';
const secretKey = '$2b$10$jxow4GADDMrolpxvMGbFcOqDcqkAYAykopUHA6Obtp9i8z0si6n3u';
const url = `https://api.jsonbin.io/b/${binId}/latest`;

export class ManagerUsers {
    constructor() {
        this._username;
        this._email;
        this._password;
        this._sex;
    }

    /**
     * @param {string} username
     */
    set username(username) {
        try {
            if (username !== '' && username !== null)
                this._username = username;
            else 
                throw {
                    name: 'Campo em branco',
                    message: 'O nome do usuário não pode ficar em branco.'
                }
            for (let i = 0; i < username.length; i++)
                if (username.charCodeAt(i) >= 48 || username.charCodeAt(i) <= 57)
                    throw {
                        name: 'Caracters inválidos',
                        message: 'O nome do usuário não pode conter números.'
                    }
        } catch (error) {
            return error;
        }
    }

    set email(email) {
        try {
            if (email !== '' && email !== null)
                this._email = email;
            else 
                throw {
                    name: 'Campo em branco',
                    message: 'O campo email não pode ficar em branco.'
                }
        } catch (error) {
            return error;
        }
    }

    set password(password) {
        try {
            if (password !== '' && password !== null)
                this._password = password;
            else 
                throw {
                    name: 'Campo em branco',
                    message: 'O campo password não pode ficar em branco.'
                }
        } catch (error) {
            return error;
        }
    }

    set sex(sex) {
        try {
            if (sex !== '' && sex !== null)
                this._sex = sex;
            else 
                throw {
                    name: 'Campo em branco',
                    message: 'O campo sex não pode ficar em branco.'
                }
        } catch (error) {
            return error;
        }
    }

    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }

    get sex() {
        return this._sex;
    }

    render() {

    }

    registerHandlers(event) {

    }

    //Capturar dados do form, validá-los e fazer requisição para dar
    //update com novo usuário no JSON
    async createUser() {
        let users = this.readUsers().then(onfulfilled => onfulfilled)
            .catch(reject => console.log(reject));

        let newUsers = [{
            username: this._username,
            password: this._password,
            email: this._email,
            sex: this._sex
        }];

        for (let item of await users) {
            newUsers.push(item);
        }

        console.log(await newUsers);

    }

    readUsers() {
        const requestUsers = () => {
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();

                xhr.responseType = 'json';

                xhr.onload = () => {
                    if (xhr.status === 200)
                        resolve(xhr.response);
                    else 
                        reject('Something went wrong!');
                }

                xhr.open('GET', url);
                xhr.setRequestHeader('secret-key', secretKey);
                xhr.send();
            }) 
        }

        return requestUsers();
    }

    readUser() {

    }

    updateUser() {

    }

    deleteUser() {

    }

    validateUser() {

    }
}