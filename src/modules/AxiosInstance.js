import axios from 'axios';

export default class AxiosInstance {
    constructor(AxiosConfig) {
        this.axios = axios.create({
            ...axios.defaults,
            ...AxiosConfig,
        });
    }
}

export {
    axios
}
