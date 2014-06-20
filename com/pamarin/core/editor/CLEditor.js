define([
    'com.jquery.core.JQuery',
    'com.pamarin.core.util.Agents',
    'com.pamarin.core.config.Configs',
    'com.pamarin.core.io.Event',
    'com.pamarin.ui.scrollbar.Scrollbar'
], function($, Agents, Configs, Event, Scrollbar) {

    /*!
     CLEditor WYSIWYG HTML Editor v1.4.3
     http://premiumsoftware.net/CLEditor
     requires jQuery v1.4.2 or later
     
     Copyright 2010, Chris Landowski, Premium Software, LLC
     Dual licensed under the MIT or GPL Version 2 licenses.
     */

    (function() {

        //==============
        // jQuery Plugin
        //==============

        $.cleditor = {
            // Define the defaults used for all new cleditor instances
            defaultOptions: {
                inline: true,
                textAreaError: 35,
                iconWidth: 32,
                width: 'auto', // width not including margins, borders or padding
                height: 400, // height not including margins, borders or padding
                controls: // controls to add to the toolbar
                        "bold italic underline strikethrough subscript superscript | size " +
                        "| color removeformat | bullets numbering | outdent " +
                        "indent | alignleft center alignright justify | undo redo | " +
                        "image link unlink | source",
                colors: // colors in the color popup
                        "3297fd 0078da 333 555 777 999 aaa",
                fonts: // font names in the font popup
                        "Arial,Arial Black,Comic Sans MS,Courier New,Narrow,Garamond," +
                        "Georgia,Impact,Sans Serif,Serif,Tahoma,Trebuchet MS,Verdana",
                sizes: // sizes in the font size popup
                        {
                            '1pt': 'Smallest',
                            '2pt': 'Small',
                            '3pt': 'Normal',
                            '6pt': 'Large',
                            '8pt': 'Largest'
                        },
                styles: // styles in the style popup
                        [["Paragraph", "<p>"], ["Header 1", "<h1>"], ["Header 2", "<h2>"],
                            ["Header 3", "<h3>"], ["Header 4", "<h4>"], ["Header 5", "<h5>"],
                            ["Header 6", "<h6>"]],
                useCSS: true, // use CSS to style HTML when possible (not supported in ie)
                docType: // Document type contained within the editor
                        '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">',
                cssFiles: [
                    Configs.STATIC_PATH + '/stylesheets/component/innerEditor.css'
                ],
                javascriptFiles: [
                    //Configs.STATIC_PATH + '/javascript/org/lesscss/core/less.js'
                ],
                bodyStyle: "padding : 5px; word-wrap : break-word; margin:4px; font:10pt Arial,Verdana; cursor:text"
            },
            // Define all usable toolbar buttons - the init string property is 
            //   expanded during initialization back into the buttons object and 
            //   seperate object properties are created for each button.
            //   e.g. buttons.size.title = "Font Size"
            buttons: {
                // name,title,command,popupName (""=use name)
                init:
                        "bold,,|" +
                        "italic,,|" +
                        "underline,,|" +
                        "strikethrough,,|" +
                        "subscript,,|" +
                        "superscript,,|" +
                        "font,,fontname,|" +
                        "size,Font Size,fontsize,|" +
                        "style,,formatblock,|" +
                        "color,Font Color,forecolor,|" +
                        "highlight,Text Highlight Color,hilitecolor,color|" +
                        "removeformat,Remove Formatting,|" +
                        "bullets,,insertunorderedlist|" +
                        "numbering,,insertorderedlist|" +
                        "outdent,,|" +
                        "indent,,|" +
                        "alignleft,Align Text Left,justifyleft|" +
                        "center,,justifycenter|" +
                        "alignright,Align Text Right,justifyright|" +
                        "justify,,justifyfull|" +
                        "undo,,|" +
                        "redo,,|" +
                        "rule,Insert Horizontal Rule,inserthorizontalrule|" +
                        "image,Insert Image,insertimage,url|" +
                        "link,Insert Hyperlink,createlink,url|" +
                        "unlink,Remove Hyperlink,|" +
                        "cut,,|" +
                        "copy,,|" +
                        "paste,,|" +
                        "pastetext,Paste as Text,inserthtml,|" +
                        "print,,|" +
                        "source,Show Source"
            },
            // imagesPath - returns the path to the images folder
            imagesPath: function() {
                return imagesPath();
            }

        };

        // cleditor - creates a new editor for each of the matched textareas
        $.fn.cleditor = function(options) {

            // Create a new jQuery object to hold the results
            var $result = $([]);

            // Loop through all matching textareas and create the editors
            this.each(function(idx, elem) {
                if (elem.tagName.toUpperCase() === "TEXTAREA") {
                    var data = $.data(elem, CLEDITOR);
                    if (!data) {
                        data = new cleditor(elem, options);
                    }

                    $result = $result.add(data);
                }
            });

            // return the new jQuery object
            return $result;

        };

        //==================
        // Private Variables
        //==================

        var
                // Misc constants
                BACKGROUND_COLOR = "backgroundColor",
                BUTTON = "button",
                BUTTON_NAME = "buttonName",
                CHANGE = "change",
                CLEDITOR = "cleditor",
                CLICK = "click",
                DISABLED = "disabled",
                DIV_TAG = "<div>",
                TRANSPARENT = "transparent",
                UNSELECTABLE = "unselectable",
                // Class name constants
                MAIN_CLASS = "cleditorMain", // main containing div
                TOOLBAR_CLASS = "cleditorToolbar", // toolbar div inside main div
                GROUP_CLASS = "cleditorGroup", // group divs inside the toolbar div
                BUTTON_CLASS = "cleditorButton", // button divs inside group div
                DISABLED_CLASS = "cleditorDisabled", // disabled button divs
                DIVIDER_CLASS = "cleditorDivider", // divider divs inside group div
                POPUP_CLASS = "cleditorPopup", // popup divs inside body
                LIST_CLASS = "cleditorList", // list popup divs inside body
                COLOR_CLASS = "cleditorColor", // color popup div inside body
                PROMPT_CLASS = "cleditorPrompt", // prompt popup divs inside body
                MSG_CLASS = "cleditorMsg", // message popup div inside body

                // Browser detection
                ua = navigator.userAgent.toLowerCase(),
                ie = /msie/.test(ua),
                ie6 = /msie\s6/.test(ua),
                webkit = /webkit/.test(ua),
                // Test for iPhone/iTouch/iPad
                iOS = /iphone|ipad|ipod/i.test(ua),
                // Popups are created once as needed and shared by all editor instances
                popups,
                // Used to prevent the document click event from being bound more than once
                documentClickAssigned,
                // Local copy of the buttons object
                buttons = $.cleditor.buttons;

        //===============
        // Initialization
        //===============

        // Expand the buttons.init string back into the buttons object
        //   and create seperate object properties for each button.
        //   e.g. buttons.size.title = "Font Size"
        $.each(buttons.init.split("|"), function(idx, button) {
            var items = button.split(","), name = items[0];
            buttons[name] = {
                stripIndex: idx,
                name: name,
                title: items[1] === "" ? name.charAt(0).toUpperCase() + name.substr(1) : items[1],
                command: items[2] === "" ? name : items[2],
                popupName: items[3] === "" ? name : items[3]
            };
        });
        delete buttons.init;

        //============
        // Constructor
        //============

        // cleditor - creates a new editor for the passed in textarea element
        cleditor = function(area, options) {
            popups = {};

            var editor = this;

            // Get the defaults and override with options
            editor.options = options = $.extend({}, $.cleditor.defaultOptions, options);

            // Hide the textarea and associate it with this editor
            var $area = editor.$area = $(area)
                    .hide()
                    .data(CLEDITOR, editor)
                    .blur(function() {
                // Update the iframe when the textarea loses focus
                updateFrame(editor, true);
            });

            //jittagornp =======================================================
            var $popupWrapper = $('<span>').addClass('cleditor-popup-wrapper');
            var $imageEditWrapper = createImageEdit(editor);
            //
            var $parentEditor = $area.parent();
            editor.$parentEditor = $parentEditor;
            $parentEditor.addClass('cleditor-parent')
                    .prepend($popupWrapper)
                    .append($imageEditWrapper);
            //==================================================================


            // Create the main container and append the textarea
            var $main = editor.$main = $(DIV_TAG)
                    .addClass(MAIN_CLASS)
                    .width(options.width);
            //.height(options.height);

            // Create the toolbar
            var $toolbar = editor.$toolbar = $(DIV_TAG)
                    .addClass(TOOLBAR_CLASS)
                    .appendTo($main);

            // Add the first group to the toolbar
            var $group = $(DIV_TAG)
                    .addClass(GROUP_CLASS)
                    .appendTo($toolbar);

            // Initialize the group width
            var groupWidth = 0;

            // Add the buttons to the toolbar
            $.each(options.controls.split(" "), function(idx, buttonName) {
                if (buttonName === "") {
                    return true;
                }

                // Divider
                if (buttonName === "|") {

                    // Add a new divider to the group
                    var $div = $(DIV_TAG)
                            .addClass(DIVIDER_CLASS)
                            .appendTo($group);

                    // Update the group width
                    //$group.width(groupWidth + 1);
                    groupWidth = 0;

                    // Create a new group
                    $group = $(DIV_TAG)
                            .addClass(GROUP_CLASS)
                            .appendTo($toolbar);

                }

                // Button
                else {

                    // Get the button definition
                    var button = buttons[buttonName];

                    // Add a new button to the group
                    var $buttonDiv = $(DIV_TAG)
                            .data(BUTTON_NAME, button.name)
                            .addClass(BUTTON_CLASS)
                            .attr("title", button.title)
                            .bind(CLICK, $.proxy(buttonClick, editor))
                            .appendTo($group)
                            .hover(hoverEnter, hoverLeave);

                    // Update the group width
                    groupWidth += options.iconWidth + 2;
                    //console.log(options.iconWidth);
                    //$group.width(groupWidth + 1);

                    // Prepare the button image
                    var map = {};
                    if (button.css) {
                        map = button.css;
                    } else if (button.image) {
                        map.backgroundImage = imageUrl(button.image);
                    }

                    if (button.stripIndex) {
                        map.backgroundPosition = button.stripIndex * (-options.iconWidth);
                    }
                    $buttonDiv.css(map);

                    // Add the unselectable attribute for ie
                    if (ie) {
                        $buttonDiv.attr(UNSELECTABLE, "on");
                    }

                    // Create the popup
                    if (button.popupName) {
                        createPopup(button.popupName, options, button.popupClass,
                                button.popupContent, button.popupHover);
                    }

                }

            });

            // Add the main div to the DOM and append the textarea
            $main.insertBefore($area)
                    .append($area);

            // Bind the document click event handler
            if (!documentClickAssigned) {
                $(document).unbind('click.cleditor').bind('click.cleditor', function(event) {
                    // Dismiss all non-prompt popups
                    var $target = $(event.target);
                    if (!$target.add($target.parents()).is("." + PROMPT_CLASS)) {
                        hidePopups();
                    }

                    //jittagornp ===============================================
                    if (!$target.is('.cleditorButton') && !$target.is('.cleditorPopup') && !$target.is('.cleditorPopup input')) {
                        var $allbuttons = $('.' + BUTTON_CLASS);
                        $allbuttons.each(function() {
                            var $button = $(this);
                            if (!$button.hasClass('source')) {
                                $button.removeClass('active');
                            }
                        });
                    }

                    if (!$target.is('.cleditor-image-edit-wrapper') && !$target.is('.cleditor-image-edit-wrapper a')) {
                        hideImageEdit(editor);
                    }

                });
                documentClickAssigned = true;
            }

            // Bind the window resize event when the width or height is auto or %
            if (/auto|%/.test("" + options.width + options.height))
                $(window).unbind('resize.cleditor').bind('resize.cleditor', function() {
                    //refresh(editor);
                });

            // Create the iframe and resize the controls
            refresh(editor);

        };

        //===============
        // Public Methods
        //===============

        var fn = cleditor.prototype,
                // Expose the following private functions as methods on the cleditor object.
                // The closure compiler will rename the private functions. However, the
                // exposed method names on the cleditor object will remain fixed.
                methods = [
            ["clear", clear],
            ["disable", disable],
            ["execCommand", execCommand],
            ["focus", focus],
            ["hidePopups", hidePopups],
            ["sourceMode", sourceMode, true],
            ["refresh", refresh],
            ["select", select],
            ["selectedHTML", selectedHTML, true],
            ["selectedText", selectedText, true],
            ["showMessage", showMessage],
            ["updateFrame", updateFrame],
            ["updateTextArea", updateTextArea],
            ["createImageEdit", createImageEdit]
        ];

        $.each(methods, function(idx, method) {
            fn[method[0]] = function() {
                var editor = this, args = [editor];
                // using each here would cast booleans into objects!
                for (var x = 0; x < arguments.length; x++) {
                    args.push(arguments[x]);
                }
                var result = method[1].apply(editor, args);
                if (method[2])
                    return result;
                return editor;
            };
        });

        // change - shortcut for .bind("change", handler) or .trigger("change")
        fn.change = function(handler) {
            var $this = $(this);
            return handler ? $this.bind(CHANGE, handler) : $this.trigger(CHANGE);
        };

        //===============
        // Event Handlers
        //===============

        // buttonClick - click event handler for toolbar buttons
        function buttonClick(event) {

            var editor = this,
                    buttonDiv = event.target,
                    buttonName = $.data(buttonDiv, BUTTON_NAME),
                    button = buttons[buttonName],
                    popupName = button.popupName,
                    popup = popups[popupName];

            var $currentButton = $(buttonDiv);
            $currentButton.addClass(buttonName);
            if (!editor.$parentEditor.find('.' + TOOLBAR_CLASS).find('.source').hasClass('active')) {
                $currentButton.addClass('active');
            }

            // Check if disabled
            if (editor.disabled || $(buttonDiv).attr(DISABLED) == DISABLED)
                return;

            // Fire the buttonClick event
            var data = {
                editor: editor,
                button: buttonDiv,
                buttonName: buttonName,
                popup: popup,
                popupName: popupName,
                command: button.command,
                useCSS: editor.options.useCSS
            };

            if (button.buttonClick && button.buttonClick(event, data) === false)
                return false;

            // Toggle source
            if (buttonName === "source") {

                // Show the iframe
                if (sourceMode(editor)) {
                    delete editor.range;
                    editor.$area.hide();
                    editor.$frame.show();
                    buttonDiv.title = button.title;

                    //jittagornp ===============================================
                    $(buttonDiv).removeClass('active');
                    //==========================================================
                }

                // Show the textarea
                else {
                    editor.$frame.hide();
                    editor.$area.show();
                    buttonDiv.title = "Show Rich Text";
                    //jittagornp ===============================================
                    $(buttonDiv).addClass('active');
                    //==========================================================
                }

                // Enable or disable the toolbar buttons
                // IE requires the timeout
                var refeshButtonTimeout = setTimeout(function() {
                    window.clearTimeout(refeshButtonTimeout);
                    refreshButtons(editor);
                }, 100);

            }

            // Check for rich text mode
            else if (!sourceMode(editor)) {

                // Handle popups
                if (popupName) {
                    var $popup = $(popup);

                    // URL
                    if (popupName === "url") {

                        // Check for selection before showing the link url popup
                        if (buttonName === "link" && selectedText(editor) === "") {
                            showMessage(editor, "A selection is required when inserting a link.", buttonDiv);
                            return false;
                        }

                        // Wire up the submit button click event handler
                        $popup.children(":button")
                                .unbind(CLICK)
                                .bind(CLICK, function() {

                            // Insert the image or link if a url was entered
                            var $text = $popup.find(":text");
                            var url = $.trim($text.val());
                            //console.log('insert link ---------------------------------------------');
                            //console.log($text.val());

                            if (url !== "") {
                                //console.log('command : ' + data.command + ', url : ' + url);
                                execCommand(editor, data.command, url, null, data.button);
                            }

                            // Reset the text, hide the popup and set focus
                            $text.val("http://");
                            hidePopups();
                            focus(editor);

                        });

                    }

                    // Paste as Text
                    else if (popupName === "pastetext") {

                        // Wire up the submit button click event handler
                        $popup.children(":button")
                                .unbind(CLICK)
                                .bind(CLICK, function() {

                            // Insert the unformatted text replacing new lines with break tags
                            var $textarea = $popup.find("textarea"),
                                    text = $textarea.val().replace(/\n/g, "<br />");
                            if (text !== "")
                                execCommand(editor, data.command, text, null, data.button);

                            // Reset the text, hide the popup and set focus
                            $textarea.val("");
                            hidePopups();
                            focus(editor);

                        });

                    }

                    // Show the popup if not already showing for this button
                    if (buttonDiv !== $.data(popup, BUTTON)) {
                        showPopup(editor, popup, buttonDiv);
                        return false; // stop propagination to document click
                    }

                    // propaginate to document click
                    return;

                }

                // Print
                else if (buttonName === "print") {
                    editor.$frame[0].contentWindow.print();

                    // All other buttons
                } else if (!execCommand(editor, data.command, data.value, data.useCSS, buttonDiv)) {
                    return false;
                }

            }

            // Focus the editor
            focus(editor);

        }

        // hoverEnter - mouseenter event handler for buttons and popup items
        function hoverEnter(e) {
            var $div = $(e.target).closest("div");
            $div.css(BACKGROUND_COLOR, $div.data(BUTTON_NAME) ? "#FFF" : "#FFC");
        }

        // hoverLeave - mouseleave event handler for buttons and popup items
        function hoverLeave(e) {
            $(e.target).closest("div").css(BACKGROUND_COLOR, "transparent");
        }

        // popupClick - click event handler for popup items
        function popupClick(e) {

            var editor = this,
                    popup = e.data.popup,
                    target = e.target;

            // Check for message and prompt popups
            if (popup === popups.msg || $(popup).hasClass(PROMPT_CLASS)) {
                return;
            }

            // Get the button info
            var buttonDiv = $.data(popup, BUTTON),
                    buttonName = $.data(buttonDiv, BUTTON_NAME),
                    button = buttons[buttonName],
                    command = button.command,
                    value,
                    useCSS = editor.options.useCSS;

            // Get the command value
            if (buttonName === "font") {
                // Opera returns the fontfamily wrapped in quotes
                value = target.style.fontFamily.replace(/"/g, "");
            } else if (buttonName === "size") {
                if (target.tagName.toUpperCase() === "DIV")
                    target = target.children[0];
                value = target.getAttribute('size');//innerHTML;
            } else if (buttonName === "style") {
                value = "<" + target.tagName + ">";
            } else if (buttonName === "color") {
                value = hex(target.style.backgroundColor);
            } else if (buttonName === "highlight") {
                value = hex(target.style.backgroundColor);
                if (ie) {
                    command = 'backcolor';
                } else {
                    useCSS = true;
                }
            }

            // Fire the popupClick event
            var data = {
                editor: editor,
                button: buttonDiv,
                buttonName: buttonName,
                popup: popup,
                popupName: button.popupName,
                command: command,
                value: value,
                useCSS: useCSS
            };

            if (button.popupClick && button.popupClick(e, data) === false)
                return;

            // Execute the command
            if (data.command && !execCommand(editor, data.command, data.value, data.useCSS, buttonDiv))
                return false;

            // Hide the popup and focus the editor
            hidePopups();
            focus(editor);

        }

        //==================
        // Private Functions
        //==================

        // checksum - returns a checksum using the Adler-32 method
        function checksum(text)
        {
            var a = 1, b = 0;
            for (var index = 0; index < text.length; ++index) {
                a = (a + text.charCodeAt(index)) % 65521;
                b = (b + a) % 65521;
            }
            return (b << 16) | a;
        }

        // clear - clears the contents of the editor
        function clear(editor) {
            editor.$area.val("");
            updateFrame(editor);
        }

        // createPopup - creates a popup and adds it to the body
        function createPopup(popupName, options, popupTypeClass, popupContent, popupHover) {

            //console.log(popupTypeClass);

            // Check if popup already exists
            if (popups[popupName]) {
                return popups[popupName];
            }

            // Create the popup

            var $popup = $(DIV_TAG)
                    .hide()
                    .addClass(POPUP_CLASS)
                    .appendTo($('.cleditor-parent').children('span'));

            // Add the content

            // Custom popup
            if (popupContent)
                $popup.html(popupContent);

            // Color
            else if (popupName === "color") {
                var colors = options.colors.split(" ");
                if (colors.length < 10)
                    $popup.width("auto");
                $.each(colors, function(idx, color) {
                    $(DIV_TAG).appendTo($popup)
                            .css(BACKGROUND_COLOR, "#" + color);
                });
                popupTypeClass = COLOR_CLASS;
            }

            // Font
            else if (popupName === "font") {
                $.each(options.fonts.split(","), function(idx, font) {
                    $(DIV_TAG).appendTo($popup)
                            .css("fontFamily", font)
                            .html(font);
                });

                // Size
            } else if (popupName === "size") {
                for (var index in options.sizes) {
                    $(DIV_TAG).appendTo($popup)
                            .html('<fon size="' + index + '" class="cleditor-fontsize' + index + '">' + options.sizes[index] + '</font>');
                }


                // Style
            } else if (popupName === "style") {
                $.each(options.styles, function(idx, style) {
                    $(DIV_TAG).appendTo($popup)
                            .html(style[1] + style[0] + style[1].replace("<", "</"));
                });

                // URL
            } else if (popupName === "url") {
                $popup.html('Enter URL:<br /><input type="text" value="http://"/><br /><input type="button" value="Submit" />');
                popupTypeClass = PROMPT_CLASS;
            }

            // Paste as Text
            else if (popupName === "pastetext") {
                $popup.html('Paste your content here and click submit.<br /><textarea cols="40" rows="3"></textarea><br /><input type="button" value="Submit" />');
                popupTypeClass = PROMPT_CLASS;
            }

            // Add the popup type class name
            if (!popupTypeClass && !popupContent)
                popupTypeClass = LIST_CLASS;
            $popup.addClass(popupTypeClass);

            // Add the unselectable attribute to all items
            if (ie) {
                $popup.attr(UNSELECTABLE, "on")
                        .find("div,font,p,h1,h2,h3,h4,h5,h6")
                        .attr(UNSELECTABLE, "on");
            }

            $popup.append($('<span>').addClass('cleditor-popup-tail'));

            // Add the hover effect to all items
            if ($popup.hasClass(LIST_CLASS) || popupHover === true)
                $popup.children().hover(hoverEnter, hoverLeave);

            // Add the popup to the array and return it
            popups[popupName] = $popup[0];
            return $popup[0];

        }

        // disable - enables or disables the editor
        function disable(editor, disabled) {

            // Update the textarea and save the state
            if (disabled) {
                editor.$area.attr(DISABLED, DISABLED);
                editor.disabled = true;
            }
            else {
                editor.$area.removeAttr(DISABLED);
                delete editor.disabled;
            }

            // Switch the iframe into design mode.
            // ie6 does not support designMode.
            // ie7 & ie8 do not properly support designMode="off".
            try {
                if (ie)
                    editor.doc.body.contentEditable = !disabled;
                else
                    editor.doc.designMode = !disabled ? "on" : "off";
            }
            // Firefox 1.5 throws an exception that can be ignored
            // when toggling designMode from off to on.
            catch (err) {
            }

            // Enable or disable the toolbar buttons
            refreshButtons(editor);

        }

        // execCommand - executes a designMode command
        function execCommand(editor, command, value, useCSS, button) {
            //console.log('command ---------------------------------------------');
            //console.log(command);

            // Restore the current ie selection
            restoreRange(editor);

            // Set the styling method
            if (!ie) {
                if (useCSS === undefined || useCSS === null)
                    useCSS = editor.options.useCSS;
                editor.doc.execCommand("styleWithCSS", 0, useCSS.toString());
            }

            // Execute the command and check for error
            var success = true, message;
            if (ie && command.toLowerCase() === "inserthtml") {
                getRange(editor).pasteHTML(value);
            } else {
                try {
                    success = editor.doc.execCommand(command, 0, value || null);
                    console.log('execCommand : ' + command + ' : ' + value + ' --> ' + success);
                } catch (err) {
                    message = err.message;
                    success = false;
                }
                if (!success) {
                    if ("cutcopypaste".indexOf(command) > -1)
                        showMessage(editor, "For security reasons, your browser does not support the " +
                                command + " command. Try using the keyboard shortcut or context menu instead.",
                                button);
                    else
                        showMessage(editor,
                                (message ? message : "Error executing the " + command + " command."),
                                button);
                }
            }

            // Enable the buttons and update the textarea
            refreshButtons(editor);
            updateTextArea(editor, true);
            return success;

        }

        // focus - sets focus to either the textarea or iframe
        function focus(editor) {
            setTimeout(function() {
                if (sourceMode(editor))
                    editor.$area.focus();
                else
                    editor.$frame[0].contentWindow.focus();
                //console.log('pamarin -- iframe focus');
                refreshButtons(editor);
            }, 0);
        }

        // getRange - gets the current text range object
        function getRange(editor) {
            if (ie)
                return getSelection(editor).createRange();
            var range = getSelection(editor).getRangeAt(0);
            //console.log('range ----------------------------------------------');
            //console.log(range);

            return range;
        }

        // getSelection - gets the current text range object
        function getSelection(editor) {
            var selection;
            if (ie) {
                selection = editor.doc.selection;
            } else {
                selection = editor.$frame[0].contentWindow.getSelection();
            }

            //console.log('selection -------------------------------------------');
            //console.log(selection);

            checkActiveButton(selection, editor);

            return selection;
        }

        function checkActiveButton(selection, editor) {
            function activeButton(clazzName) {
                var $parentEditor = editor.$parentEditor;
                $parentEditor.find('.' + TOOLBAR_CLASS).find('.' + BUTTON_CLASS + '.' + clazzName).addClass('active');
            }

            function deactiveAllbuttons() {
                var buttons = editor.$parentEditor.find('.' + TOOLBAR_CLASS).find('.' + BUTTON_CLASS);
                buttons.each(function() {
                    var button = $(this);
                    if (!button.hasClass('source')) {
                        button.removeClass('active');
                    }
                });
            }

            function canWalk(parentNode) {
                return parentNode && parentNode !== null && !(parentNode.nodeName === 'HTML' || parentNode.nodeName === 'BODY');
            }

            deactiveAllbuttons();
            hideImageEdit(editor);
            var focusNode = selection.focusNode;
            if (focusNode && focusNode !== null) {

                var parentNode = selection.focusNode.parentNode;
                while (canWalk(parentNode)) {
                    var parentTagName = parentNode.nodeName;
                    //console.log('parentName > ' + parentTagName);
                    if (parentTagName === 'SPAN') {
                        var $parent = $(parentNode);
                        var fontWeight = $parent.css('font-weight');
                        var fontStyle = $parent.css('font-style');
                        var textDecoration = $parent.css('text-decoration');
                        var verticalAlign = $parent.css('vertical-align');
                        var fontSize = $parent.css('font-size');
                        var color = $parent.css('color');

                        if (fontWeight === 'bold') {
                            activeButton('bold');
                        }
                        if (fontStyle === 'italic') {
                            activeButton('italic');
                        }

                        if (textDecoration === 'underline') {
                            activeButton('underline');
                        } else if (textDecoration === 'line-through') {
                            activeButton('strikethrough');
                        }

                        if (verticalAlign === 'sub') {
                            activeButton('subscript');
                        } else if (verticalAlign === 'super') {
                            activeButton('superscript');
                        }

                        //if (fontSize) {
                        //    activeButton('size');
                        //}

                        if (color && (
                                color === 'rgb(50, 151, 253)' ||
                                color === 'rgb(0, 120, 218)' ||
                                color === 'rgb(51, 51, 51)' ||
                                color === 'rgb(85, 85, 85)' ||
                                color === 'rgb(119, 119, 119)' ||
                                color === 'rgb(153, 153, 153)' ||
                                color === 'rgb(170, 170, 170)'
                                )) {
                            activeButton('color');
                        }
                    } else if (parentTagName === 'UL') {
                        activeButton('bullets');
                    } else if (parentTagName === 'OL') {
                        activeButton('numbering');
                    } else if (parentTagName === 'BLOCKQUOTE') {
                        activeButton('indent');
                    } else if (parentTagName === 'DIV') {
                        var $parent = $(parentNode);
                        var textAlign = $parent.css('text-align');

                        if (textAlign === 'left') {
                            activeButton('alignleft');
                        } else if (textAlign === 'right') {
                            activeButton('alignright');
                        } else if (textAlign === 'center') {
                            activeButton('center');
                        } else if (textAlign === 'justify') {
                            activeButton('justify');
                        }
                    } else if (parentTagName === 'A') {
                        activeButton('link');
                    }

                    parentNode = parentNode.parentNode;
                }
            }
        }

        function getInputSelection(element) {
            var start = 0;
            var end = 0;
            var normalizedValue;
            var range;
            var textInputRange;
            var length;
            var endRange;

            if (typeof element.selectionStart === "number" && typeof element.selectionEnd === "number") {
                start = element.selectionStart;
                end = element.selectionEnd;
            } else {
                range = document.selection.createRange();

                if (range && range.parentElement() === element) {
                    length = element.value.length;
                    normalizedValue = element.value.replace(/\r\n/g, "\n");

                    // Create a working TextRange that lives only in the input
                    textInputRange = element.createTextRange();
                    textInputRange.moveToBookmark(range.getBookmark());

                    // Check if the start and end of the selection are at the very end
                    // of the input, since moveStart/moveEnd doesn't return what we want
                    // in those cases
                    endRange = element.createTextRange();
                    endRange.collapse(false);

                    if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                        start = end = length;
                    } else {
                        start = -textInputRange.moveStart("character", -length);
                        start += normalizedValue.slice(0, start).split("\n").length - 1;

                        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                            end = length;
                        } else {
                            end = -textInputRange.moveEnd("character", -length);
                            end += normalizedValue.slice(0, end).split("\n").length - 1;
                        }
                    }
                }
            }
            return {
                start: start,
                end: end
            };
        }
        // hex - returns the hex value for the passed in color string
        function hex(string) {

            // hex("rgb(255, 0, 0)") returns #FF0000
            var m = /rgba?\((\d+), (\d+), (\d+)/.exec(string);
            if (m) {
                string = (m[1] << 16 | m[2] << 8 | m[3]).toString(16);
                while (string.length < 6)
                    string = "0" + string;
                return "#" + string;
            }

            // hex("#F00") returns #FF0000
            var c = string.split("");
            if (string.length === 4)
                return "#" + c[1] + c[1] + c[2] + c[2] + c[3] + c[3];

            // hex("#FF0000") returns #FF0000
            return string;

        }

        // hidePopups - hides all popups
        function hidePopups() {
            $.each(popups, function(idx, popup) {
                $(popup)
                        .hide()
                        .unbind(CLICK)
                        .removeData(BUTTON);
            });
        }

        // imagesPath - returns the path to the images folder
        function imagesPath() {
            var href = $("link[href*=cleditor]").attr("href");
            return href.replace(/^(.*\/)[^\/]+$/, '$1') + "images/";
        }

        // imageUrl - Returns the css url string for a filemane
        function imageUrl(filename) {
            return "url(" + imagesPath() + filename + ")";
        }

        // refresh - creates the iframe and resizes the controls
        function refresh(editor) {
            var $main = editor.$main;
            var options = editor.options;
            // Remove the old iframe
            if (editor.$frame) {
                editor.$frame.remove();
            }

            // Create a new iframe
            var $frame = editor.$frame = $('<iframe frameborder="0" src="javascript:true;" style="width=100%;"/>')
                    .hide()
                    .appendTo($main);

            //console.log(editor.htmlTemporary);

            // Load the iframe document content
            var contentWindow = $frame[0].contentWindow;
            var iframeDocument = editor.doc = contentWindow.document;
            var $document = $(iframeDocument);

            try {
                iframeDocument.open();


                var cssHtml = '';
                for (var index in options.cssFiles) {
                    cssHtml += '<link rel="stylesheet" type="text/css" href="' + options.cssFiles[index] + '" />';
                }

                var javascriptHtml = '';
                for (var index in options.javascriptFiles) {
                    javascriptHtml += '<script type="text/javascript" charset="utf-8" src="' + options.javascriptFiles[index] + '"></script>';
                }

                iframeDocument.write(
                        options.docType +
                        '<html>' +
                        '<head>' +
                        cssHtml +
                        javascriptHtml +
                        '</head>' +
                        '<body tabindex="-1" style="' + options.bodyStyle + '"></body></html>'
                        );
            } finally {
                iframeDocument.close();
            }

            // Work around for bug in IE which causes the editor to lose
            // focus when clicking below the end of the document.
            if (ie) {
                $document.click(function() {
                    focus(editor);
                });
            }

            // Load the content
            updateFrame(editor);

            // Bind the ie specific iframe event handlers
            if (ie) {

                // Save the current user selection. This code is needed since IE will
                // reset the selection just after the beforedeactivate event and just
                // before the beforeactivate event.
                $document.bind("beforedeactivate beforeactivate selectionchange keypress", function(event) {

                    // Flag the editor as inactive
                    if (event.type === "beforedeactivate") {
                        editor.inactive = true;

                        // Get rid of the bogus selection and flag the editor as active
                    } else if (event.type === "beforeactivate") {
                        if (!editor.inactive && editor.range && editor.range.length > 1) {
                            editor.range.shift();
                        }
                        delete editor.inactive;
                    }

                    // Save the selection when the editor is active
                    else if (!editor.inactive) {
                        if (!editor.range)
                            editor.range = [];
                        editor.range.unshift(getRange(editor));

                        // We only need the last 2 selections
                        while (editor.range.length > 2)
                            editor.range.pop();
                    }

                });

                // Restore the text range when the iframe gains focus
                $frame.focus(function() {
                    restoreRange(editor);
                });

            }

            // Enable the toolbar buttons and update the textarea as the user types or clicks
            $document.unbind('click.hideEditorPopup').bind('click.hideEditorPopup', hidePopups)
                    .unbind('keyup.onEditor mouseup.onEditor').bind('keyup.onEditor mouseup.onEditor', function() {
                //console.log('iframe document bind --------------------------------------------');
                refreshButtons(editor);
                updateTextArea(editor, true);
            });

            $document.delegate('img', 'click', function(event) {
                var $image = editor.$imageFocus = $(event.target);
                $image.addClass('cleditor-image-focus');
                imageEditReposition($image, $('.cleditor-image-edit-wrapper'), $document);

                // all browsers, except IE before version 9
                if (contentWindow.getSelection) {
                    var selection = contentWindow.getSelection();
                    selection.selectAllChildren($image.parent()[0]);
                }
                // Internet Explorer before version 9 
                else {
                    var range = iframeDocument.body.createTextRange();
                    range.moveToElementText($image.parent()[0]);
                    range.select();
                }
            });

            $document.bind('scroll', function(event) {
                hideImageEdit(editor);
            });

            // Show the textarea for iPhone/iTouch/iPad or
            // the iframe when design mode is supported.
            if (iOS) {
                editor.$area.show();
            } else {
                $frame.show();
            }

            // Wait for the layout to finish - shortcut for $(document).ready()
            $(function() {

                var $toolbar = editor.$toolbar;
                var $group = $toolbar.children("div:last");
                var width = $main.width();
                // Resize the toolbar
                var height = $group.offset().top + $group.outerHeight() - $toolbar.offset().top + 1;
                $toolbar.height(height);

                // Resize the iframe
                height = (/%/.test("" + options.height) ? $main.height() : parseInt(options.height)) - height;
                $frame.width(width).height(height + options.textAreaError);

                // Resize the textarea. IE6 textareas have a 1px top
                // & bottom margin that cannot be removed using css.
                var areaHeight = ie6 ? height - 2 : height;
                areaHeight += options.textAreaError;
                editor.$area.width(width).height(areaHeight);

                // Switch the iframe into design mode if enabled
                disable(editor, editor.disabled);

                // Enable or disable the toolbar buttons
                refreshButtons(editor);

            });
        }

        // refreshButtons - enables or disables buttons based on availability
        function refreshButtons(editor) {

            // Webkit requires focus before queryCommandEnabled will return anything but false
            if (!iOS && webkit && !editor.focused) {
                editor.$frame[0].contentWindow.focus();
                window.focus();
                editor.focused = true;
            }

            // Get the object used for checking queryCommandEnabled
            var queryObj = editor.doc;
            if (ie) {
                queryObj = getRange(editor);
            }

            // Loop through each button
            var inSourceMode = sourceMode(editor);
            $.each(editor.$toolbar.find("." + BUTTON_CLASS), function(idx, elem) {

                var $element = $(elem);
                var button = $.cleditor.buttons[$.data(elem, BUTTON_NAME)];
                var command = button.command;
                var enabled = true;

                // Determine the state
                if (editor.disabled) {
                    enabled = false;
                } else if (button.getEnabled) {
                    var data = {
                        editor: editor,
                        button: elem,
                        buttonName: button.name,
                        popup: popups[button.popupName], popupName: button.popupName,
                        command: button.command,
                        useCSS: editor.options.useCSS
                    };

                    enabled = button.getEnabled(data);
                    if (enabled === undefined) {
                        enabled = true;
                    }
                }
                else if (((inSourceMode || iOS) && button.name != "source") ||
                        (ie && (command == "undo" || command == "redo"))) {
                    enabled = false;
                } else if (command && command != "print") {
                    if (ie && command == "hilitecolor")
                        command = "backcolor";
                    // IE does not support inserthtml, so it's always enabled
                    if (!ie || command != "inserthtml") {
                        try {
                            enabled = queryObj.queryCommandEnabled(command);
                        } catch (err) {
                            enabled = false;
                        }
                    }
                }

                // Enable or disable the button
                if (enabled) {
                    $element.removeClass(DISABLED_CLASS);
                    $element.removeAttr(DISABLED);
                }
                else {
                    $element.addClass(DISABLED_CLASS);
                    $element.attr(DISABLED, DISABLED);
                }

            });
        }

        // restoreRange - restores the current ie selection
        function restoreRange(editor) {
            if (ie && editor.range) {
                editor.range[0].select();
            }
        }

        // select - selects all the text in either the textarea or iframe
        function select(editor) {
            var selectTimeout = setTimeout(function() {
                window.clearTimeout(selectTimeout);
                if (sourceMode(editor)) {
                    editor.$area.select();

                } else {
                    execCommand(editor, "selectall");
                }
            }, 0);
        }

        // selectedHTML - returns the current HTML selection or and empty string
        function selectedHTML(editor) {
            restoreRange(editor);
            var range = getRange(editor);
            if (ie)
                return range.htmlText;
            var layer = $("<layer>")[0];
            layer.appendChild(range.cloneContents());
            var html = layer.innerHTML;
            layer = null;

            //console.log('selectedHTML ----------------------------------------');
            //console.log(html);
            return html;
        }

        // selectedText - returns the current text selection or and empty string
        function selectedText(editor) {
            restoreRange(editor);
            var selectionString;
            if (ie) {
                selectionString = getRange(editor).text;
            } else {
                selectionString = getSelection(editor).toString();
            }             //console.log('selectionString ------------------------------------');
            //console.log(selectionString);
            return selectionString;
        }

        // showMessage - alert replacement
        function showMessage(editor, message, button) {
            var popup = createPopup("msg", editor.options, MSG_CLASS);
            //$(popup).unbind('click.showMessageEditor').bind('click.showMessageEditor', function() {
            //$(this).remove();
            //});

            popup.innerHTML = message;
            showPopup(editor, popup, button);
        }

        // showPopup - shows a popup
        function showPopup(editor, popup, button) {

            var position, left, top, $popup = $(popup);

            // Determine the popup location
            if (button) {
                var $button = $(button);
                position = $button.position();
                left = (--position.left - 17);
                top = (position.top + $button.height()) + 5 + (Agents.isMozilla() ? 13 : 0);
            }
            else {
                var $toolbar = editor.$toolbar;
                position = $toolbar.position();
                left = Math.floor(($toolbar.width() - $popup.width()) / 2) + position.left;
                top = position.top + $toolbar.height() - 2;
            }

            // Position and show the popup
            hidePopups();
            $popup.css({left: left, top: top})
                    .show();

            // Assign the popup button and click event handler
            if (button) {
                $.data(popup, BUTTON, button);
                //$(button).addClass('active');
                $popup.bind(CLICK, {popup: popup}, $.proxy(popupClick, editor));
            }

            // Focus the first input element if any
            //setTimeout(function() {
            //$popup.find(":text,textarea").eq(0).focus().select();
            //}, 100);

        }

        // sourceMode - returns true if the textarea is showing
        function sourceMode(editor) {
            return editor.$area.is(":visible");
        }

        // updateFrame - updates the iframe with the textarea contents
        function updateFrame(editor, checkForChange) {

            var code = editor.$area.val();
            var options = editor.options;
            var updateFrameCallback = options.updateFrame;
            var $body = $(editor.doc.body);

            // Check for textarea change to avoid unnecessary firing
            // of potentially heavy updateFrame callbacks.
            if (updateFrameCallback) {
                var sum = checksum(code);
                if (checkForChange && editor.areaChecksum == sum) {
                    return;
                }
                editor.areaChecksum = sum;
            }

            // Convert the textarea source code into iframe html
            var html = updateFrameCallback ? updateFrameCallback(code) : code;
            //console.log('update frame html ------------------------------------------------');
            //console.log(html);

            // Prevent script injection attacks by html encoding script tags
            html = html.replace(/<(?=\/?script)/ig, "&lt;");
            //console.log(html);
            //console.log($body.html());

            // Update the iframe checksum
            if (options.updateTextArea) {
                editor.frameChecksum = checksum(html);
            }

            // Update the iframe and trigger the change event
            if (html !== $body.html()) {
                $body.html(html);
                $(editor).triggerHandler(CHANGE);
            }

            return html;
        }

        // updateTextArea - updates the textarea with the iframe contents
        function updateTextArea(editor, checkForChange) {

            var html = $(editor.doc.body).html(),
                    options = editor.options,
                    updateTextAreaCallback = options.updateTextArea,
                    $area = editor.$area;

            //jittagornp =======================================================        
            selectedText(editor);
            if (html === '<br>') {
                $('.cleditorButton').each(function() {
                    var button = $(this);
                    if (!button.hasClass('source')) {
                        button.removeClass('active');
                    }
                });
            }
            //==================================================================

            // Check for iframe change to avoid unnecessary firing
            // of potentially heavy updateTextArea callbacks.
            if (updateTextAreaCallback) {
                var sum = checksum(html);
                if (checkForChange && editor.frameChecksum === sum) {
                    return;
                }
                editor.frameChecksum = sum;
            }

            // Convert the iframe html into textarea source code
            var code = updateTextAreaCallback ? updateTextAreaCallback(html) : html;

            // Update the textarea checksum
            if (options.updateFrame) {
                editor.areaChecksum = checksum(code);
            }

            // Update the textarea and trigger the change event
            if (code !== $area.val()) {
                $area.val(code);
                $(editor).triggerHandler(CHANGE);
            }

            return html;
        }

        function imageEditReposition($currentImage, $imageEditWrapper, $document) {
            $currentImage.addClass('cleditor-image-focus').attr('height', '');
            var $imageParent = $currentImage.parent();
            if (!$imageParent.is('.cleditor-image-focus-wrapper')) {
                $imageParent = $('<span>').addClass('cleditor-image-focus-wrapper');
                $currentImage.wrap($imageParent);
            }

            var position = $currentImage.offset();
            var top = position.top;
            var left = position.left;

            var scrollLeft = $document.scrollLeft();
            var scrollTop = $document.scrollTop();

            $imageEditWrapper.css({
                marginLeft: (left - scrollLeft) < 0 ? 0 : scrollLeft,
                marginTop: -scrollTop,
                left: left,
                top: top + $currentImage.height() + 87
            }).show();
        }

        function hideImageEdit(editor) {
            editor.$parentEditor.find('.cleditor-image-edit-wrapper').hide();
        }

        function createImageEdit(editor) {
            var $imageEditWrapper = $('<span>').addClass('cleditor-image-edit-wrapper');

            // left align ------------------------------------------------------
            var $leftAlignImage = $('<a>').attr('href', '#leftAlign')
                    .text('left')
                    .addClass('cleditor-image-align')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                var $imageFocus = editor.$imageFocus;
                var $imageParent = $imageFocus.parent();

                $imageParent.css({
                    'text-align': '',
                    'display': 'inline'
                });

                editor.$imageFocus.css({'float': 'left'});
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });

            // center align ----------------------------------------------------
            var $centerAlignImage = $('<a>').attr('href', '#centerAlign')
                    .text('center')
                    .addClass('cleditor-image-align')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                var $imageFocus = editor.$imageFocus;
                var $imageParent = $imageFocus.parent();

                $imageParent.css({
                    'text-align': 'center',
                    'display': 'block'
                });

                $imageFocus.css({'float': ''});
                imageEditReposition($imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });

            // right align -----------------------------------------------------
            var $rightAlignImage = $('<a>').attr('href', '#rightAlign')
                    .text('right')
                    .addClass('cleditor-image-align')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                var $imageFocus = editor.$imageFocus;
                var $imageParent = $imageFocus.parent();

                $imageParent.css({
                    'text-align': '',
                    'display': 'inline'
                });

                editor.$imageFocus.css({'float': 'right'});
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });


            // small -----------------------------------------------------------
            var $smallSizeImage = $('<a>').attr('href', '#smallSize')
                    .text('small')
                    .addClass('cleditor-image-size')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                editor.$imageFocus.attr('width', '200');
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });


            // normal size -----------------------------------------------------
            var $normalSizeImage = $('<a>').attr('href', '#normalSize')
                    .text('normal')
                    .addClass('cleditor-image-size')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                editor.$imageFocus.attr('width', '400');
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });


            // large size ------------------------------------------------------
            var $largeSizeImage = $('<a>').attr('href', '#largeSize')
                    .text('large')
                    .addClass('cleditor-image-size')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                //editor.$imageFocus.attr('width', '570');
                var source = editor.$imageFocus.attr('src');
                var selection = getSelection(editor);
                console.log(selection);
                if (selection.rangeCount) {
                    var range = selection.getRangeAt(0);
                    range.deleteContents();
                    //range.insertNode($('<img>').attr('src', source).attr('width', '570')[0]);
                }
                
                //editor.doc.execCommand("InsertImage");
                
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });


            // original size ------------------------------------------------------
            var $originalSizeImage = $('<a>').attr('href', '#originalSize')
                    .text('original')
                    .addClass('cleditor-image-size')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                editor.$imageFocus.attr('width', '');
                var selection = getSelection(editor);
                console.log(selection);
                imageEditReposition(editor.$imageFocus, $imageEditWrapper, $(editor.doc));
                updateTextArea(editor, true);
                refreshButtons(editor);
            });


            // delete button ---------------------------------------------------
            var $deleteImage = $('<a>').attr('href', '#delete')
                    .text('delete')
                    .addClass('cleditor-image-delete')
                    .unbind('click.imageResizing')
                    .bind('click.imageResizing', function(event) {
                Event.preventDefault(event);

                $imageEditWrapper.hide();
                updateTextArea(editor, true);
                refreshButtons(editor);

                editor.doc.execCommand('delete');
                focus(editor);
            });


            //image align
            $imageEditWrapper.append($leftAlignImage);
            $imageEditWrapper.append($centerAlignImage);
            $imageEditWrapper.append($rightAlignImage);

            //image size
            $imageEditWrapper.append($smallSizeImage);
            $imageEditWrapper.append($normalSizeImage);
            $imageEditWrapper.append($largeSizeImage);
            $imageEditWrapper.append($originalSizeImage);
            //
            $imageEditWrapper.append($deleteImage);

            return $imageEditWrapper;
        }
    })();

    return function(selector, options) {
        var editor = $(selector).cleditor(options);

        this.getContent = function() {
            return editor[0].$area.val();
        };
    };
});
