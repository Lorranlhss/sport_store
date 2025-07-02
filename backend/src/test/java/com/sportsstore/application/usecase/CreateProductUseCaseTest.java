package com.sportsstore.application.usecase;

import com.sportsstore.application.port.in.CreateProductCommand;
import com.sportsstore.application.port.out.ProductRepositoryPort;
import com.sportsstore.domain.entity.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CreateProductUseCaseTest {

    @Mock
    private ProductRepositoryPort productRepository;

    private CreateProductUseCase createProductUseCase;

    @BeforeEach
    void setUp() {
        createProductUseCase = new CreateProductUseCase(productRepository);
    }

    @Test
    void shouldCreateProductSuccessfully() {
        // Given
        CreateProductCommand command = new CreateProductCommand(
                "Nike Air Max",
                "Running shoes",
                new BigDecimal("299.99"),
                null,
                50,
                "NAM-001",
                "Nike",
                Arrays.asList("Shoes", "Running"),
                Arrays.asList("image1.jpg", "image2.jpg")
        );

        Product expectedProduct = new Product.Builder()
                .id("123")
                .name(command.getName())
                .price(command.getPrice())
                .stockQuantity(command.getStockQuantity())
                .sku(command.getSku())
                .build();

        when(productRepository.existsBySku(command.getSku())).thenReturn(false);
        when(productRepository.save(any(Product.class))).thenReturn(expectedProduct);

        // When
        Product result = createProductUseCase.execute(command);

        // Then
        assertNotNull(result);
        assertEquals("123", result.getId());
        assertEquals(command.getName(), result.getName());
        verify(productRepository).existsBySku(command.getSku());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void shouldThrowExceptionWhenSkuAlreadyExists() {
        // Given
        CreateProductCommand command = new CreateProductCommand(
                "Nike Air Max",
                "Running shoes",
                new BigDecimal("299.99"),
                null,
                50,
                "NAM-001",
                "Nike",
                Arrays.asList("Shoes"),
                Arrays.asList("image1.jpg")
        );

        when(productRepository.existsBySku(command.getSku())).thenReturn(true);

        // When & Then
        assertThrows(IllegalArgumentException.class,
                () -> createProductUseCase.execute(command));

        verify(productRepository).existsBySku(command.getSku());
        verify(productRepository, never()).save(any(Product.class));
    }
}