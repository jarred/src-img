srcImg = window.SrcImg ||= {}

srcImg.Main =
  # server: 'http://localhost:4104'
  # server: 'http://localhost:8000'
  server: 'http://jarred.github.com/src-img'
  version: 0.66
  
  init: () ->
    _.bindAll @
    @writeBookmarklet()
    return
    
  writeBookmarklet: () ->
    $('div.bookmarklet-hold').html "<a href=\"javascript:void((function(){var sir=document.createElement('script');sir.setAttribute('src','http://cdnjs.cloudflare.com/ajax/libs/require.js/0.26.0/require.min.js');sir.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(sir);var sib=document.createElement('script');sib.setAttribute('src','#{@server}/js/app/bookmarklet.js?version=#{@version}');sib.setAttribute('type','text/javascript');document.getElementsByTagName('head')[0].appendChild(sib);})());\"><u>&#63;</u>&iquest;<u> src-im</u>g</a>"
    return
    
srcImg.Main.init()