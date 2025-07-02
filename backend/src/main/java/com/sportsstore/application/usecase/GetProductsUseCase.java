package com.sportsstore.application.usecase;

import com.sportsstore.application.port.out.ProductRepositoryPort;
import com.sportsstore.domain.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class GetProductsUseCase {

    private final ProductRepositoryPort productRepository;

    public GetProductsUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public Page<Product> execute(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Page<Product> executeByCategory(String category, Pageable pageable) {
        return productRepository.findByCategory(category, pageable);
    }

    public Page<Product> executeByBrand(String brand, Pageable pageable) {
        return productRepository.findByBrand(brand, pageable);
    }

    public Page<Product> executeSearch(String query, Pageable pageable) {
        return productRepository.search(query, pageable);
    }
}