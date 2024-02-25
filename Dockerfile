FROM mediawiki:1.39.6
LABEL Name=hive13mediawikidocker Version=0.0.1

EXPOSE 80 443

ENV COMPOSER_ALLOW_SUPERUSER=1

# Install some good tools
RUN apt-get update && apt-get install -y --no-install-recommends \
      libicu-dev \
      git \
      zip unzip \
      vim-tiny \
      netcat-traditional \
      net-tools \
    && docker-php-source extract


RUN docker-php-ext-install -j$(nproc) intl calendar 

# Get and install composer
WORKDIR /var/www/html
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer --2

COPY composer.local.json /var/www/html/composer.local.json

RUN cd /var/www/html/ \
&& composer config --no-plugins allow-plugins.composer/installers true \
 && composer require --update-no-dev 

# Copy all Local Files + LocalSettings.php from the host machine to the container
COPY ["LocalSettings.php", "/var/www/html/"]
COPY ["logo-greyscale.png", "/var/www/html/"]
COPY ["logo.png", "/var/www/html/"]
COPY ["robots.txt", "/var/www/html/"]
COPY LocalSettings.php /var/www/html/LocalSettings.php
COPY robots.txt /var/www/html/robots.txt

COPY ["./extensions/", "/var/www/html/extensions"]

# Add wait for script. The database needs to be up and running before the MediaWiki Container is brought up
RUN mkdir /var/www/html/Docker/scripts -p
COPY ["./Docker/scripts/wait-for.sh", "/var/www/html/Docker/scripts/"]
RUN chmod +x /var/www/html/Docker/scripts/wait-for.sh

# Needed for Widgets to work
RUN chmod 777 /var/www/html/extensions/Widgets/compiled_templates

# I don't think this stuff is really needed
WORKDIR /var/www/html
CMD ["apache2ctl", "-D", "FOREGROUND"]
