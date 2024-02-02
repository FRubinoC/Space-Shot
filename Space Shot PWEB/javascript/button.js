function addLife()
{
    game1.addLife();
}

function upgradeAttack()
{
    game1.upgradeAttack();
}

function upgradeSpeed()
{
    game1.upgradeSpeed();
}

function pauseButton()
{
    game1.pauseButton();
}

Game.prototype.addLife =
function()
{
    if (this.stats.coins < LIFE_COST) return;
    this.stats.coins -= LIFE_COST;
    this.sketcher.drawCoins(this.stats.coins);
    this.stats.life++;
    this.sketcher.drawLife(this.stats.life);
}

Game.prototype.upgradeAttack =
function()
{
    if (this.stats.coins < this.stats.upgradeCost || this.stats.isAttackMax()) return;
    this.upgradeSound();
    this.stats.upgradeAttack();
    this.sketcher.drawCoins(this.stats.coins);
    this.sketcher.drawCost(this.stats.upgradeCost);
    if (this.stats.shipAttack >= MAX_ATTACK) this.sketcher.drawMaxAttack();
    else this.sketcher.drawAttack(this.stats.shipAttack);
}

Game.prototype.upgradeSpeed =
function()
{
    if (this.stats.coins < this.stats.upgradeCost || this.gameState.isSpeedMax()) return;
    this.upgradeSound();
    this.stats.upgradeSpeed();
    this.gameState.upgradeSpeed();
    this.sketcher.drawCoins(this.stats.coins);
    this.sketcher.drawCost(this.stats.upgradeCost);
    if (this.gameState.isSpeedMax()) this.sketcher.drawMaxSpeed();
    else this.sketcher.drawSpeed(this.stats.shipSpeedShot);
}