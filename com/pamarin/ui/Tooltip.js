/**
 * @author jittagorn pitakmetagoon
 * create 01/10/2013
 */
define('com.pamarin.ui.Tooltip', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.UI',
    'com.pamarin.core.structural.Proxy'
], function(module, Class, UI, Proxy) {

    /**
     * @class Tooltip
     */
    var Tooltip = Class.define(module.id, {
        //
        variable: {
            position_: null,
            title_: null
        },
        //
        constant: {
            NORTH: 'n',
            NORTH_WEST: 'nw',
            NORTH_EAST: 'ne',
            WEST: 'w',
            EAST: 'e',
            SOUTH_WEST: 'sw',
            SOUTH: 's',
            SOUTH_EAST: 'se'
        },
        constructor: function(element) {
            Tooltip.superConstructor.call(this, element);
            this.position_ = Tooltip.constant('EAST');
            this.title_ = undefined;
        },
        //            
        withTitle: function(title) {
            this.title_ = title;
            return this;
        },
        //        
        withNorthPosition: function() {
            this.position_ = Tooltip.constant('NORTH');
            return this;
        },
        //
        withNorthWestPosition: function() {
            this.position_ = Tooltip.constant('NORTH_WEST');
            return this;
        },
        //
        withNorthEastPosition: function() {
            this.position_ = Tooltip.constant('NORTH_EAST');
            return this;
        },
        //
        withWestPosition: function() {
            this.position_ = Tooltip.constant('WEST');
            return this;
        },
        //
        withEastPosition: function() {
            this.position_ = Tooltip.constant('EAST');
            return this;
        },
        //
        withSouthWestPosition: function() {
            this.position_ = Tooltip.constant('SOUTH_WEST');
            return this;
        },
        //
        withSouthPosition: function() {
            this.position_ = Tooltip.constant('SOUTH');
            return this;
        },
        //

        withSouthEastPosition: function() {
            this.position_ = Tooltip.constant('SOUTH_EAST');
            return this;
        },
        //
        show: function() {
            var $element = this.getElement();
            var scope = this.getScope();
            
            if (this.title_) {
                $element.attr('original-title', this.title_);
            }

            $element.binding('click', scope, function() {
                $element.mouseout();
            });

            //lazy load tipsy
            require(['com.jquery.tipsy.JQueryTipsy'], Proxy.call(this, function() {
                $element.tipsy({
                    gravity: this.position_
                });
            }));

            return this.$element_;
        },
        //
        static: {
            //
            showOnElement: function(element) {
                return new Tooltip(element);
            }
        }
    }).extends(UI);



    return Tooltip;
});