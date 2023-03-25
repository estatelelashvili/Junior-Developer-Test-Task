<?php

require_once 'Product.php';

class DVD extends Product{
    protected $size_mb;
    
    public function __construct($conn) {
      parent::__construct($conn);
   }
    
    public function get_attribute() {
        return $this->size_mb;
    }
    public function set_attribute($size) {
        $this->size_mb = $size;
    }
    
    public function to_object() {
        $obj = new stdClass();
        $obj->product_id = $this->get_product_id();
        $obj->sku = $this->get_sku();
        $obj->name = $this->get_name();
        $obj->price = $this->get_price();
        $obj->product_type = $this->get_product_type();
        $obj->size = $this->get_attribute();
        return $obj;
    }
    
    private function compose_insert_query_dvd($data){
        $product_id = $this->insert_into_products($data);
        $sql = "INSERT INTO dvd (product_id, size_mb) 
        VALUES ('$product_id', '$this->size_mb')";
        return $sql;
    }
    
    private function set_dvd_attrbute($data){
        $this->set_attribute($data['attribute']['size']);
    }
    
    public function insert_into_table($data){
        $this->set_dvd_attrbute($data);
        $sql = $this->compose_insert_query_dvd($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}

?>
