import $ from 'jQuery';

var App = {
  initialize: function () {
    var ui = new App.UI();
    ui.initialize();
  }
};

$(function () {
  App.initialize();
});

export default App;
