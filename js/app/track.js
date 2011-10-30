(function() {
  var checkForAnalytics, okGo, url;
  url = unescape(window.location.search.replace('?u=', ''));
  okGo = function() {
    window.location = url;
  };
  checkForAnalytics = function() {
    if (typeof _gat !== "undefined" && _gat !== null) {
      clearInterval(this.analyticsInt);
      okGo();
    } else {
      this.analyticsInt = setTimeout(checkForAnalytics, 40);
    }
  };
  checkForAnalytics();
}).call(this);
