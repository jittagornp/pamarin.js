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
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.jigsaw.JigsawContextBean',
    'com.pamarin.core.exception.IllegalStateException'
], function(module, Class, PageContext, JigsawLoader, PathFilter, $, JigsawManager, LoggerFactory, Singleton, StringUtils, JigsawContextBean, IllegalStateException) {

    /**
     * @class JigsawContainer
     */
    var JigsawContainer = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);

        var SCOPEDS = JigsawContextBean.constant('SCOPEDS');
        var PAGE_SCOPED = JigsawContextBean.constant('PAGE_SCOPED');
        var TAB_SCOPED = JigsawContextBean.constant('TAB_SCOPED');
        var SECTION_SCOPED = JigsawContextBean.constant('SECTION_SCOPED');

        var CONTEXT_STATE_ATTRIBUTE = 'data-state';
        var contextState = {
            LOADED: 'loaded',
            UNLOAD: 'unload'
        };

        var started = false;

        return {
            /**/
            variable: {
                contextQueue_: null,
                started_: true,
                pageContext_: null,
                jigsawManager_: null
            },
            /**/
            constructor: function() {
                throw new IllegalStateException('can\'t initialize \'{}\' instance by new operation.', module.id);
            },
            /**
             * @param {ContextBean} contextBean
             * @returns {String}
             */
            concatQuerystring: function(context) {
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
            },
            /**
             * @param {String} contextScoped
             * @param {ContextBean} contextBean
             * @param {String} loadPath 
             */
            log: function(contextScoped, contextBean, loadPath) {
                LOG.debug('scoped --> {}', contextScoped);
                loadPath && LOG.debug('loadPath --> {}', loadPath);
                LOG.debug('contextBean --> {}', contextBean);
                LOG.debug('callerQueue --> {}', this.contextQueue_);
            },
            /**
             * @param {ContextBean} contextBean
             * @returns {String} 
             */
            generatePath: function(context) {
                var path = PathFilter.filter(context.getContextPath());
                return path + (StringUtils.found(path, '?') ? '&' : '?')
                        + this.concatQuerystring(context);
            },
            /**
             * @param {String} scoped
             * @param {Object} 
             */
            popQueue: function(scoped) {
                var index = SCOPEDS.indexOf(scoped);
                var sc = SCOPEDS[index + 1];
                var ctx = this.contextQueue_[sc];
                delete this.contextQueue_[sc];
                return ctx;
            },
            /**
             * @param {String} contextScoped
             * @param {ContextBean} contextBean
             */
            startController: function(contextScoped, contextBean) {
                var that = this;
                var scopedName = '[data-scoped=' + contextScoped + ']';
                var $context = $(scopedName);
                var hasContext = $context.length > 0;

                if (!hasContext) {
                    this.popQueue(contextScoped);
                    this.started_ = true;
                    this.log(contextScoped, contextBean);
                    return;
                }

                var contextLoaded = $context.attr(CONTEXT_STATE_ATTRIBUTE) === contextState.LOADED;
                if (contextLoaded) {
                    this.jigsawManager_.startControllerByScoped(contextScoped);

                    $context.attr(CONTEXT_STATE_ATTRIBUTE, contextState.UNLOAD);
                    this.popQueue(contextScoped);
                    this.started_ = true;
                    this.log(contextScoped, contextBean);
                    return;
                }

                //lazy load context environment
                var loadPath = this.generatePath(contextBean);
                JigsawLoader.load(scopedName, loadPath, function() {
                    that.jigsawManager_.startControllerByScoped(contextScoped);
                    var ctx = that.popQueue(contextScoped);
                    if (!ctx) {
                        that.started_ = true;
                        return;
                    }

                    that.startController(ctx.scoped, ctx.context);
                });

                this.started_ = false;
                this.log(contextScoped, contextBean, loadPath);
            },
            /**
             * @param {String} contextScoped
             * @param {ContextBean} contextBean
             */
            restartController: function(contextScoped, contextBean) {
                this.jigsawManager_.stopControllerByScoped(contextScoped);
                if (this.started_) {
                    this.startController(contextScoped, contextBean);
                    return;
                }

                this.waitInQueue(contextScoped, contextBean);
            },
            /**
             * @param {String} contextScoped
             * @param {ContextBean} contextBean
             */
            waitInQueue: function(contextScoped, contextBean) {
                this.contextQueue_[contextScoped] = {
                    scoped: contextScoped,
                    context: contextBean
                };
            },
            /**/
            start: function() {
                var that = this;
                this.contextQueue_ = [];

                if (!started) {
                    started = true;

                    this.jigsawManager_ = JigsawManager.getInstance();
                    this.pageContext_ = PageContext.getInstance();

                    this.pageContext_.addPageChangeListener(function(contextBean) {
                        that.restartController(PAGE_SCOPED, contextBean);
                    }, false);

                    this.pageContext_.addTabChangeListener(function(contextBean) {
                        that.restartController(TAB_SCOPED, contextBean);
                    }, false);

                    this.pageContext_.addSectionChangeListener(function(contextBean) {
                        that.restartController(SECTION_SCOPED, contextBean);
                    }, false);
                }
            },
            /**/
            static: {
                /**/
                getInstance: function() {
                    return Singleton.getInstance(JigsawContainer);
                }
            }
        };
    })());



    return JigsawContainer;
});
