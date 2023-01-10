import AxiosInstance from './modules/AxiosInstance';
import Transformer from './modules/Transformer/Transformer';
import AXIOS_CONFIG from './configs/axios';

class LaravelOrionAPI extends AxiosInstance {
    constructor(AxiosConfig = AXIOS_CONFIG) {
        super(AxiosConfig);
        this.baseURL = '/';
        this.path = '';
    }

    index(data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${Transformer.toGetQuery(data)}`,
        });
    }

    search(data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/search`,
            data: Transformer.toPostData(data),
        });
    }

    store(data, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: this.path,
            data,
        });
    }

    show(id, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}${Transformer.toGetQuery(data)}`,
        });
    }

    update(id, data, multipart) {
        if (multipart) {
            data.append('_method', 'PATCH');
        }
        return this.axios({
            method: multipart ? 'POST' : 'PATCH',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}`,
            data,
        });
    }

    destroy(id) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}`,
        });
    }

    batchStore(data, multipart = false) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/batch`,
            data,
        });
    }

    batchUpdate(data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/batch`,
            data,
        });
    }

    batchDestroy(data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/batch`,
            data,
        });
    }

    indexRelation(id, relation, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}${Transformer.toGetQuery(data)}`,
        });
    }

    searchRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/search`,
            data: Transformer.toPostData(data),
        });
    }

    showRelation(id, relation, relationId, data) {
        return this.axios({
            method: 'GET',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}${Transformer.toGetQuery(data)}`,
        });
    }

    storeRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}`,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            data,
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
        });
    }

    destroyRelation(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}`,
        });
    }

    restoreRelation(id, relation, relationId) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/restore`,
        });
    }

    batchStoreRelation(id, relation, data, multipart) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            ...(multipart && { headers: { 'Content-Type': 'multipart/form-data' } }),
            url: `${this.path}/${id}/${relation}/batch`,
            data,
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
        });
    }

    batchDestroyRelation(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch`,
            data,
        });
    }

    batchRestoreRelation(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/batch/restore`,
            data,
        });
    }

    sync(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/sync`,
            data,
        });
    }

    toggle(id, relation, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/toggle`,
            data,
        });
    }

    attach(id, relation, data) {
        return this.axios({
            method: 'POST',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/attach`,
            data,
        });
    }

    detach(id, relation, data) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/detach`,
            data,
        });
    }

    pivot(id, relation, relationId, data) {
        return this.axios({
            method: 'PATCH',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/pivot`,
            data,
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
        });
    }

    dissociate(id, relation, relationId) {
        return this.axios({
            method: 'DELETE',
            baseURL: this.baseURL,
            url: `${this.path}/${id}/${relation}/${relationId}/dissociate`,
        });
    }
}

export default LaravelOrionAPI;
