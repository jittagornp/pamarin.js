/**
 * @author  jittagorn pitakmetagoon
 * @create  22/04/2013
 * 
 * update  22/04/2013 (jittagorn pitakmetagoon)
 * update  08/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */
define('com.pamarin.core.util.PageMeta', [
    'com.jquery.core.JQuery', 
    'com.pamarin.core.logging.LoggerFactory'
], function($, LoggerFactory) {
    var PageMeta = (function() {
        //var log = LoggerFactory.getLogger('PageMeta');

        function _setMeta(array) {
            for (var index in array) {
                var name = 'meta[name=' + array[index].name + ']';
                var meta = $('head').find(name);
                if (meta.length === 0) {
                    $('<meta>').attr('name', array[index].name)
                            .attr('content', array[index].content)
                            .insertAfter('head title');
                } else {
                    meta.attr('content', array[index].content);
                }
            }
        }

        return {
            set: function(array) {
                _setMeta(array);
            }
        };
    })();
    
    return PageMeta;
});        