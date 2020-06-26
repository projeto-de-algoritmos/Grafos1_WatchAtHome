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
                if (username.charCodeAt(i) >= 48 && username.charCodeAt(i) <= 57)
                    throw {
                        name: 'Caracters inválidos',
                        message: 'O nome do usuário não pode conter números.'
                    }
        } catch (error) {
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
            console.log(error);
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
    createUser() {

        this.validateUser({
            username: this._username,
            email: this._email,
            password: this._password,
            sex: this._sex
        }).then(async onfulfilled => {
            console.log(onfulfilled);

            let newUsers = [{
                username: this._username,
                email: this._email,
                password: this._password,
                sex: this._sex
            }];

            let users = this.readUsers().then(onfulfilled => onfulfilled)
            .catch(reject => console.log(reject));

            for (let item of await users) {
                newUsers.push(item);
            }

            console.log(await newUsers);

            let data = JSON.stringify(newUsers);

            try {
                const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
                    method: 'PUT', headers: { 
                        'secret-key': secretKey,
                        'Content-Type': 'application/json'
                    }, body: data
                });
            } catch (error) {
                console.log(error);
            }

        }).catch(onrejected => console.log(`${onrejected.name}\n${onrejected.message}`));

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

    async readUser() {
        let searchedUser = {
            email: this._email,
        };

        let users = this.readUsers().then(onfulfilled => onfulfilled)
            .catch(onrejected => console.error(onrejected));

        try {
            for (let item of await users)
                for (let key in item) {
                    if (item[key] === searchedUser.email) {
                        return item;
                    }
                }
            
            throw {
                name: 'Unknown user',
                message: 'This user doesn\'t exist!'
            }

        } catch(error) {
            console.error(error);
        }
    }

    updateUser() {
        
    }

    deleteUser() {

    }

    async validateUser(user) {
        let users = this.readUsers().then(onfulfilled => onfulfilled)
            .catch(reject => console.log(reject));
        
        return new Promise(async (resolve, reject) => {

            for (let item of await users) {
                for (let key in item) {
                    if (this.username == item[key])
                        return reject({ name: 'Username', message: 'This username already was choosen!'});
                    else if (this.email == item[key])
                        return reject({ name: 'Email', message: 'This email is already in use!' });
                    else if (this.password == item[key])
                        return reject({name: 'Password', message: 'This password already exist!' });
                }
            }

            return resolve('Wait a moment...');
        });
    }

    async signin() {
        this.readUser().then(user => {
            try {
                if (user.password === this.password) {
                    this.username = user.username;
                    this.sex = user.sex;
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isLogged', 'true');
                } else {
                    throw {
                        name: 'Invalid password',
                        message: 'Your password is wrong!'
                    }
                }
            } catch(error) {
                console.error(error);
            }
        }).catch(onrejected => console.log(onrejected));
            
    }
}