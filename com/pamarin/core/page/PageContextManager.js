/**
 * @author jittagorn pitakmetagoon
 * create 14/06/2014
 */
define('com.pamarin.core.page.PageContextManager', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Router',
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.page.ContextBuilder',
    'com.pamarin.core.page.ContextMappingAdapter'
], function(module, Class, Router, Urls, PageContext, LoggerFactory, PageBuilder, ContextMappingAdapter) {

    /**
     * @class PageContextManager
     */
    var PageContextManager = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var pageContext = PageContext.getInstance();
        var started_ = false;

        var mapping = new ContextMappingAdapter({
            name: 'page',
            parentContext: null,
            context: pageContext
                    .getApplicationContext()
                    .getParameter('page.mapping'),
            childContextAttribute: 'tab'
        });

        mapping.reloadContext = function(page) {
            LOG.info('page [{}] --> {}', mapping.getContext().getId(), mapping.getContext());
            pageContext.reloadContext(page);
        };

        return {
            /**/
            static: {
                /**/
                start: function() {
                    if (!started_) {
                        Router.onRoute(function(data) {
                            mapping.trigChange(data.index, data.afters);
                        });

                        mapping.trigChange(-1, Urls.getPathArray());
                        started_ = true;
                    }
                }
            }
        };
    })());



    return PageContextManager;
});