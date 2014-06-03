var App = (function () {
  'use strict';

  var self = {};

  self.initialize = function () {
    var test = new App.Test();
    test.initialize();
  };

  return self;
})();

(function ($) {
  'use strict';

  $(function () {
    App.initialize();
  });
})(jQuery);
