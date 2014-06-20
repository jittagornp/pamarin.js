/**
 *  @author jittagorn pitakmetagoon
 *  create 06/11/2013 
 */

define('com.pamarin.ui.component.dialog.ContextualDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.ui.Tooltip',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.component.dialog.AbstractDialog',
    'com.pamarin.core.util.KeyboardUtils',
    'com.pamarin.core.structural.Proxy'
], function(module, $, Tooltip, Types, Class, AbstractDialog, KeyboardUtils, Proxy) {

    /**
     * @class ContextualDialog
     */
    var ContextualDialog = Class.define(module.id, (function() {

        /**
         * define private static variable
         */
        var $window = $(window);
        var $dialogWrapper = $('#pmrDialogWrapper');
        var $activeDialog;
        var activeSize = 0;


        function onClick(selector, callback) {
            this.$element_.find(selector).binding('click', this.scope, callback);
        }

        return {
            /**
             * call when dialog instance initial 
             * @param {string | jQueryElement} element
             */
            constructor: function(element) {
                ContextualDialog.superConstructor.call(this, element);

                var $closeButton = this.$element_
                        .addClass('pmr-contextual-dialog')
                        .find('.pmr-dialog-header')
                        .find('.pmr-dialog-close');

                Tooltip.showOnElement($closeButton)
                        .withEastPosition()
                        .withTitle(this.closeTitle)
                        .show();

                var self = this;
                onClick.call(this, '.pmr-dialog-close-button', function() {
                    self.close($(this));
                });

                onClick.call(this, '.pmr-dialog-close', Proxy.call(this, function() {
                    this.close();
                }));

                KeyboardUtils.onKey('Esc', Proxy.call(this, function() {
                    this.isActive() && this.close();
                }));
            },
            /**
             * for show dialog
             * 
             * @override
             */
            show: function() {
                Types.isFunction(this.onBeforeShowCallback_) && this.onBeforeShowCallback_();

                activeSize = activeSize + 1;

                this.height_ !== null && this.$element_.height(this.height_);
                this.width_ !== null && this.$element_.width(this.width_);


                var dialogWidth = this.$element_.width() + 2;
                var dialogHeight = this.$element_.height() + 2;

                this.$element_.css({
                    'margin-left': -dialogWidth / 2,
                    'margin-top': -dialogHeight / 2
                });

                this.$element_.find('.pmr-dialog-title').html(this.title_);

                $dialogWrapper.css({
                    width: dialogWidth,
                    height: dialogHeight,
                    'margin-left': -(dialogWidth + 22) / 2,
                    'margin-top': -(dialogHeight + 22) / 2
                }).show();

                if (Types.isBoolean(this.modal_) && this.modal_) {
                    this.$modal_.show();
                    Types.isBoolean(this.fixedScroll_) && this.fixedScroll_ && this.fixedWindowScroll();
                }

                this.$element_.show();
                $activeDialog = this.$element_;
                Types.isFunction(this.onShowCallback_) && this.onShowCallback_();


                this.active_ = true;
                $window.trigger({
                    type: 'onShowDialog',
                    dialog: this
                });

                this.htmlBody_ && this.$element_.find('.pmr-dialog-body').html(this.htmlBody_);
            },
            /**
             * for hide dialog
             * 
             * @override
             */
            close: function($element) {
                Types.isFunction(this.onBeforeCloseCallback_) && this.onBeforeCloseCallback_();

                activeSize = activeSize - 1;
                if (activeSize < 0) {
                    activeSize = 0;
                }

                this.$element_.hide();
                $dialogWrapper.hide();

                if (activeSize === 0) {
                    this.$modal_.hide();
                    Types.isBoolean(this.modal_) && this.modal_ && this.returnWindowScroll();
                }

                Types.isFunction(this.onCloseCallback_) && this.onCloseCallback_($element);

                this.active_ = false;
                $window.trigger({
                    type: 'onCloseDialog',
                    dialog: this
                });

                this.isDestroy() && Types.isFunction(this.destroy) && this.destroy();
            }
        };
    })()).extends(AbstractDialog);



    /**
     * return class ContextualDialog
     */
    return ContextualDialog;
});