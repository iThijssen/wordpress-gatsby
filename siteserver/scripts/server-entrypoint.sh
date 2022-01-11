#!/bin/bash

# Debug
# touch /var/www/info.php && echo "<?php phpinfo();" > /var/www/info.php
# WP_CONF=/var/www/html/wp-config.php
# echo "define( 'FS_METHOD', 'direct' ); // Should fix 'WordPress needs to access your web server.'" >> $WP_CONF

# Install dependencies and build
cd /home/site/ && npm install && npm run build

# Enable PHP-FPM
service nginx restart
service php7.4-fpm start

# Start scheduler
cron -f
