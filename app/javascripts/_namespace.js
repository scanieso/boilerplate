var App = (function () {
  'use strict';

  var self = {};

  self.initialize = function () {
    console.log('init');
  };

  return self;
})();

(function ($) {
  'use strict';

  $(function () {
    App.initialize();
  });
})(jQuery);
