import { describe, expect, test } from 'vitest';
import UserRepository from '../test/helpers/UserRepository';

describe('All methods are working properly', () => {
    test('index', async () => {
        const result = await UserRepository.index();
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('index with_trashed', async () => {
        const result = await UserRepository.index({
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('index only_trashed', async () => {
        const result = await UserRepository.index({
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('search', async () => {
        const result = await UserRepository.search();
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('search with_trashed', async () => {
        const result = await UserRepository.search({
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('search only_trashed', async () => {
        const result = await UserRepository.search({
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/search?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('show', async () => {
        const result = await UserRepository.show(1);
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('show with_trashed', async () => {
        const result = await UserRepository.show(1, {
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('show only_trashed', async () => {
        const result = await UserRepository.show(1, {
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store', async () => {
        const result = await UserRepository.store({
            name: 'morpheus',
            job: 'leader',
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('store multipart', async () => {
        const result = await UserRepository.store(
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
        const result = await UserRepository.update(1, {
            name: 'morpheus',
            job: 'leader',
        },);
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });

    test('destroy', async () => {
        const result = await UserRepository.destroy(1);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('restore', async () => {
        const result = await UserRepository.restore(1);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore', async () => {
        const result = await UserRepository.batchStore([{
            name: 'morpheus',
            job: 'leader',
        }]);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStore multipart', async () => {
        const result = await UserRepository.batchStore(
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
        const result = await UserRepository.batchUpdate({ 1: {
            name: 'morpheus',
            job: 'leader',
        }});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroy', async () => {
        const result = await UserRepository.batchDestroy([1,2,3]);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('indexRelation', async () => {
        const result = await UserRepository.indexRelation(1, 'posts');
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation', async () => {
        const result = await UserRepository.searchRelation(1, 'posts');
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation with_trashed', async () => {
        const result = await UserRepository.searchRelation(1, 'posts', {
            with_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search?with_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('searchRelation only_trashed', async () => {
        const result = await UserRepository.searchRelation(1, 'posts', {
            only_trashed: true,
        });
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/search?only_trashed=true');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('showRelation', async () => {
        const result = await UserRepository.showRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('get');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation', async () => {
        const result = await UserRepository.storeRelation(1, 'posts', {});
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('storeRelation multipart', async () => {
        const result = await UserRepository.storeRelation(
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
        const result = await UserRepository.updateRelation(1, 'posts', 1, {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('destroyRelation', async () => {
        const result = await UserRepository.destroyRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('restoreRelation', async () => {
        const result = await UserRepository.restoreRelation(1, 'posts', 1);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/1/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation', async () => {
        const result = await UserRepository.batchStoreRelation(1, 'posts', []);
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchStoreRelation multipart', async () => {
        const result = await UserRepository.batchStoreRelation(
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
        const result = await UserRepository.batchUpdateRelation(1, 'posts', []);
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchDestroyRelation', async () => {
        const result = await UserRepository.batchDestroyRelation(1, 'posts', []);
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/batch');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('batchRestoreRelation', async () => {
        const result = await UserRepository.batchRestoreRelation(1, 'posts');
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/batch/restore');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('sync', async () => {
        const result = await UserRepository.sync(1, 'posts', {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/sync');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('toggle', async () => {
        const result = await UserRepository.toggle(1, 'posts', {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/toggle');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('attach', async () => {
        const result = await UserRepository.attach(1, 'posts', {});
        
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/attach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('detach', async () => {
        const result = await UserRepository.detach(1, 'posts', {});
        
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/detach');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('pivot', async () => {
        const result = await UserRepository.pivot(1, 'posts', 1, {});
        
        expect(result.config.method).toBe('patch');
        expect(result.config.url).toBe('users/1/posts/1/pivot');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('associate', async () => {
        const result = await UserRepository.associate(1, 'posts', 1);
        expect(result.config.method).toBe('post');
        expect(result.config.url).toBe('users/1/posts/associate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
    
    test('dissociate', async () => {
        const result = await UserRepository.dissociate(1, 'posts', 1);
        expect(result.config.method).toBe('delete');
        expect(result.config.url).toBe('users/1/posts/1/dissociate');
        expect(result.config.xsrfCookieName).toBe('XSRF-TOKEN');
    });
});
