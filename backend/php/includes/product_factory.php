<?php

class ProductFactory {
    public function createProduct($productType, $conn) {
        $productClassName = ucfirst($productType);
        return new $productClassName($conn);
    }
}