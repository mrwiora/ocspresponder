# NGINX

Tested with versions:
- 1.19-1.21 (minimum is 1.19)

necessary NGINX configuration:
```
server {

    listen 443 ssl;

    server_tokens off;

    ssl_client_certificate      /etc/nginx/trust.pem; # contains the root certificate of the CA to verify the OCSP response
    ssl_ocsp                    leaf;
    resolver                    8.8.8.8; # choose a DNS that can be used to resolve your OCSP host
    resolver_timeout            5s;
    ssl_verify_client           on;
    ssl_verify_depth            2;

    ssl_certificate           /etc/nginx/cert.pem;
    ssl_certificate_key       /etc/nginx/key.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers on;

    ssl_ecdh_curve secp384r1;

    ssl_session_cache shared:SSL:5m;
    ssl_session_timeout 5m;

    ssl_stapling on;
    ssl_stapling_verify on;

    access_log                  /var/log/nginx/access.log;
    error_log                   /var/log/nginx/error.log debug;

    location / {
      root /var/www/html;
    }

}
```