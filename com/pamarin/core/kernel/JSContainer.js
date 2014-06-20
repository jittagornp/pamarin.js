/**
 * @author jittagorn pitakmetagoon
 * create 22/01/2014
 */
define('com.pamarin.core.kernel.JSContainer', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Interface',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.util.collection.HashMap',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.exception.IllegalArgumentException',
    'com.pamarin.core.structural.Proxy',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.behavioral.Chain'
], function(module, Class, Interface, ContextListener, Singleton, HashMap, Types, IllegalArgumentException, Proxy, LoggerFactory, Chain) {

    /**
     * @class JSContainer
     */
    var JSContainer = Class.define(module.id, (function() {

        var regisSize = 0;
        var LOG = LoggerFactory.getLogger(module.id);
        var contextListener = new HashMap();

        function isLastest() {
            return (--regisSize) === 0;
        }

        function register(listener, callback) {
            Interface.ensureImplements(listener, ContextListener);
            contextListener.put(listener.getClass().getName(), listener);

            //call callback when last listener registered
            isLastest() && Types.isFunction(callback) && callback.call(this);
        }

        function checkRegis(callback, Listener) {
            if (Types.isClass(Listener)) {
                register.call(this, Singleton.getInstance(Listener), callback);
            } else if (Types.isClassInstance(Listener)) {
                register.call(this, Listener, callback);
            } else {
                throw new IllegalArgumentException('Invalid input type parameter, ' + module.id + '.registerContextListener(T extends ContextListner | Array<String> | String Listener)');
            }
        }

        function checkRequire(Listener, callback) {
            Types.isString(Listener) ? require([Listener], Proxy.call(this, checkRegis, callback)) : checkRegis.call(this, callback, Listener);
        }

        return {
            /**
             * for start all context listener
             */
            start: function() {
                contextListener.forEachEntry(function(listener) {
                    LOG.debug('start context listener [{}]', listener.getClass().getName());
                    listener.start();
                });
            },
            /**
             * for stop all context listener
             */
            stop: function() {
                contextListener.forEachEntry(function(listener) {
                    LOG.debug('destroy context listener [{}]', listener.getClass().getName());
                    listener.destroy();
                });
            },
            /**
             * for register context listener into container
             * 
             * @param {T extends ContextListener} Listener
             * @param {Function} callback
             */
            registerContextListener: function(Listener, callback) {
                if (Types.isArray(Listener)) {
                    regisSize = regisSize + Listener.length;
                    for (var index = 0; index < regisSize; index++) {
                        checkRequire.call(this, Listener[index], callback);
                    }
                } else {
                    regisSize = 1;
                    checkRequire.call(this, Listener);
                }
            }
        };
    })());



    return Singleton.getInstance(JSContainer);
});