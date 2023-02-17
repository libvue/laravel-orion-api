# laravel-orion-api

[![license](https://img.shields.io/badge/license-MIT-blue)](https://img.shields.io/badge/license-MIT-blue)
[![coverage](https://img.shields.io/badge/coverage-98.78%25-green)](https://img.shields.io/badge/coverage-98.78%25-blue)
[![npm (tag)](https://img.shields.io/npm/v/@libvue/laravel-orion-api/latest?label=npm%20package)](https://badge.fury.io/js/@libvue%2Flaravel-orion-api)

#### A Laravel Orion compatible repository-based Javascript http-client powered by axios.

## Install

```bash
> npm install --save @libvue/laravel-orion-api
```

## Setup
#### Create a BaseRepository
```js
// BaseRepository.js
import { LaravelOrionAPI } from "@libvue/laravel-orion-api";

class BaseRepository extends LaravelOrionAPI {
    constructor() {
        // If you want to use a custom axios config, use super(yourAxiosConfig), else just use super()
        super();
        this.baseURL = `${import.meta.env.VITE_API_DOMAIN}`;
        this.path = "";
    }
}

export default BaseRepository;
```
#### Extend from this BaseRepository
```js
// PostRepository.js
import BaseRepository from "./BaseRepository.js";

class PostRepository extends BaseRepository {
    constructor() {
        super();
        this.path = "/posts";
    }
}

export default new PostRepository();
```
#### Use it!
```js
// app.js
import PostRepository from "PostRepository.js";

// Search some posts
PostRepository.search({ limit: 10, sort: "-id" }).then((data) => {
    console.log(data);
});
```

## Constructor Configuration
| **variable** | **default** | **description**                                                       |
|:-------------|-------------|-----------------------------------------------------------------------|
| baseURL      | /           | Sets the baseURL for that instance                                    |
| path         | ''          | Sets the relative path to the baseURL                                 |
| autoAbort    | true        | Enables aborting ongoing requests for all methods inside the instance |

## Request Methods

| **instance method**  | **http-method**    | **parameters**                            | Restricted data keys                                     |
|:---------------------|--------------------|-------------------------------------------|----------------------------------------------------------|
| index                | GET                | data                                      | includes, aggregates                                     |
| search               | POST               | data                                      | page, limit, sort, filters, search, includes, aggregates |
| store                | POST               | data, multipart                           | -                                                        |
| show                 | GET                | id, data                                  | includes, aggregates                                     |
| update               | PATCH, PUT or POST | id, data, multipart, method = 'PATCH'     | -                                                        |
| destroy              | DELETE             | id                                        | -                                                        |
| restore              | POST               | id                                        | -                                                        |
| batchStore           | POST               | data, multipart                           | -                                                        |
| batchUpdate          | PATCH or POST      | data                                      | -                                                        |
| batchDestroy         | DELETE             | data                                      | -                                                        |
| indexRelation        | GET                | id, relation, data                        | includes, aggregates                                     |
| searchRelation       | POST               | id, relation, data                        | page, limit, sort, filters, search, includes, aggregates |
| showRelation         | GET                | id, relation, relationId, data            | includes, aggregates                                     |
| storeRelation        | POST               | id, relation, data, multipart             | -                                                        |
| updateRelation       | PATCH or POST      | id, relation, relationId, data, multipart | -                                                        |
| destroyRelation      | DELETE             | id, relation, relationId                  | -                                                        |
| restoreRelation      | POST               | id, relation, relationId                  | -                                                        |
| batchStoreRelation   | POST               | id, relation, data, multipart             | -                                                        |
| batchUpdateRelation  | PATCH or POST      | id, relation, data, multipart             | -                                                        |
| batchDestroyRelation | DELETE             | id, relation, data                        | -                                                        |
| batchRestoreRelation | POST               | id, relation, data                        | -                                                        |
| sync                 | PATCH              | id, relation, data                        | -                                                        |
| toggle               | PATCH              | id, relation, data                        | -                                                        |
| attach               | POST               | id, relation, data                        | -                                                        |
| detach               | DELETE             | id, relation, data                        | -                                                        |
| pivot                | PATCH              | id, relation, relationId, data            | -                                                        |
| associate            | POST               | id, relation, relatedKey                  | -                                                        |
| dissociate           | DELETE             | id, relation, relationId                  | -                                                        |
| abort                | -                  | id                                        | -                                                        |      

## Helper Methods

| **instance method** | description                                                                                               |
|:--------------------|-----------------------------------------------------------------------------------------------------------|
| withoutAutoAbort    | If the instance has autoAbort enabled, you can disable this effect for methods that use this in the chain |
| withAutoAbort       | If the instance has autoAbort disabled, you can enable this effect for methods that use this in the chain |
| withAbortId         | Changes the default abort id (method name), so you can use Instance.abort(abortId) more precise.          |

## In depth aborting

### Default behaviour
By default autoAbort is set to `true` for the entire instance.
> Note: This will only with work synchronous requests.

#### Example:
```javascript
// First Call
UserRepository.index().catch((e) => {
    console.log(e.code);                    // ERR_CANCELED
});
// Second call 
UserRepository.index().catch((e) => {
    console.log(e.code);                    // ERR_CANCELED
});
// Third Call 
UserRepository.index().then((result) => {
    console.log(result.status);             // 200
});
```

### Disable autoAbort for entire instance
Disabling autoAbort will not auto-abort anything. Ongoing requests can still be canceled with the `UserRepository.abort('method')` or `UserRepository.abort('id')` methods.

#### Example:
```javascript
class UserRepository extends LaravelOrionAPI {
    constructor(withDelay = false) {
        super();
        this.autoAbort = false;               // Disable autoAbort here
    }
}
```
```javascript
// First Call 
UserRepository.index().then((result) => {
    console.log(result.status)                // 200
});
// Second call 
UserRepository.index().then((result) => {
    console.log(result.status)                // 200
});
// Third Call 
UserRepository.index().then((result) => {
    console.log(result.status)                // 200
});
```


### Disable autoAbort for a single method
#### Example:
```javascript
// First Call
UserRepository.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Second call 
UserRepository.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Third Call 
UserRepository.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
```
> Note: If you are using the index() for two different purposes simultaneously, you must use withAbortId() to avoid weird  behaviour. See example below

#### Example:

```javascript
// First Call
UserRepository.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Second call 
UserRepository.withoutAutoAbort().index().then((result) => {
    console.log(result.status);             // 200
});
// Third Call 
UserRepository.withAbortId('other-purpose').index().catch((e) => {
    console.log(e.code);                    // ERR_CANCELED 
});
// Fourth Call 
UserRepository.withAbortId('other-purpose').index().then((result) => {
    console.log(result.status);             // 200 
});
```