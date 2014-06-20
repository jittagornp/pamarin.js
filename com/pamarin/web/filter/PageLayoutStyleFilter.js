/** 
 * @module  PageLayoutStyleFilter
 * @description for filter or check page style layout
 * @author  jittagorn pitakmetagoon 
 * @create  22/03/2013
 * 
 * @update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 * @update  09/06/2013 (jittagorn pitakmetagoon : add HeaderMenuStyleLayout)
 * @update  24/07/2013 (jittagorn pitakmetagoon : change load style layout to lazy load)
 */
define('com.pamarin.web.filter.PageLayoutStyleFilter', [
    'com.pamarin.core.util.StringUtils', 
    'com.pamarin.core.config.Configs'
], function(StringUtils, Configs) {
    var notation = Configs['PAGES']['NOTATION'];
    var UNSEEN_PAGE_NOTAION = notation.UNSEEN;
    var PROFILE_PAGE_NOTATION = notation.PROFILE;

    var isLeftMenuStyleLayout = function(page) {
        return page === 'trips'
                || page === 'management'
                || StringUtils.startsWith(page, PROFILE_PAGE_NOTATION);
    };

    var isHeaderMenuStyleLayout = function(page) {
        return page === 'history';
                //|| StringUtils.startsWith(page, UNSEEN_PAGE_NOTAION);
    };

    var PageLayoutStyleFilter = {
        //
        doFilter: function(page) {
            page = page.substring(1); //cut '/' 
            
            var pageStyleLayoutTimeout = setTimeout(function() {
                window.clearTimeout(pageStyleLayoutTimeout);

                if (isLeftMenuStyleLayout(page)) {
                    require([
                        'com.pamarin.web.controller.layout.LeftMenuStyleLayoutController'
                    ], function(LeftMenuStyleLayout) {
                        LeftMenuStyleLayout.init();
                    });
                } else if (isHeaderMenuStyleLayout(page)) {
                    require([
                        'com.pamarin.web.controller.layout.HeaderMenuStyleLayoutController'
                    ], function(HeaderMenuStyleLayout) {
                        HeaderMenuStyleLayout.init();
                    });
                }
            }, 500);
        }
    };

    return PageLayoutStyleFilter;
});