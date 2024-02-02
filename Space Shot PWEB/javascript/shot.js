function Shot(x, y, shotSpeed)
{
    this.x = x;
    this.y = y;
    this.raggio = RAGGIO_COLPO;
    this.velocita = shotSpeed;
}

Shot.prototype.move =
function()
{
    this.y = this.y - this.velocita;
}


// Funzione per eliminare elemento in posizione index dall'array shots
Array.prototype.removeShot =
function(index)
{
    this.splice(index, 1);
}