package com.sportsstore.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class HealthController {
    
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Sports Store API is running!");
        response.put("timestamp", new Date().toString());
        return response;
    }
    
    @GetMapping("/test")
    public Map<String, Object> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "API funcionando!");
        response.put("products", Arrays.asList("Tênis", "Camisa", "Shorts"));
        return response;
    }
}
