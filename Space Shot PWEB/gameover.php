<?php
    session_start();
    include "./php/session.php";
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
    <meta name = "author" content = "Francesco Rubino">
    <meta name = "keywords" content = "game, space">
    <link rel = "stylesheet" href = "./css/decorationScreen.css" type="text/css" media="screen">
    <link rel="shortcut icon" type="image/x-icon" href="./css/immagini/stars.png"/>
    <link rel = "stylesheet" href = "./css/gameoverScreen.css" type="text/css" media="screen">
    <title>Space Shot</title>
</head>
<body>
    <div id="gameOver"><h1>GAME OVER</h1></div>
    
    <?php
        require_once "./php/spaceShotDbManager.php";
        global $spaceShotDB;
        $spaceShotDB->SpaceShotDbManager();
        $query = "select bestScore from account where IDUtente = " . $_SESSION['userId'];
        $result = $spaceShotDB->resolveQuery($query);
        $score = $result->fetch_assoc();
        $spaceShotDB->closeConnection();
        if ($score['bestScore'] >= $_POST["newScore"])
            echo "<div id='message'><h2> Il tuo punteggio è " . $_POST["newScore"] . "</h2></div>";
        else
        {
            if (!isset($_SESSION)) session_start();
            $newScore = $_POST["newScore"];
            $spaceShotDB->SpaceShotDbManager();
            $query = "UPDATE account SET bestScore = " . $newScore . " WHERE IDUtente = " . $_SESSION["userId"];
            $spaceShotDB->resolveQuery($query)
                or $spaceShotDB->mySqliError();
            $spaceShotDB->closeConnection();
            echo "<div id='messageNewRecord'><h2> Nuovo Record! Il tuo punteggio è " . $newScore . "</h2></div>";
        }
    ?>
    
    <div id="options">
        <div id="resumeButton"><a href="game.php">Riprova</a></div>
        <div id="homeButton"><a href="home.php">Esci</a></div>
    </div>
    <div id="decoration">
        <div id="decorationShip"></div>
        <div id="decorationShot1"></div>
        <div id="decorationShot2"></div>
        <div id="decorationAlien1"></div>
        <div id="decorationShot3"></div>
        <div id="decorationShot4"></div>
        <div id="decorationShot5"></div>
        <div id="decorationExplosion1"></div>
        <div id="decorationAlien2"></div>
        <div id="decorationAlien3"></div>
        <div id="decorationAlien4"></div>
        <div id="decorationExplosion2"></div>
    </div>
    <audio id="gameoverSound" style="display: none" autoplay>
      <source src="sounds/gameover.wav" type="audio/wav">
      <source src="sounds/gameover.mp3" type="audio/mpeg">
    </audio>
</body>
</html>