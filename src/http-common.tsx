import axios from 'axios';

export default axios.create({
    baseURL: 'http://challenge.radlena.com/api/v1',
    headers: {
        'Content-type': 'application/json'
    }
});
