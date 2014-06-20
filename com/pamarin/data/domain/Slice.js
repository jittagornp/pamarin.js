/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.data.domain.Slice', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface Slice
     */
    var Slice = Interface.define(module.id, {
        /**
         * @returns {Number}
         */
        getNumber: function() {

        },
        /**
         * @returns {Number} getSize
         */
        getSize: function() {

        },
        /**
         * @returns {Number}
         */
        getNumberOfElements: function() {

        },
        /**
         * @returns {List<T>}
         */
        getContent: function() {

        },
        /**
         * @returns {Boolean}
         */
        hasContent: function() {

        },
        /**
         * @returns {Sort}
         */
        getSort: function() {

        },
        /**
         * @returns {Boolean}
         */
        isFirst: function() {

        },
        /**
         * @returns {Boolean}
         */
        isLast: function() {

        },
        /**
         * @returns {Boolean}
         */
        hasNext: function() {

        },
        /**
         * @returns {Boolean}
         */
        hasPrevious: function() {

        },
        /**
         * @returns {Pageable}
         */
        nextPageable: function() {

        },
        /**
         * @returns {Pageable}
         */
        previousPageable: function() {

        }
    });



    return Slice;
});