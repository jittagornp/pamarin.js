/**
 * @author jittagorn pitakmetagoon
 * create 13/10/2013
 */
define('com.pamarin.ui.Progressbar', [
    'com.ricostacruz.core.NProgress'
], function(NProgress) {

    return {
        start: function() {
            NProgress.start();
        },
        done: function() {
            NProgress.done();
        }
    };
});