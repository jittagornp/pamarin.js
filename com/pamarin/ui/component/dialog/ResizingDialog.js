/**
 * @author jittagorn pitakmetagoon
 * create 06/11/2013
 */
define('com.pamarin.ui.component.dialog.ResizingDialog', [
    'module',
    'com.pamarin.ui.component.dialog.AbstractDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.util.Windows',
    'com.pamarin.ui.Tooltip',
    'com.pamarin.core.util.Types',
    'com.pamarin.core.util.KeyboardUtils',
    'com.pamarin.core.exception.InvalidTypeException',
    'com.pamarin.core.structural.Proxy'
], function(module, AbstractDialog, Class, LoggerFactory, Windows, Tooltip, Types, KeyboardUtils, InvalidTypeException, Proxy) {



    /**
     * @class ResizingDialog
     */
    var ResizingDialog = Class.define(module.id, (function() {

        var LOG = LoggerFactory.getLogger(module.id);
        var $window = $(window);

        return {
            //
            variable: {
                ratio_: 1.4,
                minWidth_: 770,
                minHeight_: 550,
                gap_: 100,
                onResizeCallback_: null,
                modalColor_: 'black'
            },
            /**
             * define constant or final variable
             */
            constant: {
                WINDOW_MIN_WIDTH: 1024,
                WINDOW_MIN_HEIGHT: 768
            },
            //
            constructor: function(element) {
                ResizingDialog.superConstructor.call(this, element);

                this.$modal_.binding('click', Proxy.call(this, function() {
                    this.isActive() && this.close();
                }));

                var $closeButton = this.$element_
                        .addClass('pmr-resizing-dialog')
                        .find('.pmr-dialog-close')
                        .binding('click', Proxy.call(this, function() {
                            this.isActive() && this.close();
                        }));

                Tooltip.showOnElement($closeButton)
                        .withEastPosition()
                        .withTitle(this.closeTitle_)
                        .show();

                //detect resizing dialog
                Windows.resize(Proxy.call(this, function() {
                    if (this.isActive()) {
                        this.resize();

                        Types.isFunction(this.onResizeCallback_) && this.onResizeCallback_();
                    }
                }));

                KeyboardUtils.onKey('Esc', Proxy.call(this, function() {
                    this.isActive() && this.close();
                }));
            },
            /**
             * @Override
             */
            show: function() {
                Types.isFunction(this.onBeforeShowCallback_) && this.onBeforeShowCallback_();

                this.active_ = true;

                this.resize();
                this.fixedWindowScroll();

                //real show
                this.$modal_.show();
                this.$element_.show();

                $window.trigger({
                    type: 'onShowDialog',
                    dialog: this
                });

                Types.isFunction(this.onShowCallback_) && this.onShowCallback_();
            },
            /**
             * @Override
             */
            close: function() {
                Types.isFunction(this.onBeforeCloseCallback_) && this.onBeforeCloseCallback_();

                this.active_ = false;

                this.$element_.hide();
                this.$modal_.hide();


                this.returnWindowScroll();
                $window.trigger({
                    type: 'onCloseDialog',
                    dialog: this
                });

                Types.isFunction(this.onCloseCallback_) && this.onCloseCallback_();
            },
            /**
             * dialog resizing
             */
            resize: function() {
                var windowHeight = $window.height();
                var windowWidth = $window.width();

                var dialogHeight;
                var dialogWidth;

                //compute dialog size
                if (windowWidth >= windowHeight) {
                    ratioWidth.call(this);

                    if (dialogWidth > windowWidth) {
                        ratioHeight.call(this);
                    }
                } else {
                    ratioHeight.call(this);

                    if (dialogHeight > windowHeight) {
                        ratioWidth.call(this);
                    }
                }

                this.$element_.css({
                    'width': dialogWidth + 'px',
                    'height': dialogHeight + 'px',
                    'margin-top': -dialogHeight / 2 + 'px',
                    'margin-left': -dialogWidth / 2 + 'px'
                });

                function ratioWidth() {
                    dialogHeight = windowHeight - this.gap_;
                    if (dialogHeight < this.minHeight_) {
                        dialogHeight = this.minHeight_;
                    }

                    dialogWidth = this.ratio_ * dialogHeight;
                }

                function ratioHeight() {
                    dialogWidth = windowWidth - this.gap_;
                    if (dialogWidth < this.minWidth_) {
                        dialogWidth = this.minWidth_;
                    }

                    dialogHeight = dialogWidth / this.ratio_;
                }

                return {
                    dialogWidth: dialogWidth,
                    dialogHeight: dialogHeight
                };
            },
            //
            onResize: function(callback) {
                if (!Types.isFunction(callback)) {
                    throw new InvalidTypeException(module.id + '.onResize(Function callback)');
                }

                this.onResizeCallback_ = callback;
                return this;
            }
        };
    })()).extends(AbstractDialog);



    return ResizingDialog;
});