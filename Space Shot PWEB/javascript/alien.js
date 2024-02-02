function Alien(x, y, level)
{
    this.x = x;
    this.y = y;
    this.raggioX = RAGGIO_ALIENO_X;
    this.raggioY = RAGGIO_ALIENO_Y;
    this.type = 0;
    
    //Indica tra quanto tempo cambia verso orizzontale
    this.residueSwing = TEMPO_CAMBIO_DIREZIONE_ORIZZONTALE;

    // Assegnamento del tipo di alieno in base al livello corrente
    var difficulty = Math.floor(Math.random() * level)
    if (difficulty === 0)
    this.type = 1;
    else if (difficulty === 1)
    this.type = 2;
    else if (difficulty === 2)
    this.type = 3;
    else this.type = 4;

    this.stepX = level;
    this.stepY = this.type;

    this.life = 5;

    // Assegnamento numero colpi necessari per distruggere l'UFO in base
    // al suo tipo.
    if (this.type === 1) this.life = 5;
    else if (this.type === 2) this.life = 10;
    else if (this.type === 3) this.life = 20;
    else this.life = 30;
}





// Moviemento per gli alieni di tipo 1 e 2
Alien.prototype.move12 = 
function(playground)
{
    if (this.x > (playground.width - this.raggioX + playground.offsetLeft))
    {
        this.x = playground.width - this.raggioX + playground.offsetLeft;
        this.stepX = -this.stepX;
    }
    else if (this.x < (this.raggioX + playground.offsetLeft))
    {
        this.x = this.raggioX + playground.offsetLeft;
        this.stepX = -this.stepX;
    }
    
    if (this.residueSwing === 0) 
    {
        this.stepX = -this.stepX;
        this.residueSwing = TEMPO_CAMBIO_DIREZIONE_ORIZZONTALE;
    }
    else this.residueSwing -= CLOCK_INTERVAL;

    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;
}




// Movimento per gli alieni di tipo 3 e 4. Questi tenderanno a seguire i movimenti della nave del giocatore
Alien.prototype.move34 = 
function(ship)
{
    var lastStepX = this.stepX;
    // Quei 5 vengono messi per evitare sgradevoli oscillazioni dovute al fatto che, senza un intervallo,
    // gli UFO e la nave del giocatore devono trovarsi sulla stessa ordinata per far sì che l'UFO non continui a muoversi orizzontalmente
    if (this.x < ship.x - 5)
        {if (this.stepX < 0) this.stepX = -this.stepX;}
    else if (this.x > ship.x + 5)
            {if (this.stepX > 0) this.stepX = -this.stepX;}
         else this.stepX = 0;


    this.x = this.x + this.stepX;
    this.y = this.y + this.stepY;

    // Questo lo facciamo per far sì che le verifiche che faremo al prossimo giro di clock abbiano un senso
    if (this.stepX === 0)
        this.stepX = lastStepX;
}

Array.prototype.removeAlien =
function(index)
{
    this.splice(index, 1);
}

