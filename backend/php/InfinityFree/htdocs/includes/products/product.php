<?php

abstract class Product {
    
    protected $product_id;
    protected $sku;
    protected $name;
    protected $price;
    protected $product_type;
    protected $conn;
    
    public function __construct($conn) {
        $this->conn = $conn;
    }
    
    public function getProductId() {
        return $this->product_id;
    }
    
    public function setProductId($id) {
        $this->product_id = $id;
    }
    
    public function getSku() {
        return $this->sku;
    }
    
    public function setSku($sku) {
        $this->sku = $sku;
    }

    public function getName() {
        return $this->name;
    }
    
    public function setName($name) {
        $this->name = $name;
    }
    
    public function getPrice() {
        return $this->price;
    }
    
    public function setPrice($price) {
        $this->price = $price;
    }
    
    public function getProductType() {
        return $this->product_type;
    }
    
    public function setProductType($product_type) {
        $this->product_type = $product_type;
    }
    
    public function handleError500($result){
        var_dump(http_response_code());
        if (!$result) {
            http_response_code(500);
            echo json_encode(array('error' => 'Database error: ' . $this->conn->error));
            exit();
        }
    }
    
    private function setCommonAttributes($data){
       $this->setSku($data['sku']);
       $this->setName($data['name']);
       $this->setPrice($data['price']);
       $this->setProductType($data['product_type']);
    }
    
    private function composeInsertQuery(){
        $sql = "INSERT INTO products (sku, name, price, product_type) 
        VALUES ('$this->sku', '$this->name', '$this->price', '$this->product_type')";
        return $sql;
    }
    
    public function insertIntoProducts($data){
        $this->setCommonAttributes($data);
        $sql = $this->composeInsertQuery();
        $result = $this->conn->query($sql);
        $this->handleError500($result);
        $product_id = $this->conn->insert_id;
        return $product_id;
    }
    
    private function deleteFromProducts($product_id){
        $sql = "DELETE FROM products WHERE product_id=$product_id";
        $result = $this->conn->query($sql);
        if (!$result) {
            $error_message = $this->conn->error;
            http_response_code(500);
            echo "Error: " . $error_message;
            exit;
        }
    }
    
    private function deleteFromSpecificTable($product_id, $product_type){
        $sql = "DELETE FROM $product_type WHERE product_id=$product_id";
        $result = $this->conn->query($sql);
        if (!$result) {
            $error_message = $this->conn->error;
            http_response_code(500);
            echo "Error: " . $error_message;
            exit;
        }
    }
    
    public function deleteProduct($product_id, $product_type){
        $this->deleteFromSpecificTable($product_id, $product_type);
        $this->deleteFromProducts($product_id);
    }
}