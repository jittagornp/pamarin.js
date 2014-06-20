/**
 * @author  jittagorn pitakmetagoon
 * create  11/06/2013
 */
define('com.pamarin.core.util.BrowserUtils', [
    'com.jquery.browser.JQueryBrowser'
], function($) {

    var BrowserUtils = {
        //
        isSupport: function() {
            if (!($.browser.msie && $.browser.version < 9)) {
                return true;
            }
        }

    };

    return BrowserUtils;
});