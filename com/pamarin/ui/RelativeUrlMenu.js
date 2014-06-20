/**
 * @author jittaorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.ui.RelativeUrlMenu', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.Menu',
    'com.pamarin.core.util.Delays'
], function(module, Class, $, Menu, Delays) {

    /**
     * @class RelativeUrlMenu
     * @ui
     */
    var RelativeUrlMenu = Class.define(module.id, {
        /**/
        /**/
        highlight: function() {
            Delays.run(function() {
                var that = this;
                var url = location.href;

                var $items = this.$element_
                        .find('.' + this.MENU_ITEM_STYLE_CLASS)
                        .removeClass(that.MENU_ITEM_ACTIVE_STYLE_CLASS);

                $items.each(function() {
                    var $item = $(this);

                    var $link = $item.find('.' + that.MENU_LINK_STYLE_CLASS);
                    var link = $link.attr('href');

                    if (url === link || ((url + '/') === link)) {
                        $item.addClass(that.MENU_ITEM_ACTIVE_STYLE_CLASS);
                    }
                });
            }, 50, this);
        },
        /**
         * @override
         */
        create: function() {
            this.__super__.create.call(this);
            this.highlight();
        }
    }).extends(Menu);



    return RelativeUrlMenu;
});