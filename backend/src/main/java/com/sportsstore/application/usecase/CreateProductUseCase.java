package com.sportsstore.application.usecase;

import com.sportsstore.application.port.in.CreateProductCommand;
import com.sportsstore.application.port.out.ProductRepositoryPort;
import com.sportsstore.domain.entity.Product;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CreateProductUseCase {

    private final ProductRepositoryPort productRepository;

    public CreateProductUseCase(ProductRepositoryPort productRepository) {
        this.productRepository = productRepository;
    }

    public Product execute(CreateProductCommand command) {
        // Business rule: Check if SKU already exists
        if (productRepository.existsBySku(command.getSku())) {
            throw new IllegalArgumentException("Product with SKU " + command.getSku() + " already exists");
        }

        Product product = new Product.Builder()
                .name(command.getName())
                .description(command.getDescription())
                .price(command.getPrice())
                .originalPrice(command.getOriginalPrice())
                .stockQuantity(command.getStockQuantity())
                .sku(command.getSku())
                .brand(command.getBrand())
                .categories(command.getCategories())
                .images(command.getImages())
                .active(true)
                .build();

        return productRepository.save(product);
    }
}