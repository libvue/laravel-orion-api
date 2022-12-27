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
            method: 'PATH',
            baseURL: this.baseURL,
            path: `${this.path}/${id}`,
            data,
        });
    }
    destroy() {}
    batchStore() {}
    batchUpdate() {}
    batchDestroy() {}

    storeRelation() {}
    updateRelation() {}
    destroyRelation() {}
    restoreRelation() {}
    batchStoreRelation() {}
    batchUpdateRelation() {}
    batchDestroyRelation() {}
    batchRestoreRelation() {}
    sync() {}
    toggle() {}
    detach() {}
    attach() {}
    pivot() {}
    associate() {}
    dissociate() {}
}
