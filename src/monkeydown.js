'use strict';

var config = (function(hljs) {
  var module = {};
  module.markedOptions = {
    gfm: true,
    tables: true,
    breaks: false,
    highlight: function(code) {
        return hljs.highlightAuto(code).value;
    }
  };
  return module;
})(hljs);

function markdownRender(){
  var data = document.body.innerText;

  marked.setOptions(config.markedOptions);
  var html = marked(data);

  $(document.body).html(html);


  LiTable();
  HoverImage();
  // CtrlImg();
}


var LiTable = (function(){
  
  function render(){
    jqueryExtend();
    renderLiTable();
  };

  function renderLiTable(){
      //return;
      replaceLiTag('table');
      replaceLiTag('tr');
      replaceLiTag('td');
      replaceLiTag('th');
  }
  function replaceLiTag(tagName){
      var litag = getLiTag(tagName);
      replaceLiTagByJquery(litag, tagName);
  }
  function replaceLiTagByJquery(jqLi, tagName){
      jqLi.each(function(){

          // remove first plain text
          var $firstChild = $(this).contents().first();
          $firstChild.remove();

          var $li = $(this);
          if(tagName != 'td' && tagName != 'th'){
              $li.children(':first').children(':first').unwrap(); //unwrap <ul>
          }

          if(tagName == 'table'){
              $li.children().wrapAll('<table>');
          }
          else {
              $li.replaceTag('<'+tagName+'>', true);
          }
      });
      return;
  }
  function getLiTag(tagName){
      var array = [];
      $('li').each(function(index, element){

          var $first = $(element).contents().first();

          var first = $first[0];
          var text = '';
          if(!first){
              // skip
          }
          else if ( first.nodeType == 3 ) {
              text = first.textContent? first.textContent: first.innerText;
              text = $.trim( text );
          }
          else if(first.tagName == 'P'){
              text = $first.text();
          }

          if(text == tagName){
              array.push(element);
              // console.log('found', text);
          }
      });
      return makeJquery(array);
  }
  function makeJquery(array){
      return $($.map(array, function(item){
          return (item instanceof jQuery)? item.get(): item;
      }));
  }


  // jQuery extend replaceTag
  function jqueryExtend(){
      $.extend({
          replaceTag: function (currentElem, newTagObj, keepProps) {
              var $currentElem = $(currentElem);
              var i, $newTag = $(newTagObj).clone();
              if (keepProps) {//{{{
                  $newTag = $newTag[0];
                  $newTag.className = currentElem.className;
                  $.extend($newTag.classList, currentElem.classList);
                  $.extend($newTag.attributes, currentElem.attributes);
              }//}}}
              $currentElem.wrapAll($newTag);
              $currentElem.contents().unwrap();
              // return node; (Error spotted by Frank van Luijn)
              return this; // Suggested by ColeLawrence
          }
      });
      $.fn.extend({
          replaceTag: function (newTagObj, keepProps) {
              // "return" suggested by ColeLawrence
              return this.each(function() {
                  jQuery.replaceTag(this, newTagObj, keepProps);
              });
          }
      });
  }

  return render;
})();

var HoverImage = (function(){

    var marginG = 0;          //設定: 放大圖外面的留邊

    var alwaysActive = true;  //永遠啟用
    var activeG = true;       //狀態控制: 是否啟用
    var overImageIndexG = -1; //狀態控制: 移過的圖片

    function render(){
      $(document).on('mouseout', 'img', function(event){
          overImageIndexG = -1;
          updateStatus();
      });
      $(document).on('mouseover', 'img', function(event){
          overImageIndexG = getImageIndex(this);
          updateStatus();
      });
      // $(document).on("keydown", function(event){
      //     var match = updateImageIndex(event.which);
      //     if(match.key){
      //         if(isActive() && match.image){
      //             event.preventDefault();
      //             event.stopPropagation();
      //             updateStatus();
      //         }
      //     }
      // });
      // $(document).on("keyup", function(event){
      //     var which = event.which;
      //     if(which == Which.Ctrl){
      //         isActive( !isActive() );
      //         updateStatus();
      //     }
      //     if(which == Which.H){
      //         alert(helpText());
      //     }
      //     //console.log({which:which});
      // });
    }

    function helpText(){
        return [
            '功能',
            '  啟用時，放大滑鼠移過的圖片',
            '',
            '說明',
            '  按 [Ctrl] 切換 [啟用/停用]',
            '  按 [PageUp/PageDown/Home/End] 換圖',
        ].join('\n');
    }

    function isActive(v){
        return true;

        //if(typeof v === 'undefined'){ return activeG; } // get
        //else { activeG = v; } // set
    }

    function updateImageIndex(which){
        var match = {
            key: false,
            image: false,
        };

        if(which == Which.PageUp){
            match.key = true;
            var newIndex = overImageIndexG - 1;
            if(newIndex >= 0){
                match.image = true;
                overImageIndexG = newIndex;
            }
        }
        else if(which == Which.PageDown){
            match.key = true;
            var newIndex = overImageIndexG + 1;
            if(newIndex < document.images.length){
                match.image = true;
                overImageIndexG = newIndex;
            }
        }
        else if(which == Which.End){
            match.key = true;
            match.image = true;
            overImageIndexG = document.images.length - 1;
        }
        else if(which == Which.Home){
            match.key = true;
            match.image = true;
            overImageIndexG = 0;
        }

        return match;
    }

    function updateStatus(){
        if(!isActive()){
            hideWrapper();
            return;
        }

        if(overImageIndexG >= 0){
            ensureWrapper();
            updateImage();
            showLargeImage();
        }
        else{
            hideLargeImage();
        }
    }
    function updateImage(){
        var img = $('#largeImageTan');
        img.attr('src', getOverImageSrc());
        centerImage(img, marginG);
    }
    function getOverImageSrc(){
        if(getImageIndex($('#largeImageTan')[0]) == overImageIndexG){
            overImageIndexG--;
        }
        var src = document.images[overImageIndexG].src;
        return src;
    }

    function showLargeImage(){
        var fn = 'showLargeImage';
        updateWrapper(fn);
        updateCursor(fn);
    }
    function hideLargeImage(){
        var fn = 'hideLargeImage';
        updateWrapper(fn);
        updateCursor(fn);
    }
    function hideWrapper(){
        var fn = 'hideWrapper';
        updateWrapper(fn);
        updateCursor(fn);
    }
    function updateWrapper(fn){
        if(fn == 'showLargeImage'){
            $('#wrapperTan').css('visibility','visible');
            $('#largeImageTan').css('visibility','visible');
        }
        else if(fn == 'hideLargeImage'){
            $('#wrapperTan').css('visibility','visible');
            $('#largeImageTan').css('visibility','hidden');
        }
        else if(fn == 'hideWrapper'){
            $('#wrapperTan').css('visibility','hidden');
            $('#largeImageTan').css('visibility','hidden');
        }
    }
    function updateCursor(fn){
        if(fn == 'showLargeImage'){
            $('body').css('cursor','none');
        }
        else if(fn == 'hideLargeImage'){
            $('body').css('cursor','auto');
        }
        else if(fn == 'hideWrapper'){
            $('body').css('cursor','auto');
        }
    }

    function ensureWrapper(){
        if($('#largeImageTan').length > 0){
            return;
        }
        var wrapper = makeWrapper();
        $('body').append(wrapper);
    }
    function makeWrapper(){
        var div = $('<div id="wrapperTan"></div>');
        var img = $('<img id="largeImageTan" src="" />');
        div.append(img);

        div.css('visibility','hidden');
        div.css('pointer-events','none');
        div.css('position','fixed');
        div.css('z-index','9999999');
        div.css('top','0');
        div.css('left','0');
        div.css('width','10000');
        div.css('height','10000');
        //div.css('background-color','rgba(0, 0, 0, 0.8)');

        img.css('visibility','hidden');
        img.css('pointer-events','none');
        img.css('position','fixed');
        img.css('top','50%');
        img.css('left','50%');
        //img.css('border','0');

        return div;
    }


    // helper

    function centerImage(img, margin){
        // img    (html element) <img src="">
        // margin (int)          margin of image
        var scrollbarWidth = 20; //scrollbar width of browser

        var imgJq = (img instanceof jQuery) ? img : $(img);

        var maxWidth = window.innerWidth - (margin + scrollbarWidth);
        var maxHeight = window.innerHeight - margin;
        imgJq.css('max-width', maxWidth);
        imgJq.css('max-height', maxHeight);

        var halfWidth = Math.floor( imgJq.width() / 2 );
        var halfHeight = Math.floor( imgJq.height() / 2 );
        imgJq.css('left','50%').css('left','-='+halfWidth );
        imgJq.css('top','50%').css('top','-='+halfHeight );
    }

    function getImageIndex(img){
        var i;
        var imgs = document.images;
        for(i=0; i<imgs.length; ++i){
            if(imgs[i] == img){
                break;
            }
        }
        return (i == imgs.length) ? -1 : i;
    }

    var Which = {
        Space: 32, Enter: 13, Tab: 9, Esc: 27, Backspace: 8,
        Shift: 16, Ctrl: 17, Alt: 18,
        PageUp:33, PageDown: 34, End: 35, Home: 36,
        ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40,
        H: 72, // A-Z: 65-90
        // 0-1: 48-57
    };

    return render;
})();

var CtrlImg = (function(){

  var ctrlPressed = false;
  
  function render(){
    $(document).on("keydown", function(event){
      if(event.which=="17") //17=ctrl keydown, 18=ctrl keyup
        ctrlPressed = true;
    });
    $(document).on("keyup", function(){
      ctrlPressed = false;
    });
    $(document).on("click", 'img', function(){
      openImgToNewWindow(this);
      ctrlPressed = false;
    });
  }

  function openImgToNewWindow(img) {
    if(ctrlPressed) {
      var src = img.src;
      window.open(src, '_blank');
    }
  }
  
  return render;
})();