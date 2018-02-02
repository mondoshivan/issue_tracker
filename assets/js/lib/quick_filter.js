
class QuickFilter {

    constructor(filters) {
        this.filters = filters;
    }

    filter(issues) {
        for (let i=0; i<this.filters.length; i++) {
            issues = this.filters[i].filter(issues);
        }
        return issues;
    }

    getFilter(id) {
        for (let i=0; i<this.filters.length; i++) {
            if (this.filters[i].id === id) {
                return this.filters[i];
            }
        }
        return null;
    }

    push(filter) {
        this.filters.push(filter);
    }
}