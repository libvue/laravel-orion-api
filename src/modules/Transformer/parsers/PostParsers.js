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
        // We assume here we get a proper array, we only need to filter out the undefined/null values
        const clonedValue = [...value];
        clonedValue.forEach((obj, index) => {
            // Check if the value should be removed
            if (typeof obj.value === 'undefined' || obj.value === null) {
                clonedValue.splice(index, 1);
            } else {
                // We can keep the value, but we must ensure the type!
                // eslint-disable-next-line no-param-reassign
                obj.value = obj.value;
            }
        });
        return clonedValue;
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
                    field: value.replace('-', ''),
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
