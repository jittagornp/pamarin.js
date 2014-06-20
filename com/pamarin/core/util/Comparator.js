/**
 * @author jittagorn pitakmetagoon
 * create 07/02/2014
 */
define('com.pamarin.core.util.Comparator', [
    'module',
    'com.pamarin.core.lang.Interface'
], function(module, Interface){
    
    /**
     * define interface Comparator
     */
    var Comparator = Interface.define(module.id, {
        //
        compare : function(object1, object2){
            
        }
    });
    
    
    
    return Comparator;
});