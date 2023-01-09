import { expect, test } from 'vitest';
import UserRepository from './helpers/UserRepository';

test('UserRepository.index() is working', async () => {
    let result = null;
    await UserRepository.index().then((data) => {
        result = data;
    });

    // Expect a status 200
    expect(result.status).toBe(200);
    expect(result.config.method).toBe('get');
    expect(result.config.url).toBe('users/');
    expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
});

test('UserRepository.show() is working', async () => {
    let result = null;
    await UserRepository.show(2).then((data) => {
        result = data;
    });

    // Expect a status 200
    expect(result.status).toBe(200);
    expect(result.config.method).toBe('get');
    expect(result.config.url).toBe('users/2');
    expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
});

test('UserRepository.store() is working', async () => {
    let result = null;
    await UserRepository.store({
        name: 'morpheus',
        job: 'leader',
    }).then((data) => {
        result = data;
    });

    // Expect a status 200
    expect(result.status).toBe(201);
    expect(result.config.method).toBe('post');
    expect(result.config.url).toBe('users');
    expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
});
