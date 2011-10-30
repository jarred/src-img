url = unescape window.location.search.replace('?u=', '')

okGo = () ->
  window.location = url
  return
  
checkForAnalytics = () ->
  if _gat?
    clearInterval @analyticsInt
    okGo()
  else
    @analyticsInt = setTimeout checkForAnalytics, 40
  return

checkForAnalytics()