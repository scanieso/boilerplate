import $ from 'jQuery';

let App = {
  initialize: function () {
    let ui = new App.UI();
    ui.initialize();
  }
};

$(function () {
  App.initialize();
});

export default App;
