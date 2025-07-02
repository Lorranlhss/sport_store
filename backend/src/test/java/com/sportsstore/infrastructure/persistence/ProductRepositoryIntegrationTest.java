package com.sportsstore.infrastructure.persistence;

import com.sportsstore.domain.entity.Product;
import com.sportsstore.infrastructure.persistence.adapter.ProductRepositoryAdapter;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.math.BigDecimal;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
class ProductRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void properties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ProductRepositoryAdapter productRepository;

    @Test
    void shouldSaveAndFindProduct() {
        // Given
        Product product = new Product.Builder()
                .name("Test Product")
                .price(new BigDecimal("99.99"))
                .stockQuantity(10)
                .sku("TEST-001")
                .brand("Test Brand")
                .categories(Arrays.asList("Category1"))
                .build();

        // When
        Product saved = productRepository.save(product);

        // Then
        assertNotNull(saved.getId());

        // Find by ID
        var found = productRepository.findById(saved.getId());
        assertTrue(found.isPresent());
        assertEquals(saved.getName(), found.get().getName());
    }

    @Test
    void shouldFindProductsByCategory() {
        // Given
        String category = "Sports";
        Product product1 = createProduct("Product 1", "SKU-001", category);
        Product product2 = createProduct("Product 2", "SKU-002", category);
        Product product3 = createProduct("Product 3", "SKU-003", "Other");

        productRepository.save(product1);
        productRepository.save(product2);
        productRepository.save(product3);

        // When
        Page<Product> results = productRepository.findByCategory(
                category, PageRequest.of(0, 10)
        );

        // Then
        assertEquals(2, results.getTotalElements());
        assertTrue(results.getContent().stream()
                .allMatch(p -> p.getCategories().contains(category)));
    }

    private Product createProduct(String name, String sku, String category) {
        return new Product.Builder()
                .name(name)
                .price(new BigDecimal("99.99"))
                .stockQuantity(10)
                .sku(sku)
                .brand("Test Brand")
                .categories(Arrays.asList(category))
                .build();
    }
}