var interval;

function go (game) {
  interval = setInterval(function () {
    game.updateNeighbors();
    game.updateStates();
    console.log("Loops");
  }, 50);
}

$(document).ready(function () {
  var size = 50;
  var conway = new Conway(size);
  conway.renderGrid();
  var rowWitdh = $('.cell').width() * size;
  $('.row').width(rowWitdh);
  $('.cell').on('click', function (e) {
    $(e.target).toggleClass('alive');

  });

  $(document).on('keypress', function (e){
    if (e.keyCode === 13) {
      go(conway);
    }
    if (e.keyCode === 32) {
      $('.alive').removeClass('alive');
      clearInterval(interval);
    }
  });
});
