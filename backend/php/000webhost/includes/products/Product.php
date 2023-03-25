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
    
    public function get_product_id() {
        return $this->product_id;
    }
    
    public function set_product_id($id) {
        $this->product_id = $id;
    }
    
    public function get_sku() {
        return $this->sku;
    }
    
    public function set_sku($sku) {
        $this->sku = $sku;
    }

    public function get_name() {
        return $this->name;
    }
    
    public function set_name($name) {
        $this->name = $name;
    }
    
    public function get_price() {
        return $this->price;
    }
    
    public function set_price($price) {
        $this->price = $price;
    }
    
    public function get_product_type() {
        return $this->product_type;
    }
    
    public function set_product_type($product_type) {
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
    
    private function set_common_attrbutes($data){
       $this->set_sku($data['sku']);
       $this->set_name($data['name']);
       $this->set_price($data['price']);
       $this->set_product_type($data['product_type']);

    }
    
    private function compose_insert_query(){
        $sql = "INSERT INTO products (sku, name, price, product_type) 
        VALUES ('$this->sku', '$this->name', '$this->price', '$this->product_type')";
        return $sql;
    }
    
    public function insert_into_products($data){
        $this->set_common_attrbutes($data);
        $sql = $this->compose_insert_query();
        $result = $this->conn->query($sql);
        $this->handleError500($result);
        $product_id = $this->conn->insert_id;
        return $product_id;
    }
    
    // private function delete_from_products($product_id){
    //     $sql = "DELETE FROM products WHERE id=$product_id";
    //     $result = $this->conn->query($sql);
    //     $this->handleError500($result);
    // }
    
    private function delete_from_products($product_id){
        $sql = "DELETE FROM products WHERE product_id=$product_id";
        $result = $this->conn->query($sql);
        if (!$result) {
            // Add some error handling here, for example:
            $error_message = $this->conn->error;
            http_response_code(500);
            echo "Error: " . $error_message;
            exit;
        }
}

    
    // private function delete_from_specific_table($product_id, $product_type){
    //     $sql = "DELETE FROM $product_type WHERE id=$product_id";
    //     $result = $this->conn->query($sql);
    //     $this->handleError500($result);
    // }
    
    private function delete_from_specific_table($product_id, $product_type){
    $sql = "DELETE FROM $product_type WHERE product_id=$product_id";
    $result = $this->conn->query($sql);
    if (!$result) {
        // Add some error handling here, for example:
        $error_message = $this->conn->error;
        http_response_code(500);
        echo "Error: " . $error_message;
        exit;
    }
}

    
    public function delete_product($product_id, $product_type){
        $this->delete_from_specific_table($product_id, $product_type);
        $this->delete_from_products($product_id);
    }
}

?>