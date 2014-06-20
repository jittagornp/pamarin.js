/**
 * @author jittagorn pitakmetagoon
 * create 08/11/2013
 */
define('com.pamarin.web.util.Pages', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.Windows'
], function(module, Class, Types, Windows) {

    var _$window = $(window);
    var _$headbar = $('#pmrHeadbar');
    var _$bottombar = $('#pmrBottombar');


    var Pages = Class.define(module.id, {
        //
        static: {
            //
            resize: function(scope, callback) {
                if (Types.isFunction(scope)) {
                    callback = scope;
                    scope = undefined;
                }

                if (Types.isFunction(callback)) {
                    pageResize(callback);
                    Windows.resize(function() {
                        pageResize(callback);
                    });
                }


                function pageResize(callback) {
                    var pageHeight = _$window.height() - _$headbar.height() - _$bottombar.height();
                    callback({
                        width : pageWidth//,
                        //height : pageHeight
                    });
                }
            }
        }
    });


    return Pages;
});