define('com.pamarin.web.controller.unseen.TestClass', [
    'module',
    'com.pamarin.core.lang.Class'
], function(module, Class){
    
    var TestClass = Class.define(module.id, {
        /**/
        onJigsawReady : function(){
            alert('started!');
        }
    });
    
    return TestClass;
});