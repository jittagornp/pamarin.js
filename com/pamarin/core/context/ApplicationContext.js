/**
 * @author jittagorn pitakmetagoon
 * create 13/10/2013
 */
define('com.pamarin.core.context.ApplicationContext', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.creational.Namespace',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.exception.IllegalStateException'
], function(module, Class, Array, Types, Assert, Namespace, Singleton, IllegalStateException) {

    /**
     * @class ApplicationContext
     */
    var ApplicationContext = Class.define(module.id, (function() {
        //dependencies
        var slice = Array.prototype.slice;

        var copyProperties = ['application', 'contextParameters', 'ui.jigsaws', 'pages', 'beans', 'pageMapping'];
        var mergeProperties = ['listeners', 'tests', 'cookies'];

        var context = {};

        function mergeArray(instance, name) {
            if (!Types.isArray(instance[name])) {
                return;
            }

            var target = Namespace.createAndSet(name, [], context);
            Array.forEachIndex(instance[name], function(obj) {
                !Array.hasElement(target, obj) && target.push(obj);
            });
        }

        return {
            /**/
            static: {
                /**/
                getInstance: function() {
                    return Singleton.getInstance(ApplicationContext);
                }
            },
            /**/
            constructor: function() {
                throw new IllegalStateException('can\'t initialize \'{}\' instance by new operation.', module.id);
            },
            /**
             * @param {Object...} contexts
             * @returns {Object}
             */
            mergeContext: function() {
                var contexts = slice.call(arguments);
                Assert.assert({Object: contexts}, module.id + '.mergeContext(Object... contexts)');

                Array.forEachIndex(contexts, function(sourceContext) {
                    Array.forEachIndex(mergeProperties, function(namespace) {
                        mergeArray(sourceContext, namespace);
                    });

                    Array.forEachIndex(copyProperties, function(namespace) {
                        Namespace.copyChildren(namespace, sourceContext, context);
                    });
                });

                return this;
            },
            /**
             * @param {String} key
             * @returns {T}
             */
            getParameter: function(key) {
                return contextManager.getParameter(key);
            }
        };
    })());



    return ApplicationContext;
});