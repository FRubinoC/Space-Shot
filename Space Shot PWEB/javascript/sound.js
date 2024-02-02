Game.prototype.beginSound =
function()
{
    document.getElementById("beginSound").play();
}

Game.prototype.upgradeSound =
function()
{
    document.getElementById("upgradeSound").play();
}

Game.prototype.hitSound =
function()
{
    document.getElementById("hitSound").play();
}

Game.prototype.explosionSound =
function()
{
    var expl = document.getElementById("explosionSound");
    expl.volume = 0.4;
    expl.play();
}

Game.prototype.levelupSound =
function()
{
    document.getElementById("levelupSound").play();
}