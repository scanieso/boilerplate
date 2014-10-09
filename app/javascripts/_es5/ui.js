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