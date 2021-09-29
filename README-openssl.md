# OPENSSL

To demonstrate the featureset and to make tests possible a set of certificates has been placed into test\fixtures. 
config must point towards filesystem.
The following openssl commands demonstrate the functionality:

## DEMO with memory

good sample:
```bash
$ openssl ocsp -issuer test/fixtures/ocsp_issuer-cert.pem -cert test/fixtures/ocsp_good-cert.pem -text -url http://localhost
OCSP Request Data:
    Version: 1 (0x0)
    Requestor List:
        Certificate ID:
          Hash Algorithm: sha1
          Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
          Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
          Serial Number: 2B
    Request Extensions:
        OCSP Nonce:
            0410B4EC141E6B531E25972B1BAAADD0AA26
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: 079B8F90C45C25F6487522080B630C7606B61EEC
    Produced At: Sep 29 05:41:52 2021 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
      Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
      Serial Number: 2B
    Cert Status: good
    This Update: Sep 29 05:41:52 2021 GMT
    Next Update: Sep 30 05:41:52 2021 GMT

    Signature Algorithm: sha512WithRSAEncryption
         cc:3f:6d:8d:a3:27:0a:3a:c3:dc:8c:f5:2c:7a:4e:aa:e8:52:
         f3:c8:7c:d4:c5:44:79:ed:00:75:15:cc:b8:78:bd:1c:ab:0e:
         a0:4e:cc:63:20:ee:3d:80:e2:c1:d8:bf:53:74:3f:87:42:77:
         58:44:8d:dc:f0:ec:bc:e2:26:28:fa:05:26:f1:c3:62:95:05:
         84:e7:a0:00:53:33:3b:b8:8c:06:5a:24:43:82:a5:43:b4:3c:
         2d:40:bd:a5:2c:03:f3:81:b7:77:72:6a:87:24:dd:f8:2a:d3:
         3a:84:ae:d7:ec:b0:0c:6a:65:4f:63:8e:2e:30:64:f1:40:fa:
         38:e7:94:ad:43:96:78:f8:58:c7:6c:8f:a3:3f:5b:2e:20:c3:
         66:f9:89:fb:17:5b:8f:82:c1:fd:01:16:b9:0c:1b:bf:99:53:
         b7:73:8f:cf:5f:6e:a7:5d:3e:f9:85:09:6a:e1:25:03:1a:31:
         e0:21:4e:60:d0:2d:f3:d2:63:4a:ca:87:d9:51:9a:4e:c8:e9:
         c6:03:b4:96:91:0e:a6:a5:0d:5e:fd:06:a8:e3:84:3b:e4:a9:
         25:5b:95:bb:2d:54:db:76:c0:d9:d5:43:59:aa:0f:d6:64:57:
         78:da:f0:76:6e:6e:47:89:09:a2:76:82:d1:dc:bb:2d:57:f1:
         8f:a8:18:56
test/fixtures/ocsp_good-cert.pem: good
        This Update: Sep 29 05:41:52 2021 GMT
        Next Update: Sep 30 05:41:52 2021 GMT
WARNING: no nonce in response
Response verify OK
```

revoked sample:
```bash
$ openssl ocsp -issuer test/fixtures/ocsp_issuer-cert.pem -cert test/fixtures/ocsp_revoked-cert.pem -text -url http://localhost
OCSP Request Data:
    Version: 1 (0x0)
    Requestor List:
        Certificate ID:
          Hash Algorithm: sha1
          Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
          Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
          Serial Number: 2C
    Request Extensions:
        OCSP Nonce:
            04100C38F1728B298CD6749E25561F556B82
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: 079B8F90C45C25F6487522080B630C7606B61EEC
    Produced At: Sep 29 05:44:48 2021 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
      Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
      Serial Number: 2C
    Cert Status: revoked
    Revocation Time: Sep 29 05:44:16 2021 GMT
    Revocation Reason: cACompromise (0x2)
    This Update: Sep 29 05:44:48 2021 GMT
    Next Update: Sep 30 05:44:48 2021 GMT

    Signature Algorithm: sha512WithRSAEncryption
         c7:2a:00:57:7e:f5:32:66:86:f6:db:9c:14:ef:01:0a:8c:6a:
         b4:34:d4:10:00:0a:64:ea:3e:f3:f4:ae:19:ad:d3:98:b1:7e:
         37:6d:da:e5:ed:f2:ca:b6:d5:3c:ad:b6:f7:cb:f4:a2:9e:33:
         f3:71:ec:8f:8f:94:6e:cf:a4:cb:ae:11:74:1d:a9:2c:07:a8:
         13:29:1b:64:3e:8f:c4:ac:eb:28:8a:0c:dc:a5:f5:dc:aa:76:
         a3:2a:d7:4e:ab:d2:e1:00:07:d8:65:32:cc:e4:ac:58:56:e8:
         08:8f:71:69:b7:16:65:56:3e:5c:e8:e4:93:e1:b2:10:1c:b5:
         3d:b3:b9:36:6f:14:91:13:2a:b3:40:b2:ac:95:23:3f:f1:44:
         02:ca:75:21:71:87:91:68:49:38:e2:e3:4c:2d:a6:3b:1c:ef:
         5d:67:f5:b6:4f:90:1d:90:0d:b9:1e:31:92:78:40:db:96:65:
         e7:b7:6d:df:48:93:eb:01:da:9c:4c:9e:8d:fc:d8:63:e8:f3:
         4b:43:a1:1b:07:79:c8:6d:15:d4:dc:34:a6:1d:21:4e:cf:e9:
         e8:d2:c2:10:87:c1:db:6d:8a:b3:f6:6d:03:a1:f1:63:c5:7e:
         97:f8:08:85:3e:21:6e:42:fe:ff:f5:0e:e8:3a:99:bb:c4:e0:
         cb:1c:bb:7c
test/fixtures/ocsp_revoked-cert.pem: revoked
        This Update: Sep 29 05:44:48 2021 GMT
        Next Update: Sep 30 05:44:48 2021 GMT
        Reason: cACompromise
        Revocation Time: Sep 29 05:44:16 2021 GMT
WARNING: no nonce in response
Response verify OK
```

unkown sample:
```bash
$ openssl ocsp -issuer test/fixtures/ocsp_issuer-cert.pem -cert test/fixtures/ocsp_issuer-cert.pem -text -url http://localhost
OCSP Request Data:
    Version: 1 (0x0)
    Requestor List:
        Certificate ID:
          Hash Algorithm: sha1
          Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
          Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
          Serial Number: 2A
    Request Extensions:
        OCSP Nonce:
            04101BB73799F25E44AF277507DB37790F83
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: 079B8F90C45C25F6487522080B630C7606B61EEC
    Produced At: Sep 29 05:46:33 2021 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
      Issuer Key Hash: 079B8F90C45C25F6487522080B630C7606B61EEC
      Serial Number: 2A
    Cert Status: unknown
    This Update: Sep 29 05:46:33 2021 GMT
    Next Update: Sep 30 05:46:33 2021 GMT

    Signature Algorithm: sha512WithRSAEncryption
         e0:7b:a8:d5:b1:04:e6:fe:fb:e6:2d:49:b0:57:6d:a1:e7:b3:
         eb:f2:f0:bc:cd:c1:51:65:cc:54:0d:82:46:24:8a:8a:10:ae:
         f2:65:42:3c:48:16:6d:00:8b:3f:e3:16:48:d5:5a:7a:27:61:
         85:90:68:10:49:e4:a5:8e:15:74:19:29:a3:91:7e:83:d9:3d:
         69:f7:12:39:e4:80:5f:e1:20:8d:dd:ca:44:25:e0:96:6a:1a:
         b8:5c:f6:55:9f:21:ac:77:8a:90:19:0c:11:d8:8c:d8:2d:f5:
         ed:63:21:8e:44:4d:d1:f9:80:44:cf:4e:47:c8:80:62:ce:9c:
         86:77:08:d0:e4:65:66:2e:e7:80:7c:ae:0f:1e:cf:5f:a5:b2:
         d3:12:61:23:c6:58:ae:7c:e9:17:9b:83:23:b9:6a:e2:1f:bd:
         93:69:52:9b:10:87:9e:f9:ad:e1:a2:4e:9e:60:f4:0c:7c:b6:
         26:aa:e4:f0:f1:da:26:93:db:3c:38:55:8f:af:bd:da:e3:46:
         fd:c8:81:8f:c0:b7:c3:11:66:ba:3b:3c:d8:81:d2:1e:67:b9:
         7f:3b:01:56:b5:e7:9c:39:68:ea:54:23:b6:51:8a:fe:5f:35:
         59:08:88:6a:2f:95:b5:87:3f:d6:d8:7a:3d:e1:b1:07:aa:67:
         23:61:79:78
test/fixtures/ocsp_issuer-cert.pem: unknown
        This Update: Sep 29 05:46:33 2021 GMT
        Next Update: Sep 30 05:46:33 2021 GMT
WARNING: no nonce in response
Response verify OK
``` 