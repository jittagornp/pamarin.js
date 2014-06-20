/**
 * @author jittagorn pitakmetagoon
 * create 07/06/2014
 */
define('com.pamarin.web.controller.unseen.tab.PhotoGalleryViewerController', [
    'module',
    'com.pamarin.web.controller.unseen.UnseenController',
    'com.jquery.core.JQuery',
    'com.pamarin.core.annotation.$$Scoped',
    'com.pamarin.ui.loader.ComponentLoader'
], function(module, UnseenControlller, $, $$Scoped, ComponentLoader) {

    /**
     * @class PhotoGalleryViewerController
     * @Controller
     */
    var PhotoGalleryViewerController = UnseenControlller.define(module.id, {
        /**/
        annotation: [
            $$Scoped('singleton')
        ],
        /**/
        constructor: function() {
            
        }
    });



    return PhotoGalleryViewerController;
});