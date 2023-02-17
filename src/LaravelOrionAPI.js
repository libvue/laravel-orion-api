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
    
    static make() {
        return new this();
    }
    
    index(data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort('index', this.autoAbort, this.abortId),
        });
    }

    search(data) {
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
            signal: this._injectAbort('search', this.autoAbort, this.abortId),
        });
    }

    store(data, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: this.path,
            data,
            signal: this._injectAbort('store', this.autoAbort, this.abortId),
        });
    }

    show(id, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort('show', this.autoAbort, this.abortId),
        });
    }

    update(id, data, multipart, method = 'PATCH') {
        if (multipart) {
            data.append('_method', method);
        }
        return this.axios({
            method: multipart ? 'POST' : method,
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}`,
            data,
            signal: this._injectAbort('update', this.autoAbort, this.abortId),
        });
    }

    destroy(id) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}`,
            signal: this._injectAbort('destroy', this.autoAbort, this.abortId),
        });
    }

    restore(id) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/restore`,
            signal: this._injectAbort('restore', this.autoAbort, this.abortId),
        });
    }

    batchStore(data, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort('batchStore', this.autoAbort, this.abortId),
        });
    }

    batchUpdate(data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort('batchUpdate', this.autoAbort, this.abortId),
        });
    }

    batchDestroy(data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/batch`,
            data,
            signal: this._injectAbort('batchDestroy', this.autoAbort, this.abortId),
        });
    }

    indexRelation(id, relation, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort('indexRelation', this.autoAbort, this.abortId),
        });
    }

    searchRelation(id, relation, data) {
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
            signal: this._injectAbort('searchRelation', this.autoAbort, this.abortId),
        });
    }

    showRelation(id, relation, relationId, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}${Transformer.toGetQuery(data)}`,
            signal: this._injectAbort('showRelation', this.autoAbort, this.abortId),
        });
    }

    storeRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}`,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            data,
            signal: this._injectAbort('storeRelation', this.autoAbort, this.abortId),
        });
    }

    updateRelation(id, relation, relationId, data, multipart) {
        if (multipart) {
            data.append('_method', 'PATCH');
        }
        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}/${relation}/${relationId}`,
            data,
            signal: this._injectAbort('updateRelation', this.autoAbort, this.abortId),
        });
    }

    destroyRelation(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}`,
            signal: this._injectAbort('destroyRelation', this.autoAbort, this.abortId),
        });
    }

    restoreRelation(id, relation, relationId) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/restore`,
            signal: this._injectAbort('restoreRelation', this.autoAbort, this.abortId),
        });
    }

    batchStoreRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}/${relation}/batch`,
            data,
            signal: this._injectAbort('batchStoreRelation', this.autoAbort, this.abortId),
        });
    }

    batchUpdateRelation(id, relation, data, multipart) {
        if (multipart) {
            data.append('_method', 'PATCH');
        }
        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch`,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            data,
            signal: this._injectAbort('batchUpdateRelation', this.autoAbort, this.abortId),
        });
    }

    batchDestroyRelation(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch`,
            data,
            signal: this._injectAbort('batchDestroyRelation', this.autoAbort, this.abortId),
        });
    }

    batchRestoreRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch/restore`,
            data,
            signal: this._injectAbort('batchRestoreRelation', this.autoAbort, this.abortId),
        });
    }

    sync(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/sync`,
            data,
            signal: this._injectAbort('sync', this.autoAbort, this.abortId),
        });
    }

    toggle(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/toggle`,
            data,
            signal: this._injectAbort('toggle', this.autoAbort, this.abortId),
        });
    }

    attach(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/attach`,
            data,
            signal: this._injectAbort('attach', this.autoAbort, this.abortId),
        });
    }

    detach(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/detach`,
            data,
            signal: this._injectAbort('detach', this.autoAbort, this.abortId),
        });
    }

    pivot(id, relation, relationId, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/pivot`,
            data,
            signal: this._injectAbort('pivot', this.autoAbort, this.abortId),
        });
    }

    associate(id, relation, relatedKey) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/associate`,
            data: {
                related_key: relatedKey,
            },
            signal: this._injectAbort('associate', this.autoAbort, this.abortId),
        });
    }

    dissociate(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/dissociate`,
            signal: this._injectAbort('dissociate', this.autoAbort, this.abortId),
        });
    }

    abort(id) {
        if (this._abortControllers[id]) {
            this._abortControllers[id].abort();
            delete this._abortControllers[id];
        }
    }

    withAutoAbort() {
        // Create a clone of this class
        // https://stackoverflow.com/a/44782052
        const clonedThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        // Append autoAbort to this chain
        clonedThis.autoAbort = true;
        // Return appended 'this'
        return clonedThis;
    }

    withoutAutoAbort() {
        // Create a clone of this class
        // https://stackoverflow.com/a/44782052
        const clonedThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        // Append autoAbort to this chain
        clonedThis.autoAbort = false;
        // Return appended 'this'
        return clonedThis;
    }

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

    _injectAbort(methodName, autoAbort = true, abortId = undefined) {
        // Auto abort if autoAbort is true and no abortId was set
        if (autoAbort && this._abortControllers[methodName] && !abortId) {
            this.abort(methodName);
        } else if (autoAbort && abortId && this._abortControllers[abortId]) {
            this.abort(abortId);
        }
        // Create abort controller and store it in this instance
        const abortController = new AbortController();
        this._abortControllers[abortId || methodName] = abortController;
        // Return Signal
        return abortController.signal;
    }
}

export default LaravelOrionAPI;
