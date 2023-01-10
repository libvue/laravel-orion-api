import LaravelOrionAPI from "../../src/LaravelOrionAPI";

class UserRepository extends LaravelOrionAPI {
    constructor() {
        super();
        this.baseURL = 'https://endpoint.example/api';
        this.path = 'users'
    }
}

export default new UserRepository();