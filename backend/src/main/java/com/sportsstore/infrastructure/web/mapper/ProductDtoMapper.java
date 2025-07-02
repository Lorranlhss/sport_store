package com.sportsstore.infrastructure.web.mapper;

import com.sportsstore.application.port.in.CreateProductCommand;
import com.sportsstore.domain.entity.Product;
import com.sportsstore.infrastructure.web.dto.CreateProductRequest;
import com.sportsstore.infrastructure.web.dto.ProductDto;
import org.springframework.stereotype.Component;

@Component
public class ProductDtoMapper {

    public ProductDto toDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setOriginalPrice(product.getOriginalPrice());
        dto.setStockQuantity(product.getStockQuantity());
        dto.setSku(product.getSku());
        dto.setActive(product.isActive());
        dto.setImages(product.getImages());
        dto.setCategories(product.getCategories());
        dto.setBrand(product.getBrand());
        dto.setDiscountPercentage(product.getDiscountPercentage());
        dto.setInStock(product.isInStock());
        dto.setCreatedAt(product.getCreatedAt());
        dto.setUpdatedAt(product.getUpdatedAt());
        return dto;
    }

    public CreateProductCommand toCommand(CreateProductRequest request) {
        return new CreateProductCommand(
                request.getName(),
                request.getDescription(),
                request.getPrice(),
                request.getOriginalPrice(),
                request.getStockQuantity(),
                request.getSku(),
                request.getBrand(),
                request.getCategories(),
                request.getImages()
        );
    }
}