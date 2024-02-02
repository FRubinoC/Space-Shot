<?php
    function setSession($IDUtente, $username)
    {
        $_SESSION['userId'] = $IDUtente;
        $_SESSION['username'] = $username;
    }
    function isLogged()
    {		
        if (isset($_SESSION['userId'])) return $_SESSION['userId'];
        else return false;
    }
?>