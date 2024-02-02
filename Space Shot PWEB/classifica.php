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
    <meta name="author" content="Francesco Rubino">
    <meta name="keywords" content="game, space">
    <link rel="shortcut icon" type="image/x-icon" href="./css/immagini/stars.png" />
    <link rel="stylesheet" href="./css/classificaScreen.css" type="text/css" media="screen">
    <title>Space Shot</title>
</head>
<body>
    <div id="classifica">
        <h1>Classifica</h1>
    </div>
    <table id="tabellaClassifica">
        <tr>
            <th>Username</th> <th>Score</th>
        </tr>
        <?php
            require_once "./php/spaceShotDbManager.php";
            global $spaceShotDB;
            $spaceShotDB->SpaceShotDbManager();
            $query = "select username, bestScore from account order by bestScore DESC limit 20";
            $result = $spaceShotDB->resolveQuery($query);
            $numRow = mysqli_num_rows($result);
            for ($i = 0; $i < $numRow; $i++)
            {
                $row = $result->fetch_assoc();
                echo "<tr><td>" . $row["username"] . "</td><td>" . $row["bestScore"] . "</td></tr>";
            }
            $spaceShotDB->closeConnection();
        ?>
    </table>
    <div id="homeButton">
        <a href="home.php">Home</a>
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
</body>
</html>