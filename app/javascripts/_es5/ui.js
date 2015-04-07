(function(__dependency1__) {
  "use strict";
  var ns = __dependency1__;

  ns.UI = function () {
    var initialize;

    initialize = function () {
      console.log('Initialize: ui.js');
    };

    return {
      initialize: initialize
    };
  };
})(window.App);