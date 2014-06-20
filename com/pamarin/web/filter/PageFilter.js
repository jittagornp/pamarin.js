/**
 * @author  jittagorn pitakmetagoon
 * create  28/05/2013
 * 
 * update  28/05/2013 (jittagorn pitakmetagoon)
 * update  07/06/2013 (jittagorn pitakmetagoon : add to AMD)
 */

define('com.pamarin.web.filter.PageFilter', [
    'com.pamarin.core.io.Event',
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Router'
], function(Event, $, Router) {

    $(document).on('click', '.break-link', function(event) {
        Event.preventDefault(event);
        Router.routeTo($(this).attr('href')); //set path
    }).on('click', '.burn-link', function(event) {
        Event.preventDefault(event);
    });

    $(document).on('click', '.pmr-button', function(event) {
        Event.preventDefault(event);
        var dataLink = $(this).attr('data-link');
        if (dataLink){
            Router.routeTo(dataLink); //set path
        }
    });

});
