/**
 * @author jittagorn pitakmetagoon
 * create 14/05/2014
 */
define('com.pamarin.data.domain.Pageable', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * @interface Pageable
     */
    var Pageable = Interface.define(module.id, {
        /**
         * @returns {Number}
         */
        getOffest : function(){
            
        },
        /**
         * @returns {Number}
         */
        getPageNumber : function(){
            
        },
        /**
         * @returns {Number}
         */
        getPageSize : function(){
            
        },
        /**
         * @returns {com.pamarin.data.model.Sort}
         */
        getSort : function(){
            
        }
    });



    return Pageable;
});