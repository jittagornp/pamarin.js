/**
 * @author jittagorn pitakmetagoon
 * create 28/01/2014
 */
contextManager.registerContext('contextParameters', {
    host: 'http://localhost:8080',
    contextPath: '/pamarin',
    defaultPage: '/@unseen1',
    staticContext: '/pstatic'
});

contextManager.registerContext('listeners', [
    'com.pamarin.web.listener.PageContextListener',
//    'com.pamarin.web.listener.RegisterCommandContextListener',
//    'com.pamarin.web.listener.UnitTestContextListener',
//    'com.pamarin.web.listener.CookiesContextListener',
//    'com.pamarin.web.listener.ImageLazyLoadListener',
    'com.pamarin.web.listener.StartControllerContextListener'
]);

contextManager.registerContext('beans', {
    attractionService: 'com.pamarin.web.service.unseen.impl.mock.AttractionServiceImpl',
    touristService: 'com.pamarin.web.service.unseen.impl.mock.TouristServiceImpl',
    presenterService: 'com.pamarin.web.service.unseen.impl.mock.PresenterServiceImpl',
    suggestionService: 'com.pamarin.web.service.unseen.impl.mock.SuggestionServiceImpl',
    feelingService: 'com.pamarin.web.service.unseen.impl.mock.FeelingServiceImpl',
    photoGalleryService: 'com.pamarin.web.service.unseen.impl.mock.PhotoGalleryServiceImpl',
    infoService: 'com.pamarin.web.service.unseen.impl.mock.InfoServiceImpl'
});

contextManager.registerContext('tests', [
    'com.pamarin.web.test.service.UnseenInfoServiceTest',
    'com.pamarin.web.test.remote.HttpTest',
    'com.pamarin.web.test.inject.InjectionTest'
]);

contextManager.registerContext('pages', {
    /**/
    unseen: {
        notation: '@',
        defaultTab: '/information'
    },
    /**/
    profile: {
        notation: '+',
        defaultTab: '/home'
    }
});