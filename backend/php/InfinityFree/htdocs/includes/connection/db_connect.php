<?php

class DbConnect
{
    private $host = "sql101.infinityfree.com";
    private $username = "if0_34425424";
    private $password = "xcWp9k0u6Wiz1Z";
    private $database = "if0_34425424_db_products";
    public $conn;

    public function __construct()
    {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    public function getConnection()
    {
        return $this->conn;
    }
}
