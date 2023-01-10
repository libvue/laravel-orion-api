import { expect, test, describe } from 'vitest';
import Transformer from './Transformer';

describe('The toPostData method of the Transformer class works properly.', () => {
    test('defaults', () => {
        expect(Transformer.toPostData({})).toStrictEqual(
            { page: 1, limit: 20 }
        );
    })
    
    test('random key value pairs keep unchanged', () => {
        expect(Transformer.toPostData({ hello: 'world' })).toStrictEqual(
            { page: 1, limit: 20, hello: 'world' }
        );
    })
    
    test('parseSort', () => {
        expect(Transformer.toPostData({
            sort: '-id',
        })).toStrictEqual(
            { page: 1, limit: 20, sort: [{ field: 'id', direction: 'desc' }] }
        );
        
        expect(Transformer.toPostData({
            sort: [{ field: 'id', direction: 'asc' }],
        })).toStrictEqual(
            { page: 1, limit: 20, sort: [{ field: 'id', direction: 'asc' }] }
        );
    });
    
    test('parseSort with non-string / array value is not transformed', () => {
        expect(Transformer.toPostData({
            sort: {},
        })).toStrictEqual(
            { page: 1, limit: 20, sort: {} }
        );
    });
    
    test('parseSearch', () => {
        expect(Transformer.toPostData({
            search: 'hello',
        })).toStrictEqual(
            { page: 1, limit: 20, search: { case_sensitive: false, value: 'hello' }}
        );
    });
    
    test('parseSearch with null is dropped', () => {
        expect(Transformer.toPostData({
            search: null,
        })).toStrictEqual(
            { page: 1, limit: 20 }
        );
    });
    
    test('parseSearch with non-string type is not transformed', () => {
        expect(Transformer.toPostData({
            search: {},
        })).toStrictEqual(
            { page: 1, limit: 20, search: {} }
        );
    });
    
    test('parseSort with null is dropped', () => {
        expect(Transformer.toPostData({
            sort: null,
        })).toStrictEqual(
            { page: 1, limit: 20 }
        );
    });
    
    test('parseFilters', () => {
        expect(Transformer.toPostData({
            filters: [
                { field: 'hello', value: 'world' },
                { field: 'is-should-be-removed', value: null },
            ],
        })).toStrictEqual(
            { page: 1, limit: 20, filters: [{ field: 'hello', value: 'world' }]}
        );
    });
})

describe('The toGetQuery method of the Transformer class works properly.', () => {
    test('defaults', () => {
        expect(Transformer.toGetQuery({})).toBe('');
    })
    
    test('include & aggregates', () => {
        expect(Transformer.toGetQuery({
            includes: ['hello', 'world'],
            aggregates: [
                { relation: 'field1', type: 'count' },
                { relation: 'field2', type: 'count' },
                { relation: 'field3', type: 'sum' },
            ],
        })).toBe('?include=hello,world&with_count=field1,field2&with_sum=field3');
    })
    
    test('Unspecified parameters are passed as is', () => {
        expect(Transformer.toGetQuery({
            hello: 123,
            world: 456,
        })).toBe('?hello=123&world=456');
    })
});
