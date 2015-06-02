(function(__dependency1__) {
  "use strict";
  var ns = __dependency1__;
  // import $ from 'jQuery';

  ns.UI = {
    initialize: function() {
      console.log('Initialize: ui.js');

      // $('a.skip-link').on('click', function(e) {
      //   e.preventDefault();
      //   let href = $(this).attr('href'),
      //   $el = $(href);

      //   if (!$el.is(':tabbable')) {
      //     $el.attr('tabindex', '-1');
      //   }
      //   $el.focus();
      // });
    }
  };
})(window.App);