<?php

class DbConnect{
    private $host = "localhost";
    private $username = "id20372848_estate";
    private $password = "#TRYharderfish2019";
    private $database = "id20372848_db_products";
    public $conn;
    
    public function __construct() {
        $this->conn = new mysqli($this->host, $this->username, $this->password, $this->database);
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
    
    public function getConnection() {
        return $this->conn;
    }    
}