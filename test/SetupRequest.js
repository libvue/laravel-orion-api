import { afterAll, afterEach, beforeAll } from 'vitest';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const posts = [
    {
        userId: 1,
        id: 1,
        title: 'first post title',
        body: 'first post body',
    },
    {
        userId: 1,
        id: 2,
        title: 'second post title',
        body: 'second post body',
    },
];

/**
 * List of common laravel orion mocked requests
 * @type {RestHandler<MockedRequest<DefaultBodyType>>[]}
 */
const restHandlers = [
    // Index
    rest.get('https://endpoint.example/api/users', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Show
    rest.get('https://endpoint.example/api/users/1', (req, res, ctx) => res(ctx.status(200), ctx.json(posts[0]))),
    // Search
    rest.post('https://endpoint.example/api/users/search', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Store
    rest.post('https://endpoint.example/api/users',  (req, res, ctx) => res(ctx.status(201), ctx.json(posts))),
    // Update
    rest.patch('https://endpoint.example/api/users/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Update multipart
    rest.post('https://endpoint.example/api/users/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Destroy
    rest.delete('https://endpoint.example/api/users/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Restore
    rest.post('https://endpoint.example/api/users/1/restore',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Store
    rest.post('https://endpoint.example/api/users/batch',  (req, res, ctx) => res(ctx.status(201), ctx.json(posts))),
    // Batch Update
    rest.patch('https://endpoint.example/api/users/batch',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Destroy
    rest.delete('https://endpoint.example/api/users/batch',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Index Relation
    rest.get('https://endpoint.example/api/users/1/posts',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Search Relation
    rest.post('https://endpoint.example/api/users/1/posts/search',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Show Relation
    rest.get('https://endpoint.example/api/users/1/posts/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Store Relation
    rest.post('https://endpoint.example/api/users/1/posts',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Update Relation
    rest.patch('https://endpoint.example/api/users/1/posts/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Update Relation Multipart
    rest.post('https://endpoint.example/api/users/1/posts/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Destroy Relation
    rest.delete('https://endpoint.example/api/users/1/posts/1',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Restore Relation
    rest.post('https://endpoint.example/api/users/1/posts/1/restore',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Store Relation
    rest.post('https://endpoint.example/api/users/1/posts/batch',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Update Relation
    rest.patch('https://endpoint.example/api/users/1/posts/batch',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Destroy Relation
    rest.delete('https://endpoint.example/api/users/1/posts/batch',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Batch Restore Relation
    rest.post('https://endpoint.example/api/users/1/posts/batch/restore',  (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Sync
    rest.patch('https://endpoint.example/api/users/1/posts/sync', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Toggle
    rest.patch('https://endpoint.example/api/users/1/posts/toggle', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Attach
    rest.post('https://endpoint.example/api/users/1/posts/attach', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Detach
    rest.delete('https://endpoint.example/api/users/1/posts/detach', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Pivot
    rest.patch('https://endpoint.example/api/users/1/posts/1/pivot', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // Associate
    rest.post('https://endpoint.example/api/users/1/posts/associate', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
    // dissociate
    rest.delete('https://endpoint.example/api/users/1/posts/1/dissociate', (req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
