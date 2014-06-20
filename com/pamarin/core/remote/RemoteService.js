/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.core.remote.RemoteService', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.proxy.ProxyChain'
], function(module, Class, ProxyChain) {

    /**
     * @class RemoteService
     */
    var RemoteService = Class.define(module.id, (function() {

        return {
            /**/
            static: {
                /**
                 * @param {String} name
                 * @param {String} clazz
                 * @returns {Class}
                 */
                define: function(name, clazz) {
                    return ProxyChain.makeProxy(name, clazz);
                }
            }
        };
    })());



    return RemoteService;
});
