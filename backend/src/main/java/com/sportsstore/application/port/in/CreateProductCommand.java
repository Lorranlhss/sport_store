package com.sportsstore.application.port.in;

import java.math.BigDecimal;
import java.util.List;

public class CreateProductCommand {
    private final String name;
    private final String description;
    private final BigDecimal price;
    private final BigDecimal originalPrice;
    private final Integer stockQuantity;
    private final String sku;
    private final String brand;
    private final List<String> categories;
    private final List<String> images;

    public CreateProductCommand(String name, String description, BigDecimal price,
                                BigDecimal originalPrice, Integer stockQuantity,
                                String sku, String brand, List<String> categories,
                                List<String> images) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.originalPrice = originalPrice;
        this.stockQuantity = stockQuantity;
        this.sku = sku;
        this.brand = brand;
        this.categories = categories;
        this.images = images;
    }

    // Getters
    public String getName() { return name; }
    public String getDescription() { return description; }
    public BigDecimal getPrice() { return price; }
    public BigDecimal getOriginalPrice() { return originalPrice; }
    public Integer getStockQuantity() { return stockQuantity; }
    public String getSku() { return sku; }
    public String getBrand() { return brand; }
    public List<String> getCategories() { return categories; }
    public List<String> getImages() { return images; }
}