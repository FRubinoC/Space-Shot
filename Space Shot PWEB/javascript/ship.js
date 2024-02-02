function Ship(x, y)
{
    this.x = x;
    this.y = y;
    this.raggioX = RAGGIO_NAVE_X;
    this.raggioY = RAGGIO_NAVE_Y;
}

Ship.prototype.move =
function(x, playground)
{
    if (x < (playground.offsetLeft + this.raggioX)) {this.x = playground.offsetLeft + this.raggioX;}
    else if (x > (playground.offsetLeft + playground.width - this.raggioX)) {this.x = playground.offsetLeft + playground.width - this.raggioX;}
    else this.x = x;
}

Ship.prototype.setYShip =
function(playground)
{
    this.y = (playground.offsetTop + playground.height - this.raggioY);
}