<?php

    require "dbVariables.php";

    class SpaceShotDbManager
    {
        private $mysqli_conn = null;

        function SpaceShotDbManager()
        {
            if ($this->mysqli_conn === null)
            {
                global $Hostname;
                global $Username;
                global $Password;
                global $Name;

                $this->mysqli_conn = new mysqli($Hostname, $Username, $Password);
                if ($this->mysqli_conn->connect_error)
                    die('Connect Error (' . $this->mysqli_conn->connect_errno . ') ' . $this->mysqli_conn->connect_error);
                $this->mysqli_conn->select_db($Name) or
                    die('Can\'t use database: ' . mysqli_error());
            }
        }

        function resolveQuery($query)
        {
            if ($this->mysqli_conn === null)
            $this->SpaceShotDbManager();

            return $this->mysqli_conn->query($query);
        }

        function SqlInjectionFilter($variabile)
        {
			if(!$this->mysqli_conn === null)
				$this->SpaceShotDBManager();
				
			return $this->mysqli_conn->real_escape_string($variabile);
        }
        
        function closeConnection()
        {
            if($this->mysqli_conn !== null)
            $this->mysqli_conn->close();
        
            $this->mysqli_conn = null;
        }

        function mySqliError()
        {
            die(mysqli_error($this->mysqli_conn));
        }
    }
    $spaceShotDB = new SpaceShotDbManager();
?>