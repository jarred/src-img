(function() {
  var srcImg;

  srcImg = window.SrcImg || (window.SrcImg = {});

  srcImg.Main = {
    server: '//raw.github.com/BrainCrumbz/src-img/master',
    version: 0.66,
    init: function() {
      _.bindAll(this);
      this.writeBookmarklet();
    },
    writeBookmarklet: function() {
      $('div.bookmarklet-hold').html("<a href=\"javascript:void((function(){var sir=document.createElement('script');sir.setAttribute('src','//cdnjs.cloudflare.com/ajax/libs/require.js/0.26.0/require.min.js');sir.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(sir);var sib=document.createElement('script');sib.setAttribute('src','" + this.server + "/js/app/bookmarklet.js?version=" + this.version + "');sib.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(sib);})());\"><u>&#63;</u>&iquest;<u> src-im</u>g</a>");
    }
  };

  srcImg.Main.init();

}).call(this);
