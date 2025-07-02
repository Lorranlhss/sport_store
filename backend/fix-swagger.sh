#!/bin/bash

echo "🔧 Corrigindo erro do Swagger..."

# Opção 1: Remover anotações Swagger
echo "Removendo anotações Swagger do ProductController..."
sed -i '/import io.swagger/d' src/main/java/com/sportsstore/infrastructure/web/controller/ProductController.java
sed -i '/@Tag/d' src/main/java/com/sportsstore/infrastructure/web/controller/ProductController.java
sed -i '/@Operation/d' src/main/java/com/sportsstore/infrastructure/web/controller/ProductController.java

echo "✅ Anotações removidas!"

# Compilar novamente
echo "🔨 Compilando..."
mvn clean compile

echo "🚀 Iniciando aplicação..."
mvn spring-boot:run
