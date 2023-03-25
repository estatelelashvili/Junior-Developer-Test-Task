<?php
    class ProductFactory {
        public function create_product($product_type, $conn) {
            $productClassName = ucfirst($product_type);
            return new $productClassName($conn);
        }
    }
 ?>