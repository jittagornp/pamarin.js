/**
 * @author jittagorn pitakmetagoon
 * create 22/09/2013
 */
define('com.pamarin.core.page.PageContext', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.exception.IllegalStateException',
    'com.pamarin.core.logging.LoggerFactory'
], function(module, Class, Assert, ArrayList, Singleton, ApplicationContext, IllegalStateException, LoggerFactory) {

    /**
     * @class PageContext
     */
    var PageContext = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var applicationContext = ApplicationContext.getInstance();

        var context = {};
        var callbacks = new ArrayList();

        function reloadContext(page) {
            context.page = page;

            callbacks.forEachEntry(function(caller) {
                caller(context);
            });

            LOG.info('page context listebers callback size --> {}', callbacks.size());
        }

        return {
            /**/
            static: {
                /**
                 * @returns {PageContext}
                 */
                getInstance: function() {
                    return Singleton.getInstance(PageContext);
                }
            },
            /**/
            reloadContext: reloadContext,
            /**/
            varaible: {
                callback_: null
            },
            /**/
            constructor: function() {
                throw new IllegalStateException('can\'t initialize \'{}\' instance by new operation.', module.id);
            },
            /**
             * @param {Function} callback
             */
            addContextChangeListener: function(callback) {
                Assert.assertFunction(callback, module.id + '.addContextChangeListener(Function callback).');

                callbacks.add(callback);
                return this;
            },
            /**
             * @returns {String}
             */
            getCurrentPage: function() {
                return context.page;
            },
            /**
             * @returns {ApplicationContext} 
             */
            getApplicationContext: function() {
                return applicationContext;
            }
        };
    })());



    return PageContext;
});