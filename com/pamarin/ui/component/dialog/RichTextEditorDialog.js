/**
 * @author jittagorn pitakmetagoon
 * create 14/10/2013
 */
define('com.pamarin.ui.component.dialog.RichTextEditorDialog', [
    'module',
    'com.tinymce.core.Tinymce',
    'com.pamarin.ui.component.dialog.ContextualDialog',
    'com.pamarin.core.lang.Class',
    'com.pamarin.core.creational.Singleton'
], function(module, Tinymce, ContextualDialog, Class, Singleton) {

    var Editor = Class.define(module.id, {
        //
        constructor: function(element) {
            Editor.superConstructor.call(this, element);
        },
        //        
        init: function(componentContext) {
            Tinymce.init({
                selector: "#pmrRichTextEditorDialogTextArea",
                width: 582,
                height: 325,
                browser_spellcheck: true,
                plugins: ["link", 'image', 'pagebreak', 'preview', 'save', 'code', 'textcolor'],
                pagebreak_separator: "<!-- pagebreak -->",
                resize: false,
                mode: "textareas",
                preview_styles: false,
                language: 'th_TH',
                menu: {},
                statusbar: false,
                toolbar1: 'formatselect fontsizeselect | bold italic underline strikethrough subscript superscript removeformat',
                toolbar2: 'undo redo | link image | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify',
                save_onsavecallback: function(x, y, z) {
                    console.log(tinyMCE.activeEditor.getContent());
                }
            });
        }
    }).extends(ContextualDialog);

    return Singleton.getInstance(Editor, '#pmrRichTextEditorDialog');
});