/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.data.domain.Chunk', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.data.domain.Slice',
    'com.pamarin.core.util.collection.ArrayList'
], function(module, Class, Slice, ArrayList) {

    /**
     * @class Chunk<T>
     * @implements Slice<T>
     */
    var Chunk = Class.define(module.id, {
        /**/
        abstract: {
            //
        },
        /**/
        variable: {
            content_: null,
            pageable_: null
        },
        /**/
        constructor: function(content, pageable) {
            this.content_ = content;
            this.pageable_ = pageable;
        },
        /**
         * @returns {Number}
         */
        getNumber: function() {
            return this.pageable_ === null ? 0 : this.pageable_.getPageNumber();
        },
        /**
         * @returns {Number}
         */
        getSize: function() {
            return this.pageable_ === null ? 0 : this.pageable_.getPageSize();
        },
        /**
         * @returns {Number}
         */
        getNumberOfElements: function() {
            return this.getContent().size();
        },
        /**
         * @returns {Boolean}
         */
        hasPrevious: function() {
            return this.getNumber() > 0;
        },
        /**
         * @returns {Boolean}
         */
        isFirst: function() {
            return !this.hasPrevious();
        },
        /**
         * @returns {Boolean}
         */
        isLast: function() {
            return !this.hasNext();
        },
        /**
         * @returns {Pageable}
         */
        nextPageable: function() {
            return this.hasNext() ? this.pageable_.next() : null;
        },
        /**
         * @returns {Pageable}
         */
        previousPageable: function() {
            return this.hasPrevious() ? this.pageable_.previousOrFirst() : null;
        },
        /**
         * @returns {Boolean} 
         */
        hasContent: function() {
            return !this.getContent().isEmpty();
        },
        /**
         * @returns {List<T>}
         */
        getContent: function() {
            console.log(this.content_);
            if (this.content_ === null) {
                this.content_ = new ArrayList();
            }

            return this.content_;
        },
        /**
         * @returns {Sort} 
         */
        getSort: function() {
            return this.pageable_ === null ? null : this.pageable_.getSort();
        },
        /**
         * Iterator<T>
         */
        iterator: function() {
            return this.getContent().interator();
        },
        /**
         * @returns {Boolean} 
         */
        equals: function(obj) {
            if (this === obj) {
                return true;
            }

            if (!(obj instanceof Chunk)) {
                return false;
            }

            if (!this.getContent().equals(obj.getContent())) {
                return false;
            }

            return this.pageable_ === null ? obj.pageable_ === null : this.pageable_.equals(obj.pageable_);
        }
    }).implements(Slice);



    return Chunk;
});