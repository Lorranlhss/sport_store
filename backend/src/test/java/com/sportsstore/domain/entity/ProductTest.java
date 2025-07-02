package com.sportsstore.domain.entity;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

class ProductTest {

    @Test
    @DisplayName("Should create product with valid data")
    void shouldCreateProductWithValidData() {
        // Given
        Product product = new Product.Builder()
                .name("Nike Air Max")
                .description("Running shoes")
                .price(new BigDecimal("299.99"))
                .stockQuantity(50)
                .sku("NAM-001")
                .brand("Nike")
                .categories(Arrays.asList("Shoes", "Running"))
                .build();

        // Then
        assertNotNull(product);
        assertEquals("Nike Air Max", product.getName());
        assertEquals(new BigDecimal("299.99"), product.getPrice());
        assertEquals(50, product.getStockQuantity());
        assertTrue(product.isActive());
        assertTrue(product.isInStock());
    }

    @Test
    @DisplayName("Should throw exception when creating product with invalid data")
    void shouldThrowExceptionWhenCreatingProductWithInvalidData() {
        assertThrows(IllegalArgumentException.class, () -> {
            new Product.Builder()
                    .name("") // Invalid: empty name
                    .price(new BigDecimal("299.99"))
                    .stockQuantity(50)
                    .sku("NAM-001")
                    .build();
        });

        assertThrows(IllegalArgumentException.class, () -> {
            new Product.Builder()
                    .name("Nike Air Max")
                    .price(new BigDecimal("-10")) // Invalid: negative price
                    .stockQuantity(50)
                    .sku("NAM-001")
                    .build();
        });
    }

    @Test
    @DisplayName("Should calculate discount percentage correctly")
    void shouldCalculateDiscountPercentageCorrectly() {
        // Given
        Product product = new Product.Builder()
                .name("Nike Air Max")
                .price(new BigDecimal("200.00"))
                .originalPrice(new BigDecimal("250.00"))
                .stockQuantity(50)
                .sku("NAM-001")
                .build();

        // When
        BigDecimal discountPercentage = product.getDiscountPercentage();

        // Then
        assertEquals(new BigDecimal("20.00"), discountPercentage);
    }

    @Test
    @DisplayName("Should update price correctly")
    void shouldUpdatePriceCorrectly() {
        // Given
        Product product = new Product.Builder()
                .name("Nike Air Max")
                .price(new BigDecimal("299.99"))
                .stockQuantity(50)
                .sku("NAM-001")
                .build();

        // When
        product.updatePrice(new BigDecimal("249.99"));

        // Then
        assertEquals(new BigDecimal("249.99"), product.getPrice());
        assertEquals(new BigDecimal("299.99"), product.getOriginalPrice());
    }

    @Test
    @DisplayName("Should decrement stock correctly")
    void shouldDecrementStockCorrectly() {
        // Given
        Product product = new Product.Builder()
                .name("Nike Air Max")
                .price(new BigDecimal("299.99"))
                .stockQuantity(50)
                .sku("NAM-001")
                .build();

        // When
        product.decrementStock(10);

        // Then
        assertEquals(40, product.getStockQuantity());
    }

    @Test
    @DisplayName("Should throw exception when decrementing stock with insufficient quantity")
    void shouldThrowExceptionWhenDecrementingStockWithInsufficientQuantity() {
        // Given
        Product product = new Product.Builder()
                .name("Nike Air Max")
                .price(new BigDecimal("299.99"))
                .stockQuantity(5)
                .sku("NAM-001")
                .build();

        // Then
        assertThrows(IllegalStateException.class, () -> product.decrementStock(10));
    }
}