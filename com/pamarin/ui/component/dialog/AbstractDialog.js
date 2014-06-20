/**
 * @author jittagorn pitakmetagoon
 * create 06/11/2013
 */
define('com.pamarin.ui.component.dialog.AbstractDialog', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.util.Types',
    'com.pamarin.ui.component.Component',
    'com.pamarin.ui.component.dialog.ModalFactory'
], function(module, Class, Types, Component, ModalFactory) {



    /**
     * define abstract class AbstractDialog
     */
    var AbstractDialog = Class.define(module.id, {
        //
        variable: {
            htmlBody_: null,
            width_: null,
            height_: null,
            active_: false,
            closeTitle_: 'Press Esc to close',
            modal_: true,
            onShowCallback_: null,
            onCloseCallback_: null,
            onBeforeShowCallback_: null,
            onBeforeCloseCallback_: null,
            fixedScroll_: true,
            $modal_ : null,
            modalColor_ : 'white'
        },
        //
        constructor : function(element){
            AbstractDialog.superConstructor.call(this, element);
            this.$modal_ = ModalFactory.getModal(this.modalColor_);
        },
        /**
         * define an abstract method
         */
        abstract: {
            /**/
            show: function() {

            },
            /**/
            close: function() {

            }
        },
        /**
         * for set dialog height 
         * 
         * @param {number} height
         * @returns AbstractDialog
         */
        setHeight: function(height) {
            if (!Types.isNumber(height)) {
                throw new InvalidTypeException(module.id + '.setHeight({number} height)');
            }

            this.height_ = height;
            return this;
        },
        /**
         * for set dialog title
         * 
         * @param {string} title
         * @returns AbstractDialog
         */
        setTitle: function(title) {
            if (!Types.isString(title)) {
                throw new InvalidTypeException(module.id + '.setTitle({string} title)');
            }

            this.title_ = title;
            return this;
        },
        /**
         * for set dialog width
         * 
         * @param {number} width
         * @returns AbstractDialog
         */
        setWidth: function(width) {
            if (!Types.isNumber(width)) {
                throw new InvalidTypeException(module.id + '.setWidth({number} width)');
            }

            this.width_ = width;
            return this;
        },
        /**
         * for set html dialog content body
         * 
         * @param {string} html
         * @returns AbstractDialog
         */
        setHtmlBody: function(html) {
            if (!Types.isString(html)) {
                throw new InvalidTypeException(module.id + '.setHtmlBody({string} html)');
            }

            this.htmlBody_ = html;
            return this;
        },
        /**
         * check active dialog
         */
        isActive: function() {
            return this.active_;
        },
        /**
         * for set dialog title
         * 
         * @param {string} title
         * @returns AbstractDialog
         */
        setCloseTitle: function(title) {
            if (!Types.isString(title)) {
                throw new InvalidTypeException(module.id + '.setCloseTitle({string} title)');
            }

            this.closeTitle_ = title;
            return this;
        },
        /**
         * for enabled/disabled modal
         * 
         * @param {boolean} modal
         * @returns AbstractDialog
         */
        setModal: function(modal) {
            if (!Types.isBoolean(modal)) {
                throw new InvalidTypeException(module.id + '.setModal({boolean} modal)');
            }

            this.modal_ = modal;
            return this;
        },
        /**
         * event handler for listen dialog show
         * 
         * @param {function} callback
         * @returns AbstractDialog
         */
        onShow: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onShow({function} callback)');
            }

            this.onShowCallback_ = callback;
            return this;
        },
        /**
         * event handler for listen dialog close
         * 
         * @param {function} callback
         * @returns AbstractDialog
         */
        onClose: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onClose({function} callback)');
            }

            this.onCloseCallback_ = callback;
            return this;
        },
        /**
         * event handler for listen dialog before show
         * 
         * @param {function} callback
         * @returns AbstractDialog
         */
        onBeforeShow: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onBeforeShow({function} callback)');
            }

            this.onBeforeShowCallback_ = callback;
            return this;
        },
        /**
         * event handler for listen dialog before close
         * 
         * @param {function} callback
         * @returns AbstractDialog
         */
        onBeforeClose: function(callback) {
            if (!Types.isFunction(callback)) {
                throw new InvalidTypeException(module.id + '.onBeforeClose({function} callback)');
            }

            this.onBeforeCloseCallback_ = callback;
            return this;
        },
        /**
         * for fixed window scroll
         * 
         * @param {boolean} fixed
         * @returns AbstractDialog
         */
        setFixedWindowScroll: function(fixed) {
            if (!Types.isBoolean(fixed)) {
                throw new InvalidTypeException(module.id + '.setFixedWindowScroll({boolean} fixed)');
            }

            this.fixedScroll_ = fixed;
            return this;
        },
        /**/
        init : function(){
            
        }
    }).extends(Component);



    /**
     * return AbstractDialog
     */
    return AbstractDialog;
});