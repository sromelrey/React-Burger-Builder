import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-burger-86749.firebaseio.com/'
})

export default instance;