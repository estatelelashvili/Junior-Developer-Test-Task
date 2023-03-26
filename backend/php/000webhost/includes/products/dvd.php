<?php

require_once 'product.php';

class DVD extends Product {
    protected $size_mb;
    
    public function __construct($conn) {
        parent::__construct($conn);
    }
    
    public function getAttribute() {
        return $this->size_mb;
    }
    
    public function setAttribute($size) {
        $this->size_mb = $size;
    }
    
    public function toObject() {
        $obj = new stdClass();
        $obj->product_id = $this->getProductId();
        $obj->sku = $this->getSku();
        $obj->name = $this->getName();
        $obj->price = $this->getPrice();
        $obj->product_type = $this->getProductType();
        $obj->size = $this->getAttribute();
        return $obj;
    }
    
    private function composeInsertQueryDVD($data){
        $productId = $this->insertIntoProducts($data);
        $sql = "INSERT INTO dvd (product_id, size_mb) 
        VALUES ('$productId', '$this->size_mb')";
        return $sql;
    }
    
    private function setDVDAttribute($data){
        $this->setAttribute($data['attribute']['size']);
    }
    
    public function insertIntoTable($data){
        $this->setDVDAttribute($data);
        $sql = $this->composeInsertQueryDVD($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}