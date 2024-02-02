function Stats()
{
    this.life = INITIAL_LIFE;
    this.score = INITIAL_SCORE;
    this.coins = INITIAL_COINS;
    this.shipAttack = INITIAL_STAT_SHIP_ATTACK;
    this.shipSpeedShot = INITIAL_STAT_SHOT_SPEED;
    this.shipLevel = INITIAL_SHIP_LEVEL;
    this.upgradeCost = INITIAL_UPGRADE_COST;
}

Stats.prototype.incrementScoreAndCoins =
function(alienLevel)
{
    this.coins += alienLevel*100;
    this.score += alienLevel*100;
}

Stats.prototype.upgradeAttack =
function()
{
    this.coins -= this.upgradeCost;
    this.upgradeCost *= 2;
    this.shipAttack++;
    this.shipLevel++;
}

Stats.prototype.upgradeSpeed =
function()
{
    this.coins -= this.upgradeCost;
    this.upgradeCost *= 2;
    this.shipSpeedShot++;
    this.shipLevel++;
}

Stats.prototype.isShipDead =
function()
{
    return this.life === 0;
}

Stats.prototype.reset =
function()
{
    this.life = INITIAL_LIFE;
    this.score = INITIAL_SCORE;
    this.coins = INITIAL_COINS;
    this.shipAttack = INITIAL_STAT_SHIP_ATTACK;
    this.shipSpeedShot = INITIAL_STAT_SHOT_SPEED;
    this.shipLevel = INITIAL_SHIP_LEVEL;
    this.upgradeCost = INITIAL_UPGRADE_COST;
}

Stats.prototype.isAttackMax =
function()
{
    return this.shipAttack >= MAX_ATTACK;
}