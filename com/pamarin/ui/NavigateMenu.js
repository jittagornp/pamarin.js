/**
 * @author  jittagorn pitakmetagoon
 * create  13/04/2013
 * 
 * update  13/04/2013 (jittagorn pitakmetagoon)
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.ui.NavigateMenu', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.util.Assert'
], function(module, $, Configs, Class, UI, Assert) {

    /**
     * @class NavigateMenu
     */
    var NavigateMenu = Class.define(module.id, {
        //
        variable: {
            dataArray_: null,
            successCallback_: null
        },
        //
        constructor: function(element) {
            NavigateMenu.superConstructor.call(this, element);
        },
        //
        withData: function(dataArray) {
            Assert.assertArray(dataArray, module.id + '.withData(Array<[ { name : \'name1\', value : \'link1\', title : \'title1\', icon : \'icon1\' }, ...]> dataArray).');

            this.dataArray_ = dataArray;
            return this;
        },
        //
        onSuccess: function(callback) {
            Assert.assertFunction(callback, module.id + '.onSuccess(Function callback).');
            
            this.successCallback_ = callback;
            return this;
        },
        //
        create: function() {
            var self = this;
            var $menu = $('<ul>').addClass('pmr-menu');

            for (var index in self.dataArray_) {
                var navigate = self.dataArray_[index];

                var $text = $('<span>').addClass('pmr-menu-text')
                        .text(navigate.name);
                var $link = $('<a>').attr('href', Configs.HOST + navigate.url)
                        .addClass('break-link')
                        .attr('original-title', navigate.title);

                if (navigate.icon) {
                    var $icon = $('<span>').addClass('pmr-menu-icon')
                            .addClass(navigate.icon);
                    $link.append($icon);
                }

                $link.append($text);
                var $listItem = $('<li>').attr('data-sequence', index);
                $listItem.append($link);
                $menu.append($listItem);
            }

            self.$element_.append($menu);
            if (self.successCallback_) {
                self.successCallback_();
            }

            return $menu;
        },
        //
        static: {
            createInElement: function(element) {
                return new NavigateMenu(element);
            }
        }
    }).extends(UI);



    return NavigateMenu;
});