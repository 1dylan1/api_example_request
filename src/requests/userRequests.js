import axios from 'axios';
import urls from './config';

const getUserPath = "/api/user/";

class userRequests {

    getUser(id) {
        return axios.get(urls.getURL() + id );
    }
}

export default new userRequests();