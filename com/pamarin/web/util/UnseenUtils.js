/**
 * @author jittagorn pitakmetagoon
 * create 22/09/2013
 */
define('com.pamarin.web.util.UnseenUtils', [
    'com.pamarin.core.util.Urls',
    'com.pamarin.core.page.PageContext',
    'com.pamarin.core.util.Router'
], function(Urls, PageContext, Router) {

    var _DEFAULT_PRESENT_TAB = 'home';

    function getPresentURL() {
        var shift = PageContext.getShiftLevel();
        return Urls.getFullPathIndex(1 + shift, _DEFAULT_PRESENT_TAB, shift);
    }

    function getUnseenId() {
        return Urls.getPathIndex(PageContext.getShiftLevel());
    }

    function getUnseenPath() {
        return Urls.getFullPathIndex(PageContext.getShiftLevel());
    }

    function onTabChange(callback, id) {
        callback = callback || function() {

        };

        var bindIndex = 1 + PageContext.getShiftLevel();
        Router.onRouteAt(bindIndex, function(object) {
            object.fullPath = getPresentURL();
            callback(object);
        }, bindIndex);
    }
    
    function getCurrentUnseen(){
        
    }

    return {
        getCurrentUnseen : getCurrentUnseen,
        getUnseenId: getUnseenId,
        getPresentURL: getPresentURL,
        onTabChange: onTabChange,
        getUnseenPath: getUnseenPath,
        DEFAULT_PRESENT_TAB: _DEFAULT_PRESENT_TAB
    };
});
