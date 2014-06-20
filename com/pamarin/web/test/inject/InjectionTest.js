/**
 * @author jittagorn pitakmetagoon
 * create 15/05/2014
 */
define('com.pamarin.web.test.inject.InjectionTest', [
    'com.pamarin.core.inject.Injection',
    'com.pamarin.api.service.unseen.AttractionService',
    'com.pamarin.api.service.unseen.TouristService'
], function(Injection, AttractionService, TouristService) {
//
//    Injection.inject(function(attractionService, touristService) {
//        attractionService.findByUnseenId('@unseen111111').then(function(list) {
//            //alert(898989);
//        });
//
//        touristService.findByUnseenId('@unseen1').then(function(list) {
//            //alert(0);
//        });
//    }, AttractionService, TouristService);
});