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

### index 

| Params | Default | Description                     |
|--------|---------|---------------------------------|
| data   | null    | Data passed to the query string |

#### Example
```
PostRepository.index({ 
  includes: ['user'], 
  aggregates: [{ relation: 'user', type: 'count' }]  
});

// (GET) /posts?include=user&with_count=user
```

### search

| Params | Default | Description            |
|--------|---------|------------------------|
| data   | null    | Data passed to payload |

#### Example
```
PostRepository.search({ 
  limit: 10,
  sort: '-id',
  page: 1,
  includes: [{ relation: 'organization' }], 
  aggregates: [{ relation: 'user', type: 'count' }]  
});

// (POST) /posts 
// { 
//    limit: 10
//    sort: [{ field: 'id', direction: 'asc' }]    
//    page: 1,
//    includes: [{ relation: 'organization' }], 
//    aggregates: [{ relation: 'user', type: 'count' }]
// }
```

### store
### show
### update
### destroy
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