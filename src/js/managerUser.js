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
        } catch (errorObj) {
            console.log(toastr.warning(`${errorObj.name}\n${errorObj.message}`));
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
        } catch (errorObj) {
            console.log(toastr.warning(`${errorObj.name}\n${errorObj.message}`));
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
        } catch (errorObj) {
            console.log(toastr.warning(`${errorObj.name}\n${errorObj.message}`));
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
        } catch (errorObj) {
            console.log(toastr.warning(`${errorObj.name}\n${errorObj.message}`));
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

            let data = JSON.stringify(newUsers);

            try {
                const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
                    method: 'PUT', headers: { 
                        'secret-key': secretKey,
                        'Content-Type': 'application/json'
                    }, body: data
                });
                if (response.ok) {
                    toastr.success('User registered successfully!');
                    setTimeout(() => {location.reload()}, 1200);
                }
            } catch (error) {
                console.log(error);
                toastr.error('Intern error, try again later!');
            }

        }).catch(onrejected => {});

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
                        reject(toastr.error('Intern error, try again later!'));
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

        } catch(errorObj) {
            console.log(toastr.error(`${errorObj.name}\n${errorObj.message}`));
        }
    }

    async updateUser(user) {
        let usersUpdated = [];
        let userUpdated;
        let userEmailRecognized = JSON.parse(localStorage.getItem('user')).email;

        this.readUsers().then(async users => {
            for (let item of users)
                for (let key in item)
                    if (item[key] === userEmailRecognized) {
                        for (let copyKey in user) {
                            item[copyKey] = user[copyKey];
                        }
                        userUpdated = JSON.stringify(item);
                    }
            usersUpdated = JSON.stringify(users);
            
            try {
                const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
                    method: 'PUT', headers: { 
                        'Content-Type': 'application/json', 
                        'secret-key': secretKey 
                    },  
                    body: usersUpdated
                });
                if (response.ok) {
                    localStorage.setItem('user', userUpdated);
                    toastr.success('User updated successfully!');
                    setTimeout(() => {location.reload()}, 1000);
                }
            } catch(errorObj) {
                toastr.error(errorObj);
            }
        }).catch(onrejected => console.log(onrejected));


    }

    deleteUser() {
        let user = localStorage.getItem('user');

        this.readUsers().then(async users => {
            let index = users.filter((element, index) => {
                if (element.email === user.email) {
                    return index;
                }
            });

            users.splice(await index, 1);

            let usersUpdated = JSON.stringify(users);

            try {
                const response = await fetch(`https://api.jsonbin.io/b/${binId}`, {
                    method: 'PUT', headers: {
                        'Content-Type': 'application/json',
                        'secret-key': secretKey
                    }, body: usersUpdated
                });

                if (response.ok) {
                    console.log(response);
                    localStorage.setItem('isLogged', 'false');
                    localStorage.removeItem('user');
                    toastr.error('User deleted successfully!');
                    setTimeout(() => { location.reload() }, 1000);
                }
            } catch (errorObj) {
                console.log(toastr.error(`${errorObj.message}`));
            }
        }).catch(onrejected => console.log(onrejected));

    }

    async validateUser() {
        let users = this.readUsers().then(onfulfilled => onfulfilled)
            .catch(reject => console.log(reject));
        
        return new Promise(async (resolve, reject) => {

            for (let item of await users) {
                for (let key in item) {
                    if (this.username == item[key])
                        return reject(toastr.warning('This username already was choosen!'));
                    else if (this.email == item[key])
                        return reject(toastr.warning('This email is already in use!'));
                    else if (this.password == item[key])
                        return reject(toastr.warning('This password already exist!'));
                }
            }

            return resolve(toastr.info('Wait a moment we are checking your data...'));
        });
    }

    async signin() {
        return new Promise((resolve, reject) => {
            toastr.options = {
                "progressBar": true,
                "closeButton": true,
            }
            
            this.readUser().then(user => {
                if (user.password === this.password) {
                    this.username = user.username;
                    this.sex = user.sex;
    
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isLogged', 'true');
                    resolve(toastr.success('You are logged now!'));
                } else {
                    reject(toastr.error('Your password is invalid!'));
                }
            }).catch(onrejected => console.log(onrejected));
        });
    }
}