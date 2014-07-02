/**
 * @author jittagorn pitakmetagoon
 * create 22/09/2013
 */
define('com.pamarin.core.page.PageContext', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.exception.IllegalStateException',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.Types'
], function(module, Class, ArrayList, Singleton, ApplicationContext, IllegalStateException, LoggerFactory, Types) {

    /**
     * @class PageContext
     */
    var PageContext = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var applicationContext = ApplicationContext.getInstance();
        var page = applicationContext.getParameter('page');

        var pageCtx = null;
        var tabCtx = null;
        var sectionCtx = null;

        var pageListeners = null;
        var tabListeners = null;
        var sectionListeners = null;
        var startTime = new Date().getTime();
        var reloadMinute = page.reloadMinute || 30;
        var maxChangePageTimes = page.maxChangePageTimes || 30;


        function reloadPage() {
            var endTime = (new Date()).getTime();
            if (maxChangePageTimes === 0 || (endTime - startTime) > 1000 * 60 * reloadMinute) {
                return true;
            }

            return false;
        }

        function callListener(name, context, listeners) {
            if (listeners && !listeners.isEmpty()) {
                listeners.forEachEntry(function(listener){
                    listener.listener.call(null, context);
                });

                LOG.info('call {} listebers size --> {}', name, listeners.size());
            }
        }

        function cleanListener(name, listeners) {
            if (listeners && !listeners.isEmpty()) {
                var itr = listeners.iterator();
                while (itr.hasNext()) {
                    if (itr.next().listener.remove) {
                        itr.remove();
                    }
                }

                LOG.info('clean {} listebers size --> {}', name, listeners.size());
            }
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
            /**
             * @param {ContextBean} context
             */
            reloadPage: function(context) {
                pageCtx = context;

                if (reloadPage()) {
                    window.location.reload(true);
                    return;
                }

                cleanListener('tab', tabListeners);
                callListener('page', context, pageListeners);

                maxChangePageTimes = maxChangePageTimes - 1;

            },
            /**
             * @param {ContextBean} context
             */
            reloadTab: function(context) {
                tabCtx = context;

                cleanListener('section', sectionListeners);
                callListener('tab', context, tabListeners);
            },
            /**
             * @param {ContextBean} context
             */
            reloadSection: function(context) {
                sectionCtx = context;

                callListener('section', context, sectionListeners);
            },
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
            addPageChangeListener: function(callback) {
                if (pageListeners === null) {
                    pageListeners = new ArrayList();
                }

                pageListeners.add({
                    listener: callback,
                    remove: false
                });

                return this;
            },
            /**
             * @param {Function} callback
             * @param {Boolean} remove_opt - default is true
             */
            addTabChangeListener: function(callback, remove_opt) {
                if (tabListeners === null) {
                    tabListeners = new ArrayList();
                }

                tabListeners.add({
                    listener: callback,
                    remove: Types.isNotdefined(remove_opt) ? true : remove_opt
                });

                return this;
            },
            /**
             * @param {Function} callback
             * @param {Boolean} remove_opt - default is true
             */
            addSectionChangeListener: function(callback, remove_opt) {
                if (sectionListeners === null) {
                    sectionListeners = new ArrayList();
                }

                sectionListeners.add({
                    listener: callback,
                    remove: Types.isNotdefined(remove_opt) ? true : remove_opt
                });

                return this;
            },
            /**
             * @returns {ContextBean}
             */
            getCurrentPage: function() {
                return pageCtx;
            },
            /**
             * @returns {ContextBean}
             */
            getCurrentTab: function() {
                return tabCtx;
            },
            /**
             * @returns {ContextBean}
             */
            getCurrentSection: function() {
                return sectionCtx;
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