(function() {
  var checkForRequire, loadLibs, server, sourceImage;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  server = 'http://localhost:4104';
  sourceImage = {
    exit: function(e) {
      $('a.src-img').remove();
      $('a.src-img-close').remove();
      e.preventDefault();
    },
    init: function() {
      var $style, close;
      $style = $('<link>');
      $style.attr({
        rel: 'stylesheet',
        href: "" + server + "/css/bookmarklet.css",
        type: 'text/css'
      });
      $('head').append($style);
      $.each($('img'), __bind(function(index, img) {
        var $img, searchUrl, src;
        $img = $(img);
        if ($img.height() < 100 || $img.width() < 100) {
          return;
        }
        src = $img.attr('src');
        if (src.indexOf('http' < 0)) {
          src = absolutizeURI(window.location, src);
        }
        searchUrl = "http://images.google.com/searchbyimage?image_url=" + (escape(src)) + "&image_content=&bih=" + ($img.height()) + "&biw=" + ($img.width());
        console.log($img.offset());
        $('body').append("      <a class=\"src-img\" style=\"width:" + ($img.width()) + "px;height:" + ($img.height()) + "px;top:" + ($img.offset().top) + "px;left:" + ($img.offset().left) + "px;\" href=\"" + searchUrl + "\" target=\"_blank\"><span>&#63;&iquest;</span></a>      ");
      }, this));
      close = $("<a href=\"#\" class=\"src-img-close\">&times;</a>");
      $('body').append(close);
      $(close).bind('click', this.exit);
    }
  };
  loadLibs = __bind(function() {
    return require(['http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.7/underscore-min.js', "" + server + "/js/lib/URI.js"], __bind(function() {
      sourceImage.init();
    }, this));
  }, this);
  checkForRequire = __bind(function() {
    console.log('checkForRequire');
    if (typeof require !== "undefined" && require !== null) {
      loadLibs();
      clearInterval(this.requireInt);
    } else {
      this.requireInt = setTimeout(checkForRequire, 200);
    }
  }, this);
  checkForRequire();
}).call(this);
