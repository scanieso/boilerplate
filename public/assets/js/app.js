(function(__exports__, __dependency1__) {
  "use strict";
  var $ = __dependency1__;

  var App = {
    initialize: function () {
      var ui = new App.UI();
      ui.initialize();
    }
  };

  $(function () {
    App.initialize();
  });

  __exports__.App = App;
})(window, window.jQuery);
(function(__dependency1__) {
  "use strict";
  var ns = __dependency1__;

  ns.UI = function()  {
    var self = {};

    self.initialize = function() 
      {return console.log('Initialize: ui.js')};

    return self;
  };
})(window.App);