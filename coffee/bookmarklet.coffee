# server = 'http://localhost:4104/'
server = 'http://jarred.github.com/src-img/'
analyticsID = 'UA-4516491-29'

libs = [
  'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'
  'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.7/underscore-min.js'
  "#{server}/js/lib/URI.js"
  # "http://www.google-analytics.com/u/ga_debug.js"  
  "http://www.google-analytics.com/ga.js"  
  ]
  
sourceImage = 
  exit: (e) ->
    $('a.src-img').remove()
    $('a.src-img-close').remove()
    e.preventDefault()
    return
    
  trackClick: (e) ->
    _gaq.push [
      'src-img-tracker._trackEvent'
      'site'
      'click'
      window.location.hostname
      ]
    return
    
  init: () -> 
    console.log 'init()?'
    # add css
    $style = $('<link>')
    $style.attr
      rel: 'stylesheet'
      href: "#{server}/css/bookmarklet.css"
      type: 'text/css'
    $('head').append $style
    
    # init analytics
    _gaq.push () ->
      @tracker = _gat._createTracker analyticsID, 'src-img-tracker'
      return
      
    _gaq.push [
      'src-img-tracker._trackEvent'
      'site'
      'open'
      window.location.hostname
      ]
    
    # add links above images
    count = 0
    $.each $('img'), (index, img) =>
      $img = $(img)
      # break if image is too small
      return if $img.height() < 100 || $img.width() < 100
      count++
      src = $img.attr 'src'
      if src.indexOf 'http' < 0
        src = absolutizeURI window.location, src
        
      flickrID = /static.flickr.com\/([0-9]*)\/([0-9]*)/i.exec(src);
      
      if flickrID
        searchUrl = "http://www.flickr.com/photo.gne?id=" + flickrID[2];
      else
        searchUrl = "http://images.google.com/searchbyimage?image_url=#{escape(src)}&image_content=&bih=#{$img.height()}&biw=#{$img.width()}"                     
      
      $('body').append "
      <a class=\"src-img\" style=\"width:#{$img.width()}px;height:#{$img.height()}px;top:#{$img.offset().top}px;left:#{$img.offset().left}px;\" href=\"#{searchUrl}\" target=\"_blank\"><span>&#63;&iquest;</span></a>
      "
      return
      
    $('a.src-img').bind 'click', @trackClick
      
    if count == 0
      alert 'I couldn\'t find any images :('
      return
      
    # add close button
    close = $ "<a href=\"#\" class=\"src-img-close\">&times;</a>"
    $('body').append close
    $(close).bind 'click', @exit
    return

loadLibs = () ->
  require libs, () ->
    sourceImage.init()
    return
  return

checkForRequire = () ->
  if require?
    loadLibs()
    clearInterval @requireInt
  else
    @requireInt = setTimeout checkForRequire, 100
  return
  
checkForRequire()