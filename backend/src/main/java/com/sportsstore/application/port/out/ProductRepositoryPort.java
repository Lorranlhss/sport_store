package com.sportsstore.application.port.out;

import com.sportsstore.domain.entity.Product;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryPort {
    Product save(Product product);
    Optional<Product> findById(String id);
    Optional<Product> findBySku(String sku);
    Page<Product> findAll(Pageable pageable);
    Page<Product> findByCategory(String category, Pageable pageable);
    Page<Product> findByBrand(String brand, Pageable pageable);
    Page<Product> search(String query, Pageable pageable);
    void deleteById(String id);
    boolean existsBySku(String sku);
}