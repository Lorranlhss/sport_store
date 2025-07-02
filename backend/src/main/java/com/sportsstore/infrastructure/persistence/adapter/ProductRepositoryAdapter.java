package com.sportsstore.infrastructure.persistence.adapter;

import com.sportsstore.application.port.out.ProductRepositoryPort;
import com.sportsstore.domain.entity.Product;
import com.sportsstore.infrastructure.persistence.entity.ProductJpaEntity;
import com.sportsstore.infrastructure.persistence.mapper.ProductMapper;
import com.sportsstore.infrastructure.persistence.repository.ProductJpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class ProductRepositoryAdapter implements ProductRepositoryPort {

    private final ProductJpaRepository jpaRepository;
    private final ProductMapper mapper;

    public ProductRepositoryAdapter(ProductJpaRepository jpaRepository, ProductMapper mapper) {
        this.jpaRepository = jpaRepository;
        this.mapper = mapper;
    }

    @Override
    public Product save(Product product) {
        ProductJpaEntity entity = mapper.toJpaEntity(product);
        ProductJpaEntity savedEntity = jpaRepository.save(entity);
        return mapper.toDomainEntity(savedEntity);
    }

    @Override
    public Optional<Product> findById(String id) {
        return jpaRepository.findById(id)
                .map(mapper::toDomainEntity);
    }

    @Override
    public Optional<Product> findBySku(String sku) {
        return jpaRepository.findBySku(sku)
                .map(mapper::toDomainEntity);
    }

    @Override
    public Page<Product> findAll(Pageable pageable) {
        return jpaRepository.findByActiveTrue(pageable)
                .map(mapper::toDomainEntity);
    }

    @Override
    public Page<Product> findByCategory(String category, Pageable pageable) {
        return jpaRepository.findByCategory(category, pageable)
                .map(mapper::toDomainEntity);
    }

    @Override
    public Page<Product> findByBrand(String brand, Pageable pageable) {
        return jpaRepository.findByBrandAndActiveTrue(brand, pageable)
                .map(mapper::toDomainEntity);
    }

    @Override
    public Page<Product> search(String query, Pageable pageable) {
        return jpaRepository.search(query, pageable)
                .map(mapper::toDomainEntity);
    }

    @Override
    public void deleteById(String id) {
        jpaRepository.deleteById(id);
    }

    @Override
    public boolean existsBySku(String sku) {
        return jpaRepository.existsBySku(sku);
    }
}