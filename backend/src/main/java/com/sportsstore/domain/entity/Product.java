package com.sportsstore.domain.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Product {
    private final String id;
    private String name;
    private String description;
    private BigDecimal price;
    private BigDecimal originalPrice;
    private Integer stockQuantity;
    private String sku;
    private boolean active;
    private final List<String> images;
    private final List<String> categories;
    private String brand;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // Constructor following Builder pattern
   private Product(Builder builder) {
        this.id = builder.id != null ? builder.id : UUID.randomUUID().toString();
        this.name = builder.name;
        this.description = builder.description;
        this.price = builder.price;
        this.originalPrice = builder.originalPrice;
        this.stockQuantity = builder.stockQuantity;
        this.sku = builder.sku;
        this.active = builder.active;
        this.images = new ArrayList<>(builder.images);
        this.categories = new ArrayList<>(builder.categories);
        this.brand = builder.brand;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Business logic methods
    public void updatePrice(BigDecimal newPrice) {
        if (newPrice == null || newPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero");
        }
        this.originalPrice = this.price;
        this.price = newPrice;
        this.updatedAt = LocalDateTime.now();
    }

    public void decrementStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        if (this.stockQuantity < quantity) {
            throw new IllegalStateException("Insufficient stock");
        }
        this.stockQuantity -= quantity;
        this.updatedAt = LocalDateTime.now();
    }

    public void incrementStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be positive");
        }
        this.stockQuantity += quantity;
        this.updatedAt = LocalDateTime.now();
    }

    public boolean isInStock() {
        return this.stockQuantity > 0 && this.active;
    }

    public BigDecimal getDiscountPercentage() {
        if (originalPrice == null || originalPrice.compareTo(price) <= 0) {
            return BigDecimal.ZERO;
        }
        return originalPrice.subtract(price)
                .divide(originalPrice, 2, BigDecimal.ROUND_HALF_UP)
                .multiply(new BigDecimal("100"));
    }

    // Getters (no setters - immutability)
    public String getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public Integer getStockQuantity() { return stockQuantity; }
    public String getSku() { return sku; }
    public boolean isActive() { return active; }
    public List<String> getImages() { return new ArrayList<>(images); }
    public List<String> getCategories() { return new ArrayList<>(categories); }
    public String getBrand() { return brand; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Builder Pattern
    public static class Builder {
        private String id;
        private String name;
        private String description;
        private BigDecimal price;
        private BigDecimal originalPrice;
        private Integer stockQuantity;
        private String sku;
        private boolean active = true;
        private List<String> images = new ArrayList<>();
        private List<String> categories = new ArrayList<>();
        private String brand;

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder price(BigDecimal price) {
            this.price = price;
            return this;
        }

        public Builder originalPrice(BigDecimal originalPrice) {
            this.originalPrice = originalPrice;
            return this;
        }

        public Builder stockQuantity(Integer stockQuantity) {
            this.stockQuantity = stockQuantity;
            return this;
        }

        public Builder sku(String sku) {
            this.sku = sku;
            return this;
        }

        public Builder active(boolean active) {
            this.active = active;
            return this;
        }

        public Builder images(List<String> images) {
            this.images = images;
            return this;
        }

        public Builder categories(List<String> categories) {
            this.categories = categories;
            return this;
        }

        public Builder brand(String brand) {
            this.brand = brand;
            return this;
        }

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Product build() {
            validateProduct();
            return new Product(this);
        }

        private void validateProduct() {
            if (name == null || name.trim().isEmpty()) {
                throw new IllegalArgumentException("Product name is required");
            }
            if (price == null || price.compareTo(BigDecimal.ZERO) <= 0) {
                throw new IllegalArgumentException("Product price must be greater than zero");
            }
            if (stockQuantity == null || stockQuantity < 0) {
                throw new IllegalArgumentException("Stock quantity cannot be negative");
            }
            if (sku == null || sku.trim().isEmpty()) {
                throw new IllegalArgumentException("SKU is required");
            }
        }
    }
}