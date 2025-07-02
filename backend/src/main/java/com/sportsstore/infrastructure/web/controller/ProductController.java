package com.sportsstore.infrastructure.web.controller;

import com.sportsstore.application.usecase.CreateProductUseCase;
import com.sportsstore.application.usecase.GetProductsUseCase;
import com.sportsstore.infrastructure.web.dto.CreateProductRequest;
import com.sportsstore.infrastructure.web.dto.ProductDto;
import com.sportsstore.infrastructure.web.mapper.ProductDtoMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/v1/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final CreateProductUseCase createProductUseCase;
    private final GetProductsUseCase getProductsUseCase;
    private final ProductDtoMapper mapper;

    public ProductController(CreateProductUseCase createProductUseCase,
                             GetProductsUseCase getProductsUseCase,
                             ProductDtoMapper mapper) {
        this.createProductUseCase = createProductUseCase;
        this.getProductsUseCase = getProductsUseCase;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@Valid @RequestBody CreateProductRequest request) {
        var command = mapper.toCommand(request);
        var product = createProductUseCase.execute(command);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(product));
    }

    @GetMapping
    public ResponseEntity<Page<ProductDto>> getProducts(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        var products = getProductsUseCase.execute(pageable);
        var productDtos = products.map(mapper::toDto);
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<Page<ProductDto>> getProductsByCategory(
            @PathVariable String category,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        var products = getProductsUseCase.executeByCategory(category, pageable);
        var productDtos = products.map(mapper::toDto);
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("/brand/{brand}")
    public ResponseEntity<Page<ProductDto>> getProductsByBrand(
            @PathVariable String brand,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        var products = getProductsUseCase.executeByBrand(brand, pageable);
        var productDtos = products.map(mapper::toDto);
        return ResponseEntity.ok(productDtos);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<ProductDto>> searchProducts(
            @RequestParam String query,
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        var products = getProductsUseCase.executeSearch(query, pageable);
        var productDtos = products.map(mapper::toDto);
        return ResponseEntity.ok(productDtos);
    }
}