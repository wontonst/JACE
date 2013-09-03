function Vector2(){
    this.x = 0;
    this.y = 0;
}
Vector2.prototype.setX = function(x){
    this.x = x;
};
Vector2.prototype.setY = function(y){
    this.y = y;
};
Vector2.prototype.getX = function(){
    return this.x;
};
Vector2.prototype.getY = function(){
    return this.y;
};

function Vector3(){
    this.x = 0;
    this.y = 0;
    this.z = 0;
}
Vector3.prototype = new Vector2();
Vector3.constructor = Vector3;

Vector3.prototype.setZ = function(z){
    this.z = z;
};
Vector3.prototype.getZ = function(){
    return this.z;
};