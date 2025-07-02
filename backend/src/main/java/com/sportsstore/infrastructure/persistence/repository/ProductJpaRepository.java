package com.sportsstore.infrastructure.persistence.repository;

import com.sportsstore.infrastructure.persistence.entity.ProductJpaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductJpaRepository extends JpaRepository<ProductJpaEntity, String> {

    Optional<ProductJpaEntity> findBySku(String sku);

    boolean existsBySku(String sku);

    @Query("SELECT p FROM ProductJpaEntity p JOIN p.categories c WHERE c = :category AND p.active = true")
    Page<ProductJpaEntity> findByCategory(@Param("category") String category, Pageable pageable);

    Page<ProductJpaEntity> findByBrandAndActiveTrue(String brand, Pageable pageable);

    @Query("SELECT p FROM ProductJpaEntity p WHERE p.active = true AND " +
            "(LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%')))")
    Page<ProductJpaEntity> search(@Param("query") String query, Pageable pageable);

    Page<ProductJpaEntity> findByActiveTrue(Pageable pageable);
}