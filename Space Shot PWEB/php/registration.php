<?php
    require_once "./spaceShotDbManager.php";
    $username = $_POST['usernameRegistration'];
    $password = $_POST['passwordRegistration'];

    function registration($username, $password)
    {
        if ($username != null && $password != null)
        {
            $esito = inserisciProfilo($username, $password);
            if ($esito === true) return "noError";
            else return "Username già utilizzato, prova con un altro!";
        }
        else return "Dati mancanti!";
    }

    function inserisciProfilo($username, $password)
    {
        global $spaceShotDB;
        $username = $spaceShotDB->SqlInjectionFilter($username);
        $password = $spaceShotDB->SqlInjectionFilter($password);
        $query = "insert into account(username, password) values ('" . $username . "','" . $password . "')";
        $esito = $spaceShotDB->resolveQuery($query);
        return $esito;
    }
    $errorReg = registration($username, $password);
    header ('Location: ./../index.php?message=' . $errorReg);
?>