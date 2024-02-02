function Sketcher(playground, stats)
{
    this.playground = playground;
    this.stats = stats;

    this.spriteCoin = 1;
    this.intervalSpriteCoin = INTERVAL_SPRITE_COIN;
}

Sketcher.prototype.spriteCoinChange =
function()
{
    if (this.intervalSpriteCoin <= 0)
    {
        var coinNode = document.getElementById("coinImage" + this.spriteCoin);
        if (this.spriteCoin >= 4) this.spriteCoin = 1;
        else this.spriteCoin++;
        coinNode.setAttribute("id", "coinImage" + this.spriteCoin);
        this.intervalSpriteCoin = INTERVAL_SPRITE_COIN;
    }
    else this.intervalSpriteCoin -= CLOCK_INTERVAL;
    
}

Sketcher.prototype.drawShip =
function(nave)
{
    var nodoNave = document.getElementById("naveGiocatore");
    if (nodoNave === null)
    {
        nodoNave = document.createElement('div');
        nodoNave.setAttribute('id', 'naveGiocatore');
        this.playground.appendChild(nodoNave);
    }

    nodoNave.style.left = (nave.x - nave.raggioX) + 'px';
    nodoNave.style.top = (nave.y - nave.raggioY) + 'px';
}

Sketcher.prototype.drawShot =
function(shot, indexShot)
{
    var shotNode = document.getElementById(SHOT_ID + indexShot);
    if (shotNode === null)
    {
        shotNode = document.createElement('div');
        shotNode.id = SHOT_ID + indexShot;
        shotNode.setAttribute('class', SHOT_ID);
        this.playground.appendChild(shotNode);
    }
    shotNode.style.top = (shot.y - shot.raggio) + 'px';
    shotNode.style.left = (shot.x - shot.raggio) + 'px';
}

Sketcher.prototype.removeShot =
function(index)
{
    var remShot = document.getElementById(SHOT_ID + index);
    this.playground.removeChild(remShot);
}


Sketcher.prototype.drawAlien =
function(alien, index)
{
    var alienID = ALIEN_ID + index;
    var alienNode = document.getElementById(alienID);
    if (alienNode === null)
    {
        alienNode = document.createElement('div');
        alienNode.id = alienID;
        alienNode.setAttribute('class', ALIEN_ID);
        this.playground.appendChild(alienNode);
    }
    alienNode.setAttribute('style', "background-image: url(./css/immagini/alien" + alien.type + ".png); left: " 
                            + (alien.x - alien.raggioX) + "px; top: " +  (alien.y - alien.raggioY) + "px;");
}


Sketcher.prototype.removeAlien =
function(index)
{
    var remAlien = document.getElementById(ALIEN_ID + index);
    this.playground.removeChild(remAlien);
}

Sketcher.prototype.drawExplosion =
function(explosion, index)
{
    var explosionNode = document.getElementById(EXPLOSION_ID + index);
    if (explosionNode === null)
    {
        explosionNode = document.createElement("div");
        explosionNode.id = EXPLOSION_ID + index;
        explosionNode.setAttribute("class", EXPLOSION_ID);
        this.playground.appendChild(explosionNode);
    }
    explosionNode.style.left = (explosion.x - explosion.raggioX) + "px";
    explosionNode.style.top  = (explosion.y - explosion.raggioY) + "px";
}


Sketcher.prototype.removeExplosion =
function()
{
    var remExplosion = document.getElementById(EXPLOSION_ID + 0);
    this.playground.removeChild(remExplosion);
}



Sketcher.prototype.updateExplosionsIndex =
function(index)
{
    var explosion = document.getElementById(EXPLOSION_ID + index);
    explosion.id = EXPLOSION_ID + (index - 1);
}


Sketcher.prototype.drawLife =
function(life)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[0].firstChild.nodeValue = life;
}


Sketcher.prototype.drawScore =
function(score)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[1].firstChild.nodeValue = score;
}


Sketcher.prototype.drawCoins =
function(coins)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[2].firstChild.nodeValue = coins;
}

Sketcher.prototype.drawAttack =
function(attack)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[3].firstChild.nodeValue = attack;
}

Sketcher.prototype.drawSpeed =
function(speed)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[4].firstChild.nodeValue = speed;
}

Sketcher.prototype.drawCost =
function(cost)
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[5].firstChild.nodeValue = cost;
}

Sketcher.prototype.drawMaxSpeed =
function()
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[4].firstChild.nodeValue = "MAX";
}

Sketcher.prototype.drawMaxAttack =
function()
{
    var spanNodes = this.stats.getElementsByTagName("span");
    spanNodes[3].firstChild.nodeValue = "MAX";
}

Sketcher.prototype.removeAll =
function()
{
    var elements = this.playground.getElementsByTagName('div');
		for (var i = elements.length-1; i >=0; i--)
			this.playground.removeChild(elements[i]);
}
