/**
 * @author jittagorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.web.repositories.UnseenRepo', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.web.adapter.UnseenAdapter',
    'com.pamarin.core.creational.Singleton'
], function(module, Class, UnseenAdapter, Singleton) {

    /**
     * @class UnseenRepo
     */
    var UnseenRepo = Class.define(module.id, {
        /**/
        variable: {
            adapter_: null
        },
        /**/
        constructor: function() {
            this.apapter_ = new UnseenAdapter();
        },
        /**
         * @returns {Unseen}
         */
        findUnseen: function() {
            return this.apapter_.fromJSON(window.pamarin.unseen);
        }
    });


    return Singleton.getInstance(UnseenRepo, null);
});