/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.web.model.Tab', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class) {
    
    /**
     * @class Tab
     * @model
     */
    var Tab = Class.define(module.id, {
        /**/
        variable: {
            url_: null
        },
        /**/
        constructor: function() {

        },
        /**
         * @returns {String}
         */
        getUrl: function() {
            return this.url_;
        },
        /**
         * @param {String} url 
         */
        setUrl: function(url) {
            this.url_ = url;
        }
    });
    
    
    
    return Tab;
});