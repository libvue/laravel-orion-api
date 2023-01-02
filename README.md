# laravel-orion-api

[![license](https://img.shields.io/badge/license-MIT-blue)](https://img.shields.io/badge/license-MIT-blue)
[![npm (tag)](https://img.shields.io/npm/v/@libvue/laravel-orion-api/latest?label=npm%20package)](https://badge.fury.io/js/@libvue%2Flaravel-orion-api)

#### A Laravel Orion compatible repository-based Javascript http-client powered by axios.

## Install

```bash
> npm install --save @libvue/laravel-orion-api
```

```js
// BaseRepository.js
import { LaravelOrionAPI } from '@libvue/laravel-orion-api';

class BaseRepository extends LaravelOrionAPI {
    constructor() {
        super();
        this.baseURL = `${import.meta.env.VITE_API_DOMAIN}`;
        this.path = '';
    }
}

export default new BaseRepository();
```

```js
// PostRepository.js
import BaseRepository from './BaseRepository.js'

class PostRepository extends BaseRepository {
    constructor() {
        super();
        this.path = '/posts'
    }
}

export default new PostRepository();
```
```js
// app.js
import PostRepository from 'PostRepository.js';

// Search some posts
PostRepository.search({ limit: 10, sort: '-id' }).then((data) => {
    console.log(data)
})
```

## Methods
<!-- INDEX -->
<details>
  <summary><strong><font size="4">index</font></strong></summary>

| Params | Default | Description                     |
|--------|---------|---------------------------------|
| data   | null    | Data passed to the query string |

#### Code
```javascript
// GET http://your-base-url.test/posts?include=user&with_count=user
// Accept: application/json
PostRepository.index({ 
  includes: ['user'], 
  aggregates: [{ relation: 'user', type: 'count' }]  
});
```
</details>
<!-- SEARCH -->
<details>
  <summary><strong><font size="4">search</font></strong></summary>

| Params | Default | Description            |
|--------|---------|------------------------|
| data   | null    | Data passed to payload |

#### Code
```javascript
// GET http://your-base-url.test/posts
// Accept: application/json
PostRepository.search({ 
  limit: 10,
  sort: '-id',
  page: 1,
  includes: [{ relation: 'organization' }], 
  aggregates: [{ relation: 'user', type: 'count' }]  
});
```
</details>
<!-- SHOW -->
<details>
  <summary><strong><font size="4">show</font></strong></summary>

| Params | required | default | description                           |
|--------|----------|---------|---------------------------------------|
| id     | true     | null    | The id of the resource                |
| data   | false    | null    | Data to be passed to the query string |


#### Code
```javascript
// GET http://your-base-url.test/posts/1?include=user&with_count=user
// Accept: application/json
PostRepository.show(1, { 
  includes: ['user'], 
  aggregates: [{ relation: 'user', type: 'count' }]  
});
```
</details>
<!-- STORE -->
<details>
  <summary><strong><font size="4">store</font></strong></summary>

| Params    | required | default | description                                       |
|-----------|----------|---------|---------------------------------------------------|
| data      | true     | null    | Data to be passed to payload                      |
| multipart | false    | false   | When storing files, multipart needs to be enabled |

#### Code
```javascript
// POST http://your-base-url.test/posts
// Accept: application/json
PostRepository.store({
    field: 'value',
    field2: 'value2',
});

// POST http://your-base-url.test/posts
// Accept: application/json
// Content-Type: multipart/form-data
PostRepository.store({
    field: 'value',
    field2: 'value2',
    file: File,  
}, true);
```
</details>
<!-- UPDATE -->
<details>
  <summary><strong><font size="4">update</font></strong></summary>

| Params    | required | default | description                                       |
|-----------|----------|---------|---------------------------------------------------|
| id        | true     | null    | The id of the resource                            |
| data      | true     | null    | Data to be passed to payload                      |
| multipart | false    | false   | When storing files, multipart needs to be enabled |

#### Code
```javascript
// PATCH http://your-base-url.test/posts/1
// Accept: application/json
PostRepository.update(1, {
    field: 'value',
    field2: 'value2',
});

// POST http://your-base-url.test/posts/1
// Accept: application/json
// Content-Type: multipart/form-data
// Adds _method: 'PATCH' to the payload
PostRepository.update(1, {
    field: 'value',
    field2: 'value2',
    file: File,  
}, true);
```

> Note: Using multipart adds _method: 'PATCH' to the payload and uses a POST request.
</details>
<!-- DESTROY -->
<details>
  <summary><strong><font size="4">destroy</font></strong></summary>

| Params | required | default | description                           |
|--------|----------|---------|---------------------------------------|
| id     | true     | null    | The id of the resource                |


#### Code
```javascript
// DELETE http://your-base-url.test/posts/1
// Accept: application/json
PostRepository.destroy(1);
```
</details>



### batchStore
### batchUpdate
### batchDestroy
### indexRelation
### searchRelation
### showRelation
### storeRelation
### updateRelation
### destroyRelation
### restoreRelation
### batchStoreRelation
### batchUpdateRelation
### batchDestroyRelation
### batchRestoreRelation
### sync
### toggle
### attach
### detach
### pivot
### associate
### dissociate