package com.sportsstore.infrastructure.persistence.mapper;

import com.sportsstore.domain.entity.Product;
import com.sportsstore.infrastructure.persistence.entity.ProductJpaEntity;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductJpaEntity toJpaEntity(Product product) {
        ProductJpaEntity entity = new ProductJpaEntity();
        entity.setId(product.getId());
        entity.setName(product.getName());
        entity.setDescription(product.getDescription());
        entity.setPrice(product.getPrice());
        entity.setOriginalPrice(product.getOriginalPrice());
        entity.setStockQuantity(product.getStockQuantity());
        entity.setSku(product.getSku());
        entity.setActive(product.isActive());
        entity.setImages(product.getImages());
        entity.setCategories(product.getCategories());
        entity.setBrand(product.getBrand());
        entity.setCreatedAt(product.getCreatedAt());
        entity.setUpdatedAt(product.getUpdatedAt());
        return entity;
    }

    public Product toDomainEntity(ProductJpaEntity entity) {
        return new Product.Builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .originalPrice(entity.getOriginalPrice())
                .stockQuantity(entity.getStockQuantity())
                .sku(entity.getSku())
                .active(entity.isActive())
                .images(entity.getImages())
                .categories(entity.getCategories())
                .brand(entity.getBrand())
                .build();
    }
}