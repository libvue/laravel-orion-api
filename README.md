# laravel-orion-api

[![license](https://img.shields.io/badge/license-MIT-blue)](https://img.shields.io/badge/license-MIT-blue)
[![coverage](https://img.shields.io/badge/coverage-98.78%25-green)](https://img.shields.io/badge/coverage-98.78%25-blue)
[![npm (tag)](https://img.shields.io/npm/v/@libvue/laravel-orion-api/latest?label=npm%20package)](https://badge.fury.io/js/@libvue%2Flaravel-orion-api)

#### A Laravel Orion compatible repository-based Javascript http-client powered by axios.

## Install

```bash
> npm install --save @libvue/laravel-orion-api
```

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

export default new BaseRepository();
```

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

```js
// app.js
import PostRepository from "PostRepository.js";

// Search some posts
PostRepository.search({ limit: 10, sort: "-id" }).then((data) => {
    console.log(data);
});
```

## Methods

| **instance method**  | **http-method** | **parameters**                            | Restricted data keys                                     |
|:---------------------|-----------------|-------------------------------------------|----------------------------------------------------------|
| index                | GET             | data                                      | includes, aggregates                                     |
| search               | POST            | data                                      | page, limit, sort, filters, search, includes, aggregates |
| store                | POST            | data, multipart                           | -                                                        |
| show                 | GET             | id, data                                  | includes, aggregates                                     |
| update               | PATCH or POST   | id, data, multipart                       | -                                                        |
| destroy              | DELETE          | id                                        | -                                                        |
| batchStore           | POST            | data, multipart                           | -                                                        |
| batchUpdate          | PATCH or POST   | data                                      | -                                                        |
| batchDestroy         | DELETE          | data                                      | -                                                        |
| indexRelation        | GET             | id, relation, data                        | includes, aggregates                                     |
| searchRelation       | POST            | id, relation, data                        | page, limit, sort, filters, search, includes, aggregates |
| showRelation         | GET             | id, relation, relationId, data            | includes, aggregates                                     |
| storeRelation        | POST            | id, relation, data, multipart             | -                                                        |
| updateRelation       | PATCH or POST   | id, relation, relationId, data, multipart | -                                                        |
| destroyRelation      | DELETE          | id, relation, relationId                  | -                                                        |
| restoreRelation      | POST            | id, relation, relationId                  | -                                                        |
| batchStoreRelation   | POST            | id, relation, data, multipart             | -                                                        |
| batchUpdateRelation  | PATCH or POST   | id, relation, data, multipart             | -                                                        |
| batchDestroyRelation | DELETE          | id, relation, data                        | -                                                        |
| batchRestoreRelation | POST            | id, relation, data                        | -                                                        |
| sync                 | PATCH           | id, relation, data                        | -                                                        |
| toggle               | PATCH           | id, relation, data                        | -                                                        |
| attach               | POST            | id, relation, data                        | -                                                        |
| detach               | DELETE          | id, relation, data                        | -                                                        |
| pivot                | PATCH           | id, relation, relationId, data            | -                                                        |
| associate            | POST            | id, relation, relatedKey                  | -                                                        |
| dissociate           | DELETE          | id, relation, relationId                  | -                                                        |
