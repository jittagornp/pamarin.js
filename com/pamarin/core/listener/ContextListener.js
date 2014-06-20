/**
 * @author jittagorn pitakmetagoon
 * create 22/01/2014
 */
define('com.pamarin.core.listener.ContextListener', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface) {

    /**
     * define interface ContextListener
     */
    var ContextListener = Interface.define(module.id, {
        /**
         * call when page ready (page loaded)
         * 
         * @param {WebContextEvent} webContextEvent
         */
        start: function(webContextEvent) {

        },
        /**
         * call before close the browser
         * 
         * @param {WebContextEvent} webContextEvent
         */
        destroy: function(webContextEvent) {

        }
    });



    return ContextListener;
});