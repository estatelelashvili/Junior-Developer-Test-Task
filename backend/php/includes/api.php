<?php

require_once 'products/dvd.php';
require_once 'products/book.php';
require_once 'products/furniture.php';
require_once 'product_factory.php';

class Api {
    private $conn;

    public function __construct($conn) {
        $this->conn = $conn;
    }

    protected function getQueryResults() {
        $json_data = file_get_contents(__DIR__ . '/connection/MYSQL_QUERY.json');
        $sql_query = json_decode($json_data)->query;
        $result = $this->conn->query($sql_query);

        if (!$result) {
            http_response_code(500);
            echo json_encode(array('error' => 'Database error: ' . $this->conn->error));
            exit();
        }

        return $result;
    }

    public function getAllProducts() {
        $factory = new ProductFactory();
        $results = $this->getQueryResults();
        $data = array();
        while ($row = $results->fetch_assoc()) {
            $product = $factory->createProduct($row['product_type'], $this->conn);
            $product->setProductId($row['product_id']);
            $product->setSku($row['sku']);
            $product->setName($row['name']);
            $product->setPrice($row['price']);
            $product->setProductType($row['product_type']);
            $product->setAttribute($row['attribute']);
            $data[] = $product->toObject();
        }

        if (empty($data)) {
            http_response_code(404);
            echo json_encode(array('error' => 'No products found'));
            exit();
        }
        header('Content-Type: application/json');
        echo json_encode($data);
    }

    public function createProduct($data) {
        $factory = new ProductFactory();
        $product = $factory->createProduct($data['product_type'], $this->conn);
        $product->insertIntoTable($data);
    }

    public function deleteProduct($productId, $productType) {
        $factory = new ProductFactory();
        $product = $factory->createProduct($productType, $this->conn);
        $product->deleteProduct($productId, $productType);
    }
}