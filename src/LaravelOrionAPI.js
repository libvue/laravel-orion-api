import AxiosInstance from "./AxiosInstance";

export default class LaravelOrionAPI extends AxiosInstance {

    constructor(AxiosConfig = {}) {
        super(AxiosConfig);
    }

    index(data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            path: this.path,
            data,
        });
    }

    search(data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/search`,
            data,
        });
    }

    store(data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: this.path,
            data,
        });
    }

    show(id) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            path: `${this.path}/${id}`,
        });
    }

    update(id, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}`,
            data,
        });
    }

    destroy(id) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            path: `${this.path}/${id}`,
        });
    }

    batchStore(data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/batch`,
            data,
        });
    }

    batchUpdate(data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/batch`,
            data,
        });
    }

    batchDestroy(data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            path: `${this.path}/batch`,
            data,
        });
    }

    indexRelation(id, relation, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}`,
            data,
        });
    }

    searchRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/search`,
            data,
        });
    }

    showRelation(id, relation, relationId, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}`,
            data,
        });
    }

    storeRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}`,
            data,
        });
    }

    updateRelation(id, relation, relationId, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}`,
            data,
        });
    }

    destroyRelation(id, relation, relationId) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}`,
        });
    }

    restoreRelation(id, relation, relationId) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}/restore`,
        });
    }

    batchStoreRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/batch`,
            data,
        });
    }

    batchUpdateRelation(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/batch`,
            data,
        });
    }

    batchDestroyRelation(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/batch`,
            data,
        });
    }

    batchRestoreRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/batch/restore`,
            data,
        });
    }

    sync(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/sync`,
            data,
        });
    }

    toggle(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/toggle`,
            data,
        });
    }

    attach(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/attach`,
            data,
        });
    }

    detach(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/detach`,
            data,
        });
    }

    pivot(id, relation, relationId, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}/pivot`,
            data,
        });
    }

    associate(id, relation, relatedKey) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/associate`,
            data: {
                related_key: relatedKey
            }
        });
    }

    dissociate(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            path: `${this.path}/${id}/${relation}/${relationId}/disassociate`,
        });
    }
}
