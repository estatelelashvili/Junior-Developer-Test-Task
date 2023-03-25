<?php

require_once 'Product.php';

class Book extends Product{
    protected $weight_kg;
    
    public function __construct($conn) {
      parent::__construct($conn);
   }
    
    public function get_attribute() {
        return $this->weight_kg;
    }
    
    public function set_attribute($weight) {
        $this->weight_kg = $weight;
    }
    
    public function to_object() {
        $obj = new stdClass();
        $obj->product_id = $this->get_product_id();
        $obj->sku = $this->get_sku();
        $obj->name = $this->get_name();
        $obj->price = $this->get_price();
        $obj->product_type = $this->get_product_type();
        $obj->weight = $this->get_attribute();
        return $obj;
    }    
    
    private function compose_insert_query_book($data){
        $product_id = $this->insert_into_products($data);
        $sql = "INSERT INTO book (product_id, weight_kg) 
        VALUES ('$product_id', '$this->weight_kg')";
        return $sql;
    }
    
    private function set_book_attrbute($data){
        $this->set_attribute($data['attribute']['weight']);
    }
    
    public function insert_into_table($data){
        $this->set_book_attrbute($data);
        $sql = $this->compose_insert_query_book($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}

?>
