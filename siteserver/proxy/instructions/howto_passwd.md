# Generate ht credentials

#### to paste into htpasswd:

```shell
sudo sh -c "echo -n 'username:' >> /etc/nginx/htpasswd"
sudo sh -c "openssl passwd -apr1 >> /etc/nginx/htpasswd"
cat /etc/nginx/htpasswd
```

As soon as the website is ready for the public, simply comment out `auth_*`-lines in the NGINX-configs.