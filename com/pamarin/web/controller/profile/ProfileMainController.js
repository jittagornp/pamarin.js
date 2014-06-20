/**
 * @author jittagorn pitakmetagoon
 * create 05/10/2013
 */
define('com.pamarin.web.controller.profile.ProfileMainController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.NavigateMenu'
], function(module, $, NavigateMenu) {

    function init(jigsawContext) {

        NavigateMenu.createInElement('#pmrProfileLeftMenu').withData([
            {name: 'about', url: ''},
            {name: 'unseen', url: ''}
        ]).onSuccess(function() {

        }).create();
    }

    return {
        init: init
    };
});