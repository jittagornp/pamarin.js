/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 * 
 * custom by jittagorn pitakmetagoon
 */

var Extends = function() {
    var args = arguments;
    if (args.length === 1) {
        args = [this, args[0]];
    }

    for (var property in args[1]) {
        args[0][property] = args[1][property];
    }

    return args[0];
};

function Class() {
    //
}

Class.prototype.constructor = function() {
    //
};

Class.extend = function(def) {
    var classDef = function() {
        if (arguments[0] !== Class) {
            return this.constructor.apply(this, arguments);
        }
    };

    var proto = new this(Class);
    Extends(proto, def);
    classDef.prototype = proto;
    classDef.extend = this.extend;
    return classDef;
};

var Element = Class.extend({
    //
    constructor: function(element, d) {
        if (typeof(element) === "string") {
            element = (d || document).createElement(element);
        }
        element = $id(element);
        return element;
    },
    //
    appendTo: function(element) {
        element.appendChild(this);
        return this;
    },
    //
    appendBefore: function(element) {
        element.parentNode.insertBefore(this, element);
        return this;
    },
    //
    addEvent: function(eventType, callback) {
        Library.addEvent(this, eventType, callback);
        return this;
    },
    //
    setContent: function(content) {
        this.innerHTML = content;
        return this;
    },
    //
    pos: function() {
        var curleft = 0;
        var curtop = 0;
        var object = this;
        if (object.offsetParent) {
            do {
                curleft += object.offsetLeft;
                curtop += object.offsetTop;
            } while (object = object.offsetParent);
        }
        var b = (!window.opera) ? parseInt(this.getStyle('border-width') || this.style.border) || 0 : 0;
        return [curleft + b, curtop + b + this.offsetHeight];
    },
    //
    noSelect: function() {
        Library.noSelect(this);
        return this;
    },
    //
    parentTag: function(tag) {
        var element = this;
        do {
            if (element && element.nodeName && element.nodeName.toUpperCase() === tag) {
                return element;
            }
            element = element.parentNode;
        } while (element);
        
        return false;
    },
    //
    hasClass: function(clazz) {
        clazz = clazz || 'element';
        return this.className.match('editor-' + clazz);
    },
    //
    addClass: function(clazz) {
        clazz = clazz || 'element';
        if (!this.hasClass(clazz)) {
            if (this.className !== '') {
                this.className = this.className.trim();
                this.className += " editor-" + clazz;
            } else {
                this.className += "editor-" + clazz;
            }
        }
        return this;
    },
    //
    removeClass: function(clazz) {
        clazz = clazz || 'element';
        if (this.hasClass(clazz)) {
            this.className = this.className.replace('editor-' + clazz, ' ');
        }
        return this;
    },
    //
    setStyle: function(st) {
        var elmStyle = this.style;
        for (var itm in st) {
            switch (itm) {
                case 'float':
                    elmStyle['cssFloat'] = elmStyle['styleFloat'] = st[itm];
                    break;
                case 'opacity':
                    elmStyle.opacity = st[itm];
                    elmStyle.filter = "alpha(opacity=" + Math.round(st[itm] * 100) + ")";
                    break;
                case 'className':
                    this.className = st[itm];
                    break;
                default:
                    //if(document.compatMode || itm != "cursor") { // Nasty Workaround for IE 5.5
                    elmStyle[itm] = st[itm];
                    //}		
            }
        }
        return this;
    },
    //
    getStyle: function(cssRule, d) {
        var doc = (!d) ? document.defaultView : d;
        if (this.nodeType === 1)
            return (doc && doc.getComputedStyle) ? doc.getComputedStyle(this, null).getPropertyValue(cssRule) : this.currentStyle[ Library.camelize(cssRule) ];
    },
    //
    remove: function() {
        this.parentNode.removeChild(this);
        return this;
    },
    //
    setAttributes: function(at) {
        for (var itm in at) {
            this[itm] = at[itm];
        }
        return this;
    }
});

var Library = {
    //
    isMSIE: (navigator.appVersion.indexOf("MSIE") !== -1),
    //
    addEvent: function(obj, type, fn) {
        (obj.addEventListener) ? obj.addEventListener(type, fn, false) : obj.attachEvent("on" + type, fn);
    },
    //        
    toArray: function(iterable) {
        var length = iterable.length, results = new Array(length);
        while (length--) {
            results[length] = iterable[length]
        }
        ;
        return results;
    },
    //
    noSelect: function(element) {
        if (element.setAttribute && element.nodeName.toLowerCase() !== 'input' && element.nodeName.toLowerCase() !== 'textarea') {
            element.setAttribute('unselectable', 'on');
        }
        for (var i = 0; i < element.childNodes.length; i++) {
            Library.noSelect(element.childNodes[i]);
        }
    },
    //
    camelize: function(s) {
        return s.replace(/\-(.)/g, function(m, l) {
            return l.toUpperCase();
        });
    },
    //
    inArray: function(arr, item) {
        return (Library.search(arr, item) !== null);
    },
    //
    search: function(arr, item) {
        for (var index = 0; index < arr.length; index++) {
            if (arr[index] === item)
                return index;
        }
        return null;
    },
    //
    cancelEvent: function(e) {
        e = e || window.event;
        if (e.preventDefault && e.stopPropagation) {
            e.preventDefault();
            e.stopPropagation();
        }
        return false;
    },
    //
    domLoad: [],
    //
    domLoaded: function() {
        if (arguments.callee.done)
            return;
        arguments.callee.done = true;
        for (i = 0; i < Library.domLoad.length; i++)
            Library.domLoad[i]();
    },
    //
    onDomLoaded: function(fireThis) {
        this.domLoad.push(fireThis);
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", Library.domLoaded, null);
        } else if (Library.isMSIE) {
            document.write("<style>.edit-main p { margin: 0; }</style><scr" + "ipt id=__ie_onload defer " + ((location.protocol === "https:") ? "src='javascript:void(0)'" : "src=//0") + "><\/scr" + "ipt>");
            $id("__ie_onload").onreadystatechange = function() {
                if (this.readyState === "complete") {
                    Library.domLoaded();
                }
            };
        }
        window.onload = Library.domLoaded;
    }
};

function $id(elementId) {
    if (typeof(elementId) === "string") {
        elementId = document.getElementById(elementId);
    }
    return (elementId && !elementId.appendTo) ? Extends(elementId, Element.prototype) : elementId;
}

var Event = {
    //
    addEvent: function(eventType, eventFunction) {
        if (eventFunction) {
            this.eventList = this.eventList || {};
            this.eventList[eventType] = this.eventList[eventType] || [];
            this.eventList[eventType].push(eventFunction);
        }
        return this;
    },
    //
    fireEvent: function() {
        var args = Library.toArray(arguments), eventType = args.shift();
        if (this.eventList && this.eventList[eventType]) {
            for (var i = 0; i < this.eventList[eventType].length; i++) {
                this.eventList[eventType][i].apply(this, args);
            }
        }
    }
};

function __(s) {
    return s;
}

Function.prototype.closure = function() {
    var __method = this, args = Library.toArray(arguments), obj = args.shift();
    return function() {
        if (typeof(Library) !== 'undefined') {
            return __method.apply(obj, args.concat(Library.toArray(arguments)));
        }
    };
};

Function.prototype.closureListener = function() {
    var __method = this, args = Library.toArray(arguments), object = args.shift();
    return function(event) {
        event = event || window.event;
        if (event.target) {
            var target = event.target;
        } else {
            var target = event.srcElement;
        }
        return __method.apply(object, [event, target].concat(args));
    };
};


/* START CONFIG */

var EditorConfig = Class.extend({
    buttons: {
        'bold': {name: __('Click to Bold'), command: 'Bold', tags: ['B', 'STRONG'], css: {'font-weight': 'bold'}, key: 'b'},
        'italic': {name: __('Click to Italic'), command: 'Italic', tags: ['EM', 'I'], css: {'font-style': 'italic'}, key: 'i'},
        'underline': {name: __('Click to Underline'), command: 'Underline', tags: ['U'], css: {'text-decoration': 'underline'}, key: 'u'},
        'left': {name: __('Left Align'), command: 'justifyleft', noActive: true},
        'center': {name: __('Center Align'), command: 'justifycenter', noActive: true},
        'right': {name: __('Right Align'), command: 'justifyright', noActive: true},
        'justify': {name: __('Justify Align'), command: 'justifyfull', noActive: true},
        'ol': {name: __('Insert Ordered List'), command: 'insertorderedlist', tags: ['OL']},
        'ul': {name: __('Insert Unordered List'), command: 'insertunorderedlist', tags: ['UL']},
        'subscript': {name: __('Click to Subscript'), command: 'subscript', tags: ['SUB']},
        'superscript': {name: __('Click to Superscript'), command: 'superscript', tags: ['SUP']},
        'strikethrough': {name: __('Click to Strike Through'), command: 'strikeThrough', css: {'text-decoration': 'line-through'}},
        'removeformat': {name: __('Remove Formatting'), command: 'removeformat', noActive: true},
        'indent': {name: __('Indent Text'), command: 'indent', noActive: true},
        'outdent': {name: __('Remove Indent'), command: 'outdent', noActive: true},
        'hr': {name: __('Horizontal Rule'), command: 'insertHorizontalRule', noActive: true}
    },
    iconsPath: 'EditorIcons.png',
    buttonList: ['save', 'bold', 'italic', 'underline', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'indent', 'outdent', 'image', 'upload', 'link', 'unlink', 'forecolor', 'bgcolor'],
    iconList: {"xhtml": 1, "bgcolor": 2, "forecolor": 3, "bold": 4, "center": 5, "hr": 6, "indent": 7, "italic": 8, "justify": 9, "left": 10, "ol": 11, "outdent": 12, "removeformat": 13, "right": 14, "save": 25, "strikethrough": 16, "subscript": 17, "superscript": 18, "ul": 19, "underline": 20, "image": 21, "link": 22, "unlink": 23, "close": 24, "arrow": 26, "upload": 27}

});
/* END CONFIG */


var Editors = {
    Plugins: [],
    editors: [],
    //
    registerPlugin: function(plugin, options) {
        this.Plugins.push({p: plugin, o: options});
    },
    //
    allTextAreas: function(Options) {
        var textareas = document.getElementsByTagName("textarea");
        for (var i = 0; i < textareas.length; i++) {
            Editors.editors.push(new Editor(Options).panelInstance(textareas[i]));
        }
        return Editors.editors;
    },
    //
    findEditor: function(editor) {
        var editors = Editors.editors;
        for (var i = 0; i < editors.length; i++) {
            if (editors[i].instanceById(editor)) {
                return editors[i].instanceById(editor);
            }
        }
    }
};


var Editor = Class.extend({
    //
    constructor: function(o) {
        this.options = new EditorConfig();
        Extends(this.options, o);
        this.Instances = new Array();
        this.loadedPlugins = new Array();

        var plugins = Editors.Plugins;
        for (var i = 0; i < plugins.length; i++) {
            this.loadedPlugins.push(new plugins[i].p(this, plugins[i].o));
        }
        Editors.editors.push(this);
        Library.addEvent(document.body, 'mousedown', this.selectCheck.closureListener(this));
    },
    //
    panelInstance: function(e, o) {
        e = this.checkReplace($id(e));
        var panelElm = new Element('DIV').setStyle({width: (parseInt(e.getStyle('width')) || e.clientWidth) + 'px'}).appendBefore(e);
        this.setPanel(panelElm);
        return this.addInstance(e, o);
    },
    //
    checkReplace: function(e) {
        var r = Editors.findEditor(e);
        if (r) {
            r.removeInstance(e);
            r.removePanel();
        }
        return e;
    },
    //
    addInstance: function(e, o) {
        e = this.checkReplace($id(e));
        var newInstance;
        if (e.contentEditable || !!window.opera) {
            newInstance = new EditorInstance(e, o, this);
        } else {
            ewInstance = new EditorIFrameInstance(e, o, this);
        }

        this.Instances.push(newInstance);
        return this;
    },
    //
    removeInstance: function(e) {
        e = $id(e);
        var instances = this.Instances;
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].e == e) {
                instances[i].remove();
                this.Instances.splice(i, 1);
            }
        }
    },
    //
    removePanel: function(e) {
        if (this.Panel) {
            this.Panel.remove();
            this.Panel = null;
        }
    },
    //
    instanceById: function(e) {
        e = $id(e);
        var instances = this.Instances;
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].e == e) {
                return instances[i];
            }
        }
    },
    //
    setPanel: function(e) {
        this.Panel = new EditorPanel($id(e), this.options, this);
        this.fireEvent('panel', this.Panel);
        return this;
    },
    //
    command: function(cmd, args) {
        if (this.selectedInstance) {
            this.selectedInstance.command(cmd, args);
        }
    },
    //
    getIcon: function(iconName, options) {
        var icon = this.options.iconList[iconName];
        var file = (options.iconFiles) ? options.iconFiles[iconName] : '';
        return {backgroundImage: "url('" + ((icon) ? this.options.iconsPath : file) + "')", backgroundPosition: ((icon) ? ((icon - 1) * -18) : 0) + 'px 0px'};
    },
    //
    selectCheck: function(e, t) {
        var found = false;
        do {
            if (t.className && t.className.indexOf('edit') !== -1) {
                return false;
            }
        } while (t = t.parentNode);
        this.fireEvent('blur', this.selectedInstance, t);
        this.lastSelectedInstance = this.selectedInstance;
        this.selectedInstance = null;
        return false;
    }

});

Editor = Editor.extend(Event);


var EditorInstance = Class.extend({
    isSelected: false,
    constructor: function(e, options, Editor) {
        this.editor = Editor;
        this.element = this.e = e;
        this.options = options || {};

        newX = (parseInt(e.getStyle('width')) || e.clientWidth) + 10;
        newY = parseInt(e.getStyle('height')) || e.clientHeight;
        this.initialHeight = newY - 8;

        var isTextarea = (e.nodeName.toLowerCase() == "textarea");
        if (isTextarea || this.options.hasPanel) {
            var ie7s = (Library.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat"));
            var s = {width: newX + 'px', border: '1px solid #ccc', borderTop: 0, overflowY: 'auto', overflowX: 'hidden'};
            s[(ie7s) ? 'height' : 'maxHeight'] = (this.editor.options.maxHeight) ? this.editor.options.maxHeight + 'px' : null;
            this.editorContain = new Element('DIV').setStyle(s).appendBefore(e);
            var editorElm = new Element('DIV').setStyle({width: (newX - 8) + 'px', margin: '4px', minHeight: newY + 'px'}).addClass('main').appendTo(this.editorContain);

            e.setStyle({display: 'none'});

            editorElm.innerHTML = e.innerHTML;
            if (isTextarea) {
                editorElm.setContent(e.value);
                this.copyElement = e;
                var f = e.parentTag('FORM');
                if (f) {
                    Library.addEvent(f, 'submit', this.saveContent.closure(this));
                }
            }
            editorElm.setStyle((ie7s) ? {height: newY + 'px'} : {overflow: 'hidden'});
            this.element = editorElm;
        }
        this.editor.addEvent('blur', this.blur.closure(this));

        this.init();
        this.blur();
    },
    init: function() {
        this.element.setAttribute('contentEditable', 'true');
        if (this.getContent() === "") {
            this.setContent('<br />');
        }
        this.instanceDoc = document.defaultView;
        this.element.addEvent('mousedown', this.selected.closureListener(this)).addEvent('keypress', this.keyDown.closureListener(this)).addEvent('focus', this.selected.closure(this)).addEvent('blur', this.blur.closure(this)).addEvent('keyup', this.selected.closure(this));
        this.editor.fireEvent('add', this);
    },
    remove: function() {
        this.saveContent();
        if (this.copyElement || this.options.hasPanel) {
            this.editorContain.remove();
            this.e.setStyle({'display': 'block'});
            this.editor.removePanel();
        }
        this.disable();
        this.editor.fireEvent('remove', this);
    },
    disable: function() {
        this.element.setAttribute('contentEditable', 'false');
    },
    getSel: function() {
        return (window.getSelection) ? window.getSelection() : document.selection;
    },
    getRng: function() {
        var s = this.getSel();
        if (!s || s.rangeCount === 0) {
            return;
        }
        return (s.rangeCount > 0) ? s.getRangeAt(0) : s.createRange();
    },
    selRng: function(rng, s) {
        if (window.getSelection) {
            s.removeAllRanges();
            s.addRange(rng);
        } else {
            rng.select();
        }
    },
    selElm: function() {
        var r = this.getRng();
        if (!r) {
            return;
        }
        if (r.startContainer) {
            var contain = r.startContainer;
            if (r.cloneContents().childNodes.length == 1) {
                for (var i = 0; i < contain.childNodes.length; i++) {
                    var rng = contain.childNodes[i].ownerDocument.createRange();
                    rng.selectNode(contain.childNodes[i]);
                    if (r.compareBoundaryPoints(Range.START_TO_START, rng) != 1 &&
                            r.compareBoundaryPoints(Range.END_TO_END, rng) != -1) {
                        return $id(contain.childNodes[i]);
                    }
                }
            }
            return $id(contain);
        } else {
            return $id((this.getSel().type == "Control") ? r.item(0) : r.parentElement());
        }
    },
    saveRng: function() {
        this.savedRange = this.getRng();
        this.savedSel = this.getSel();
    },
    restoreRng: function() {
        if (this.savedRange) {
            this.selRng(this.savedRange, this.savedSel);
        }
    },
    keyDown: function(e, t) {
        if (e.ctrlKey) {
            this.editor.fireEvent('key', this, e);
        }
    },
    selected: function(e, t) {
        if (!t && !(t = this.selElm)) {
            t = this.selElm();
        }
        if (!e.ctrlKey) {
            var selInstance = this.editor.selectedInstance;
            if (selInstance != this) {
                if (selInstance) {
                    this.editor.fireEvent('blur', selInstance, t);
                }
                this.editor.selectedInstance = this;
                this.editor.fireEvent('focus', selInstance, t);
            }
            this.editor.fireEvent('selected', selInstance, t);
            this.isFocused = true;
            if (this.element.className.indexOf('selected') === -1) {
                this.element.addClass('selected'); //TO DO
            }
        }
        return false;
    },
    blur: function() {
        console.log(this.element);
        this.isFocused = false;
        this.element.removeClass('selected');
    },
    saveContent: function() {
        if (this.copyElement || this.options.hasPanel) {
            this.editor.fireEvent('save', this);
            (this.copyElement) ? this.copyElement.value = this.getContent() : this.e.innerHTML = this.getContent();
        }
    },
    getElement: function() {
        return this.element;
    },
    getContent: function() {
        this.content = this.getElement().innerHTML;
        this.editor.fireEvent('get', this);
        return this.content;
    },
    setContent: function(e) {
        this.content = e;
        this.editor.fireEvent('set', this);
        this.element.innerHTML = this.content;
    },
    command: function(cmd, args) {
        document.execCommand(cmd, false, args);
    }
});

var EditorIFrameInstance = EditorInstance.extend({
    savedStyles: [],
    init: function() {
        var c = this.element.innerHTML.replace(/^\s+|\s+$/g, '');
        this.element.innerHTML = '';
        (!c) ? c = "<br />" : c;
        this.initialContent = c;

        this.elementFrame = new Element('iframe').setAttributes({'src': 'javascript:;', 'frameBorder': 0, 'allowTransparency': 'true', 'scrolling': 'no'}).setStyle({height: '100px', width: '100%'}).addClass('frame').appendTo(this.element);

        if (this.copyElement) {
            this.elementFrame.setStyle({width: (this.element.offsetWidth - 4) + 'px'});
        }

        var styleList = ['font-size', 'font-family', 'font-weight', 'color'];
        for (itm in styleList) {
            this.savedStyles[Library.camelize(itm)] = this.element.getStyle(itm);
        }

        setTimeout(this.initFrame.closure(this), 50);
    },
    disable: function() {
        this.element.innerHTML = this.getContent();
    },
    initFrame: function() {
        var fd = $id(this.elementFrame.contentWindow.document);
        fd.designMode = "on";
        fd.open();
        var css = this.editor.options.externalCSS;
        fd.write('<html><head>' + ((css) ? '<link href="' + css + '" rel="stylesheet" type="text/css" />' : '') + '</head><body id="EditContent" style="margin: 0 !important; background-color: transparent !important;">' + this.initialContent + '</body></html>');
        fd.close();
        this.frameDoc = fd;

        this.frameWin = $id(this.elementFrame.contentWindow);
        this.frameContent = $id(this.frameWin.document.body).setStyle(this.savedStyles);
        this.instanceDoc = this.frameWin.document.defaultView;

        this.heightUpdate();
        this.frameDoc.addEvent('mousedown', this.selected.closureListener(this)).addEvent('keyup', this.heightUpdate.closureListener(this)).addEvent('keydown', this.keyDown.closureListener(this)).addEvent('keyup', this.selected.closure(this));
        this.editor.fireEvent('add', this);
    },
    getElement: function() {
        return this.frameContent;
    },
    setContent: function(c) {
        this.content = c;
        this.editor.fireEvent('set', this);
        this.frameContent.innerHTML = this.content;
        this.heightUpdate();
    },
    getSel: function() {
        return (this.frameWin) ? this.frameWin.getSelection() : this.frameDoc.selection;
    },
    heightUpdate: function() {
        this.elementFrame.style.height = Math.max(this.frameContent.offsetHeight, this.initialHeight) + 'px';
    },
    command: function(cmd, args) {
        this.frameDoc.execCommand(cmd, false, args);
        setTimeout(this.heightUpdate.closure(this), 100);
    }


});

var EditorPanel = Class.extend({
    constructor: function(element, options, Editor) {
        this.element = element;
        this.options = options;
        this.editor = Editor;
        this.panelButtons = new Array();
        this.buttonList = Extends([], this.editor.options.buttonList);

        this.panelContain = new Element('DIV').setStyle({overflow: 'hidden', width: '100%', padding: '5px', border: '1px solid #cccccc'/*, backgroundColor: '#efefef'*/}).addClass('panelContain');
        this.panelElement = new Element('DIV').setStyle({margin: '2px', marginTop: '0px', zoom: 1, overflow: 'hidden'}).addClass('panel').appendTo(this.panelContain);
        this.panelContain.appendTo(element);

        var opt = this.editor.options;
        var buttons = opt.buttons;
        for (button in buttons) {
            this.addButton(button, opt, true);
        }
        this.reorder();
        element.noSelect();
    },
    addButton: function(buttonName, options, noOrder) {
        var button = options.buttons[buttonName];
        var type = (button['type']) ? eval('(typeof(' + button['type'] + ') == "undefined") ? null : ' + button['type'] + ';') : EditorButton;
        var hasButton = Library.inArray(this.buttonList, buttonName);
        if (type && (hasButton || this.editor.options.fullPanel)) {
            this.panelButtons.push(new type(this.panelElement, buttonName, options, this.editor));
            if (!hasButton) {
                this.buttonList.push(buttonName);
            }
        }
    },
    findButton: function(item) {
        for (var i = 0; i < this.panelButtons.length; i++) {
            if (this.panelButtons[i].name == item)
                return this.panelButtons[i];
        }
    },
    reorder: function() {
        var bl = this.buttonList;
        for (var i = 0; i < bl.length; i++) {
            var button = this.findButton(bl[i]);
            if (button) {
                this.panelElement.appendChild(button.margin);
            }
        }
    },
    remove: function() {
        this.element.remove();
    }
});

var EditorButton = Class.extend({
    constructor: function(e, buttonName, options, Editor) {
        this.options = options.buttons[buttonName];
        this.name = buttonName;
        this.editor = Editor;
        this.element = e;

        this.margin = new Element('DIV').setStyle({display: 'inline-block', marginTop: '2px'}).appendTo(e);
        this.contain = new Element('DIV').setStyle({width: '20px', height: '22px', 'margin-right': '2px'}).addClass('buttonContain').appendTo(this.margin);
        this.border = new Element('DIV').setStyle({backgroundColor: '#efefef'/*, border: '1px solid #efefef'*/}).appendTo(this.contain);
        this.button = new Element('DIV').setStyle({width: '18px', height: '18px', overflow: 'hidden', zoom: 1, cursor: 'pointer'}).addClass('button').setStyle(this.editor.getIcon(buttonName, options)).appendTo(this.border);
        this.button.addEvent('mouseover', this.hoverOn.closure(this)).addEvent('mouseout', this.hoverOff.closure(this)).addEvent('mousedown', this.mouseClick.closure(this)).noSelect();

        if (!window.opera) {
            this.button.onmousedown = this.button.onclick = Library.cancelEvent;
        }

        Editor.addEvent('selected', this.enable.closure(this)).addEvent('blur', this.disable.closure(this)).addEvent('key', this.key.closure(this));

        this.disable();
        this.init();
    },
    init: function() {
    },
    hide: function() {
        this.contain.setStyle({display: 'none'});
    },
    updateState: function() {
        if (this.isDisabled) {
            this.setBackground();
        }
        else if (this.isHover) {
            this.setBackground('hover');
        }
        else if (this.isActive) {
            this.setBackground('active');
        }
        else {
            this.setBackground();
        }
    },
    setBackground: function(state) {
        switch (state) {
            case 'hover':
                var stateStyle = {/*border: '1px solid #ddd', */backgroundColor: '#ddd'};
                break;
            case 'active':
                var stateStyle = {/*border: '1px solid #666', */backgroundColor: '#ccc'};
                break;
            default:
                var stateStyle = {/*border: '1px solid #efefef', */backgroundColor: '#efefef'};
        }
        this.border.setStyle(stateStyle).addClass('button-' + state);
    },
    checkNodes: function(e) {
        var elm = e;
        do {
            if (this.options.tags && Library.inArray(this.options.tags, elm.nodeName)) {
                this.activate();
                return true;
            }
        } while (elm = elm.parentNode && elm.className != "edit");
        elm = $id(e);
        while (elm.nodeType == 3) {
            elm = $id(elm.parentNode);
        }
        if (this.options.css) {
            for (var item in this.options.css) {
                if (elm.getStyle(item, this.editor.selectedInstance.instanceDoc) == this.options.css[item]) {
                    this.activate();
                    return true;
                }
            }
        }
        this.deactivate();
        return false;
    },
    activate: function() {
        if (!this.isDisabled) {
            this.isActive = true;
            this.updateState();
            this.editor.fireEvent('buttonActivate', this);
        }
    },
    deactivate: function() {
        this.isActive = false;
        this.updateState();
        if (!this.isDisabled) {
            this.editor.fireEvent('buttonDeactivate', this);
        }
    },
    enable: function(ins, t) {
        this.isDisabled = false;
        this.contain/*.setStyle({'opacity': 1})*/.addClass('buttonEnabled');
        this.updateState();
        this.checkNodes(t);
    },
    disable: function(ins, t) {
        this.isDisabled = true;
        this.contain/*.setStyle({'opacity': 0.6})*/.removeClass('buttonEnabled');
        this.updateState();
    },
    toggleActive: function() {
        (this.isActive) ? this.deactivate() : this.activate();
    },
    hoverOn: function() {
        if (!this.isDisabled) {
            this.isHover = true;
            this.updateState();
            this.editor.fireEvent("buttonOver", this);
        }
    },
    hoverOff: function() {
        this.isHover = false;
        this.updateState();
        this.editor.fireEvent("buttonOut", this);
    },
    mouseClick: function() {
        if (this.options.command) {
            this.editor.command(this.options.command, this.options.commandArgs);
            if (!this.options.noActive) {
                this.toggleActive();
            }
        }
        this.editor.fireEvent("buttonClick", this);
    },
    key: function(Instance, e) {
        if (this.options.key && e.ctrlKey && String.fromCharCode(e.keyCode || e.charCode).toLowerCase() == this.options.key) {
            this.mouseClick();
            if (e.preventDefault)
                e.preventDefault();
        }
    }

});


var Plugin = Class.extend({
    constructor: function(Editor, options) {
        this.options = options;
        this.editor = Editor;
        this.editor.addEvent('panel', this.loadPanel.closure(this));

        this.init();
    },
    loadPanel: function(np) {
        var buttons = this.options.buttons;
        for (var button in buttons) {
            np.addButton(button, this.options);
        }
        np.reorder();
    },
    init: function() {
    }
});




/* START CONFIG */
var PaneOptions = {};
/* END CONFIG */

var EditorPane = Class.extend({
    constructor: function(elm, Editor, options, openButton) {
        this.editor = Editor;
        this.element = elm;
        this.pos = elm.pos();

        console.log(options);

        this.contain = new Element('div').setStyle({zIndex: '99999', overflow: 'hidden', position: 'absolute', left: (this.pos[0] - 1) + 'px', top: (this.pos[1] - 1) + 'px'})
        this.pane = new Element('div').setStyle({fontSize: '12px', border: '1px solid #ccc', 'overflow': 'hidden', padding: '4px', textAlign: 'left', backgroundColor: '#000'}).addClass('pane').setStyle(options).appendTo(this.contain);

        if (openButton && !openButton.options.noClose) {
            this.close = new Element('div').setStyle({'float': 'right', height: '16px', width: '16px', cursor: 'pointer'}).setStyle(this.editor.getIcon('close', PaneOptions)).addEvent('mousedown', openButton.removePane.closure(this)).appendTo(this.pane);
        }

        this.contain.noSelect().appendTo(document.body);

        this.position();
        this.init();
    },
    //
    init: function() {
        //
    },
    //
    position: function() {
        if (this.editor.Panel) {
            var panelElm = this.editor.Panel.element;
            var panelPos = panelElm.pos();
            var newLeft = panelPos[0] + parseInt(panelElm.getStyle('width')) - (parseInt(this.pane.getStyle('width')) + 8);
            if (newLeft < this.pos[0]) {
                this.contain.setStyle({left: newLeft + 'px'});
            }
        }
    },
    toggle: function() {
        this.isVisible = !this.isVisible;
        this.contain.setStyle({display: ((this.isVisible) ? 'block' : 'none')});
    },
    remove: function() {
        if (this.contain) {
            this.contain.remove();
            this.contain = null;
        }
    },
    append: function(c) {
        c.appendTo(this.pane);
    },
    setContent: function(c) {
        this.pane.setContent(c);
    }

});



var EditorAdvancedButton = EditorButton.extend({
    init: function() {
        this.editor.addEvent('selected', this.removePane.closure(this)).addEvent('blur', this.removePane.closure(this));
    },
    mouseClick: function() {
        if (!this.isDisabled) {
            if (this.pane && this.pane.pane) {
                this.removePane();
            } else {
                this.pane = new EditorPane(this.contain, this.editor, {width: (this.width || '270px'), backgroundColor: '#fff'}, this);
                this.addPane();
                this.editor.selectedInstance.saveRng();
            }
        }
    },
    addForm: function(f, elm) {
        this.form = new Element('form').addEvent('submit', this.submit.closureListener(this));
        this.pane.append(this.form);
        this.inputs = {};

        for (itm in f) {
            var field = f[itm];
            var val = '';
            if (elm) {
                val = elm.getAttribute(itm);
            }
            if (!val) {
                val = field['value'] || '';
            }
            var type = f[itm].type;

            if (type == 'title') {
                new Element('div').setContent(field.txt).setStyle({fontSize: '14px', fontWeight: 'bold', padding: '0px', margin: '2px 0'}).appendTo(this.form);
            } else {
                var contain = new Element('div').setStyle({overflow: 'hidden', clear: 'both'}).appendTo(this.form);
                if (field.txt) {
                    new Element('label').setAttributes({'for': itm}).setContent(field.txt).setStyle({margin: '2px 4px', fontSize: '13px', width: '50px', lineHeight: '20px', textAlign: 'right', 'float': 'left'}).appendTo(contain);
                }

                switch (type) {
                    case 'text':
                        this.inputs[itm] = new Element('input').setAttributes({id: itm, 'value': val, 'type': 'text'}).setStyle({margin: '2px 0', fontSize: '13px', 'float': 'left', height: '20px', border: '1px solid #ccc', overflow: 'hidden'}).setStyle(field.style).appendTo(contain);
                        break;
                    case 'select':
                        this.inputs[itm] = new Element('select').setAttributes({id: itm}).setStyle({border: '1px solid #ccc', 'float': 'left', margin: '2px 0'}).appendTo(contain);
                        for (opt in field.options) {
                            var o = new Element('option').setAttributes({value: opt, selected: (opt == val) ? 'selected' : ''}).setContent(field.options[opt]).appendTo(this.inputs[itm]);
                        }
                        break;
                    case 'content':
                        this.inputs[itm] = new Element('textarea').setAttributes({id: itm}).setStyle({border: '1px solid #ccc', 'float': 'left'}).setStyle(field.style).appendTo(contain);
                        this.inputs[itm].value = val;
                }
            }
        }
        new Element('input').setAttributes({'type': 'submit'}).setStyle({backgroundColor: '#efefef', border: '1px solid #ccc', margin: '3px 0', 'float': 'left', 'clear': 'both'}).appendTo(this.form);
        this.form.onsubmit = Library.cancelEvent;
    },
    submit: function() {
    },
    findElm: function(tag, attr, val) {
        var list = this.editor.selectedInstance.getElement().getElementsByTagName(tag);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getAttribute(attr) == val) {
                return $id(list[i]);
            }
        }
    },
    removePane: function() {
        if (this.pane) {
            this.pane.remove();
            this.pane = null;
            this.editor.selectedInstance.restoreRng();
        }
    }
});


var ButtonTips = Class.extend({
    constructor: function(Editor) {
        this.editor = Editor;
        Editor.addEvent('buttonOver', this.show.closure(this)).addEvent('buttonOut', this.hide.closure(this));

    },
    show: function(button) {
        this.timer = setTimeout(this.create.closure(this, button), 400);
    },
    create: function(button) {
        this.timer = null;
        if (!this.pane) {
            this.pane = new EditorPane(button.button, this.editor, {border: 'none', color: '#fff', fontSize: '12px', marginTop: '5px'});
            this.pane.setContent(button.options.name);
        }
    },
    hide: function(button) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.pane) {
            this.pane = this.pane.remove();
        }
    }
});
Editors.registerPlugin(ButtonTips);



/* START CONFIG */
var SelectOptions = {
    buttons: {
        'fontSize': {name: __('Select Font Size'), type: 'EditorFontSizeSelect', command: 'fontsize'},
        'fontFamily': {name: __('Select Font Family'), type: 'EditorFontFamilySelect', command: 'fontname'},
        'fontFormat': {name: __('Select Font Format'), type: 'EditorFontFormatSelect', command: 'formatBlock'}
    }
};
/* END CONFIG */
var EditorSelect = Class.extend({
    constructor: function(e, buttonName, options, Editor) {
        this.options = options.buttons[buttonName];
        this.element = e;
        this.editor = Editor;
        this.name = buttonName;
        this.selOptions = new Array();

        this.margin = new Element('div').setStyle({
            'float': 'left',
            margin: '2px 1px 0 1px'
        }).appendTo(this.element);



        this.contain = new Element('div').setStyle({
            width: '125px',
            'margin-right': '2px',
            height: '20px',
            cursor: 'pointer',
            overflow: 'hidden'
        }).addClass('selectContain')
                .setAttributes({tabIndex: -1})
                .addEvent('click', this.toggle.closure(this))
                .appendTo(this.margin);

        this.items = new Element('div').setStyle({
            overflow: 'hidden',
            zoom: 1,
            border: '1px solid #ccc',
            paddingLeft: '3px',
            backgroundColor: '#fff'
        }).appendTo(this.contain);

        this.control = new Element('div').setStyle({
            overflow: 'hidden',
            'float': 'right',
            height: '18px',
            width: '16px'
        }).addClass('selectControl')
                .setStyle(this.editor.getIcon('arrow', options))
                .appendTo(this.items);

        this.txt = new Element('div').setStyle({
            overflow: 'hidden',
            'float': 'left',
            width: '66px',
            height: '14px',
            marginTop: '1px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            fontSize: '12px'
        }).addClass('selectTxt')
                .appendTo(this.items);

        if (!window.opera) {
            this.contain.onmousedown = this.control.onmousedown = this.txt.onmousedown = Library.cancelEvent;
        }

        this.margin.noSelect();

        this.editor.addEvent('selected', this.enable.closure(this)).addEvent('blur', this.disable.closure(this));

        this.disable();
        this.init();
    },
    disable: function() {
        this.isDisabled = true;
        this.close();
        //this.contain.setStyle({opacity: 0.6});
    },
    enable: function(t) {
        this.isDisabled = false;
        this.close();
        //this.contain.setStyle({opacity: 1});
    },
    setDisplay: function(txt) {
        this.txt.setContent(txt);
    },
    toggle: function() {
        this.editor.fireEvent('blur');
        this.open();
        if (!this.isDisabled) {
            (this.pane) ? this.close() : this.open();
        }

        //this.editor.fireEvent('blur');
        //this.open();
    },
    open: function() {
        this.pane = new EditorPane(this.items, this.editor, {width: '123px', padding: '0px', borderTop: 0, borderLeft: '1px solid #ccc', borderRight: '1px solid #ccc', borderBottom: '0px', backgroundColor: '#fff'});

        for (var i = 0; i < this.selOptions.length; i++) {
            var options = this.selOptions[i];
            var itmContain = new Element('div').setStyle({overflow: 'hidden', borderBottom: '1px solid #ccc', width: '123px', textAlign: 'left', overflow : 'hidden', cursor: 'pointer'});
            var item = new Element('div').setStyle({padding: '2px 4px'}).setContent(options[1]).appendTo(itmContain).noSelect();
            item.addEvent('click', this.update.closure(this, options[0])).addEvent('mouseover', this.over.closure(this, item)).addEvent('mouseout', this.out.closure(this, item)).setAttributes('id', options[0]);
            this.pane.append(itmContain);
            if (!window.opera) {
                item.onmousedown = Library.cancelEvent;
            }
        }
    },
    close: function() {
        if (this.pane) {
            this.pane = this.pane.remove();
        }
    },
    over: function(option) {
        option.setStyle({backgroundColor: '#3297fd', color: '#fff'});
    },
    out: function(option) {
        option.setStyle({backgroundColor: '#fff', color: '#000'});
    },
    add: function(key, value) {
        this.selOptions.push(new Array(key, value));
    },
    update: function(elm) {
        this.editor.command(this.options.command, elm);
        this.close();
    }
});

//var EditorFontSizeSelect = EditorSelect.extend({
//    sel: {1: '1&nbsp;(8pt)', 2: '2&nbsp;(10pt)', 3: '3&nbsp;(12pt)', 4: '4&nbsp;(14pt)', 5: '5&nbsp;(18pt)', 6: '6&nbsp;(24pt)'},
//    init: function() {
//        this.setDisplay('Font&nbsp;Size...');
//        for (itm in this.sel) {
//            this.add(itm, '<font size="' + itm + '">' + this.sel[itm] + '</font>');
//        }
//    }
//});
//
//var EditorFontFamilySelect = EditorSelect.extend({
//    sel: {'arial': 'Arial', 'comic sans ms': 'Comic Sans', 'courier new': 'Courier New', 'georgia': 'Georgia', 'helvetica': 'Helvetica', 'impact': 'Impact', 'times new roman': 'Times', 'trebuchet ms': 'Trebuchet', 'verdana': 'Verdana'},
//    init: function() {
//        this.setDisplay('Font&nbsp;Family...');
//        for (itm in this.sel) {
//            this.add(itm, '<font face="' + itm + '">' + this.sel[itm] + '</font>');
//        }
//    }
//});

var EditorFontFormatSelect = EditorSelect.extend({
    //
    sel: {
        'p': 'Paragraph',
        'pre': 'Pre',
        'h6': 'Heading&nbsp;6',
        'h5': 'Heading&nbsp;5',
        'h4': 'Heading&nbsp;4',
        'h3': 'Heading&nbsp;3',
        'h2': 'Heading&nbsp;2',
        'h1': 'Heading&nbsp;1'
    },
    //  
    init: function() {
        this.setDisplay('Font&nbsp;Format...');
        for (var item in this.sel) {
            var tag = item.toUpperCase();
            this.add('<' + tag + '>', '<' + item + ' style="padding: 0px; margin: 0px;">' + this.sel[item] + '</' + tag + '>');
        }
    }
});

Editors.registerPlugin(Plugin, SelectOptions);



/* START CONFIG */
var LinkOptions = {
    buttons: {
        'link': {name: 'Add Link', type: 'LinkButton', tags: ['A']},
        'unlink': {name: 'Remove Link', command: 'unlink', noActive: true}
    }
};
/* END CONFIG */

var LinkButton = EditorAdvancedButton.extend({
    addPane: function() {
        this.ln = this.editor.selectedInstance.selElm().parentTag('A');
        this.addForm({
            '': {type: 'title', txt: 'Add/Edit Link'},
            'href': {type: 'text', txt: 'URL', value: '', style: {width: '150px'}},
            'title': {type: 'text', txt: 'Title'},
            'target': {type: 'select', txt: 'Open In', options: {'': 'Current Window', '_blank': 'New Window'}, style: {width: '100px'}}
        }, this.ln);
    },
    submit: function(e) {
        var url = this.inputs['href'].value;
        if (url == "http://" || url == "") {
            alert("You must enter a URL to Create a Link");
            return false;
        }
        this.removePane();

        if (!this.ln) {
            var tmp = 'javascript:Temp();';
            this.editor.command("createlink", tmp);
            this.ln = this.findElm('A', 'href', tmp);
        }
        if (this.ln) {
            this.ln.setAttributes({
                href: this.inputs['href'].value,
                title: this.inputs['title'].value,
                target: this.inputs['target'].options[this.inputs['target'].selectedIndex].value
            });
        }
    }
});

Editors.registerPlugin(Plugin, LinkOptions);



/* START CONFIG */
var ColorOptions = {
    buttons: {
        'forecolor': {name: __('Change Text Color'), type: 'EditorColorButton', noClose: true},
        'bgcolor': {name: __('Change Background Color'), type: 'EditorBgColorButton', noClose: true}
    }
};
/* END CONFIG */

var EditorColorButton = EditorAdvancedButton.extend({
    addPane: function() {
        var colorList = ['#3297fd', '#0078da', '#000', '#333', '#555', '#777', '#999', '#ccc', '#ddd', '#eee'];//{0: '00', 1: '33', 2: '66', 3: '99', 4: 'CC', 5: 'FF'};
        var colorItems = new Element('DIV').setStyle({width: '150px'});


//        for (var r in colorList) {
//            for (var b in colorList) {
        for (var g in colorList) {
            var colorCode = colorList[g];//'#' + colorList[r] + colorList[g] + colorList[b];
//
            var colorSquare = new Element('DIV').setStyle({'cursor': 'pointer', 'height': '15px', 'float': 'left'}).appendTo(colorItems);
            var colorBorder = new Element('DIV').setStyle({border: '2px solid ' + colorCode}).appendTo(colorSquare);
            var colorInner = new Element('DIV').setStyle({backgroundColor: colorCode, overflow: 'hidden', width: '11px', height: '11px'}).addEvent('click', this.colorSelect.closure(this, colorCode)).addEvent('mouseover', this.on.closure(this, colorBorder)).addEvent('mouseout', this.off.closure(this, colorBorder, colorCode)).appendTo(colorBorder);
//
            if (!window.opera) {
                colorSquare.onmousedown = colorInner.onmousedown = Library.cancelEvent;
            }
//
        }
//            }
//        }
        this.pane.append(colorItems.noSelect());
        this.pane.pane.style.width = '150px';
    },
    colorSelect: function(c) {
        this.editor.command('foreColor', c);
        this.removePane();
    },
    on: function(colorBorder) {
        colorBorder.setStyle({border: '2px solid red'});
    },
    off: function(colorBorder, colorCode) {
        colorBorder.setStyle({border: '2px solid ' + colorCode});
    }
});

var EditorBackgroundColorButton = EditorColorButton.extend({
    colorSelect: function(c) {
        this.editor.command('hiliteColor', c);
        this.removePane();
    }
});

Editors.registerPlugin(Plugin, ColorOptions);



///* START CONFIG */
//var ImageOptions = {
//    buttons: {
//        'image': {name: 'Add Image', type: 'ImageButton', tags: ['IMG']}
//    }
//
//};
///* END CONFIG */
//
//var ImageButton = EditorAdvancedButton.extend({
//    addPane: function() {
//        this.image = this.editor.selectedInstance.selElm().parentTag('IMG');
//        this.addForm({
//            '': {type: 'title', txt: 'Add/Edit Image'},
//            'src': {type: 'text', txt: 'URL', 'value': 'http://', style: {width: '150px'}},
//            'alt': {type: 'text', txt: 'Alt Text', style: {width: '100px'}},
//            'align': {type: 'select', txt: 'Align', options: {none: 'Default', 'left': 'Left', 'right': 'Right'}}
//        }, this.image);
//    },
//    submit: function(e) {
//        var src = this.inputs['src'].value;
//        if (src === "" || src === "http://") {
//            alert("You must enter a Image URL to insert");
//            return false;
//        }
//        this.removePane();
//
//        if (!this.image) {
//            var tmp = 'javascript:ImTemp();';
//            this.editor.command("insertImage", tmp);
//            this.image = this.findElm('IMG', 'src', tmp);
//        }
//        if (this.image) {
//            this.image.setAttributes({
//                src: this.inputs['src'].value,
//                alt: this.inputs['alt'].value,
//                align: this.inputs['align'].value
//            });
//        }
//    }
//});
//
//Editors.registerPlugin(Plugin, ImageOptions);




/* START CONFIG */
var SaveOptions = {
    buttons: {
        'save': {name: __('Save this content'), type: 'EditorSaveButton'}
    }
};
/* END CONFIG */

var EditorSaveButton = EditorButton.extend({
    init: function() {
        if (!this.editor.options.onSave) {
            this.margin.setStyle({'display': 'none'});
        }
    },
    mouseClick: function() {
        var onSave = this.editor.options.onSave;
        var selectedInstance = this.editor.selectedInstance;
        onSave(selectedInstance.getContent(), selectedInstance.element.id, selectedInstance);
    }
});

Editors.registerPlugin(Plugin, SaveOptions);



/* START CONFIG */
var UploadOptions = {
    buttons: {
        'upload': {name: 'Upload Image', type: 'UploadButton'}
    }

};
/* END CONFIG */

var UploadButton = EditorAdvancedButton.extend({
    URI: 'http://api.imgur.com/2/upload.json',
    errorText: 'Failed to upload image',
    addPane: function() {
        if (typeof window.FormData === "undefined") {
            return this.onError("Image uploads are not supported in this browser, use Chrome, Firefox, or Safari instead.");
        }
        this.image = this.editor.selectedInstance.selElm().parentTag('IMG');

        var container = new Element('div')
                .setStyle({padding: '10px'})
                .appendTo(this.pane.pane);

        new Element('div')
                .setStyle({fontSize: '14px', fontWeight: 'bold', paddingBottom: '5px'})
                .setContent('Insert an Image')
                .appendTo(container);

        this.fileInput = new Element('input')
                .setAttributes({'type': 'file'})
                .appendTo(container);

        this.progress = new Element('progress')
                .setStyle({width: '100%', display: 'none'})
                .setAttributes('max', 100)
                .appendTo(container);

        this.fileInput.onchange = this.uploadFile.closure(this);
    },
    onError: function(msg) {
        this.removePane();
        alert(msg || "Failed to upload image");
    },
    uploadFile: function() {
        var file = this.fileInput.files[0];
        if (!file || !file.type.match(/image.*/)) {
            this.onError("Only image files can be uploaded");
            return;
        }
        this.fileInput.setStyle({display: 'none'});
        this.setProgress(0);

        var fd = new FormData(); // https://hacks.mozilla.org/2011/01/how-to-develop-a-html5-image-uploader/
        fd.append("image", file);
        fd.append("key", "b7ea18a4ecbda8e92203fa4968d10660");
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.editor.options.uploadURI || this.URI);

        xhr.onload = function() {
            try {
                var res = JSON.parse(xhr.responseText);
            } catch (e) {
                return this.onError();
            }
            this.onUploaded(res.upload);
        }.closure(this);
        xhr.onerror = this.onError.closure(this);
        xhr.upload.onprogress = function(e) {
            this.setProgress(e.loaded / e.total);
        }.closure(this);
        xhr.send(fd);
    },
    setProgress: function(percent) {
        this.progress.setStyle({display: 'block'});
        if (percent < .98) {
            this.progress.value = percent;
        } else {
            this.progress.removeAttribute('value');
        }
    },
    onUploaded: function(options) {
        this.removePane();
        var src = options.links.original;
        if (!this.image) {
            this.editor.selectedInstance.restoreRng();
            var tmp = 'javascript:ImTemp();';
            this.editor.command("insertImage", src);
            this.image = this.findElm('IMG', 'src', src);
        }
        var w = parseInt(this.editor.selectedInstance.element.getStyle('width'));
        if (this.image) {
            this.image.setAttributes({
                src: src,
                width: (w && options.image.width) ? Math.min(w, options.image.width) : ''
            });
        }
    }
});

Editors.registerPlugin(Plugin, UploadOptions);



var XHTML = Class.extend({
    stripAttributes: ['_moz_dirty', '_moz_resizing', '_extended'],
    noShort: ['style', 'title', 'script', 'textarea', 'a'],
    cssReplace: {'font-weight:bold;': 'strong', 'font-style:italic;': 'em'},
    sizes: {1: 'xx-small', 2: 'x-small', 3: 'small', 4: 'medium', 5: 'large', 6: 'x-large'},
    constructor: function(Editor) {
        this.editor = Editor;
        if (this.editor.options.xhtml) {
            Editor.addEvent('get', this.cleanup.closure(this));
        }
    },
    cleanup: function(ni) {
        var node = ni.getElement();
        var xhtml = this.toXHTML(node);
        ni.content = xhtml;
    },
    toXHTML: function(n, r, d) {
        var txt = '';
        var attrTxt = '';
        var cssTxt = '';
        var nType = n.nodeType;
        var nName = n.nodeName.toLowerCase();
        var nChild = n.hasChildNodes && n.hasChildNodes();
        var extraNodes = new Array();

        switch (nType) {
            case 1:
                var nAttributes = n.attributes;

                switch (nName) {
                    case 'b':
                        nName = 'strong';
                        break;
                    case 'i':
                        nName = 'em';
                        break;
                    case 'font':
                        nName = 'span';
                        break;
                }

                if (r) {
                    for (var i = 0; i < nAttributes.length; i++) {
                        var attr = nAttributes[i];

                        var attributeName = attr.nodeName.toLowerCase();
                        var attributeValue = attr.nodeValue;

                        if (!attr.specified || !attributeValue || Library.inArray(this.stripAttributes, attributeName) || typeof(attributeValue) == "function") {
                            continue;
                        }

                        switch (attributeName) {
                            case 'style':
                                var css = attributeValue.replace(/ /g, "");
                                for (itm in this.cssReplace) {
                                    if (css.indexOf(itm) != -1) {
                                        extraNodes.push(this.cssReplace[itm]);
                                        css = css.replace(itm, '');
                                    }
                                }
                                cssTxt += css;
                                attributeValue = "";
                                break;
                            case 'class':
                                attributeValue = attributeValue.replace("Apple-style-span", "");
                                break;
                            case 'size':
                                cssTxt += "font-size:" + this.sizes[attributeValue] + ';';
                                attributeValue = "";
                                break;
                        }

                        if (attributeValue) {
                            attrTxt += ' ' + attributeName + '="' + attributeValue + '"';
                        }
                    }

                    if (cssTxt) {
                        attrTxt += ' style="' + cssTxt + '"';
                    }

                    for (var i = 0; i < extraNodes.length; i++) {
                        txt += '<' + extraNodes[i] + '>';
                    }

                    if (attrTxt == "" && nName == "span") {
                        r = false;
                    }
                    if (r) {
                        txt += '<' + nName;
                        if (nName != 'br') {
                            txt += attrTxt;
                        }
                    }
                }



                if (!nChild && !Library.inArray(this.noShort, attributeName)) {
                    if (r) {
                        txt += ' />';
                    }
                } else {
                    if (r) {
                        txt += '>';
                    }

                    for (var i = 0; i < n.childNodes.length; i++) {
                        var results = this.toXHTML(n.childNodes[i], true, true);
                        if (results) {
                            txt += results;
                        }
                    }
                }

                if (r && nChild) {
                    txt += '</' + nName + '>';
                }

                for (var i = 0; i < extraNodes.length; i++) {
                    txt += '</' + extraNodes[i] + '>';
                }

                break;
            case 3:
                //if(n.nodeValue != '\n') {
                txt += n.nodeValue;
                //}
                break;
        }

        return txt;
    }
});
Editors.registerPlugin(XHTML);



var BBCode = Class.extend({
    constructor: function(Editor) {
        this.editor = Editor;
        if (this.editor.options.bbCode) {
            Editor.addEvent('get', this.bbGet.closure(this));
            Editor.addEvent('set', this.bbSet.closure(this));

            var loadedPlugins = this.editor.loadedPlugins;
            for (itm in loadedPlugins) {
                if (loadedPlugins[itm].toXHTML) {
                    this.xhtml = loadedPlugins[itm];
                }
            }
        }
    },
    bbGet: function(ni) {
        var xhtml = this.xhtml.toXHTML(ni.getElement());
        ni.content = this.toBBCode(xhtml);
    },
    bbSet: function(ni) {
        ni.content = this.fromBBCode(ni.content);
    },
    toBBCode: function(xhtml) {
        function rp(r, m) {
            xhtml = xhtml.replace(r, m);
        }

        rp(/\n/gi, "");
        rp(/<strong>(.*?)<\/strong>/gi, "[b]$1[/b]");
        rp(/<em>(.*?)<\/em>/gi, "[i]$1[/i]");
        rp(/<span.*?style="text-decoration:underline;">(.*?)<\/span>/gi, "[u]$1[/u]");
        rp(/<ul>(.*?)<\/ul>/gi, "[list]$1[/list]");
        rp(/<li>(.*?)<\/li>/gi, "[*]$1[/*]");
        rp(/<ol>(.*?)<\/ol>/gi, "[list=1]$1[/list]");
        rp(/<img.*?src="(.*?)".*?>/gi, "[img]$1[/img]");
        rp(/<a.*?href="(.*?)".*?>(.*?)<\/a>/gi, "[url=$1]$2[/url]");
        rp(/<br.*?>/gi, "\n");
        rp(/<.*?>.*?<\/.*?>/gi, "");

        return xhtml;
    },
    fromBBCode: function(bbCode) {
        function rp(r, m) {
            bbCode = bbCode.replace(r, m);
        }

        rp(/\[b\](.*?)\[\/b\]/gi, "<strong>$1</strong>");
        rp(/\[i\](.*?)\[\/i\]/gi, "<em>$1</em>");
        rp(/\[u\](.*?)\[\/u\]/gi, "<span style=\"text-decoration:underline;\">$1</span>");
        rp(/\[list\](.*?)\[\/list\]/gi, "<ul>$1</ul>");
        rp(/\[list=1\](.*?)\[\/list\]/gi, "<ol>$1</ol>");
        rp(/\[\*\](.*?)\[\/\*\]/gi, "<li>$1</li>");
        rp(/\[img\](.*?)\[\/img\]/gi, "<img src=\"$1\" />");
        rp(/\[url=(.*?)\](.*?)\[\/url\]/gi, "<a href=\"$1\">$2</a>");
        rp(/\n/gi, "<br />");
        //rp(/\[.*?\](.*?)\[\/.*?\]/gi,"$1");

        return bbCode;
    }


});
Editors.registerPlugin(BBCode);



Editor = Editor.extend({
    floatingPanel: function() {
        this.floating = new Element('DIV').setStyle({position: 'absolute', top: '-1000px'}).appendTo(document.body);
        this.addEvent('focus', this.reposition.closure(this)).addEvent('blur', this.hide.closure(this));
        this.setPanel(this.floating);
    },
    reposition: function() {
        var e = this.selectedInstance.e;
        this.floating.setStyle({width: (parseInt(e.getStyle('width')) || e.clientWidth) + 'px'});
        var top = e.offsetTop - this.floating.offsetHeight;
        if (top < 0) {
            top = e.offsetTop + e.offsetHeight;
        }

        this.floating.setStyle({top: top + 'px', left: e.offsetLeft + 'px', display: 'block'});
    },
    hide: function() {
        this.floating.setStyle({top: '-1000px'});
    }
});



/* START CONFIG */
var CodeOptions = {
    buttons: {
        'xhtml': {name: 'Edit HTML', type: 'CodeButton'}
    }

};
/* END CONFIG */

var CodeButton = EditorAdvancedButton.extend({
    width: '350px',
    addPane: function() {
        this.addForm({
            '': {type: 'title', txt: 'Edit HTML'},
            'code': {type: 'content', 'value': this.editor.selectedInstance.getContent(), style: {width: '340px', height: '200px'}}
        });
    },
    submit: function(e) {
        var code = this.inputs['code'].value;
        this.editor.selectedInstance.setContent(code);
        this.removePane();
    }
});

Editors.registerPlugin(Plugin, CodeOptions);


