/**
 * @author  jittagorn pitakmetagoon
 * create  27/05/2013
 * 
 * update  27/05/2013 (jittagorn pitakmetagoon)
 */

define('com.pamarin.core.io.Event', [
    
], function() {

    var Event = {
        //
        stopPropagation: function(event) {
            if (event.stopPropagation) {
                //W3 interface
                event.stopPropagation();
            } else {
                //IE's interface
                event.cancleBubble = true;
            }
        },
        //
        preventDefault: function(event) {
            if (event.preventDefault) {
                //W3 interface
                event.preventDefault();
            } else {
                //IE's interface
                event.returnValue = false;
            }
        },
        //
        stopEvent: function(event) {
            Event.stopPropagation(event);
            Event.preventDefault(event);
        }
    };

    return Event;
});
