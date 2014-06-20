///**
// * @author jittagorn pitakmetagoon
// * create 27/01/2014
// */
//define('com.pamarin.web.test.DependenciesInjectionTest', [
//    'module',
//    'com.pamarin.core.lang.Class'
//], function(module, Class) {
//
//    var UserController = Class.define(module.id, (function() {
//
//        return {
//            //
//            autowire: function(userService) {
//                this.userService_ = userService;
//                console.log('call 1) %O',  new this.userService_());
//            },
//            //
//            onSave: function() {
//                console.log('call 2) %O',  this.userService_);
//
//            }
//        };
//    })());
//
//
//    var controller = new UserController();
//    controller.onSave();
//});