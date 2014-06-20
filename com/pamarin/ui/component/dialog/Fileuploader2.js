/**
 * @author  jittagorn pitakmetagoon
 * create   26/04/2013
 * update   26/04/2013 (jittagorn pitakmetagoon)
 * update   21/09/2013 (jittagorn pitakmetagoon : add to AMD)
 */

define('com.pamarin.ui.component.dialog.Fileuploader', [
    'module',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.core.io.Event'
], function(module, LoggerFactory, Event) {
    var log = LoggerFactory.getLogger(module.id);
    //
    var $pamarin_ = $('#pamarin');
    var $window_ = $(window);
    var $modal = $('#pmrModal');


    var $fileUploader_;
    var $fileUploadLeft_;
    var $fileUploadRight_;
    var $fileUploadLeftHeader_;
    var $fileUploadLeftCenter_;
    var $fileUploadHeader_;
    var $fileUploadCenter_;
    var $fileUploadFooter_;
    var $expandDialog_;
    var $closeDialog_;
    var $okButton_;
    var $cancelButton_;
    //
    var FILE_UPLOADER_LEFT_WIDTH_;
    var FILE_UPLOADER_WIDTH_;
    var FILE_UPLOADER_HEIGHT_;
    var FILE_UPLOADER_HEADER_HEIGHT_;
    var FILE_UPLOADER_FOOTER_HEIGHT_;
    var FILE_UPLOADER_LEFT_HEADER_HEIGHT_;

    function init(componentContext) {

    }
    ;
    $fileUploader_ = $('#pmrFileuploader');
    $fileUploadLeft_ = $('#pmrFileuploaderLeft');
    $fileUploadRight_ = $('#pmrFileuploaderRight');
    $fileUploadLeftHeader_ = $('#pmrFileuploaderLeftHeader');
    $fileUploadLeftCenter_ = $('#pmrFileuploaderLeftCenter');
    $fileUploadHeader_ = $('#pmrFileuploaderHeader');
    $fileUploadCenter_ = $('#pmrFileuploaderCenter');
    $fileUploadFooter_ = $('#pmrFileuploaderFooter');
    $expandDialog_ = $('#pmrFileuploader .pmr-dialog-expand');
    $closeDialog_ = $('#pmrFileuploader .pmr-dialog-close');
    $okButton_ = $('#pmrFileuploader .pmr-dialog-button-ok');
    $cancelButton_ = $('#pmrFileuploader .pmr-dialog-button-cancel');
    //
    FILE_UPLOADER_LEFT_WIDTH_ = $fileUploadLeft_.width();
    FILE_UPLOADER_WIDTH_ = parseInt($fileUploader_.css('min-width').replace('px', ''));
    FILE_UPLOADER_HEIGHT_ = parseInt($fileUploader_.css('min-height').replace('px', ''));
    FILE_UPLOADER_HEADER_HEIGHT_ = $fileUploadHeader_.height();
    FILE_UPLOADER_FOOTER_HEIGHT_ = $fileUploadFooter_.height();
    FILE_UPLOADER_LEFT_HEADER_HEIGHT_ = $fileUploadLeftHeader_.height();

    $closeDialog_.binding('click', module.uuid, function() {
        hide();
    });

    $okButton_.binding('click', module.uuid, function() {
        hide();
    });

    $cancelButton_.binding('click', module.uuid, function() {
        hide();
    });

    $expandDialog_.binding('click', module.uuid, function() {
        if (!$fileUploader_.hasClass('full')) {
            $fileUploader_.addClass('full');
            $fileUploader_.removeClass('mini');
            $expandDialog_.attr('title', 'minimize');
        } else {
            $fileUploader_.removeClass('full');
            $expandDialog_.attr('title', 'maximize');
        }
        resize();
    });


    $fileUploadCenter_.jScrollPane({
        showArrows: false,
        maintainPosition: true,
        stickToBottom: false,
        stickToRight: false,
        clickOnTrack: true,
        autoReinitialise: true,
        autoReinitialiseDelay: 0,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        animateScroll: false,
        animateDuration: 300,
        animateEase: 'linear',
        hijackInternalLinks: false,
        verticalGutter: 0,
        horizontalGutter: 0,
        mouseWheelSpeed: 0,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: false,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: 'split',
        horizontalArrowPositions: 'split',
        enableKeyboardNavigation: true,
        hideFocus: false,
        keyboardSpeed: 0,
        initialDelay: 0,
        speed: 30,
        scrollPagePercent: 0.8
    }).binding('mousewheel', module.uuid, function(event) {
        Event.preventDefault(event);
    });

    $fileUploadLeftCenter_.jScrollPane({
        showArrows: false,
        maintainPosition: true,
        stickToBottom: false,
        stickToRight: false,
        clickOnTrack: true,
        autoReinitialise: true,
        autoReinitialiseDelay: 0,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        animateScroll: false,
        animateDuration: 300,
        animateEase: 'linear',
        hijackInternalLinks: false,
        verticalGutter: 0,
        horizontalGutter: 0,
        mouseWheelSpeed: 0,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: false,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: 'split',
        horizontalArrowPositions: 'split',
        enableKeyboardNavigation: true,
        hideFocus: false,
        keyboardSpeed: 0,
        initialDelay: 0,
        speed: 30,
        scrollPagePercent: 0.8
    }).binding('mousewheel', module.uuid, function(event) {
        Event.preventDefault(event);
    });


    $window_.binding('resize', module.uuid, function() {
        resize();
    });

    function resize() {
        var windowHeight = $window_.height() - 1;
        var windowWidth = $window_.width() - 1;

        if ($fileUploader_.hasClass('full')) {
            FILE_UPLOADER_WIDTH_ = windowWidth;
            FILE_UPLOADER_HEIGHT_ = windowHeight;
        } else {
            if (windowHeight < 750 || windowWidth < 1150) {
                $fileUploader_.addClass('mini');
                FILE_UPLOADER_WIDTH_ = 850;
                FILE_UPLOADER_HEIGHT_ = 550;
            } else {
                $fileUploader_.removeClass('mini');
                FILE_UPLOADER_WIDTH_ = 1100;
                FILE_UPLOADER_HEIGHT_ = 700;
            }
        }

        var rightWidth = FILE_UPLOADER_WIDTH_ - FILE_UPLOADER_LEFT_WIDTH_;
        var centerHeight = FILE_UPLOADER_HEIGHT_ - (FILE_UPLOADER_HEADER_HEIGHT_ + FILE_UPLOADER_FOOTER_HEIGHT_);

        $fileUploadCenter_.height(centerHeight);
        $fileUploadRight_.width(rightWidth);
        $fileUploadLeftCenter_.height($fileUploader_.height() - FILE_UPLOADER_LEFT_HEADER_HEIGHT_);
    }
    //}

    var backupScrollTop_ = 0;
    function show() {
//            backupScrollTop_ = $window_.scrollTop();
//            $pamarin_.css({
//                'top': -(backupScrollTop_) + 'px'
//            });
        resize();
        $fileUploader_.show();
        $modal.show();
    }

    function hide() {
        $fileUploader_.hide();
        $modal.hide();
//            $pamarin_.css({
//                'top': 0 + 'px'
//            });
//            $window_.scrollTop(backupScrollTop_);
    }

//(function($, pamarin) {
//    var CREATE_ALBUM_URL = '/Fileuploader/createAlbum';
//    var log = pamarin.log.getLogger('file uploader');
//
//    var fileUploadMenu = $('#pmrFileuploaderLeftCenter .pmr-menu');
//    var createAlbumButton = $('#pmrFileuploaderLeftHeader .pmr-create-album');
//    var titleAlias = $('#pmrFileuploader .pmr-dialog-title-alias');
//
//    fileUploadMenu.children('li').each(function() {
//        var list = $(this);
//        var link = list.children('a');
//
//        link.click(function(event) {
//            //event.preventDefault();
//            
//            fileUploadMenu.children('li').removeClass('active');
//            list.addClass('active');
//            createAlbumButton.removeClass('active');
//
//            var text = link.find('.pmr-menu-text').text();
//            titleAlias.text('(' + text + ')');
//            var url = pamarin.util.Urls.getPath(link.attr('href'));
//            jigsawLoader.load('#pmrFileuploaderCenterContent .pmr-content', url);
//            log.debug(link.attr('href') + ' : ' + url);
//        });
//    });
//
//    createAlbumButton.click(function(event) {
//        //event.preventDefault();
//        
//        fileUploadMenu.children('li').removeClass('active');
//        createAlbumButton.addClass('active');
//
//        var text = $(this).text();
//        titleAlias.text('(' + text + ')');
//        jigsawLoader.load('#pmrFileuploaderCenterContent .pmr-content', CREATE_ALBUM_URL);
//    });
//    }
//    
    return {
        init: init,
        show: show
    };
});