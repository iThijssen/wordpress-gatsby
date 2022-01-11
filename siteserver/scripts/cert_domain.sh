#!/bin/bash

# create or renew the certificate for the domain given as argument
# $1 is for example nsp.ivanne.de

date
echo "$1"
echo

certbot certonly -a standalone -d "$1" \
 --non-interactive --agree-tos -m admin@ivanne.de

cp /etc/letsencrypt/live/"$1"/privkey.pem /etc/nginx/cert/
cp /etc/letsencrypt/live/"$1"/fullchain.pem /etc/nginx/cert/
chmod +r /etc/nginx/cert/*
