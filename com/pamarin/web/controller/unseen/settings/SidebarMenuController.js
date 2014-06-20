/**
 * @author jittagorn pitakmetagoon
 * create 10/06/2014
 */
define('com.pamarin.web.controller.unseen.settings.SidebarMenuController', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.ui.RelativeUrlMenu',
    'com.pamarin.core.context.Configuration'
], function(module, Class, LoggerFactory, RelativeUrlMenu, Configuration) {

    /**
     * @class SidebarController
     * @controller
     */
    var SidebarController = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var HOST = Configuration.host;

        return {
            /**/
            variable: {
                MENU_SPACE_SELECTOR_: '.pmr-bookpage-left',
                /**/
                menuData_: {
                    menuStyleClass: 'pmr-bookpage-sidebarmenu',
                    itemStyleClass: 'pmr-bookpage-sidebarmenu-item',
                    linkStyleClass: 'break-link',
                    items: [
                        {
                            url: HOST + '/settings/@unseen1',
                            name: 'home'
                        },
                        {
                            url: HOST + '/settings/@unseen1/info',
                            name: 'information'
                        },
                        {
                            url: HOST + '/settings/@unseen1/photo',
                            name: 'photo'
                        },
                        {
                            url: HOST + '/settings/@unseen1/feeling',
                            name: 'feeling'
                        },
                        {
                            url: HOST + '/settings/@unseen1/tourist',
                            name: 'tourist'
                        }
                    ]
                }
            },
            /**/
            onJigsawReady: function() {
                var menu = new RelativeUrlMenu(this.MENU_SPACE_SELECTOR_);
                
                menu.setData(this.menuData_);
                menu.addEventListener('click', function() {
                    menu.highlight();
                });

                menu.create();
            }
        };
    })());



    return SidebarController;
});