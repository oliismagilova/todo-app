import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://9cxlt1wgo5.execute-api.us-east-1.amazonaws.com/api',
    timeout: 5000,
    headers: {
        Authorization:'basic f5a74a75-fbcb-44dc-a8aa-9b46ca97a28b'
    }
});

export default instance; 