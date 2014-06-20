/**
 * @author jittagorn pitakmetagoon
 * create 17/06/2014
 */
define('com.pamarin.core.page.TabContextManager', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.core.util.Router',
    'com.pamarin.core.page.ContextMappingAdapter'
], function(module, Class, PageContext, Router, ContextMappingAdapter) {

    /**
     * @class TabContextManager
     */
    var TabContextManager = Class.define(module.id, (function() {

        var pageContext = PageContext.getInstance();

        var started_ = false;
        var firstTimes_ = true;
        var disabledRouting_ = true;

        var mapping = null;

        function startRouteListener() {
            if (firstTimes_) {
                firstTimes_ = false;

                Router.onRoute(function(data) {
                    if (disabledRouting_) {
                        disabledRouting_ = false;
                        return;
                    }

                    mapping.trigChange(data.index, data.afters);
                });
            }
        }

        return {
            /**/
            static: {
                /**/
                start: function() {
                    if (started_) {
                        return; //first time only
                    }

                    started_ = true;
                    pageContext.addContextChangeListener(function(context) {
                        mapping = new ContextMappingAdapter({
                            name: 'tab',
                            parentContext: context.page,
                            childContextAttribute: 'section'
                        });
                        
                        mapping.reloadContext = function(ctx) {
                            console.log(ctx);
                        };

                        mapping.trigChange();

                        disabledRouting_ = true;
                        startRouteListener();
                    });

                }
            }
        };
    })());



    return TabContextManager;
});