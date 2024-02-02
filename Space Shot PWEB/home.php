<?php
    session_start();
    include_once "./php/session.php";
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
    <link rel="shortcut icon" type="image/x-icon" href="./css/immagini/stars.png"/>
    <link rel = "stylesheet" href = "./css/homeScreen.css" type="text/css" media="screen">
    <link rel = "stylesheet" href = "./css/decorationScreen.css" type="text/css" media="screen">
    <title>Space Shot</title>
</head>
<body>
    <!-- Titolo del gioco -->
    <section id = "titolo">
        <h1> Space Shot </h1>
    </section>
    <div id="profile">
        <label id="nomeProfilo">
        <?php
            echo $_SESSION['username'];
        ?>
        </label>
        <br>
        <label id="score">
        <?php
            include_once "./php/spaceShotDbManager.php";
            global $spaceShotDB;
            $spaceShotDB->SpaceShotDbManager();
            $query = "select bestScore from account where IDUtente = '" . $_SESSION['userId'] . "'";
            $result = $spaceShotDB->resolveQuery($query);
            $score = $result->fetch_assoc();
            $spaceShotDB->closeConnection();
            echo $score['bestScore'];
        ?>
        </label>
        <br>
        <div id="contLogout">
            <a href="./php/logout.php" id="logoutButton">Logout</a>
        </div>
    </div>

    <!-- Lista opzioni -->
    <div id = "opzioni">
        <div class="list">
            <a href="game.php"> Nuovo Gioco </a>
        </div>
        <div class="list">
            <a href="classifica.php"> Classifica </a>
        </div>
        <div class="list">
            <a href="regolamento.html"> Regolamento </a>
        </div>
    </div>

    <!-- Decoration -->
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
    <audio id="bgm" style="display: none;" autoplay loop>
		<source src="sounds/bgnd_mus.mp3"  type="audio/mpeg">
	</audio>
</body>
</html>