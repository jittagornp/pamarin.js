/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.data.domain.Page', [
    'module',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.data.domain.Slice'
], function(module, Interface, Slice) {

    /**
     * @interface Page
     * @extends Slice
     */
    var Page = Interface.define(module.id, {
        /**
         * @returns {Number}
         */
        getTotalPages: function() {

        },
        /**
         * @returns {Number}
         */
        getTotalElements: function() {

        }
    }).extends(Slice);



    return Page;
});