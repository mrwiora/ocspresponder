# OCSP

X.509 Internet Public Key Infrastructure
[Online Certificate Status Protocol - OCSP](https://datatracker.ietf.org/doc/html/rfc6960)

This server enables you to respond to any client request for the current status of a certificate. It's the alternative to a complete CRL (certificate revocation list).
The basic idea is, that the client requests, if a certain certificate is still valid or revoked. In case the certificate serial number is known to the CA it will respond with an unkown state.

It's using the ocsp library (https://github.com/mwiora/ocsp).

Requirements:
- posession of the intermediate certificate

OCSP functionality has been successfully tested with:
- [openssl](README-openssl.md) (POST)  - good starting point to see the functionality
- [nginx](README-nginx.md) nginx (GET) - minimum requirement is nginx 1.19 - instructions included

while the following providers are currently supported
- memory (you defined the status of a certificate in the code)
- [pebble](README-pebble.md) (reference to the rest api directory)
- [stepca](README-stepca.md) (reference to the mysql database)

ToDo
---------------
- [ ] reimplementation with fastify
- [ ] moving issuer-certificate access to PKCS11 (HSM)