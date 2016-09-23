function Conway(size) {

  this.size = size;
  this.grid = this.generateGrid(size);
  this.directions = [ [-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1] ];
}

Conway.prototype.generateGrid = function (size) {
  var grid = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(new Cell());
    }
    grid.push(row);
  }
  return grid;
};

Conway.prototype.renderGrid = function () {
  var $grid = $('#grid');
  for (var i = 0; i < this.size; i++) {
    var $row = $("<div class='row'></div>");
    for (var j = 0; j < this.size; j++) {
      $row.append(this.grid[i][j].element);
    }
    $grid.append($row);
  }
};

//if less than 2 neighbors, cell dies -- isUnderpopulated(r,c)
//if more than 3 neighbors, cell dies -- isOverpopulated(r,c)
//if dead, and exactly 3 neighbors, cell is resurrected -- isResurrectable(r,c)
//update neighbors for cells**

Conway.prototype.isUnderpopulated = function (r,c) {
  var cell = this.grid[r][c];
  return cell.neighbors < 2;
};

Conway.prototype.isOverpopulated = function (r,c) {
  var cell = this.grid[r][c];
  return cell.neighbors > 3;
};

Conway.prototype.isResurrectable = function (r,c) {
  var cell = this.grid[r][c];
  return !cell.isAlive() && cell.neighbors === 3;
};

Conway.prototype.isInBounds = function (r,c) {
  return (r > 0 && r < this.size && c > 0 && c < this.size);
};

Conway.prototype.updateCellNeighbors = function (r,c) {
  var cell = this.grid[r][c];
  var neighbor = new Cell();
  cell.neighbors = 0;
  for (var i = 0; i < this.directions.length; i++) {
    var direction = this.directions[i];
    var dr = direction[0];
    var dc = direction[1];
    if (this.isInBounds(r + dr,c + dc)) {
      neighbor = this.grid[r+dr][c+dc];
      if (neighbor.isAlive()) {
        cell.neighbors++;
      }
    }
  }
};

Conway.prototype.updateNeighbors = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      this.updateCellNeighbors(i,j);
    }
  }
};

Conway.prototype.updateCellState = function (r,c) {
  var cell = this.grid[r][c];

  if (this.isUnderpopulated(r,c) || this.isOverpopulated(r,c)) {
    cell.kill();
  } else if (this.isResurrectable(r,c)) {
    cell.resurrect();
  }
};

Conway.prototype.updateStates = function () {
  for (var i = 0; i < this.size; i++) {
    for (var j = 0; j < this.size; j++) {
      this.updateCellState(i,j);
    }
  }
};
