export default class GetParsers {
    /**
     * parseByKey
     * @param key
     * @param value
     * @returns {*|string}
     */
    static parseByKey(key, value) {
        if (key === 'aggregates') {
            return this.parseAggregates(value);
        }
        if (key === 'includes') {
            return this.parseIncludes(value);
        }
        return `${key}=${value}`;
    }
    
    /**
     * parseAggregates
     * @param value
     * @returns {string}
     * @example
     * (GET) https://myapp.com/api/posts?with_count=user,meta
     * (GET) https://myapp.com/api/posts?with_exists=user,meta
     * (GET) https://myapp.com/api/users?with_avg=posts.stars
     * (GET) https://myapp.com/api/users?with_sum=posts.stars
     * (GET) https://myapp.com/api/users?with_min=posts.stars
     * (GET) https://myapp.com/api/users?with_max=posts.stars
     */
    static parseAggregates(value) {
        let queryStringPart = '';
        const aggregatePerType = {
            count: [],
            exists: [],
            avg: [],
            sum: [],
            min: [],
            max: [],
        };

        // Fill the aggregatePerType object
        value.forEach((aggregate) => {
            aggregatePerType[aggregate.type].push(aggregate.relation);
        });

        // Walk through each type and check if they have some data
        Object.entries(aggregatePerType).forEach(([key, array]) => {
            if (array.length > 0) {
                if (queryStringPart.length > 0) {
                    queryStringPart += '&';
                }
                queryStringPart += `with_${key}=${array.join(',')}`;
            }
        });
        return queryStringPart;
    }
    
    /**
     * parseIncludes
     * @param val
     * @returns {string}
     * @example
     * (GET) https://myapp.com/api/posts?include=user,meta
     */
    static parseIncludes(val) {
        return `include=${val.join(',')}`;
    }
}
