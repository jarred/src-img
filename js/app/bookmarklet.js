(function() {
  var analyticsID, checkForRequire, libs, loadLibs, server, sourceImage;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  server = 'http://jarred.github.com/src-img/';
  analyticsID = 'UA-4516491-29';
  libs = ['http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js', 'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.7/underscore-min.js', "" + server + "/js/lib/URI.js", "http://www.google-analytics.com/ga.js"];
  sourceImage = {
    exit: function(e) {
      $('a.src-img').remove();
      $('a.src-img-close').remove();
      e.preventDefault();
    },
    trackClick: function(e) {
      _gaq.push(['src-img-tracker._trackEvent', 'site', 'click', window.location.hostname]);
    },
    init: function() {
      var $style, close, count;
      // console.log('init()?');
      $style = $('<link>');
      $style.attr({
        rel: 'stylesheet',
        href: "" + server + "/css/bookmarklet.css",
        type: 'text/css'
      });
      $('head').append($style);
      _gaq.push(function() {
        this.tracker = _gat._createTracker(analyticsID, 'src-img-tracker');
      });
      _gaq.push(['src-img-tracker._trackEvent', 'site', 'open', window.location.hostname]);
      count = 0;
      $.each($('img'), __bind(function(index, img) {
        var $img, searchUrl, src, flickrID;
        $img = $(img);
        if ($img.height() < 100 || $img.width() < 100) {
          return;
        }
        count++;
        src = $img.attr('src');
		
        if (src.indexOf('http' < 0)) {
          src = absolutizeURI(window.location, src);
        }
		
		flickrID = /static.flickr.com\/([0-9]*)\/([0-9]*)/i.exec(src);
				
		if (flickrID) {			
			searchUrl = "http://www.flickr.com/photo.gne?id=" + flickrID[2];
		} else {
			searchUrl = "http://images.google.com/searchbyimage?image_url=" + (escape(src)) + "&image_content=&bih=" + ($img.height()) + "&biw=" + ($img.width());
		}
        
        $('body').append("      <a class=\"src-img\" style=\"width:" + ($img.width()) + "px;height:" + ($img.height()) + "px;top:" + ($img.offset().top) + "px;left:" + ($img.offset().left) + "px;\" href=\"" + searchUrl + "\" target=\"_blank\"><span>&#63;&iquest;</span></a>      ");
      }, this));
      $('a.src-img').bind('click', this.trackClick);
      if (count === 0) {
        alert('I couldn\'t find any images :(');
        return;
      }
      close = $("<a href=\"#\" class=\"src-img-close\">&times;</a>");
      $('body').append(close);
      $(close).bind('click', this.exit);
    }
  };
  loadLibs = function() {
    require(libs, function() {
      sourceImage.init();
    });
  };
  checkForRequire = function() {
    if (typeof require !== "undefined" && require !== null) {
      loadLibs();
      clearInterval(this.requireInt);
    } else {
      this.requireInt = setTimeout(checkForRequire, 100);
    }
  };
  checkForRequire();
}).call(this);
