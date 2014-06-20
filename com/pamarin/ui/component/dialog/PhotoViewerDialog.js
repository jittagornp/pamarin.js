/**
 * for show photo view when click on that photo
 * 
 * @author jittagorn pitakmetagoon
 * create 02/11/2013
 */
define('com.pamarin.ui.component.dialog.PhotoViewerDialog', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.lang.Class',
    'com.pamarin.ui.component.dialog.ResizingDialog',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.ui.Scrollbar',
    'com.pamarin.core.creational.Singleton'
], function(module, $, Class, ResizingDialog, LoggerFactory, Scrollbar, Singleton) {

    var LOG = LoggerFactory.getLogger(module.id);
    var $window = $(window);



    /**
     * @class PhotoViewerDialog
     */
    var PhotoViewerDialog = Class.define(module.id, {
        //
        variable : {
            $right_ : null,
            $left_ : null,
            $rightHeader_ : null,
            $rightBody_ : null,
            $rightFooter_ : null,
            active_ : false
        },
        //
        constant: {
            DIALOG_RIGHT_BIG_WIDTH: 300,
            DIALOG_RIGHT_SMALL_WIDTH: 250
        },
        /**
         * call immediately when new instance created
         * @param {string | jQueryElement} element identify this component focusing
         */
        constructor: function(element) {
            PhotoViewerDialog.superConstructor.call(this, element);
        },
        /**
         * call when this component loaded
         * @param {object} componentContext
         */
        init: function(componentContext) {
            this.$right_ = $('#pmrPhotoViewerDialogRight');
            this.$left_ = $('#pmrPhotoViewerDialogLeft');
            this.$rightHeader_ = $('#pmrPhotoViewerDialogRightHeader');
            this.$rightBody_ = $('#pmrPhotoViewerDialogRightBody');
            this.$rightFooter_ = $('#pmrPhotoViewerDialogRightFooter');

            Scrollbar.createOnElement('#pmrPhotoViewerDialogRightBody').get();
        },
        /**
         * dialog resizing
         */
        resize: function() {
            var state = PhotoViewerDialog.superResize.call(this);

            var windowMinWidth = ResizingDialog.constant('WINDOW_MIN_WIDTH');
            var windowMinHeight = ResizingDialog.constant('WINDOW_MIN_HEIGHT');
            var dialogRightBigWidth = PhotoViewerDialog.constant('DIALOG_RIGHT_BIG_WIDTH');
            var dialogRightSmallWidth = PhotoViewerDialog.constant('DIALOG_RIGHT_SMALL_WIDTH');

            var windowHeight =  $window.height();
            var windowWidth =  $window.width();

            //compute right dialog relative with window size
            if (windowWidth > windowMinWidth && windowHeight > windowMinHeight) {
                this.$right_.width(dialogRightBigWidth);
            } else {
                this.$right_.width(dialogRightSmallWidth);
            }

            var leftWidth = state.dialogWidth - this.$right_.width();
            var rightWidth = state.dialogHeight - (this.$rightHeader_.height() + this.$rightFooter_.height());

            this.$left_.width(leftWidth);
            this.$rightBody_.height(rightWidth);
        }
    }).extends(ResizingDialog);


    /**
     * return PhotoViewerDialog instance
     */
    return Singleton.getInstance(PhotoViewerDialog, '#pmrPhotoViewerDialog');
});