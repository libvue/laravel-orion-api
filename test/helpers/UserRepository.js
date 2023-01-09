import LaravelOrionAPI from "../../src/LaravelOrionAPI";

class UserRepository extends LaravelOrionAPI {
    constructor() {
        super();
        this.baseURL = 'https://reqres.in/api/';
        this.path = 'users'
    }
}

export default new UserRepository();