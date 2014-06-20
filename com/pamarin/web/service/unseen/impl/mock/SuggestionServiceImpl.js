/**
 * @author jittagorn pitakmetagoon
 * create 07/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.SuggestionServiceImpl', [
    'module',
    'com.pamarin.api.service.unseen.SuggestionService',
    'com.pamarin.api.model.unseen.Suggestion',
    'com.pamarin.core.util.collection.ArrayList',
    'com.pamarin.core.context.ApplicationContext',
    'com.pamarin.core.remote.RemoteService'
], function(module, SuggestionService, Suggestion, ArrayList, ApplicationContext, RemoteService) {

    /**
     * @class SuggestionServiceImpl
     * @service
     */
    var SuggestionServiceImpl = RemoteService.define(module.id, (function() {

        var applicationContext = ApplicationContext.getInstance();
        var contextParameters = applicationContext.getParameter('contextParameters');
        var HOST = contextParameters.host + contextParameters.contextPath;

        function createSuggestion(unseenId, index) {
            var suggestion = new Suggestion();
            suggestion.setId(unseenId);
            suggestion.setName('สถานที่ท่องเที่ยวแนะนำ' + index);
            suggestion.setUrl(HOST + '/+national.park/' + unseenId + index);
            suggestion.setImageUrl(HOST + '/service/photo/?name=unseens/pookradueng/p' + (index + 1) + '.png&size=80');
            suggestion.setDescription('content' + index);

            return suggestion;
        }

        return {
            /**
             * @param {String} unseenId
             * @returns {List<Suggestion>}
             */
            findByUnseenId: function(chain, unseenId) {
                var list = new ArrayList();
                for (var index = 1; index <= 14; index++) {
                    list.add(createSuggestion(unseenId, index));
                }

                chain.done(list);
            }
        };
    })()).implements(SuggestionService);



    return SuggestionServiceImpl;
});