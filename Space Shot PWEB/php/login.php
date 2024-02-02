<?php
    require_once "./session.php";
    require_once "./spaceShotDbManager.php";

    $username = $_POST['usernameLogin'];
    $password = $_POST['passwordLogin'];

    function login($username, $password)
    {
        if ($username != null && $password != null)
        {
            $IDutente = controlla($username, $password);
            if ($IDutente > 0)
            {
                session_start();
                setSession($IDutente, $username);
                return "noError";
            }
            else return "username e/o password errati. Riprova!";
        }
        else return "Dati mancanti!";
    }

    function controlla($username, $password)
    {
        global $spaceShotDB;
        $username = $spaceShotDB->SqlInjectionFilter($username);
        $password = $spaceShotDB->SqlInjectionFilter($password);
        $query = "select * from account where username = '" . $username . "' and password = '" . $password . "'";
        $result = $spaceShotDB->resolveQuery($query);
        $numberRow = mysqli_num_rows($result);
        if ($numberRow != 1) return -1;
        else 
        {
            $targetRow = $result->fetch_assoc();
            $spaceShotDB->closeConnection();
            return $targetRow["IDUtente"];
        }
    }

    $error = login($username, $password);
    if ($error === "noError") header ('Location: ./../home.php');
    else header ('Location: ./../index.php?errorLogin=' . $error);
?>