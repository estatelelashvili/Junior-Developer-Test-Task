<?php

require_once 'product.php';

class Book extends Product
{
    protected $weightKg;
    
    public function __construct($conn)
    {
        parent::__construct($conn);
    }
    
    public function getAttribute()
    {
        return $this->weightKg;
    }
    
    public function setAttribute($weight)
    {
        $this->weightKg = $weight;
    }
    
    public function toObject()
    {
        $obj = new stdClass();
        $obj->product_id = $this->getProductId();
        $obj->sku = $this->getSku();
        $obj->name = $this->getName();
        $obj->price = $this->getPrice();
        $obj->product_type = $this->getProductType();
        $obj->weight = $this->getAttribute();
        return $obj;
    }    
    
    private function composeInsertQueryBook($data)
    {
        $productId = $this->insertIntoProducts($data);
        $sql = "INSERT INTO book (product_id, weight_kg) 
        VALUES ('$productId', '$this->weightKg')";
        return $sql;
    }
    
    private function setBookAttribute($data)
    {
        $this->setAttribute($data['attribute']['weight']);
    }
    
    public function insertIntoTable($data)
    {
        $this->setBookAttribute($data);
        $sql = $this->composeInsertQueryBook($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}