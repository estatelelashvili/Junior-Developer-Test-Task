<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'connection/db_connect.php';
require_once 'api.php';

class App {
    private $conn;
    private $api;

    public function __construct() {
        $db = new DbConnect();
        $this->conn = $db->getConnection();
        $this->api = new API($this->conn);
    }

    public function run() {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $data = json_decode(file_get_contents('php://input'), true);

            if (isset($data['_METHOD']) && $data['_METHOD'] === 'DELETE') {
                print_r($data);
                $this->api->deleteProduct($data['product_id'], $data['product_type']);
            } else {
                print_r($data);
                $this->api->createProduct($data);
            }
        } else {
            $this->api->getAllProducts();
        }
    }
}