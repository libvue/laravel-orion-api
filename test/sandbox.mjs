import UserRepository from "./repositories/SandboxRepository.js";

const UserRepositoryInstance = new UserRepository();

/**
 * Test Auto Abort
 */

// First Call
UserRepositoryInstance.withoutAutoAbort().index().then((response) => {
    console.log(response.status)
}).catch((e) => {
    console.log(e.code);
});
// Second call
UserRepositoryInstance.withoutAutoAbort().index().then((response) => {
    console.log(response.status)
}).catch((e) => {
    console.log(e.code);
});
// Third Call
UserRepositoryInstance.withoutAutoAbort().index().then((response) => {
    console.log(response.status);
}).catch((e) => {
    console.log(e.code);
});
// Fourth Call
UserRepositoryInstance.withAbortId('other-purpose').index().then((response) => {
    console.log(response.status);
}).catch((e) => {
    console.log(e.code);
});
//UserRepository.abort('hello');
