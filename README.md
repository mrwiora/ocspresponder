# OCSP

X.509 Internet Public Key Infrastructure
[Online Certificate Status Protocol - OCSP](https://datatracker.ietf.org/doc/html/rfc6960)

This server enables responding to any client's request regarding the current status of the certificate. It is an alternative to the complete CRL (Certificate Revocation List), which can become very large as more and more certificates are revoked by the CA. The basic idea is that the client requests information on whether a given certificate is still valid or revoked. In case the serial number of the certificate is unknown to the CA, it will respond with an unknown status.

This project is using the ocsp library (https://github.com/mrwiora/ocsp).

Requirements:
- posession of the intermediate certificate

OCSP functionality has been successfully tested with:
- [openssl](README-openssl.md) (POST)  - good starting point to see the functionality
- [nginx](README-nginx.md) (GET) - minimum requirement is nginx 1.19 - instructions included

Following providers are currently supported:
- memory (you define the status of a certificate in the code)
- [pebble](README-pebble.md) (reference to the rest api directory)
- [stepca](README-stepca.md) (reference to the mysql database)

Quickstart:
```
git clone https://github.com/mrwiora/ocspresponder.git
cd ocspresponder
# adjust config.json if necessary 
docker-compose up -d
```
you can now follow the test steps provided in [openssl](README-openssl.md)

ToDo
---------------
- [ ] reimplementation with fastify
- [ ] moving issuer-certificate access to PKCS11 (HSM)
