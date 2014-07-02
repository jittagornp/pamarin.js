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
    'com.pamarin.core.page.ContextMappingAdapter'
], function(module, Class, Router, Urls, PageContext, LoggerFactory, ContextMappingAdapter) {

    /**
     * @class PageContextManager
     */
    var PageContextManager = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var pageContext = PageContext.getInstance();
        var page = pageContext
                .getApplicationContext()
                .getParameter('page');
        var started_ = false;

        var pageMapping = null;
        var tabMapping = null;
        var sectionMapping = null;

        var _pctx = null;
        var _tctx = null;

        var trigged = {
            tab: false,
            section: false
        };
        var active = {};


        var pageMapping = new ContextMappingAdapter({
            name: 'page',
            parentContext: null,
            context: page.mapping,
            childContextAttribute: 'tab'
        });

        pageMapping.onReloadContext = function(pctx) {
            _pctx = pctx;
            active.page = true;
            LOG.info('current page --> [{}]', pctx.getContextPath());

            var tabSettings = {
                name: 'tab',
                parentContext: pctx,
                currentPath: pctx.getFullContextPath(),
                childContextAttribute: 'section'
            };

            tabMapping = new ContextMappingAdapter(tabSettings);
            tabMapping.onReloadContext = function(tctx) {
                _tctx = tctx;
                active.tab = true;
                LOG.info('current tab --> [{}]', tctx.getContextPath());

                var sectionSettings = {
                    name: 'section',
                    parentContext: tctx,
                    currentPath: tctx.getFullContextPath()
                };

                sectionMapping = new ContextMappingAdapter(sectionSettings);
                sectionMapping.onReloadContext = function(sctx) {
                    LOG.info('current section --> [{}]', sctx.getContextPath());

                    sctx.setChild(null);
                    sctx.setParent(_tctx);
                    _tctx.setChild(sctx);
                    _tctx.setParent(_pctx);
                    _pctx.setChild(_tctx);
                    _pctx.setParent(null);

                    if (active.hasOwnProperty('page')) {
                        pageContext.reloadPage(_pctx);
                    }

                    if (active.hasOwnProperty('tab')) {
                        pageContext.reloadTab(_tctx);
                    }

                    pageContext.reloadSection(sctx);

                    LOG.info('-------------------------------------------------------');
                    active = {};
                };

                trigged.section = true;
                sectionMapping.trigChange();
            };

            trigged.tab = true;
            tabMapping.trigChange();
        };

        return {
            /**/
            static: {
                /**/
                start: function() {
                    if (started_) {
                        return;
                    }

                    started_ = true;
                    var listener = function(data) {
                        pageMapping.trigChange(data.index, data.afters);

                        if (!trigged.tab) {
                            tabMapping.trigChange(data.index, data.afters);
                        }

                        if (!trigged.section) {
                            sectionMapping.trigChange(data.index, data.afters);
                        }

                        trigged.tab = false;
                        trigged.section = false;
                    };

                    Router.onRoute(listener);
                    pageMapping.trigChange(-1, Urls.getPathArray());
                    trigged.tab = false;
                    trigged.section = false;
                }
            }
        };
    })());



    return PageContextManager;
});