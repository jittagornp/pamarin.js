/**
 * @author jittagorn pitakmetagoon
 * create 11/05/2014
 */
define('com.pamarin.web.service.unseen.impl.mock.PresenterServiceImpl', [
    'module',
    'com.pamarin.core.remote.RemoteService',
    'com.pamarin.api.service.unseen.PresenterService',
    'com.pamarin.api.model.unseen.Presenter',
    'com.pamarin.api.model.unseen.UnseenPresenter',
    'com.pamarin.core.util.collection.ArrayList'
], function(module, RemoteService, PresenterService, Presenter, UnseenPresenter, ArrayList) {

    /**
     * @class PresenterServiceImpl
     * @service
     */
    var PresenterServiceImpl = RemoteService.define(module.id, (function() {

        function createUnseenPresenters() {
            var list = new ArrayList();

            for (var i = 1; i <= 5; i++) {
                var unseen = new UnseenPresenter();
                unseen.setId(i);
                unseen.setName('unseen ' + i);
                unseen.setImageUrl('http://localhost:8080/unseen/service/photo/?name=unseens/pookradueng/p' + i + '.png&size=32');
                unseen.setProfileUrl('http://localhost:8080/unseen/@unseen' + i);

                list.add(unseen);
            }

            return list;
        }

        function createPresenter() {
            var presenter = new Presenter();
            presenter.setId('1000291029001');
            presenter.setName('jittagorn pitakmetagoon');
            presenter.setProfileUrl('http://localhost:8080/unseen/+jittagornp');
            presenter.setImageUrl('http://localhost:8080/unseen/service/photo/?name=users/user1.png&size=70');
            presenter.setDescription('i am programmer.');
            presenter.setUnseens(createUnseenPresenters());

            return presenter;
        }

        return {
            /**/
            findByUnseenId: function(chain, unseenId) {
                chain.done(createPresenter());
            }

        };
    })()).implements(PresenterService);



    return PresenterServiceImpl;
});