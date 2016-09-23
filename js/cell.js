function Cell() {
  this.element = $("<div class='cell " + russianRoulette() + "'></div");
  this.neighbors = 0;

  function russianRoulette() {
    return ((Math.random() > 0.7) ? "alive" : "");
  }
}

Cell.prototype.isAlive = function () {
  return this.element.hasClass('alive');
};

Cell.prototype.kill = function () {
  this.element.removeClass('alive');
};

Cell.prototype.resurrect = function () {
  this.element.addClass('alive');
};
