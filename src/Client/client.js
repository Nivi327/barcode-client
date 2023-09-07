import axios from 'axios';

const baseURL = 'https://barcode-generator-client.onrender.com/api/posts';

const client = axios.create({
    baseURL: baseURL
});

export default client;