import { describe, expect, test } from 'vitest';
import UserRepository from '../test/repositories/UserRepository.js';

const UserRepositoryInstance = new UserRepository();

describe('All methods are working properly', () => {
    test('index', async () => {
        const result = await UserRepositoryInstance.index();
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('index with_trashed', async () => {
        const result = await UserRepository.make().index({
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('index only_trashed', async () => {
        const result = await UserRepository.make().index({
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('search', async () => {
        const result = await UserRepository.make().search();
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('search with_trashed', async () => {
        const result = await UserRepository.make().search({
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('search only_trashed', async () => {
        const result = await UserRepository.make().search({
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('show', async () => {
        const result = await UserRepository.make().show(1);
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('show with_trashed', async () => {
        const result = await UserRepository.make().show(1, {
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('show only_trashed', async () => {
        const result = await UserRepository.make().show(1, {
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store', async () => {
        const result = await UserRepository.make().store({
            name: 'morpheus',
            job: 'leader',
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store multipart', async () => {
        const result = await UserRepository.make().store(
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        );

        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('update', async () => {
        const result = await UserRepository.make().update(1, {
            name: 'morpheus',
            job: 'leader',
        },);
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('update multipart with formData', async () => {
        const result = await UserRepository.make().update(1, new FormData(), true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('update multipart with object', async () => {
        const result = await UserRepository.make().update(1, {}, true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('destroy', async () => {
        const result = await UserRepository.make().destroy(1);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('restore', async () => {
        const result = await UserRepository.make().restore(1);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore', async () => {
        const result = await UserRepository.make().batchStore([{
            name: 'morpheus',
            job: 'leader',
        }]);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore multipart', async () => {
        const result = await UserRepository.make().batchStore(
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        );
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdate', async () => {
        const result = await UserRepository.make().batchUpdate({ 1: {
            name: 'morpheus',
            job: 'leader',
        }});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdate multipart with formData', async () => {
        const result = await UserRepository.make().batchUpdate(new FormData(), true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdate multipart with object', async () => {
        const result = await UserRepository.make().batchUpdate({}, true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroy', async () => {
        const result = await UserRepository.make().batchDestroy([1,2,3]);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchRestore', async () => {
        const result = await UserRepository.make().batchRestore([1,2,3]);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('indexRelation', async () => {
        const result = await UserRepository.make().indexRelation(1, 'posts');
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation', async () => {
        const result = await UserRepository.make().searchRelation(1, 'posts');
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation with_trashed', async () => {
        const result = await UserRepository.make().searchRelation(1, 'posts', {
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation only_trashed', async () => {
        const result = await UserRepository.make().searchRelation(1, 'posts', {
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('showRelation', async () => {
        const result = await UserRepository.make().showRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation', async () => {
        const result = await UserRepository.make().storeRelation(1, 'posts', {});
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation multipart', async () => {
        const result = await UserRepository.make().storeRelation(
            1,
            'posts',
            {
                name: 'morpheus',
                job: 'leader',
            },
            true
        );
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('updateRelation', async () => {
        const result = await UserRepository.make().updateRelation(1, 'posts', 1, {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('updateRelation multipart with formData', async () => {
        const formData = new FormData();
        const result = await UserRepository.make().updateRelation(1, 'posts', 1, formData, true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('updateRelation multipart with object', async () => {
        const result = await UserRepository.make().updateRelation(1, 'posts', 1, {}, true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('destroyRelation', async () => {
        const result = await UserRepository.make().destroyRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('restoreRelation', async () => {
        const result = await UserRepository.make().restoreRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/1/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation', async () => {
        const result = await UserRepository.make().batchStoreRelation(1, 'posts', []);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation multipart', async () => {
        const result = await UserRepository.make().batchStoreRelation(
            1,
            'posts',
            [],
            true
        );
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdateRelation', async () => {
        const result = await UserRepository.make().batchUpdateRelation(1, 'posts', {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdateRelation multipart with formData', async () => {
        const result = await UserRepository.make().batchUpdateRelation(1, 'posts', new FormData(), true);
    
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchUpdateRelation multipart with object', async () => {
        const result = await UserRepository.make().batchUpdateRelation(1, 'posts', {}, true);
        
        expect(result.config.headers['Content-Type'].startsWith('multipart/form-data')).toBe(true);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroyRelation', async () => {
        const result = await UserRepository.make().batchDestroyRelation(1, 'posts', []);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchRestoreRelation', async () => {
        const result = await UserRepository.make().batchRestoreRelation(1, 'posts');
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('sync', async () => {
        const result = await UserRepository.make().sync(1, 'posts', {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/sync');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('toggle', async () => {
        const result = await UserRepository.make().toggle(1, 'posts', {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/toggle');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('attach', async () => {
        const result = await UserRepository.make().attach(1, 'posts', {});
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/attach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('detach', async () => {
        const result = await UserRepository.make().detach(1, 'posts', {});
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/detach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('pivot', async () => {
        const result = await UserRepository.make().pivot(1, 'posts', 1, {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1/pivot');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('associate', async () => {
        const result = await UserRepository.make().associate(1, 'posts', 1);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/associate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('dissociate', async () => {
        const result = await UserRepository.make().dissociate(1, 'posts', 1);
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1/dissociate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('autoAbort', async () => {
        const instance = UserRepository.make();
        
        const results = await Promise.all([
            instance.index().catch((e) => e.code),
            instance.index(),
        ])
        
        expect(results[0]).toBe('ERR_CANCELED');
        
        expect(results[1].config.method).toBe('get');
        expect(results[1].config.url).toBe('users');
        expect(results[1].config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('withoutAutoAbort', async () => {
        const instance = UserRepository.make();
        
        const results = await Promise.all([
            instance.withoutAutoAbort().index(),
            instance.withoutAutoAbort().index(),
        ])
    
        expect(results[0].config.method).toBe('get');
        expect(results[0].config.url).toBe('users');
        expect(results[0].config.xsrfCookieName).toBe('XSRF-TOKEN');
        
        expect(results[1].config.method).toBe('get');
        expect(results[1].config.url).toBe('users');
        expect(results[1].config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('withAutoAbort', async () => {
        // Create an instance withoutAutoAbort
        const instance = UserRepository.make().withoutAutoAbort();
        
        const results = await Promise.all([
            instance.withAutoAbort().index().catch((e) => e.code),
            instance.withAutoAbort().index(),
        ])
    
        expect(results[0]).toBe('ERR_CANCELED');
        
        expect(results[1].config.method).toBe('get');
        expect(results[1].config.url).toBe('users');
        expect(results[1].config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('withAbortId', async () => {
        // Create an instance withoutAutoAbort
        const instance = UserRepository.make();
    
        const results = await Promise.all([
            instance.withAbortId('test').index().catch((e) => e.code),
            instance.withAbortId('test').index(),
        ])
    
        expect(results[0]).toBe('ERR_CANCELED');
    
        expect(results[1].config.method).toBe('get');
        expect(results[1].config.url).toBe('users');
        expect(results[1].config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('withAbortId without ID', async () => {
        // Create an instance withoutAutoAbort
        const instance = UserRepository.make();
        expect(() => instance.withAbortId()).toThrowError();
    });
});
