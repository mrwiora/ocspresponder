# Pebble

Tested with version [v.2.3.1](https://github.com/letsencrypt/pebble/releases/tag/v2.3.1)

Steps required:
- Setup Pebble CA with the required configuration change
- Request a Certificate (`certbot certonly -a manual -d test1.domain.tld --no-verify-ssl --server https://127.0.0.1:15000/dir --preferred-challenges dns`)
- Request another Certificate (`certbot certonly -a manual -d test2.domain.tld --no-verify-ssl --server https://127.0.0.1:15000/dir --preferred-challenges dns`)
- Revoke the second one (`certbot revoke --cert-path /etc/letsencrypt/live/test2.domain.tld/fullchain.pem --reason keycompromise --no-verify-ssl --server https://127.0.0.1:15000/dir`)

Necessary configuration change:
```bash
pebble-config.json # add ocspResponderURL, so in future certificates this information will be added
{
  "pebble": {
    "listenAddress": "0.0.0.0:14000",
    "managementListenAddress": "0.0.0.0:15000",
    "certificate": "test/certs/localhost/cert.pem",
    "privateKey": "test/certs/localhost/key.pem",
    "httpPort": 5002,
    "tlsPort": 5001,
    "ocspResponderURL": "http://{{ ocsp-responder-host }}:{{ optional port (not necessary when Port 80) }}",
    "externalAccountBindingRequired": false
  }
}
```

Pebble returns something like that for every issued certificate:
```
{
   "Status": "Valid",
   "Serial": "fb8f241b022616a",
   "Certificate": "-----BEGIN CERTIFICATE-----\nMIIDlDCCAnygAwIBAgIID7jyQbAiYWowDQYJKoZIhvcNAQELBQAwKDEmMCQGA1UE\nAxMdUGViYmxlIEludGVybWVkaWF0ZSBDQSAyOTI4ZDIwHhcNMjEwOTI3MTQwNDMz\nWhcNMjYwOTI3MTQwNDMzWjAbMRkwFwYDVQQDExB0ZXN0MS5kb21haW4udGxkMIIB\nIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA6NyQlAk8fIqHQMLrtiqw++s3\n0diGf8oJE0cLp7f0vcFCPwPDO0+n1+R/e8ir9BQ4kgWUFxit9r0zqXLkzcCdl7yt\nReMpr7z2O6ZJkfh7XKOEB0n1UL1FDoxuuVdQPtCHO/1mGbIRz5GMzmSVM53naIlL\n0bTpluIuwYqkq9o2r2RXkkqcf8aDN914/1Heozzy+Sk4y7i8JPSDPL1ZlACtNsn3\n0sm6HOTp/cIGbem9sUgIe/FxLjwNkj8vj68qx0XazI90u9X2JTO3849P/IrWoFCz\nfgu4v4imP7p1fDkOIEtGPGK7xPpEOdtmOSDmZokARbvtR8nC64iyPBYGriwN0QID\nAQABo4HOMIHLMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYI\nKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUTeeBzuFV4ATYhgcHwUSw\nfNqiMw0wHwYDVR0jBBgwFoAU4R2mfnzYATJVSNNvX+zjnlkgV84wLwYIKwYBBQUH\nAQEEIzAhMB8GCCsGAQUFBzABhhNodHRwOi8vMTcyLjMxLjAuMTU4MBsGA1UdEQQU\nMBKCEHRlc3QxLmRvbWFpbi50bGQwDQYJKoZIhvcNAQELBQADggEBACYOKwQThQ3G\n6wdrH8Xsdgtb86q9NHG8OBVJMWqLvk2cN6xl7JpgdxnyT/a9y9GhjkcMSMTVzZlR\nS4eQHrvdOedO4ePaT+jNM1B4zA33js2/szFFIUxPcNMXrYWYgvJNnsxKhW/JwdPo\n5ghDCuunX7e8n19xxGaslno9d8CFGW2WYZ1PCNAJ2Gbhw37Uv9sW4RRrZp3w7m2g\noUEoNaxuFykS44xRVuKJcsuV4Kv4dVNQ8STK9tRPKGKfJkZ3sGEWsWAYCw25NiTp\nCxCoASkR82ytrNYAIljP2qvUe6wVPNwNW2yaYe6OuwaOeHpycE0vNYzNEAv0yw3X\naoY4HqMbgA8=\n-----END CERTIFICATE-----\n"
}
```

in case of a revocation:
```
{
   "Status": "Revoked",
   "Serial": "711bcabbe9227fa9",
   "Certificate": "-----BEGIN CERTIFICATE-----\nMIIDlDCCAnygAwIBAgIIcRvKu+kif6kwDQYJKoZIhvcNAQELBQAwKDEmMCQGA1UE\nAxMdUGViYmxlIEludGVybWVkaWF0ZSBDQSAyOTI4ZDIwHhcNMjEwOTI3MTQyNzQ0\nWhcNMjYwOTI3MTQyNzQ0WjAbMRkwFwYDVQQDExB0ZXN0Mi5kb21haW4udGxkMIIB\nIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuVdWL/mOIHkmR032aZ0R4Cpx\nritvZnBoiC1dQ6la9sqiNCvyG4F9xlkfeVCCJaKHdm3C2R6bc/nRVznljC/jrt+t\n+BiXkQbMMzI31r/ngbyT4JqkxQu1Qdbc9guuomhiMGOlHEfyTfWiGPyHHT8/GdfV\nsiJLu1gXlzEQv2QBGfpDhoja0RQjMapaso6Ysr9sBrxQNYojTmoeyqCqNsAiknj7\nLokM6Wb2NH00JeDBwKJ27Mjj/o07BtDhtpkTEWayZopOAhq5zrvl/FLSzBNUWSqx\n3hJfiP9L25heGpY4DGYH0FtI2mkfrhTqpIgdxOuqTx8ML2qOjik0Zv9Ehyl0cQID\nAQABo4HOMIHLMA4GA1UdDwEB/wQEAwIFoDAdBgNVHSUEFjAUBggrBgEFBQcDAQYI\nKwYBBQUHAwIwDAYDVR0TAQH/BAIwADAdBgNVHQ4EFgQUToeffR8xXRuFzU7Nkf81\ncghi8YYwHwYDVR0jBBgwFoAU4R2mfnzYATJVSNNvX+zjnlkgV84wLwYIKwYBBQUH\nAQEEIzAhMB8GCCsGAQUFBzABhhNodHRwOi8vMTcyLjMxLjAuMTU4MBsGA1UdEQQU\nMBKCEHRlc3QyLmRvbWFpbi50bGQwDQYJKoZIhvcNAQELBQADggEBANb1yqct7VZY\nvJ3gT8j3Ds+S0A4Lx1e6pjLSwRSLUOzQJKUczZjW7+vASvk5XWsJBdGKQPuNsKm3\nFn6DiibcNq9ARu80wbzJi3LHhgk/AcPQFggDkd34sD8AWSCXcWFIeD/v3z0vwVf8\nWR66rE2VN/Y33A2O2EqAEtPpCcVUdtXAxKMPuN/yTbegrNryjXSprb3Q0u5BU/hf\n7uviIMa32Nd7Yi/neETOGMNbXJkixbnPL11MVnZ+WiAVDGdKVrxRhlTTHhPJzbIG\ntAJ7zFUWft5G6pht7PM35o9KlDfwuRsewhSL0gqD4lVw1FGPpht1rJ3BAm7Qt11+\n4zl/iWphLGw=\n-----END CERTIFICATE-----\n",
   "Reason": 1,
   "RevokedAt": "2021-09-27 14:28:41.251152286 +0000 UTC"
}
```