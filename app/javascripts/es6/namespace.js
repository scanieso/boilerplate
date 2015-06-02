import $ from 'jQuery';

const App = {
  initialize() {
    const ui = new App.UI();
    ui.initialize();
  }
};

$(function() {
  App.initialize();
});

export default App;
