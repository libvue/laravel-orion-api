import UserRepository from "./repositories/SandboxRepository.js";

const UserRepositoryInstance = new UserRepository();

/**
 * Test Auto Abort
 */

// First Call
UserRepositoryInstance.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Second call
UserRepositoryInstance.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Third Call
UserRepositoryInstance.withAbortId('other-purpose').index().catch((e) => {
    console.log(e.code);                    // ERR_CANCELED
});
// Fourth Call
UserRepositoryInstance.withAbortId('other-purpose').index().then((result) => {
    console.log(result.status);             // 200
});

//UserRepository.abort('hello');
