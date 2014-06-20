/** 
 * @author  jittagorn pitakmetagoon 
 * create  10/06/2013
 */
define('com.pamarin.core.util.DateUtils', [
    'com.momentjs.core.MomentJS'
], function(MomentJS){
    //MomentJS.lang('th');
    
    var DateUtils = {
        getCurrentDate : function(){
            return MomentJS(new Date()).format('MMMM Do YYYY, h:mm:ss a');
        }
    };
    
    return DateUtils;
});
