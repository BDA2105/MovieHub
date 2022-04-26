const cookieStorage = {
    getItem: (key) => {
        const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: value}), {});
        return cookies[key];
    },
    setItem(key, value) {
        document.cookie = `${key}=${value}`
    },
};
//написали геттер и сеттер для файлов куки


const nameProp = 'name'
const emailProp = 'email'
const countryProp = 'country'
//переменные для ключей к куки


function recordName () {
cookieStorage.setItem(nameProp,document.getElementById('name').value);
cookieStorage.setItem(emailProp,document.getElementById('email').value);
cookieStorage.setItem(countryProp,document.getElementById('country').value);
cookieStorage.setItem('pastTime',cookieStorage.getItem('time'))
cookieStorage.setItem('time',dateTime)
}
//функция записывает данные пользователя при нажатии Сабмит

let dateTime = Date();