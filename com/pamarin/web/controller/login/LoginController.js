/**
 * @author jittagorn pitakmetagoon
 * create 08/11/2013
 */
define('com.pamarin.web.controller.login.LoginController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Windows'
], function(module, Class, Windows) {

    var _controller = null;

    var _$window = $(window);
    var _$page = $('#pmrPage');
    var _$headbar = $('#pmrHeadbar');
    var _$bottombar = $('#pmrBottombar');



    var LoginController = Class.define(module.id, {
        //
        init: function(jigsawContext) {
            
            resize();
            Windows.resize(0, function(){
                resize();
            });

            function resize() {
                var pageHeight = _$window.height() - (_$headbar.height() + _$bottombar.height());
                _$page.height(pageHeight);
                console.log('page resize');
            }
        }
    });



    if (_controller === null) {
        _controller = new LoginController();
    }



    return _controller;
});