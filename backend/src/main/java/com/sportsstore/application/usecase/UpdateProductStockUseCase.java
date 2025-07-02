package com.sportsstore.application.usecase;

import com.sportsstore.application.port.out.ProductRepositoryPort;
import com.sportsstore.domain.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UpdateProductStockUseCase {

    private final ProductRepositoryPort productRepository;

    public UpdateProductStockUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public Product decrementStock(String productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.decrementStock(quantity);

        return productRepository.save(product);
    }

    public Product incrementStock(String productId, int quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        product.incrementStock(quantity);

        return productRepository.save(product);
    }
}