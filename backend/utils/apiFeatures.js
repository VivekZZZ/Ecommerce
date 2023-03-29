class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr= queryStr
    }

    filter() {
        const queryCopy = { ...this.queryStr };


        // removing fields from the query
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        


        this.query = this.query.find(queryCopy);
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage*(currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip)

        return this
    }
    
}

module.exports = APIFeatures