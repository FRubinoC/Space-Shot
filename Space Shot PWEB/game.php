<?php
  session_start();
  require "./php/session.php";

  if (!isLogged())
  {
      header('Location: ./index.php');
      exit;
  }
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Francesco Rubino">
    <meta name="keywords" content="game, space">
    <link rel="shortcut icon" type="image/x-icon" href="./css/immagini/stars.png" />
    <link rel="stylesheet" href="./css/gameScreen.css" type="text/css" media="screen">
    <title>Space Shot</title>
    <script src="./javascript/game.js"></script>
    <script src="./javascript/playground.js"></script>
    <script src="./javascript/ship.js"></script>
    <script src="./javascript/shot.js"></script>
    <script src="./javascript/gameState.js"></script>
    <script src="./javascript/sketcher.js"></script>
    <script src="./javascript/alien.js"></script>
    <script src="./javascript/explosion.js"></script>
    <script src="./javascript/stats.js"></script>
    <script src="./javascript/button.js"></script>
    <script src="./javascript/popup.js"></script>
    <script src="./javascript/variables.js"></script>
    <script src="./javascript/sound.js"></script>
</head>
<body onLoad="begin()">
    <div id = "contenitore">
        <div id="stats">
            <div id="statsContent">
                <div class="statisticaVita">
                    <a id="vite" onClick="addLife()"></a>:
                    <span id="numeroVite">3</span>
                </div>
                <div class="statistica">
                    <div id="trophyImage"></div>:
                    <span id="score">0</span>
                </div>
                <div class="statistica">
                    <div id="coinImage1"></div>:
                    <span id="coins">0</span>
                </div>
                <div class="statPW">
                    <a id="attacco" onClick="upgradeAttack()"></a>:
                    <span>1</span>
                    <a id="velocita" onClick="upgradeSpeed()"></a>:
                    <span>1</span>
                    &nbsp; &nbsp; Cost: <span id="costo">500</span>   
                </div>
                <a id="pausa" onClick="createPausePopup()"></a>
            </div> 
        </div> 
        <div id="playground" style="width: 1500px; height: 640px; margin:0px auto;"></div>
    </div>
    <form id="updateBestScore" action="./gameover.php" method="post" style="display:none">
      <input type="number" id="inputScoreForm" name="newScore" required>
      <input type="submit" id="submitScore">
    </form>
    <audio id="explosionSound" style="display: none" controls>
      <source src="sounds/explosion.wav" type="audio/wav">
      <source src="sounds/explosion.mp3" type="audio/mp3">
    </audio>
    <audio id="levelupSound" style="display: none" controls>
      <source src="sounds/levelup.wav" type="audio/wav">
      <source src="sounds/levelup.mp3" type="audio/mpeg">
    </audio>
    <audio id="beginSound" style="display: none" controls>
      <source src="sounds/begin.wav" type="audio/wav">
      <source src="sounds/begin.mp3" type="audio/mpeg">
    </audio>
    <audio id="upgradeSound" style="display: none" controls>
      <source src="sounds/upgrade.wav" type="audio/wav">
      <source src="sounds/upgrade.mp3" type="audio/mpeg">
    </audio>
    <audio id="hitSound" style="display: none" controls>
      <source src="sounds/hit.wav" type="audio/wav">
      <source src="sounds/hit.mp3" type="audio/mpeg">
	  </audio>
  </body>
</html>