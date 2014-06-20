/**
 * @author jittagorn pitakmetagoon
 * create 19/05/2014
 */
define('com.pamarin.data.domain.AbstractPageRequest', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.data.domain.Pageable',
    'com.pamarin.core.exception.IllegalArgumentException'
], function(module, Class, Pageable, IllegalArgumentException) {

    /**
     * @class AbstractPageRequest
     * @model
     * @see https://github.com/spring-projects/spring-data-commons/blob/master/src/main/java/org/springframework/data/domain/AbstractPageRequest.java
     */
    var AbstractPageRequest = Class.define(module.id, {
        /**/
        variable: {
            page_: 0,
            size_: 0
        },
        /**/
        constructor: function(page, size) {
            if (page < 0) {
                throw new IllegalArgumentException('page index must not be less than zero!');
            }

            if (size < 1) {
                throw new IllegalArgumentException('page size must not be less than one!');
            }

            this.page_ = page;
            this.size_ = size;
        },
        /**
         * @returns {Number}
         */
        getOffset: function() {
            return this.page_ * this.size_;
        },
        /**
         * @returns {Number}
         */
        getPageNumber: function() {
            return this.page_;
        },
        /**
         * @returns {Number}
         */
        getPageSize: function() {
            return this.size_;
        },
        /**/
        hasPrevious: function() {
            return this.page_ > 0;
        },
        /** 
         * @returns {Pageable}
         */
        previousOrFirst: function() {
            return this.hasPrevious() ? this.previous() : this.first();
        },
        /**/
        abstract: {
            /**
             * @returns {Pageable}
             */
            next: function() {

            },
            /**
             * @returns {Pageable}
             */
            previous: function() {

            },
            /**
             * @returns {Pageable}
             */
            first: function() {

            }
        },
        /**
         * @param {T} obj
         * @returns {Boolean}
         */
        equals: function(obj) {
            if (!(obj instanceof Pageable)) {
                return false;
            }

            if (obj.getPageNumber() === this.page_ && obj.getPageSize() === this.size_) {
                return true;
            }

            return false;
        }
    }).implements(Pageable);



    return AbstractPageRequest;
});