var nave_x = -50;
var nave_y = -50;
var game1 = null;


// Inizializzazione //
function begin()
{
    game1 = new Game(document.getElementById("contenitore"));
    game1.beginSound();
    game1.start();
}

function Game(contenitore)
{
    var stats = contenitore.childNodes[1];
    var playground = contenitore.childNodes[3];
    playground.addEventListener('mouseenter', this.start.bind(this), false);
    playground.addEventListener('mousemove', this.shipMoveHandler.bind(this), false);
    playground.addEventListener('mouseleave', this.pause.bind(this));
    
    this.playground = new Playground(playground);
    this.ship = new Ship(nave_x, nave_y);
    this.aliens = new Array();
    this.sketcher = new Sketcher(playground, stats);
    this.shots = new Array();
    this.gameState = new GameState();
    this.stats = new Stats();

    this.explosions = new Array();
}


Game.prototype.start =
function(evt)
{
    this.ship.setYShip(this.playground);
    if (this.gameState.isPause())
        this.gameState.start(this.clock.bind(this));
}

Game.prototype.shipMoveHandler =
function(evt)
{
    this.ship.move(evt.clientX, this.playground);
    this.sketcher.drawShip(this.ship);
}

Game.prototype.pause = 
function(evt)
{
	this.gameState.pause();
}


Game.prototype.clock =
function()
{

    //Controllo sfondo playground
    var playground = document.getElementById("playground-red");
    if (playground !== null)
        this.setBackgroundNormal();

    this.sketcher.spriteCoinChange();


    // Controllo se deve partire un nuovo colpo
    this.shotControl();

    // Gestione creazione nuovo UFO
    this.alienControl();

    // Gestione movimento colpi:
    // Quando va eliminato un colpo perchè è uscito fuori dal playground o perchè ha colpito un nemico
    // elimino un elemento dall'array shots. Di conseguenza devo eliminare anche un elemento div gestito
    // dallo skethcer per far si che il numero di elementi dell'array combaci con il numero di elementi 
    // div che appaiono a schermo. Tuttavia non conviene eliminare il div con id corrsipondente alla
    // posizione dell'elemento in array eliminato poichè dovrei aggiornare tutti gli id dei div successivi alla posizione.
    // è infatti molto meglio eliminare l'ultimo div dello skethcer e far si che i div con id >= alla posizione dello
    // shot eliminato vengono aggiornati con la posizione del nuovo colpo a cui si riferiscono semplicemente scorrendo
    // il for.
    var lengthShots = this.shots.length;
    for (var i = 0; i < lengthShots; i++)
    {
        if (this.shots[i].y - this.shots[i].velocita * 2 < this.playground.offsetTop) 
        {
            this.removeShot(i, lengthShots);
            lengthShots--;
            i--;
        }
        else
        {
            this.shots[i].move();
            this.sketcher.drawShot(this.shots[i], i);
        }
    }

    
    // CONTROLLO URTI UFO
    var lengthAliens = this.aliens.length;
    for (var i = 0; i < lengthAliens; i++)
    {
        // Se l'UFO impatta con la nave del giocatore o con il bordo inferiore del playground:
        if (this.aliens[i].y + this.aliens[i].raggioY >= this.playground.offsetTop + this.playground.height)
        {
            this.removeAlien(i, lengthAliens);
            lengthAliens--;
            i--;
        }
        else if (((this.aliens[i].x + this.aliens[i].raggioX >= this.ship.x - this.ship.raggioX) 
                  && 
                  (this.aliens[i].x - this.aliens[i].raggioX <= this.ship.x + this.ship.raggioX))
                 &&
                 ((this.aliens[i].y + this.aliens[i].raggioY >= this.ship.y - this.ship.raggioY) 
                  &&
                  (this.aliens[i].y + this.aliens[i].raggioY <= this.playground.offsetTop + this.playground.height)))
                {
                    this.removeAlien(i, lengthAliens);
                    this.setBackgroundRed();
                    this.loseLife();
                    this.hitSound();
                    if (this.stats.isShipDead())
                        this.gameover();
                    lengthAliens--;
                    i--;
                }
                else
                {
                    if (this.aliens[i].type === 1 || this.aliens[i].type === 2)
                    {
                        // Movimento per gli UFO di tipo 1 e 2
                        this.aliens[i].move12(this.playground);
                    }
                    else this.aliens[i].move34(this.ship);
            
                    this.sketcher.drawAlien(this.aliens[i], i);
                }
    }


    // GESTIONE LIVELLO
    if (this.gameState.intervalLevel === 0)
    {
        this.gameState.level++;
        this.levelupSound();
        this.gameState.intervalLevel = INTERVAL_LEVEL;
    }
    else this.gameState.intervalLevel -= CLOCK_INTERVAL;


    // URTI COLPI-UFO
    for (var i = 0; i < lengthShots; i++)
    {
        for (var j = 0; j < lengthAliens; j++)
        {
            if (((this.shots[i].x >= this.aliens[j].x - this.aliens[j].raggioX - this.shots[i].raggio) 
                 &&
                 (this.shots[i].x <= this.aliens[j].x + this.aliens[j].raggioX + this.shots[i].raggio))
               &&
               ((this.shots[i].y <= this.aliens[j].y + this.aliens[j].raggioY + this.shots[i].raggio)
                &&
                (this.shots[i].y >= this.aliens[j].y - this.aliens[j].raggioY - this.shots[i].raggio)))
            {
                this.removeShot(i, lengthShots);
                
                lengthShots--;
                i--;
                
                this.aliens[j].life--;
                if (this.aliens[j].life <= 0)
                {
                    this.createExplosion(this.aliens[j].x, this.aliens[j].y);
                    this.explosionSound();
                    this.incrementScoreAndCoins(this.aliens[j].type);
                    this.removeAlien(j, lengthAliens);
                    lengthAliens--;
                    j--;
                }
                break;
            }
        }
    }


    // AGGIORNAMENTO TEMPO RESIDUO ESPLOSIONI
    for (var i = 0; i < this.explosions.length; i++)
        this.explosions[i].residueTime -= CLOCK_INTERVAL;

    if (this.explosions.length != 0)
        if (this.explosions[0].residueTime <= 0)
        {
            this.removeExplosion();
            for (var i = 0; i < this.explosions.length; i++)
                this.sketcher.updateExplosionsIndex(i+1);
        }   
}








// CONTROLLO SE DEVE PARTIRE IL COLPO. SE Sì LO CREO
Game.prototype.shotControl =
function()
{
    if (this.gameState.isTimeToShot())
    {
        this.gameState.residueShotTime = this.gameState.shotTimeInterval;
        this.createShot();
    }
    else this.gameState.decrementResidueShotTime();
}


// CREAZIONE COLPO NAVE
Game.prototype.createShot =
function()
{
    var x, y, index = this.shots.length;

    x = this.ship.x;
    y = this.ship.y - this.ship.raggioY;

    switch(this.stats.shipAttack)
    {
        default:
            var newShot = new Shot(x, y, this.gameState.shotSpeed);
            this.shots.push(newShot);
            this.sketcher.drawShot(newShot, index);
        break;

        case 2:
            var newShot1 = new Shot(x-10, y, this.gameState.shotSpeed);
            var newShot2 = new Shot(x+10, y, this.gameState.shotSpeed);
            this.shots.push(newShot1);
            this.shots.push(newShot2);
            this.sketcher.drawShot(newShot1, index);
            this.sketcher.drawShot(newShot2, index+1);
        break;

        case 3:
            var newShot1 = new Shot(x, y, this.gameState.shotSpeed);
            var newShot2 = new Shot(x-15, y, this.gameState.shotSpeed);
            var newShot3 = new Shot(x+15, y, this.gameState.shotSpeed);
            this.shots.push(newShot1);
            this.shots.push(newShot2);
            this.shots.push(newShot3);
            this.sketcher.drawShot(newShot1, index);
            this.sketcher.drawShot(newShot2, index+1);
            this.sketcher.drawShot(newShot3, index+2);
        break;

        case 4:
            var newShot1 = new Shot(x-7, y, this.gameState.shotSpeed);
            var newShot2 = new Shot(x+7, y, this.gameState.shotSpeed);
            var newShot3 = new Shot(x-20, y, this.gameState.shotSpeed);
            var newShot4 = new Shot(x+20, y, this.gameState.shotSpeed);
            this.shots.push(newShot1);
            this.shots.push(newShot2);
            this.shots.push(newShot3);
            this.shots.push(newShot4);
            this.sketcher.drawShot(newShot1, index);
            this.sketcher.drawShot(newShot2, index+1);
            this.sketcher.drawShot(newShot3, index+2);
            this.sketcher.drawShot(newShot4, index+3);
        break;   
    }
    
}

Game.prototype.removeShot =
function(index, lengthShots)
{
    this.shots.removeShot(index);

    //Con il removeShot sullo sketcher elimino l'ultimo div in modo tale
    //che il numero di strutture sia consistente con il numero di elementi
    //dell'array. Scorrendo il ciclo for nel clock vengono corrisposti
    //correttamente tutti i div ad ogni elemento dell'array successivo a
    //quello eliminato.
    this.sketcher.removeShot(lengthShots - 1);
}


// Controllo se è il momento di creare un nuovo UFO
Game.prototype.alienControl =
function()
{
    if (this.gameState.timeToCreateNewAlien())
    {
        this.createAlien();
        this.gameState.refreshResidueAlienTime();
    }
    else this.gameState.decrementResidueAlienTime();
}

Game.prototype.createAlien =
function()
{
    var x, y, index = this.aliens.length;

    x = Math.round(Math.random() * (this.playground.width - 2 * RAGGIO_ALIENO_X) + RAGGIO_ALIENO_X + this.playground.offsetLeft);
    y = this.playground.offsetTop + RAGGIO_ALIENO_Y;

    var newAlien = new Alien(x, y, this.gameState.level);
    this.aliens.push(newAlien);
    this.sketcher.drawAlien(newAlien, index);
}


Game.prototype.removeAlien =
function(index, lengthAliens)
{
    this.aliens.removeAlien(index);

    //Con il removeAlien sullo sketcher elimino l'ultimo div in modo tale
    //che il numero di strutture sia consistente con il numero di elementi
    //dell'array. Scorrendo il ciclo for nel clock vengono corrisposti
    //correttamente tutti i div ad ogni elemento dell'array successivo a
    //quello eliminato. Stessa cosa che succede per i colpi
    this.sketcher.removeAlien(lengthAliens - 1);
}



Game.prototype.createExplosion =
function(x, y)
{
    var index = this.explosions.length;
    var newExplosion = new Explosion(x, y);
    this.explosions.push(newExplosion);
    this.sketcher.drawExplosion(newExplosion, index);
}


Game.prototype.removeExplosion =
function()
{
    this.explosions.removeExplosion();
    this.sketcher.removeExplosion();
}


Game.prototype.setBackgroundNormal =
function()
{
    var playground = document.getElementById("playground-red");
    playground.setAttribute("id", "playground");
}

Game.prototype.setBackgroundRed =
function()
{
    var playground = document.getElementById("playground");
    playground.setAttribute("id", "playground-red");
}


Game.prototype.incrementScoreAndCoins =
function(alienLevel)
{
    this.stats.incrementScoreAndCoins(alienLevel);
    this.sketcher.drawScore(this.stats.score);
    this.sketcher.drawCoins(this.stats.coins);
}

Game.prototype.loseLife =
function()
{
    this.stats.life--;
    this.sketcher.drawLife(this.stats.life);
}

Game.prototype.gameover =
function()
{
    var submitScore = document.getElementById("submitScore");
    var scoreFormValue = document.getElementById("inputScoreForm");
    scoreFormValue.value = this.stats.score;
    this.gameState.pause();
    this.sketcher.removeAll();
    this.gameState.reset();
    this.stats.reset();
    this.shots = new Array();
    this.aliens = new Array();
    this.explosions = new Array();
    this.sketcher.drawLife(this.stats.life);
    this.sketcher.drawScore(this.stats.score);
    this.sketcher.drawCoins(this.stats.coins);
    this.sketcher.drawAttack(this.stats.shipAttack);
    this.sketcher.drawSpeed(this.stats.shipSpeedShot);
    this.sketcher.drawCost(this.stats.upgradeCost);
    submitScore.click();
}
