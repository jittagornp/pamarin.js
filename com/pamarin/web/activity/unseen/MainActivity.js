/**
 * @author jittagorn pitakmetagoon
 * create 15/06/2014
 */
define('com.pamarin.web.activity.unseen.MainActivity', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.RelativeUrlMenu',
    'com.pamarin.core.context.Configuration'
], function(module, Class, RelativeUrlMenu, Configuration) {

    /**
     * @class MainActivity
     */
    var MainActivity = Class.define(module.id, (function() {

        var HOST = Configuration.host;

        return {
            /**/
            variable: {
                menuData_: {
                    menuStyleClass: 'pmr-unseen-profile-menu',
                    //itemStyleClass: 'pmr-bookpage-sidebarmenu-item',
                    //ilnkStyleClass: 'break-link',
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
            onCreate: function() {

            },
            /**/
            onStart: function() {
                var menu = new RelativeUrlMenu('.pmr-profile-menu');
                menu.setData(this.menuData_);
                menu.create();
            },
            /**/
            onStop: function() {

            }
        };
    })());

    return MainActivity;
});