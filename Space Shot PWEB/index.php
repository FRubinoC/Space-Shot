<?php
    session_start();
    include "./php/session.php";
    if (isLogged())
    {
        header('Location: ./home.php');
        exit;
    }
?>
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
    <meta name="author" content="Francesco Rubino">
    <link rel="stylesheet" href="./css/indexScreen.css" type="text/css" media="screen">
    <link rel="stylesheet" href="./css/decorationScreen.css" type="text/css" media="screen">
    <title>Login Space Shot</title>
</head>
<body>
    <div id="Titolo">
    <h1>Space Shot</h1>
    </div>
    <form id="loginForm" action="./php/login.php" method="post">
    <div>
        <h2>Username</h2>
        <input type="text" placeholder="Username" name="usernameLogin" required>
    </div>
    <div>
        <h2>Password</h2>
        <input type="text" placeholder="Password" name="passwordLogin" required>
    </div>
    <input type="submit" value="Entra">
    <?php
        if (isset($_GET['errorLogin']))
        {
			echo '<div id="erroreLogin">';
			echo '<span>' . $_GET['errorLogin'] . '</span>';
			echo '</div>';
		}
	?>
    </form>
    <div id="intermezzo">
        <span>Se non sei ancora registrato puoi farlo qui sotto!</span>
    </div>
    <form id="registrationForm" action="./php/registration.php" method="post">
    <div>
        <h2>Username</h2>
        <input type="text" placeholder="Username" name="usernameRegistration" required>
    </div>
    <div>
        <h2>Password</h2>
        <input type="text" placeholder="Password" name="passwordRegistration" required>
    </div>
    <input type="submit" value="Registrati">
    <?php
        if (isset($_GET['message']))
        {
            if ($_GET['message'] === "noError")
            {
			    echo '<div id="regComplete">';
			    echo '<span>Registrazione avvenuta con successo!</span>';
			    echo '</div>';
            }
            else 
            {
                echo '<div id="errorReg">';
			    echo '<span>' . $_GET["message"] . '</span>';
			    echo '</div>';
            }
        }
	?>
    </form>
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