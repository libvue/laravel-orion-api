# laravel-orion-api

[![license](https://img.shields.io/badge/license-MIT-blue)](https://img.shields.io/badge/license-MIT-blue)
[![npm (tag)](https://img.shields.io/npm/v/@libvue/laravel-orion-api/latest?label=npm%20package)](https://badge.fury.io/js/@libvue%2Flaravel-orion-api)

#### A Laravel Orion compatible repository-based Javascript http-client powered by axios.

### Install

```bash
> npm install --save @libvue/laravel-orion-api
```

```js
// PostRepository.js
import { LaravelOrionAPI } from '@libvue/laravel-orion-api';

class PostRepository extends LaravelOrionAPI {
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

PostRepository.index().then((data) => {
    console.log(data)
})
```
