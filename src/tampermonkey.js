// ==UserScript==
// @name         monkeydown
// @namespace    https://github.com/tanplus/monkeydown
// @version      0.1
// @description  For browsing local markdown file, converting through Tampermonkey and some local javascript and css file.
// @author       tanplus@gmail.com
// @match        file:///C:/*.md
// @resource     HIGHLIGHT_CSS https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/default.min.css
// @resource     MD_CSS file:///C:\monkeydown\src\monkeydown.css
// @require      https://code.jquery.com/jquery-latest.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/marked/0.3.6/marked.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js
// @require      file:///C:\monkeydown\src\monkeydown.js
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    main();

    function main(){
        loadStyle("MD_CSS");
        loadStyle("HIGHLIGHT_CSS");

        markdownRender(); // md.js
    }
    function loadStyle(name){
        var text  = GM_getResourceText(name);
        GM_addStyle(text);
    }
})();