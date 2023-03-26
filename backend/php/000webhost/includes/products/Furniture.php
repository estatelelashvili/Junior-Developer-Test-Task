<?php

require_once 'product.php';

class Furniture extends Product 
{
    protected $dimensions;
    protected $widthCm;
    protected $heightCm;
    protected $lengthCm;
    
    public function __construct($conn) 
    {
        parent::__construct($conn);
    }
    
    public function getAttribute() 
    {
        return $this->dimensions;
    }
    
    public function setAttribute($xyz) 
    {
        $this->dimensions = $xyz;
    }
    
    public function getWidth() 
    {
        return $this->dimensions['width'];
    }
    
    public function setWidth($x) 
    {
        $this->dimensions['width'] = $x;
    }
    
    public function getHeight() 
    {
        return $this->dimensions['height'];
    }
    
    public function setHeight($y) 
    {
        $this->dimensions['height'] = $y;
    }
    
    public function getLength() 
    {
        return $this->dimensions['length'];
    }
    
    public function setLength($z) 
    {
        $this->dimensions['length'] = $z;
    }
    
    public function setWidthCm($width) 
    {
        $this->widthCm = $width;
    }
    
    public function setHeightCm($height) 
    {
        $this->heightCm = $height;
    }
    
    public function setLengthCm($length) 
    {
        $this->lengthCm = $length;
    }

    
    public function toObject() 
    {
        $obj = new stdClass();
        $obj->productId = $this->getProductId();
        $obj->sku = $this->getSku();
        $obj->name = $this->getName();
        $obj->price = $this->getPrice();
        $obj->productType = $this->getProductType();
        $obj->dimension = $this->getAttribute();
        return $obj;
    }     
    
    private function composeInsertQueryFurniture($data)
    {
        $productId = $this->insertIntoProducts($data);
        $sql = "INSERT INTO furniture (product_id, width_cm, height_cm, length_cm) 
        VALUES ('$productId', 
            '$this->widthCm', 
            '$this->heightCm', 
            '$this->lengthCm')";
        return $sql;
    }
    

    
    private function setFurnitureAttrbutes($data)
    {
        $this->setWidthCm($data['attribute']['width']);
        $this->setHeightCm($data['attribute']['height']);
        $this->setLengthCm($data['attribute']['length']);
    }
    
    public function insertIntoTable($data)
    {
        $this->setFurnitureAttrbutes($data);
        $sql = $this->composeInsertQueryFurniture($data);
        $result = $this->conn->query($sql);
        $this->handleError500($result);
    }
}