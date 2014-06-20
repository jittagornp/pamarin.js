/**
 * @author jittagorn pitakmetagoon
 * create 17/02/2014
 */
define('com.pamarin.ui.component.dialog.ModalFactory', [
    'module',
    'com.pamarin.core.lang.Class',
    'com.jquery.core.JQuery'
], function(module, Class, $) {

    /**
     * @class ModalFactory
     */
    var ModalFactory = Class.define(module.id, {
        //
        static: {
            //
            getModal: function(color) {
                var $modal;

                switch (color) {
                    case 'black' :
                        $modal = $('#pmrModalBlack');
                        break;

                    default :
                        $modal = $('#pmrModal');
                }

                return $modal;
            }
        }
    });




    return ModalFactory;
});