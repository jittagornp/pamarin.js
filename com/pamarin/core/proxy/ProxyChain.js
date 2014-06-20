/**
 * @author jittagorn pitakmetagoon
 * create 12/05/2014
 */
define('com.pamarin.core.proxy.ProxyChain', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.behavioral.Chain'
], function(module, Class, Chain) {

    /**
     * @class ProxyChain
     * example >>
     * -------------------------------------------------------------------------
     * var MyProxy = ProxyChain.makeProxy('MyProxy', {
     * 
     *     load : function(chain, url){
     *          //chain.done();
     *     }
     * });
     * 
     * var instance = new MyProxy();
     * instance.load('http://pamarin.com/service/something').then(function(response){
     * 
     * })
     */
    var ProxyChain = Class.define(module.id, (function() {

        function applyChain(instance, method, args) {
            return Chain.process(function(chain) {
                return method.apply(instance, [chain].concat(args));
            }, 50);
        }

        return {
            /**/
            static: {
                /**
                 * @param {String} name
                 * @param {String} clazz
                 * @returns {Class}
                 */
                makeProxy: function(name, clazz) {
                    clazz.__proxy__ = clazz.__proxy__ || {};
                    clazz.__proxy__.invokeAll = function(method, args, name) {
                        return applyChain(this, method, args);
                    };

                    return Class.define(name, clazz);
                }
            }
        };
    })());



    return ProxyChain;
});
