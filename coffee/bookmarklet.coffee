# server = 'http://localhost:4104/'
server = 'http://jarred.github.com/src-img/'

sourceImage = 
  exit: (e) ->
    $('a.src-img').remove()
    $('a.src-img-close').remove()
    e.preventDefault()
    return
  init: () ->
    #.. add css
    $style = $('<link>')
    $style.attr
      rel: 'stylesheet'
      href: "#{server}/css/bookmarklet.css"
      type: 'text/css'
    $('head').append $style
    $.each $('img'), (index, img) =>
      $img = $(img)
      return if $img.height() < 100 || $img.width() < 100
      src = $img.attr 'src'
      if src.indexOf 'http' < 0
        src = absolutizeURI window.location, src
      searchUrl = "http://images.google.com/searchbyimage?image_url=#{escape(src)}&image_content=&bih=#{$img.height()}&biw=#{$img.width()}"
      $('body').append "
      <a class=\"src-img\" style=\"width:#{$img.width()}px;height:#{$img.height()}px;top:#{$img.offset().top}px;left:#{$img.offset().left}px;\" href=\"#{searchUrl}\" target=\"_blank\"><span>&#63;&iquest;</span></a>
      "
      return
    close = $ "<a href=\"#\" class=\"src-img-close\">&times;</a>"
    $('body').append close
    $(close).bind 'click', @exit
    return

loadLibs = () =>
  require [
    'http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js'
    'http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.1.7/underscore-min.js'
    "#{server}/js/lib/URI.js"
    ], () =>
      sourceImage.init()
      return
      
checkForRequire = () =>
  if require?
    loadLibs()
    clearInterval @requireInt
  else
    @requireInt = setTimeout checkForRequire, 200
  return
  
checkForRequire()