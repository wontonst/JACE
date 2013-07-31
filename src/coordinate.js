function Coordinates(x, y) {
    this.x = x;
    this.y = y;
}
Coordinates.prototype.move = function(x,y){
    this.x += x;
    this.y += y;
};