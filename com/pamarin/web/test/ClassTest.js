///**
// * @author jittagorn pitakmetagoon
// * create 24/10/2013
// */
//define('com.pamarin.web.test.ClassTest', [
//    'com.pamarin.core.lang.Class',
//    'com.pamarin.core.lang.Interface',
//    'com.pamarin.core.util.Windows',
//    'com.pamarin.core.util.collection.ArrayList'
//], function(Class, Interface, Windows, ArrayList) {
////
////    var UserService = Interface.define('UserService', {
////        
////        save : function(){
////            
////        }
////    });
////    
////    var UserServiceImpl = Class.define('UserServiceImpl', {
////        
////    }).implements(UserService);
////
////    var Staff = Class.define('Staff', {            
////        constant: {
////            ALERT: 2,
////            My: 3
////        },
////        constructor: function(username) {
////            console.log('username --> ' + username);
////        },
////        static: {
////            
////        },
////        abstract: {
////            
////            getAuthorities : function(){
////                
////            }
////        }
////    });
////
////    var User = Class.define('User', {
////        constructor: function(username) {
////            console.log('username --> ' + username + '1');
////            User.superConstructor.call(this, username + '2');
////            console.log('username --> ' + username + '3');
////        }
////    }).extends(Staff);
////
////    var user = new User('pramoth');
////    console.log(Staff.constant('ALERT'));
////
////
////
////    Windows.resize(function(){
////        console.log('window resizing.');
////    });
////    
////    
////    var list = new ArrayList();
////    list.add(5);
//});