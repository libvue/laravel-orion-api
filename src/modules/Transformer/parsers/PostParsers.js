export default class PostParsers {
    static parseByKey(key, value) {
        if (key === 'sort') {
            return this.parseSort(value);
        }
        if (key === 'filters') {
            return this.parseFilters(value);
        }
        if (key === 'search') {
            return this.parseSearch(value);
        }
        return value;
    }

    static parseFilters(value) {
        return JSON.parse(JSON.stringify(value)).filter((obj) => typeof obj.value !== 'undefined');
    }

    static parseSearch(value) {
        if (typeof value === 'string' && value !== '') {
            return {
                value,
                case_sensitive: false,
            };
        }
        return value;
    }

    static parseSort(value) {
        // We received a string like '-id' or 'id' Now parse it.
        if (typeof value === 'string') {
            return [
                {
                    field: value.replace(/^-/i, ''),
                    direction: value.startsWith('-') ? 'desc' : 'asc',
                },
            ];
        }
        if (typeof value === 'object' && Array.isArray(value) && value !== null) {
            // We re
            return value;
        }
        return value;
    }
}
