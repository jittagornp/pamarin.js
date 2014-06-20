/**
 * @author jittagorn pitakmetagoon
 * create 04/05/2014
 */
define('com.pamarin.web.listener.PageContextListener', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.listener.ContextListener',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.ui.loader.JigsawLoader',
    'com.pamarin.core.util.StringUtils',
    'com.pamarin.core.page.PageContextManager',
    'com.pamarin.core.page.TabContextManager'
], function(module, Class, ContextListener, ApplicationContext, PageContext, JigsawLoader, StringUtils, PageContextManager, TabContextManager) {

    function loadJigsaw(context) {
        /**
         * load jigsaw module 
         */
        JigsawLoader.filterPath(function(url) {
            if (StringUtils.startsWith(url, '/@')) {
                url = '/unseen' + url;
            } else if (StringUtils.startsWith(url, '/+')) {
                url = '/profile' + url;
            } else if (StringUtils.startsWith(url, '/!')) {
                url = '/test' + url;
            }

            return url;
        });

        //console.log(context.page.getUrl());

        JigsawLoader.load({
            '#pmrPage': context.page.getUrl(),
            //'#pmrLeftContent': '/left',
            //'#pmrRightContent': '/right',
            '#pmrHeadbarContent': '/headbar',
            '#pmrBottombarContent': '/bottombar'
        }).then(function() {
            require(['com.pamarin.web.filter.PageFilter']);
        });
    }

    /**
     * @class PageContextListener
     * @implements ContextListener
     */
    var PageContextListener = Class.define(module.id, (function() {

        var $window = $(window);
        var pageContext = PageContext.getInstance();
        var applicationContext = ApplicationContext.getInstance();
        var pages = applicationContext.getParameter('pages');



        return {
            /**/
            start: function(webContextEvent) {

//                pageContext.addContextChangeListener(function(context) {
//                    JigsawLoader.load({
//                        '.pmr-page': '/' + context.page.getName()
//                    }).then(function() {
//                        $window.scrollTop(0);
//                    });
//                });

                TabContextManager.start();
                PageContextManager.start();
//                //pageContext.reloadContext();
//
//                var loaded = false;
//                pageContext.addContextChangeListener(function(context) {
//                    var page = context.page;
//                    var pathArray = page.getPathArray();
//
//                    if (isUnseenSettings(pathArray)) {
//                        page.setShift(0);
//                        page.setShiftSize(2);
//                    } else if (isUnseenPage(pathArray)) {
//                        page.setShift(1);
//                        page.setShiftSize(1);
//                    }
//
//                }).addContextChangeListener(function(context) {
//                    //!loaded && loadJigsaw(context);
//                    loaded = true;
//                });//.reloadContext();
//

//                pageContext.addContextChangeListener(function(context) {
//                    JigsawLoader.load({
//                        '#pmrPage': context.page.getUrl()
//                    }).then(function() {
//                        $window.scrollTop(0);
//                    });
//                });
            },
            /**/
            destroy: function(webContextEvent) {

            }
        };
    })()).implements(ContextListener);



    return PageContextListener;
});