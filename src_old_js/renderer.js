function Renderer() {
    this.drawables = [];
}
Renderer.prototype.add = function(d) {
    this.drawables.push(d);
    this.drawables.sort(function(a, b) {
        return a.layer - b.layer;
    });
};
Renderer.prototype.render = function() {
    for (var i = 0; i < this.drawables.length; i++) {
        this.drawables[i].draw();
    }
};