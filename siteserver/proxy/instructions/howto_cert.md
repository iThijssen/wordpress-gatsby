# Get a Let's Encrypt certificate within Docker

In docker-compose, the cert-volume has to be shared with the host:

```dockercompose
    volumes:
      - ./siteserver/proxy/srv_data/cert:/etc/nginx/cert
```

You will need to open 2 shells.

Replace:
- *nsp.ivanne.de* with your domain
- `~/nsp` with the name of your repository
- the challenge-url (filename) and the long string (file content) with the ones you get prompted by certbot
- the stack-name with the one you set (e.g. `-p main-stack` instead of `-p cert-stack`)

---

#### Be careful

- Do not press Enter too early. Following error can occur:
> There were too many requests of a given type :: Error creating new order :: 
> too many certificates (5) already issued for this exact set of domains 
> in the last 168 hours: nsp.ivanne.de: see https://letsencrypt.org/docs/rate-limits/
- Backup
- Do not transport the private key over the internet. Keep it secret!

---

Open the first shell:

```shell
cd ~/nsp
sudo docker-compose -p cert-stack up --build -d
sudo docker-compose -p cert-stack exec website bash
```

Open the second shell:

```shell
cd ~/nsp
sudo docker-compose -p cert-stack exec website bash
```

In the first shell:

```shell
certbot certonly --manual -d nsp.ivanne.de
```

In the second shell:

```shell
mkdir -p /var/www/certbot/.well-known/acme-challenge/
chown -R www-data:www-data /var/www/certbot/
apt install nano
nano /var/www/certbot/.well-known/acme-challenge/vP-ZJ6XSNQ650QI_87AdkBLNtS4ZWiKdVAq7FG0aFxg
```

Paste the long string.
It should look like 
`wA0cgGUEhfzLoCXMTFA2-LwC5Rm7InRoP8pbe5EVCiI.qNXvZIhn_B8AX4xDIrUvfpolR2cr_wL7qpQ3uOHnDaY`.

```shell
nano /etc/nginx/sites-enabled/default
```

Make sure you have this location:

```
    location /.well-known/acme-challenge {
        default_type "text/plain";
        root /var/www/certbot;
    }
```

Optional:

```shell
service nginx restart
```

In the browser, verify:
http://nsp.ivanne.de/.well-known/acme-challenge/vP-ZJ6XSNQ650QI_87AdkBLNtS4ZWiKdVAq7FG0aFxg

In the first shell, `Press Enter to Continue` and check the cert-files:

```shell
ls -lathr /etc/letsencrypt/live/nsp.ivanne.de/
```

Output:

```
total 12K
lrwxrwxrwx 1 root root   40 Dec 24 06:42 privkey.pem -> ../../archive/nsp.ivanne.de/privkey1.pem
lrwxrwxrwx 1 root root   42 Dec 24 06:42 fullchain.pem -> ../../archive/nsp.ivanne.de/fullchain1.pem
lrwxrwxrwx 1 root root   38 Dec 24 06:42 chain.pem -> ../../archive/nsp.ivanne.de/chain1.pem
lrwxrwxrwx 1 root root   37 Dec 24 06:42 cert.pem -> ../../archive/nsp.ivanne.de/cert1.pem
-rw-r--r-- 1 root root  692 Dec 24 06:42 README
drwx------ 3 root root 4.0K Dec 24 06:42 ..
drwxr-xr-x 2 root root 4.0K Dec 24 06:42 .
```

Copy the keys:

```shell
mkdir -p /etc/nginx/cert
cp /etc/letsencrypt/live/nsp.ivanne.de/* /etc/nginx/cert/
# verify
ls -lathr /etc/nginx/cert/
```

---

Config-example forcing HTTPS traffic:

```
server {
    listen 443 ssl;
    ssl_certificate /etc/nginx/cert/fullchain.pem;
    ssl_certificate_key /etc/nginx/cert/privkey.pem;
    error_page 497 https://$host$request_uri;
    error_page 404 /404.html;
    
    location / {
        root /var/www;
    }
}

server {
    listen 80;
    return 301 https://$host$request_uri;
}
```

---

## Limitation

This is done manually. Not sure how to automate renewal.