function GameState()
{
    this.gameTimer = null;

    // Tempo rimanente prima che parta un altro colpo dalla nave del giocatore
    this.residueShotTime = FIRST_SHOT_INTERVAL;
    this.shotTimeInterval = FIRST_SHOT_INTERVAL;

    // Tempo residuo in millisecondi dalla comparsa del prossimo UFO
    this.residueAlienTime = INITIAL_ALIEN_INTERVAL;

    // Livello di gioco. Ad inizio gioco è ad 1, col passare del tempo aumenta. 
    // Il livello di gioco influisce sulla probabilità del tipo di UFO, sulla velocità
    // di oscillazione orizzontale e sulla frequenza di comparsa degli UFO
    this.level = INITIAL_LEVEL;

    // Intervallo tra un livello e l'altro
    this.intervalLevel = INTERVAL_LEVEL;

    this.shotSpeed = VELOCITA_COLPO_INIZIALE;

    this.shotSpeedIncrease = INCREMENTO_VELOCITA;
}

GameState.prototype.start =
function(clockFuction)
{
    //Impostazione del clock all'inizio del gioco
    if (this.gameTimer === null)
        this.gameTimer = setInterval(clockFuction, CLOCK_INTERVAL);
}

GameState.prototype.pause =
function()
{
    //Resetta il clock
    clearInterval(this.gameTimer);
    this.gameTimer = null;
}

GameState.prototype.isPause =
function()
{
    return this.gameTimer === null;
}

GameState.prototype.isRapid =
function()
{
    return this.residueRapidTime !== null;
}

GameState.prototype.isTimeToShot =
function()
{
    return this.residueShotTime === 0;
}

GameState.prototype.decrementResidueShotTime =
function()
{
    this.residueShotTime = this.residueShotTime - CLOCK_INTERVAL;
}

GameState.prototype.refreshIntervalLevel =
function()
{
    this.intervalLevel = INTERVAL_LEVEL;
}


// Funzione utilizzata quando abbiamo appena creato un nuovo alieno.
// Il tempo tra una comparsa e l'altra dipende dal livello fino ad un massimo
// di due UFO al secondo.
GameState.prototype.refreshResidueAlienTime =
function()
{
    this.residueAlienTime = INITIAL_ALIEN_INTERVAL - (this.level - 1) * 300;
    if (this.residueAlienTime < 500) this.residueAlienTime = 500;
}

//Funzione che restituisce 'true' se bisogna creare un nuovo alieno
GameState.prototype.timeToCreateNewAlien =
function()
{
    return this.residueAlienTime <= 0;
}


GameState.prototype.decrementResidueAlienTime =
function()
{
    this.residueAlienTime = this.residueAlienTime - CLOCK_INTERVAL;
}


GameState.prototype.pause = 
function()
{
	clearInterval(this.gameTimer); 
	this.gameTimer = null;
}

GameState.prototype.isSpeedMax =
function()
{
    return this.shotSpeed >= MAX_SPEED;
}

GameState.prototype.upgradeSpeed =
function()
{
    this.shotTimeInterval -= CLOCK_INTERVAL*2;
    this.shotSpeed += this.shotSpeedIncrease;
}

GameState.prototype.reset =
function()
{
    this.gameTimer = null;
    this.residueShotTime = FIRST_SHOT_INTERVAL;
    this.shotTimeInterval = FIRST_SHOT_INTERVAL;
    this.shotSpeed = VELOCITA_COLPO_INIZIALE;
    this.residueAlienTime = INITIAL_ALIEN_INTERVAL;
    this.level = INITIAL_LEVEL;
    this.intervalLevel = INTERVAL_LEVEL;
}
