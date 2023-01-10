import { describe, expect, test } from 'vitest';
import UserRepository from '../test/helpers/UserRepository';

describe('All methods are working properly', () => {
    test('index', async () => {
        let result = null;
        await UserRepository.index().then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('search', async () => {
        let result = null;
        await UserRepository.search().then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('show', async () => {
        let result = null;
        await UserRepository.show(1).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store', async () => {
        let result = null;
        await UserRepository.store({
            name: 'morpheus',
            job: 'leader',
        }).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store multipart', async () => {
        let result = null;
        await UserRepository.store(
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        ).then((data) => {
            result = data;
        });

        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('update', async () => {
        let result = null;
        await UserRepository.update(1, {
            name: 'morpheus',
            job: 'leader',
        },).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('destroy', async () => {
        let result = null;
        await UserRepository.destroy(1).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore', async () => {
        let result = null;
        await UserRepository.batchStore([{
            name: 'morpheus',
            job: 'leader',
        }]).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore multipart', async () => {
        let result = null;
        await UserRepository.batchStore(
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        ).then((data) => {
            result = data;
        });
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdate', async () => {
        let result = null;
        await UserRepository.batchUpdate({ 1: {
            name: 'morpheus',
            job: 'leader',
        }}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroy', async () => {
        let result = null;
        await UserRepository.batchDestroy([1,2,3]).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('indexRelation', async () => {
        let result = null;
        await UserRepository.indexRelation(1, 'posts').then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation', async () => {
        let result = null;
        await UserRepository.searchRelation(1, 'posts').then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('showRelation', async () => {
        let result = null;
        await UserRepository.showRelation(1, 'posts', 1).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation', async () => {
        let result = null;
        await UserRepository.storeRelation(1, 'posts', {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation multipart', async () => {
        let result = null;
        await UserRepository.storeRelation(
            1,
            'posts',
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        ).then((data) => {
            result = data;
        });
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('updateRelation', async () => {
        let result = null;
        await UserRepository.updateRelation(1, 'posts', 1, {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('destroyRelation', async () => {
        let result = null;
        await UserRepository.destroyRelation(1, 'posts', 1).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('restoreRelation', async () => {
        let result = null;
        await UserRepository.restoreRelation(1, 'posts', 1).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/1/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation', async () => {
        let result = null;
        await UserRepository.batchStoreRelation(1, 'posts', []).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation multipart', async () => {
        let result = null;
        await UserRepository.batchStoreRelation(
            1,
            'posts',
            [],
            true
        ).then((data) => {
            result = data;
        });
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdateRelation', async () => {
        let result = null;
        await UserRepository.batchUpdateRelation(1, 'posts', []).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroyRelation', async () => {
        let result = null;
        await UserRepository.batchDestroyRelation(1, 'posts', []).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchRestoreRelation', async () => {
        let result = null;
        await UserRepository.batchRestoreRelation(1, 'posts').then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('sync', async () => {
        let result = null;
        await UserRepository.sync(1, 'posts', {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/sync');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('toggle', async () => {
        let result = null;
        await UserRepository.toggle(1, 'posts', {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/toggle');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('attach', async () => {
        let result = null;
        await UserRepository.attach(1, 'posts', {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/attach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('detach', async () => {
        let result = null;
        await UserRepository.detach(1, 'posts', {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/detach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('pivot', async () => {
        let result = null;
        await UserRepository.pivot(1, 'posts', 1, {}).then((data) => {
            result = data;
        });
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1/pivot');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('associate', async () => {
        let result = null;
        await UserRepository.associate(1, 'posts', 1).then((data) => {
            result = data;
        });
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/associate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('dissociate', async () => {
        let result = null;
        await UserRepository.dissociate(1, 'posts', 1).then((data) => {
            result = data;
        });
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1/dissociate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
});
