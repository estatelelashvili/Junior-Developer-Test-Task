<?php

require_once 'Product.php';

class Furniture extends Product {
    protected $dimensions;
    protected $width_cm;
    protected $height_cm;
    protected $length_cm;
    
    public function __construct($conn) {
      parent::__construct($conn);
   }
    
    public function get_attribute() {
        return $this->dimensions;
    }
    
    public function set_attribute($xyz) {
        $this->dimensions = $xyz;
    }
    
    public function get_width() {
        return $this->dimensions['width'];
    }
    public function set_width($x) {
        $this->dimensions['width'] = $x;
    }
    
    public function get_height() {
        return $this->dimensions['height'];
    }
    
    public function set_height($y) {
        $this->dimensions['height'] = $y;
    }
    
    public function get_length() {
        return $this->dimensions['length'];
    }
    
    public function set_length($z) {
        $this->dimensions['length'] = $z;
    }
    
    public function set_width_cm($width) {
        $this->width_cm = $width;
    }
    
    public function set_height_cm($height) {
        $this->height_cm = $height;
    }
    
    public function set_length_cm($length) {
        $this->length_cm = $length;
    }

    
    public function to_object() {
        $obj = new stdClass();
        $obj->product_id = $this->get_product_id();
        $obj->sku = $this->get_sku();
        $obj->name = $this->get_name();
        $obj->price = $this->get_price();
        $obj->product_type = $this->get_product_type();
        $obj->dimensions = $this->get_attribute();
        return $obj;
    }     
    
    private function compose_insert_query_furniture($data){
        $product_id = $this->insert_into_products($data);
        $sql = "INSERT INTO furniture (product_id, width_cm, height_cm, length_cm) 
        VALUES ('$product_id', 
            '$this->width_cm', 
            '$this->height_cm', 
            '$this->length_cm')";
        return $sql;
    }
    

    
    private function set_furniture_attrbutes($data){
        $this->set_width_cm($data['attribute']['width']);
        $this->set_height_cm($data['attribute']['height']);
        $this->set_length_cm($data['attribute']['length']);
    }
    
    public function insert_into_table($data){
        $this->set_furniture_attrbutes($data);
        $sql = $this->compose_insert_query_furniture($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}

?>