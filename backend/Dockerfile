# Usar una imagen base oficial de PHP con Apache
FROM php:8.2-apache

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libicu-dev libxml2-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd zip pdo pdo_mysql intl xml opcache

# Habilitar mod_rewrite de Apache
RUN a2enmod rewrite

# Copiar el código de la aplicación al contenedor
COPY . /var/www/html/

# Configurar el directorio de trabajo
WORKDIR /var/www/html

# Instalar Composer (si no está instalado en el contenedor)
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Exponer el puerto 80
EXPOSE 80
