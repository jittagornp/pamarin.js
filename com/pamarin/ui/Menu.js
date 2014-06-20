/**
 * @author jittaorn pitakmetagoon
 * create 11/06/2014
 */
define('com.pamarin.ui.Menu', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.lang.Array',
    'com.jquery.core.JQuery'
], function(module, Class, Array, $) {

    /**
     * @class Menu
     * @ui
     */
    var Menu = Class.define(module.id, {
        /**/
        variable: {
            ACTIVE_INDEX_: 0,
            MENU_STYLE_CLASS: 'pmr-menu',
            MENU_LINK_STYLE_CLASS: 'pmr-menu-link',
            MENU_ITEM_STYLE_CLASS: 'pmr-menu-item',
            MENU_ITEM_ACTIVE_STYLE_CLASS: 'pmr-active',
            $element_: null,
            data_: null,
            listeners_: null
        },
        /**/
        constructor: function(selector) {
            this.$element_ = $(selector);
        },
        /**
         * @param {Object} data
         */
        setData: function(data) {
            this.data_ = data;
        },
        /**/
        create: function() {
            var $list = this.$createList(this.data_);
            Array.forEachIndex(this.data_.items, function(d, i) {
                $list.append(this.$createItem(d, i));
            }, this);

            this.$element_.append($list);
        },
        /**/
        $createList: function(data) {
            var $menu = $('<ul>').addClass(this.MENU_STYLE_CLASS);
            if (data.menuStyleClass) {
                $menu.addClass(data.menuStyleClass);
            }

            if (data.menuAttributes) {
                Array.forEachIndex(data.menuAttributes, function(attr) {
                    $menu.attr(attr.key, attr.value);
                });
            }

            return $menu;
        },
        /**/
        $createItem: function(data, index) {
            var $link = $('<a>').addClass(this.MENU_LINK_STYLE_CLASS)
                    .attr('href', data.url || '#')
                    .text(data.name);

            if (this.data_.linkStyleClass) {
                $link.addClass(this.data_.linkStyleClass);
            }

            if (data.linkStyleClass) {
                $link.addClass(data.linkStyleClass);
            }

            if (data.linkAttributes) {
                Array.forEachIndex(data.linkAttributes, function(attr) {
                    $link.attr(attr.key, attr.value);
                });
            }

            var $item = $('<li>').addClass(this.MENU_ITEM_STYLE_CLASS)
                    .attr('data-sequence', index)
                    .append($link);

            if (this.ACTIVE_INDEX_ === index) {
                $item.addClass(this.MENU_ITEM_ACTIVE_STYLE_CLASS);
            }

            if (this.data_.itemStyleClass) {
                $item.addClass(this.data_.itemStyleClass);
            }

            if (data.itemStyleClass) {
                $item.addClass(data.itemStyleClass);
            }

            if (data.itemAttributes) {
                Array.forEachIndex(data.itemAttributes, function(attr) {
                    $item.attr(attr.key, attr.value);
                });
            }

            Array.forEachIndex(this.listeners_, function(ltn) {
                $item.off(ltn.type + '.' + this.MENU_ITEM_STYLE_CLASS)
                        .on(ltn.type, ltn.listener);
            }, this);

            return $item;
        },
        /**
         * @param {String} eventType
         * @param {Function} listener      
         */
        addEventListener: function(eventType, listener) {
            if (this.listeners_ === null) {
                this.listeners_ = [];
            }

            this.listeners_.push({
                type: eventType,
                listener: listener
            });
        }
    });



    return Menu;
});