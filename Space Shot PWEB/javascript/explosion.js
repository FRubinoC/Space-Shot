function Explosion(x, y)
{
    this.x = x;
    this.y = y;
    this.raggioX = RAGGIO_ESPLOSIONE_X;
    this.raggioY = RAGGIO_ESPLOSIONE_Y;
    this.residueTime = TEMPO_ESPLOSIONE;
}

Array.prototype.removeExplosion =
function()
{
    this.splice(0,1);
}