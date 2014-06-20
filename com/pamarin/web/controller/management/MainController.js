/**
 * @author jittagorn pitakmetagoon
 * create 06/10/2013
 */
define('com.pamarin.web.controller.management.MainController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.NavigateMenu'
], function(module, $, NavigateMenu) {

    function init(jigsawContext) {
        NavigateMenu.createInElement('#pmrManagementLeft').withData([
            {name: 'list', url: '#', title: 'home'},
            //{name: 'post', url: unseenPath + '/post'},
            {name: 'information', url: '#' + '/information', title: 'information'},
            {name: 'photos', url: '#' + '/photo', title: 'photos'},
            {name: 'settings', url: '#' + '/settings', title: 'settings'}
        ]).onSuccess(function() {
            
        }).create();
    }

    return {
        init: init
    };
});