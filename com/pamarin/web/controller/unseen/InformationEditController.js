/**
 * @author jittagorn pitakmetagoon
 * 11/09/2013
 */
define([
    'com.jquery.core.JQuery',
    'com.pamarin.core.editor.CLEditor',
    'com.pamarin.core.util.Urls'
], function($, Editor, Urls) {

    var EDITOR_ANIMATE_TIME_ = 500;
    var EDITOR_HEIGHT_GAP_ = 255;
    var $pamarin_ = $('#pamarin');
    var $page_ = $('#pmrPage');
    var $header_;
    var $editorMain_;
    var $iframe_;
    var $textarea_;
    var $window_ = $(window);
    //
    var $informationEditActionButton_;

    function isInformationEdit() {
        return Urls.getPath().indexOf('information?edit') === -1;
    }

    function iframeResize() {
        if (isInformationEdit()) {
            $page_.css('bottom', '0px');
        } else {
            $page_.css('bottom', $header_.height() + 1 + 'px');
        }

        setEditorHeight();
    }

    function setEditorHeight() {
        var editorHeight = $window_.height() - EDITOR_HEIGHT_GAP_;
        //$editorMain_.height(editorHeight);
        $iframe_.height(editorHeight);
        $textarea_.height(editorHeight);
    }

    function iframeResizeAnimate() {
        $pamarin_.addClass('pmr-fixed');

        setEditorHeight();

        $page_.animate({
            bottom: $header_.height() + 1
        }, EDITOR_ANIMATE_TIME_, function(){
            $informationEditActionButton_.show();
        });
    }

    function init(jigsawContext) {
        var editor = new Editor('#informationEditor');

        $header_ = $('#pmrUnseenHeader');
        $editorMain_ = $('#pmrUnseenPresent .cleditorMain');
        $iframe_ = $editorMain_.find('iframe');
        $textarea_ = $editorMain_.find('#informationEditor');
        $informationEditActionButton_ = $('#informationEditActionButton');


        iframeResizeAnimate();
        $window_.unbind('resize.informationEditIframe').bind('resize.informationEditIframe', function() {
            iframeResize();
        });


        var $cancelButton = $('.cleditor-cancel-button');
        var $saveButton = $('.cleditor-save-button');

        

        $cancelButton.unbind('click.informationEditIframe').bind('click.informationEditIframe', function() {
            var currentPath = Urls.getPath();
            var indexOfQuestionMark = currentPath.indexOf('?');
            var informationPage = currentPath.substr(0, indexOfQuestionMark);
            Urls.setPath(informationPage);
        });
        
        $saveButton.unbind('click.informationEditIframe').bind('click.informationEditIframe', function() {
            console.log(editor.getContent());
        });
    }

    return {
        init: init
    };
});