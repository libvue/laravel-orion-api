import LaravelOrionAPI from "../../src/LaravelOrionAPI.js";

class UserRepository extends LaravelOrionAPI {
    constructor(withDelay = false) {
        super();
        this.baseURL = 'https://reqres.in/api';
        this.path = 'users';
        
        if(withDelay) {
            // Fake Timeout
            this.axios.interceptors.response.use(async (response) => {
                await (new Promise((resolve) => setTimeout(resolve, 10000)));
                return response;
            })
        }
        
    }
}

export default UserRepository;