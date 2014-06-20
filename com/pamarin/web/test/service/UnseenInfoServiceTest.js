///**
// * @author jittagorn pitakmetagoon
// * create 11/05/2014
// */
//define('com.pamarin.web.test.service.UnseenInfoServiceTest', [
//    'module',
//    'com.pamarin.core.logging.LoggerFactory',
//    'com.pamarin.web.service.unseen.impl.mock.InfoServiceImpl'
//], function(module, LoggerFactory, InfoServiceImpl){
//    
//    var LOG = LoggerFactory.getLogger(module.id);
//    
//    var service = new InfoServiceImpl();
//    service.findByUnseenId('@unseen1').then(function(resultList){
//        LOG.debug('unseen infos --> {}', resultList.toArray());
//    });
//    
//});