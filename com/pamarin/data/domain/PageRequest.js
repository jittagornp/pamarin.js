/**
 * @author jittagorn pitakmetagoon
 * create 19/05/2014
 */
define('com.pamarin.data.domain.PageRequest', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.data.domain.AbstractPageRequest',
    'com.pamarin.data.domain.Sort'
], function(module, Class, AbstractPageRequest, Sort) {

    /**
     * @class PageRequest
     * @model
     */
    var PageRequest = Class.define(module.id, {
        /**/
        variable: {
            sort_: null
        },
        /**
         * @param {Number} page
         * @param {Number} size
         * @param {Sort.Direction} direction
         * @param {String...} properties
         */
        constructor: function(page, size, direction, properties) {
            var sort = direction;
            if (arguments.length >= 4) {
                sort = new Sort(direction, properties);
            }

            this.__super__.constructor.call(this, page, size);
            this.sort_ = sort;
        },
        /**
         * @override
         * @returns {Pageable}
         */
        next: function() {
            return new PageRequest(this.getPageNumber() + 1, this.getPageSize(), this.getSort());
        },
        /**
         * @override
         * @returns {Pageable}
         */
        previous: function() {
            return this.getPageNumber() === 0
                    ? this :
                    new PageRequest(this.getPageNumber() - 1, this.getPageSize(), this.getSort());
        },
        /**
         * @override
         * @returns {Pageable}
         */
        first: function() {
            return new PageRequest(0, this.getPageSize(), this.getSort());
        },
        /**
         * @returns {Sort}
         */
        getSort: function() {
            return this.sort_;
        },
        /**/
        equals: function(obj) {
            if (!(obj instanceof PageRequest)) {
                return false;
            }

            var superEquals = PageRequest.superEquals.call(this, obj);
            if (!superEquals) {
                return false;
            }

            return this.getSort() === null
                    ? obj.getSort() === null
                    : this.getSort().equals(obj.getSort());
        }
    }).extends(AbstractPageRequest);



    return PageRequest;
});