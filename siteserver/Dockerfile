FROM ubuntu:focal

# either nginx.conf for http or nginx-no-sll.conf for https
ARG NGINX_CONF
# password for sending an e-mail in case of build-error
ARG SMTP_PW
# required parameter for publishing content-updates
ARG WEBHOOK_KEY

# software installation
RUN apt update -y && apt install -y certbot cron curl mutt nginx php7.4-fpm

# https://stackoverflow.com/questions/25899912/how-to-install-nvm-in-docker/60137919#60137919
#SHELL ["/bin/bash", "--login", "-i", "-c"]
#RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
#RUN source /root/.bashrc && nvm install 14 && nvm use 14
#SHELL ["/bin/bash", "--login", "-c"]
# The above is not working: still stuck at v10.

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt install -y nodejs
RUN apt install -y aptitude && aptitude install -y npm

# webserver (run `nginx -t` to debug)
RUN rm /etc/nginx/sites-enabled/default
COPY proxy/conf/$NGINX_CONF /etc/nginx/sites-enabled/default
# in case you want to use PHPMailer, you would need to pass this secret variable
RUN sed -i "s/SMTP_PW_FROM_ENV/$SMTP_PW/g" /etc/nginx/sites-enabled/default
COPY proxy/srv_data/* /etc/nginx/
# certbot
RUN mkdir -p /var/www/certbot/.well-known/acme-challenge/ && \
    chown -R www-data:www-data /var/www/certbot/

# automail
RUN mkdir -p /.mutt/cache && \
    echo 'set from = "test@ivanne.de"' > ~/.muttrc && \
    echo 'set smtp_url = "smtp://apikey@smtp.sendgrid.net:587/"' >> ~/.muttrc && \
    echo "set smtp_pass = \"$SMTP_PW\"" >> ~/.muttrc

# cron daemon
COPY scripts /home/scripts
COPY website-crontab /etc/cron.d/website-crontab
RUN chmod 0644 /etc/cron.d/website-crontab && \
    crontab /etc/cron.d/website-crontab
RUN chmod +x /home/scripts/*

# wordpress
RUN sed -i "s/WEBHOOK_KEY_FROM_ENV/$WEBHOOK_KEY/g" /home/scripts/webhook.php
RUN find /var/www/html/ -type d -exec chmod 755 {} \; && \
    find /var/www/html/ -type f -exec chmod 664 {} \; && \
    chown -Rv www-data:www-data /var/www/html/
# rebuild after publishing update
RUN cp /home/scripts/webhook.php /var/www/ && \
    chown -Rv www-data:www-data /var/www/webhook.php && \
    touch /home/build && chmod 666 /home/build

CMD ["bash", "/home/scripts/server-entrypoint.sh"]