import AxiosInstance from './modules/AxiosInstance.js';
import Transformer from './modules/Transformer/Transformer.js';
import AXIOS_CONFIG from './configs/axios.js';

class LaravelOrionAPI extends AxiosInstance {
    constructor(AxiosConfig = AXIOS_CONFIG) {
        super(AxiosConfig);
        this.baseURL = '/';
        this.path = '';
        this.autoAbort = true;
        this._abortControllers = {};
    }

    /**
     * A builder function that returns a new instance
     *
     * @returns {LaravelOrionAPI} An instance of itself
     */
    static make() {
        return new this();
    }

    /**
     * Get a resource collection.
     *
     * @param   {Object}       [data={}]                  The payload of the XHR request. Default is `{}`
     * @param   {String[]}     [data.includes]            An array of comma seperated strings
     * @param   {Object[]}     [data.aggregates]          An array of objects
     * @param   {String}       data.aggregates[].type     Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}       data.aggregates[].relation Relation of the aggregate.
     * @returns {AxiosPromise}                            An AxiosPromise
     */
    index(data = {}) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort(this.abortId || 'index', this.autoAbort),
        });
    }

    /**
     * Search a resource collection.
     *
     * @param   {Object}            [data={}]                            The payload of the XHR request. Default is `{}`
     * @param   {Boolean}           [data.with_trashed]                  If resource has softDeletes, you get a collection with trashed items
     * @param   {Boolean}           [data.only_trashed]                  If resource has softDeletes, you get a collection with only trashed items
     * @param   {Number}            [data.page]                          If paginated, the current page of the collection
     * @param   {Number}            [data.limit]                         If paginated, the max. number of items per page
     * @param   {String | Object[]} [data.sort]                          The sorting the collection
     * @param   {String}            [data.search]                        Searching specific searchableBy data
     * @param   {Object[]}          [data.includes]                      An array filled with include objects
     * @param   {String}            data.includes[].relation             Relation of the included resource.
     * @param   {Array}             [data.includes[].filters]            Filters of the included resource.
     * @param   {String}            data.includes[].filters[].field      Field of the filter object
     * @param   {String}            [data.includes[].filters[].operator] The operator of the filter object
     * @param   {String}            data.includes[].filters[].value      The value of the filter object
     * @param   {Object[]}          [data.filters]                       An array filled with filter objects
     * @param   {String}            data.filters[].field                 Field of the filter object
     * @param   {String}            [data.filters[].operator]            The operator of the filter object
     * @param   {String}            data.filters[].value                 The value of the filter object
     * @param   {Object[]}          [data.scopes]                        An array filled with scope objects
     * @param   {String}            data.scopes[].name                   The name of the scope
     * @param   {Array}             [data.scopes[].parameters]           Additional comma seperated parameters of the scope
     * @param   {Object[]}          [data.aggregates]                    An array of objects
     * @param   {String}            data.aggregates[].type               Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}            data.aggregates[].relation           Relation of the aggregate.
     * @returns {AxiosPromise}                                           An AxiosPromise
     */
    search(data = {}) {
        // Separate the URL here because we might want to add softDelete qs params
        let url = `${this.path}/search`;
        // For search operations we need to add the with_trashed and only_trashed to the querystring
        if (data && data.with_trashed) {
            url += '?with_trashed=true';
        } else if (data && data.only_trashed) {
            url += '?only_trashed=true';
        }
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url,
            data: Transformer.toPostData(data),
            signal: this._injectAbort(this.abortId || 'search', this.autoAbort),
        });
    }

    /**
     * Store a new resource item in your collection
     *
     * @param   {Object}       [data={}]         The payload of the XHR request. Default is `{}`
     * @param   {Boolean}      [multipart=false] Sets the request to be multipart. Default is `false`
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    store(data = {}, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: this.path,
            data,
            signal: this._injectAbort(this.abortId || 'store', this.autoAbort),
        });
    }

    /**
     * Get a resource item.
     *
     * @param   {String | Number} id                         The ID of the requested resource item.
     * @param   {Object}          [data={}]                  The payload of the XHR request. Default is `{}`
     * @param   {String[]}        [data.includes]            An array of comma seperated strings
     * @param   {Object[]}        [data.aggregates]          An array of objects
     * @param   {String}          data.aggregates[].type     Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}          data.aggregates[].relation Relation of the aggregate.
     * @returns {AxiosPromise}                               An AxiosPromise
     */
    show(id, data = {}) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort(this.abortId || 'show', this.autoAbort),
        });
    }

    /**
     * Update a single resource item.
     *
     * @param   {String | Number} id             The ID of the resource item to be updated
     * @param   {Object}          data           The payload of the XHR request
     * @param   {Boolean}         [multipart]    Sets the request to be multipart
     * @param   {String}          [method=PATCH] Override the default patch method to be PUT. Default is `PATCH`
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    update(id, data, multipart = false, method = 'PATCH') {
        if (multipart && typeof data === 'object' && data.constructor.name === 'FormData') {
            data.append('_method', 'PATCH');
        } else if (multipart && typeof data === 'object') {
            // eslint-disable-next-line no-param-reassign
            data._method = 'PATCH';
        }

        return this.axios({
            method: multipart ? 'POST' : method,
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}`,
            data,
            signal: this._injectAbort(this.abortId || 'update', this.autoAbort),
        });
    }

    /**
     * Destroy a single resource item.
     *
     * @param   {String | Number} id The ID of the resource item to be destroyed
     * @returns {AxiosPromise}       An AxiosPromise
     */
    destroy(id) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}`,
            signal: this._injectAbort(this.abortId || 'destroy', this.autoAbort),
        });
    }

    /**
     * Restore a single resource item.
     *
     * @param   {String | Number} id The ID of the resource item to be destroyed
     * @returns {AxiosPromise}       An AxiosPromise
     */
    restore(id) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/restore`,
            signal: this._injectAbort(this.abortId || 'restore', this.autoAbort),
        });
    }

    /**
     * Batch store multiple resource items.
     *
     * @param   {Object}       data           The payload of the XHR request
     * @param   {Object[]}     data.resources A collection of resource items that need to be stored
     * @param   {Boolean}      [multipart]    Sets the request to be multipart
     * @returns {AxiosPromise}                An AxiosPromise
     */
    batchStore(data, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort(this.abortId || 'batchStore', this.autoAbort),
        });
    }

    /**
     * Batch store multiple resource items.
     *
     * @param   {Object}       data           The payload of the XHR request
     * @param   {Object}       data.resources A key (id) value (resource) collection of resource items
     * @param   {Boolean}      [multipart]    Sets the request to be multipart
     * @returns {AxiosPromise}                An AxiosPromise
     */
    batchUpdate(data, multipart = false) {
        if (multipart && typeof data === 'object' && data.constructor.name === 'FormData') {
            data.append('_method', 'PATCH');
        } else if (multipart && typeof data === 'object') {
            // eslint-disable-next-line no-param-reassign
            data._method = 'PATCH';
        }

        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort(this.abortId || 'batchUpdate', this.autoAbort),
        });
    }

    /**
     * Batch destroy multiple resource items.
     *
     * @param   {Object}       data           The payload of the XHR request
     * @param   {Number[]}     data.resources A comma separated list of resources items that need to be destroyed
     * @returns {AxiosPromise}                An AxiosPromise
     */
    batchDestroy(data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort(this.abortId || 'batchDestroy', this.autoAbort),
        });
    }

    /**
     * Batch restore multiple resource items.
     *
     * @param   {Object}       data           The payload of the XHR request
     * @param   {Number[]}     data.resources A comma separated list of resources items that need to be destroyed
     * @returns {AxiosPromise}                An AxiosPromise
     */
    batchRestore(data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/batch/restore`,
            data,
            signal: this._injectAbort(this.abortId || 'batchRestore', this.autoAbort),
        });
    }

    /**
     * Get a relational collection of a single resource item
     *
     * @param   {String}       id                         The ID of the resource
     * @param   {String}       relation                   The name of the relation
     * @param   {Object}       [data={}]                  The payload of the XHR request. Default is `{}`
     * @param   {String[]}     [data.includes]            An array of comma seperated strings
     * @param   {Object[]}     [data.aggregates]          An array of objects
     * @param   {String}       data.aggregates[].type     Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}       data.aggregates[].relation Relation of the aggregate.
     * @returns {AxiosPromise}                            An AxiosPromise
     */
    indexRelation(id, relation, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort(this.abortId || 'indexRelation', this.autoAbort),
        });
    }

    /**
     * Search a relational collection of a single resource item.
     *
     * @param   {String}            id                         The ID of the resource
     * @param   {String}            relation                   The name of the relation
     * @param   {Object}            [data={}]                  The payload of the XHR request. Default is `{}`
     * @param   {Boolean}           [data.with_trashed]        If resource has softDeletes, you get a collection with trashed items
     * @param   {Boolean}           [data.only_trashed]        If resource has softDeletes, you get a collection with only trashed items
     * @param   {Number}            [data.page]                If paginated, the current page of the collection
     * @param   {Number}            [data.limit]               If paginated, the max. number of items per page
     * @param   {String | Object[]} [data.sort]                The sorting the collection
     * @param   {String}            [data.search]              Searching specific searchableBy data
     * @param   {Object[]}          [data.includes]            An array filled with include objects
     * @param   {String}            data.includes[].relation   Relation of the included resource.
     * @param   {Array}             [data.includes[].filters]  Relation of the included resource.
     * @param   {Object[]}          [data.filters]             An array filled with filter objects
     * @param   {String}            data.filters[].field       Field of the filter object
     * @param   {String}            [data.filters[].operator]  The operator of the filter object
     * @param   {String}            data.filters[].value       The value of the filter object
     * @param   {Object[]}          [data.scopes]              An array filled with scope objects
     * @param   {String}            data.scopes[].name         The name of the scope
     * @param   {Array}             [data.scopes[].parameters] Additional comma seperated parameters of the scope
     * @param   {Object[]}          [data.aggregates]          An array of objects
     * @param   {String}            data.aggregates[].type     Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}            data.aggregates[].relation Relation of the aggregate.
     * @returns {AxiosPromise}                                 An AxiosPromise
     */
    searchRelation(id, relation, data = {}) {
        let url = `${this.path}/${id}/${relation}/search`;
        // For search operations we need to add the with_trashed and only_trashed to the querystring
        if (data && data.with_trashed) {
            url += '?with_trashed=true';
        } else if (data && data.only_trashed) {
            url += '?only_trashed=true';
        }

        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url,
            data: Transformer.toPostData(data),
            signal: this._injectAbort(this.abortId || 'searchRelation', this.autoAbort),
        });
    }

    /**
     * Get a single relational item of a resource item.
     *
     * @param   {String | Number} id                         The ID of the requested resource item.
     * @param   {String}          relation                   The name of the relation
     * @param   {String}          relationId                 The ID of the relation
     * @param   {Object}          [data={}]                  The payload of the XHR request. Default is `{}`
     * @param   {String[]}        [data.includes]            An array of comma seperated strings
     * @param   {Object[]}        [data.aggregates]          An array of objects
     * @param   {String}          data.aggregates[].type     Type of the aggregate. F.e. count, sum, min, max, avg, exists
     * @param   {String}          data.aggregates[].relation Relation of the aggregate.
     * @returns {AxiosPromise}                               An AxiosPromise
     */
    showRelation(id, relation, relationId, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort(this.abortId || 'showRelation', this.autoAbort),
        });
    }

    /**
     * Stores a relational resource item to single resource item
     *
     * @param   {String | Number} id                The ID of the requested resource item.
     * @param   {String}          relation          The name of the relation
     * @param   {Object}          [data={}]         The payload of the XHR request. Default is `{}`
     * @param   {Boolean}         [multipart=false] Sets the request to be multipart. Default is `false`
     * @returns {AxiosPromise}                      An AxiosPromise
     */
    storeRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}`,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            data,
            signal: this._injectAbort(this.abortId || 'storeRelation', this.autoAbort),
        });
    }

    /**
     * Update a relational resource item of a single resource item.
     *
     * @param   {String | Number} id          The ID of the resource item to be updated
     * @param   {String}          relation    The name of the relation
     * @param   {String}          relationId  The ID of the relation
     * @param   {Object}          data        The payload of the XHR request
     * @param   {Boolean}         [multipart] Sets the request to be multipart
     * @returns {AxiosPromise}                An AxiosPromise
     */
    updateRelation(id, relation, relationId, data, multipart) {
        if (multipart && typeof data === 'object' && data.constructor.name === 'FormData') {
            data.append('_method', 'PATCH');
        } else if (multipart && typeof data === 'object') {
            // eslint-disable-next-line no-param-reassign
            data._method = 'PATCH';
        }

        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}/${relation}/${relationId}`,
            data,
            signal: this._injectAbort(this.abortId || 'updateRelation', this.autoAbort),
        });
    }

    /**
     * Destroy a relational resource item of a single resource item.
     *
     * @param   {String | Number} id         The ID of the resource item to be destroyed
     * @param   {String}          relation   The name of the relation
     * @param   {String}          relationId The ID of the relation
     * @returns {AxiosPromise}               An AxiosPromise
     */
    destroyRelation(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}`,
            signal: this._injectAbort(this.abortId || 'destroyRelation', this.autoAbort),
        });
    }

    /**
     * Restore a relational resource item of a single resource item.
     *
     * @param   {String | Number} id         The ID of the resource item to be restored
     * @param   {String}          relation   The name of the relation
     * @param   {String}          relationId The ID of the relation
     * @returns {AxiosPromise}               An AxiosPromise
     */
    restoreRelation(id, relation, relationId) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/restore`,
            signal: this._injectAbort(this.abortId || 'restoreRelation', this.autoAbort),
        });
    }

    /**
     * Batch store multiple relational resource items to a single resource item
     *
     * @param   {String | Number} id             The ID of the resource item where to items will be stored
     * @param   {String}          relation       The name of the relation
     * @param   {Object}          data           The payload of the XHR request
     * @param   {Object[]}        data.resources A collection of resource items that need to be stored
     * @param   {Boolean}         [multipart]    Sets the request to be multipart
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    batchStoreRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}/${relation}/batch`,
            data,
            signal: this._injectAbort(this.abortId || 'batchStoreRelation', this.autoAbort),
        });
    }

    /**
     * Batch update multiple relational resource items to a single resource item
     *
     * @param   {String | Number} id             The ID of the resource item where the items will be updated
     * @param   {String}          relation       The name of the relation
     * @param   {Object}          data           The payload of the XHR request
     * @param   {Object}          data.resources A key (id) value (resource) collection of resource items
     * @param   {Boolean}         [multipart]    Sets the request to be multipart
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    batchUpdateRelation(id, relation, data, multipart) {
        if (multipart && typeof data === 'object' && data.constructor.name === 'FormData') {
            data.append('_method', 'PATCH');
        } else if (multipart && typeof data === 'object') {
            // eslint-disable-next-line no-param-reassign
            data._method = 'PATCH';
        }

        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch`,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            data,
            signal: this._injectAbort(this.abortId || 'batchUpdateRelation', this.autoAbort),
        });
    }

    /**
     * Batch destroy multiple relational resource items of a single resource item
     *
     * @param   {String | Number} id             The ID of the resource item where the items will be destroyed
     * @param   {String}          relation       The name of the relation
     * @param   {Object}          data           The payload of the XHR request
     * @param   {Number[]}        data.resources A comma separated list of resources items that need to be destroyed
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    batchDestroyRelation(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch`,
            data,
            signal: this._injectAbort(this.abortId || 'batchDestroyRelation', this.autoAbort),
        });
    }

    /**
     * Batch restore multiple relational resource items of a single resource item
     *
     * @param   {String | Number} id             The ID of the resource item of which the items will be restored
     * @param   {String}          relation       The name of the relation
     * @param   {Object}          data           The payload of the XHR request
     * @param   {Number[]}        data.resources A comma separated list of resources items that need to be destroyed
     * @returns {AxiosPromise}                   An AxiosPromise
     */
    batchRestoreRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch/restore`,
            data,
            signal: this._injectAbort(this.abortId || 'batchRestoreRelation', this.autoAbort),
        });
    }

    /**
     * Sync associations of one or multiple related models with another model.
     *
     * @param   {String | Number}   id             The ID of the resource item
     * @param   {String}            relation       The name of the relation
     * @param   {Object}            data           The payload of the XHR request
     * @param   {Number[] | Object} data.resources If it is an array, then array items would be IDs of related models that you would like to sync. If it is an object, then its keys would be IDs of
     *   related models and values - objects containing pivot table fields to be set upon syncing the related model.
     * @returns {AxiosPromise}                     An AxiosPromise
     */
    sync(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/sync`,
            data,
            signal: this._injectAbort(this.abortId || 'sync', this.autoAbort),
        });
    }

    /**
     * Toggle relations of one or multiple related models with another model.
     *
     * @param   {String | Number}   id             The ID of the resource item
     * @param   {String}            relation       The name of the relation
     * @param   {Object}            data           The payload of the XHR request
     * @param   {Number[] | Object} data.resources If it is an array, then array items would be IDs of related models that you would like to sync. If it is an object, then its keys would be IDs of
     *   related models and values - objects containing pivot table fields to be set upon syncing the related model.
     * @returns {AxiosPromise}                     An AxiosPromise
     */
    toggle(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/toggle`,
            data,
            signal: this._injectAbort(this.abortId || 'toggle', this.autoAbort),
        });
    }

    /**
     * Attach one or multiple resources to a relation
     *
     * @param   {String | Number}   id             The ID of the resource item
     * @param   {String}            relation       The name of the relation
     * @param   {Object}            data           The payload of the XHR request
     * @param   {Number[] | Object} data.resources If it is an array, then array items would be IDs of related models that you would like to sync. If it is an object, then its keys would be IDs of
     *   related models and values - objects containing pivot table fields to be set upon syncing the related model.
     * @returns {AxiosPromise}                     An AxiosPromise
     */
    attach(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/attach`,
            data,
            signal: this._injectAbort(this.abortId || 'attach', this.autoAbort),
        });
    }

    /**
     * Detach one or multiple (or partial) resources of a relation
     *
     * @param   {String | Number}   id             The ID of the resource item
     * @param   {String}            relation       The name of the relation
     * @param   {Object}            data           The payload of the XHR request
     * @param   {Number[] | Object} data.resources If it is an array, then array items would be IDs of related models that you would like to sync. If it is an object, then its keys would be IDs of
     *   related models and values - objects containing pivot table fields to be set upon syncing the related model.
     * @returns {AxiosPromise}                     An AxiosPromise
     */
    detach(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/detach`,
            data,
            signal: this._injectAbort(this.abortId || 'detach', this.autoAbort),
        });
    }

    /**
     * Pivot one or multiple pivot fields of a relation
     *
     * @param   {String | Number} id         The ID of the resource item
     * @param   {String}          relation   The name of the relation
     * @param   {String | Number} relationId The ID of the relation
     * @param   {Object}          data       The payload of the XHR request
     * @param   {Object}          data.pivot An field value object
     * @returns {AxiosPromise}               An AxiosPromise
     */
    pivot(id, relation, relationId, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/pivot`,
            data,
            signal: this._injectAbort(this.abortId || 'pivot', this.autoAbort),
        });
    }

    /**
     * Associate a single resource to a single relational resource item
     *
     * @param   {String | Number} id         The ID of the resource item
     * @param   {String}          relation   The name of the relation
     * @param   {String | Number} relationId The ID of the relation that will be associated
     * @returns {AxiosPromise}               An AxiosPromise
     */
    associate(id, relation, relationId) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/associate`,
            data: {
                related_key: relationId,
            },
            signal: this._injectAbort(this.abortId || 'associate', this.autoAbort),
        });
    }

    /**
     * Dissociate a single resource to a single relational resource item
     *
     * @param   {String | Number} id         The ID of the resource item
     * @param   {String}          relation   The name of the relation
     * @param   {String | Number} relationId The ID of the relation that will be associated
     * @returns {AxiosPromise}               An AxiosPromise
     */
    dissociate(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/dissociate`,
            signal: this._injectAbort(this.abortId || 'dissociate', this.autoAbort),
        });
    }

    /**
     * Abort an ongoing request by ID
     *
     * @param   {String} id The ID of the abortController. This can be a method name (f.e. index, show) or a custom name that was passed via the withAbortId method
     * @returns {void}      Absolutely nothing
     */
    abort(id) {
        if (this._abortControllers[id]) {
            this._abortControllers[id].abort();
            delete this._abortControllers[id];
        }
    }

    /**
     * Sets autoAbort to true for the entire instance.
     *
     * @returns {LaravelOrionAPI} Instance of the LaravelOrionAPI
     */
    withAutoAbort() {
        // Create a clone of this class
        // https://stackoverflow.com/a/44782052
        const clonedThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        // Append autoAbort to this chain
        clonedThis.autoAbort = true;
        // Return appended 'this'
        return clonedThis;
    }

    /**
     * Sets autoAbort to false for the entire instance.
     *
     * @returns {LaravelOrionAPI} Instance of the LaravelOrionAPI
     */
    withoutAutoAbort() {
        // Create a clone of this class
        // https://stackoverflow.com/a/44782052
        const clonedThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        // Append autoAbort to this chain
        clonedThis.autoAbort = false;
        // Return appended 'this'
        return clonedThis;
    }

    /**
     * Set the abortId for the entire instance
     *
     * @returns {LaravelOrionAPI} Instance of the LaravelOrionAPI
     */
    withAbortId(id) {
        if (!id) {
            throw new Error('No abort ID declared');
        }
        // Create a clone of this class
        // https://stackoverflow.com/a/44782052
        const clonedThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        // Append autoAbort to this chain
        clonedThis.abortId = id;
        // Return appended 'this'
        return clonedThis;
    }

    /**
     * Adds autoAbort logic to a specific method and returns a signal that can be used.
     *
     * @private
     * @param   {String}      abortControllerId Name of the method
     * @param   {Boolean}     autoAbort         Set the autoAbort to true or false
     * @returns {AbortSignal}                   An AbortSignal
     */
    _injectAbort(abortControllerId, autoAbort = true) {
        // Auto abort if autoAbort is true and no abortId was set
        if (autoAbort && this._abortControllers[abortControllerId]) {
            this.abort(abortControllerId);
        }

        // Create abort controller and store it in this instance
        const abortController = new AbortController();
        this._abortControllers[abortControllerId] = abortController;
        // Return Signal
        return abortController.signal;
    }
}

export default LaravelOrionAPI;
