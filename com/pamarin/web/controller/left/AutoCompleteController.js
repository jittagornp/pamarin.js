/**
 * @author jittagorn pitakmetagoon
 * create 07/10/2013
 */
define('com.pamarin.web.controller.left.AutoCompleteController', [
    'module',
    'com.jquery.core.JQuery',
    'com.pamarin.core.logging.LoggerFactory',
    'com.pamarin.ui.loader.DataLoader',
    'com.pamarin.ui.loader.LoaderFactory',
    'com.pamarin.core.util.Types',
    'com.pamarin.ui.Typing'
], function(module, $, LoggerFactory, DataLoader, LoaderFactory, Types, Typing) {
    
    var LOG = LoggerFactory.getLogger(module.id);
    var templateLoader = LoaderFactory.getLoader('template');
    
    
    var _$inputSearch = $('#pmrLeftSearchContent .pmr-input-left-search');
    var _$autoCompleteBox = $('#pmrLeftSearchAutoComplete');


    var isOverAutoComplete = false;
    _$autoCompleteBox.binding('mouseenter', function() {
        isOverAutoComplete = true;
    });

    _$autoCompleteBox.binding('mouseleave', function() {
        isOverAutoComplete = false;
    });

    _$inputSearch.binding('blur', function() {
        if (isOverAutoComplete === false) {
            _$autoCompleteBox.hide();
        }
    });

    Typing.typedOnElement(_$inputSearch).onTyped(function(value, $element) {
        if (value === '') {
            _$autoCompleteBox.hide();
            return '';
        }
        
        DataLoader.load('/leftSearch/Autocomplete/?keyword=' + value, function(data) {
            LOG.debug(data);
            if (Types.isArray(data)) {
                _$autoCompleteBox.text('');

                for (var index in data) {
                    var item = data[index];
                    templateLoader.load('/leftSearch/autoCompleteItem').then(function(currentTemplteInstance) {
                        var data = {
                            item: item
                        };

                        currentTemplteInstance.setData(data)
                                .replace()
                                .appendTo('#pmrLeftSearchAutoComplete');
                    });
                }

                _$autoCompleteBox.show().find('.pmr-autoComplete-left-item-link').binding('click', function() {
                    _$inputSearch.val($(this).text());
                    _$autoCompleteBox.hide();
                });
            }
        });
    }).get();
});