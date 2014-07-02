/**
 * @author jittagorn pitakmetagoon
 * create 04/05/2014
 */
define('com.pamarin.jigsaw.JigsawContainer', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.ui.loader.JigsawLoader',
    'com.pamarin.web.filter.PathFilter',
    'com.jquery.core.JQuery',
    'com.pamarin.jigsaw.JigsawManager',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.creational.Singleton',
    'com.pamarin.core.util.StringUtils'
], function(module, Class, PageContext, JigsawLoader, PathFilter, $, JigsawManager, LoggerFactory, Singleton, StringUtils) {

    /**
     * @class JigsawContainer
     */
    var JigsawContainer = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var CONTEXT_SCOPED = ['page', 'tab', 'section'];

        var jigsawManager = JigsawManager.getInstance();
        var pageContext = PageContext.getInstance();
        var contextQueue = {};
        var started = true;

        function log(contextScoped, contextBean, loadPath) {
            LOG.debug('scoped --> {}', contextScoped);
            loadPath && LOG.debug('loadPath --> {}', loadPath);
            LOG.debug('contextBean --> {}', contextBean);
            LOG.debug('callerQueue --> {}', contextQueue);
        }

        function concatQuerystring(context) {
            var querystring = context.getQuerystring();
            do {
                var child = context.getChild();
                if (child !== null) {
                    querystring = querystring + '&'
                            + context.getChildContextAttribute() + '='
                            + child.getName();
                }

                context = child;
            } while (context !== null);

            if (querystring[0] === '&') {
                querystring = querystring.substr(1);
            }

            return querystring;
        }

        function generatePath(context) {
            var path = PathFilter.filter(context.getContextPath());
            return path + (StringUtils.found(path, '?') ? '&' : '?')
                    + concatQuerystring(context);
        }

        function popQueue(scoped) {
            var index = CONTEXT_SCOPED.indexOf(scoped);
            var q = CONTEXT_SCOPED[index + 1];
            var ctx = contextQueue[q];
            delete contextQueue[q];
            return ctx;
        }

        function startController(contextScoped, contextBean) {
            var scopedName = '[data-scoped=' + contextScoped + ']';
            var $context = $(scopedName);
            var hasContext = $context.length > 0;

            if (!hasContext) {
                popQueue(contextScoped);
                started = true;
                log(contextScoped, contextBean);
                return;
            }

            var contextLoaded = $context.attr('data-state') === 'loaded';
            if (contextLoaded) {
                jigsawManager.startControllerByScoped(contextScoped);

                $context.attr('data-state', 'unload');
                popQueue(contextScoped);
                started = true;
                log(contextScoped, contextBean);
                return;
            }

            //lazy load context environment
            var loadPath = generatePath(contextBean);
            JigsawLoader.load(scopedName, loadPath, function() {
                jigsawManager.startControllerByScoped(contextScoped);
                var ctx = popQueue(contextScoped);
                if (!ctx) {
                    started = true;
                    return;
                }

                startController(ctx.scoped, ctx.context);
            });
            
            started = false;
            log(contextScoped, contextBean, loadPath);
        }

        function waitInQueue(contextScoped, contextBean) {
            contextQueue[contextScoped] = {
                scoped: contextScoped,
                context: contextBean
            };
        }

        function restartController(contextScoped, contextBean) {
            jigsawManager.stopControllerByScoped(contextScoped);
            if (started) {
                startController(contextScoped, contextBean);
                return;
            }

            waitInQueue(contextScoped, contextBean);
        }

        function startContextListener() {
            pageContext.addPageChangeListener(function(contextBean) {
                restartController('page', contextBean);
            }, false);

            pageContext.addTabChangeListener(function(contextBean) {
                restartController('tab', contextBean);
            }, false);

            pageContext.addSectionChangeListener(function(contextBean) {
                restartController('section', contextBean);
            }, false);
        }

        return {
            /**/
            static: {
                /**/
                getInstance: function() {
                    return Singleton.getInstance(JigsawContainer);
                }
            },
            /**/
            start: function() {
                startContextListener();
            }
        };
    })());



    return JigsawContainer;
});