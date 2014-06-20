/**
 * @author jittagorn pitakmetagoon
 * create 21/03/2014
 */
define('com.pamarin.web.context.UnseenContext', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Assert',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.util.Router',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.exception.IllegalStateException',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.web.model.Tab',
    'com.pamarin.web.model.UnseenCtx',
    'com.pamarin.web.repositories.UnseenRepo'
], function(module, Class, Assert, Types, Urls, Router, StringUtils, ArrayList, Singleton, IllegalStateException, LoggerFactory, PageContext, Tab, UnseenCtx, unseenRepo) {

    /**
     * @class UnseenContext
     */
    var UnseenContext = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var pageContext = PageContext.getInstance();
        var applicationContext = pageContext.getApplicationContext();
        var cfg = applicationContext.getParameter('pages.unseen');
        var context = new UnseenCtx();
        context.setConfig(cfg);

        var contextListeners = new ArrayList();
        var tabChangeListeners = new ArrayList();
        /**/
        contextListener();
        pageContext.addContextChangeListener(contextListener);

        function cleanUnseen() {
            context.setUnseen(null);
            context.setTab(null);
            tabChangeListeners.clear();
            contextListeners.clear();

            LOG.info('CLEAN unseen context listeners / tab listeners');
        }

        function contextListener() {
            var page = pageContext.getCurrentPage();
            var shift = page.getShift();
            var paths = Urls.getFullPathIndexArray(shift);

            var unseenId = paths[0] || '';
            var isUnseen = unseenId[0] === cfg.notation;
            if (!isUnseen) {
                cleanUnseen();
                return;
            }

            callContextListner(unseenId);
        }

        function callContextListner(unseenId) {
            createUnseen();
            createTab(unseenId);

            tabChangeListeners.clear(); //clear tab listeners
            var itr = contextListeners.iterator();
            while (itr.hasNext()) {
                var listener = itr.next();
                listener.callback(context);
                if (listener.remove) {
                    itr.remove();
                }
            }

            LOG.info('unseen context listeners size --> {}', contextListeners.size());
        }

        Router.onRoute(checkTabChange);
        function checkTabChange(data) {
            var cuurentPage = pageContext.getCurrentPage();

            var isUnseen = StringUtils.startsWith(cuurentPage.getUrl(), '/' + cfg.notation);
            var isTabChange = data.index === (cuurentPage.getShift() + 1);
            if (isUnseen && isTabChange) {
                callTabChangeListener();
            }
        }

        function callTabChangeListener() {
            createTab(context.getUnseen().getUnseenId());

            var itr = tabChangeListeners.iterator();
            while (itr.hasNext()) {
                var listener = itr.next();
                listener.callback(context);
                if (listener.remove) {
                    itr.remove();
                }
            }

            LOG.info('unseen tab context listeners size --> {}', tabChangeListeners.size());
        }

        function createUnseen() {
            context.setUnseen(unseenRepo.findUnseen());
        }

        function createTab(unseenId) {
            var tab = new Tab();
            tab.setUrl(generateTabPath(unseenId));

            context.setTab(tab);
        }

        function generateTabPath(unseenId) {
            var page = pageContext.getCurrentPage();
            var path = Urls.getFullPathIndex(page.getShift());

            if (path === ('/' + unseenId)) {
                path = path + cfg.defaultTab;
            }

            LOG.info('unseen tab change --> {}', path);
            return path;
        }

        return {
            /**/
            constant: {
                DEFAULT_TAB: cfg.defaultTab
            },
            /**/
            constructor: function() {
                throw new IllegalStateException('can\'t initialize \'{}\' instance by new operation.', module.id);
            },
            /**
             * @returns {Unseen}
             */
            getCurrentUnseen: function() {
                return context.getUnseen();
            },
            /**
             * @returns {PageContext} 
             */
            getPageContext: function() {
                return pageContext;
            },
            /**
             * @returns {String} 
             */
            getCurrentTab: function() {
                return context.getTab();
            },
            /**
             * @param {Function} callback
             * @param {Boolean} remove_opt - default is true
             */
            addContextChangeListener: function(callback, remove_opt) {
                Assert.assert({
                    Function: callback,
                    BooleanOptional: remove_opt
                }, module.id + '.addContextChangeListener(Function callback, Boolean remove_opt).');

                contextListeners.add({
                    callback: callback,
                    remove: Types.isUndefined(remove_opt) ? true : remove_opt
                });

                return this;
            },
            /**
             * @param {Function} callback
             * @param {Boolean} remove_opt - default is true
             */
            addTabChangeListener: function(callback, remove_opt) {
                Assert.assert({
                    Function: callback,
                    BooleanOptional: remove_opt
                }, module.id + '.addTabChangeListener(Function callback, Boolean remove_opt).');

                tabChangeListeners.add({
                    callback: callback,
                    remove: Types.isUndefined(remove_opt) ? true : remove_opt
                });

                return this;
            },
            /**/
            static: {
                /**
                 * @returns {UnseenContext}
                 */
                getInstance: function() {
                    return Singleton.getInstance(UnseenContext);
                }
            }
        };
    })());



    return UnseenContext;
});
