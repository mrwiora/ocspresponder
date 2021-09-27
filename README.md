good sample:
```
$ openssl ocsp -issuer issuer-cert.pem -cert good-cert.pem -text -url http://localhost
OCSP Request Data:
    Version: 1 (0x0)
    Requestor List:
        Certificate ID:
          Hash Algorithm: sha1
          Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
          Issuer Key Hash: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
          Serial Number: 2B
    Request Extensions:
        OCSP Nonce:
            041088FF5986A7CC37C17906A7CF0B4723BB
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
    Produced At: Sep 27 05:41:15 2021 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
      Issuer Key Hash: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
      Serial Number: 2B
    Cert Status: good
    This Update: Sep 27 05:41:15 2021 GMT
    Next Update: Sep 28 05:41:15 2021 GMT

    Signature Algorithm: sha512WithRSAEncryption
         74:19:bb:ff:55:9d:9f:96:11:2a:1f:bc:18:c9:35:cf:87:42:
         66:2a:2d:5b:e4:de:25:ec:5d:e5:5b:82:4e:34:37:f6:a5:f1:
         61:f7:e5:24:9c:a6:5b:93:92:90:ce:fd:d4:97:9b:1b:1d:00:
         69:4c:0e:5b:51:88:a9:f9:d6:ff:fc:86:e1:4f:dc:0e:da:2b:
         91:3f:4d:da:51:76:c1:19:b7:20:77:23:82:1d:f9:a0:61:f0:
         7d:bf:cd:c7:5f:27:dd:3c:74:09:ce:90:07:78:21:d9:42:d3:
         28:d7:fe:cd:65:5a:af:e9:bd:40:dd:e6:0a:46:bf:88:62:ea:
         34:b0:dc:ed:19:65:02:f3:75:48:5d:e7:5f:b1:05:b4:0a:db:
         4a:ff:64:9f:6d:07:76:8d:98:04:1c:01:e5:4b:49:5d:cc:20:
         af:9f:60:0b:49:7c:1f:1c:08:87:95:1a:43:6a:1d:d2:42:db:
         a4:13:1f:8c:2d:c3:b0:76:10:06:d0:d3:35:d1:47:07:33:a5:
         65:54:69:8f:99:2a:9c:dd:1f:a0:b0:da:a5:71:ca:77:8d:6c:
         fe:57:c8:4d:2c:a9:fb:e1:42:77:ee:22:b4:d0:70:67:f2:75:
         dc:cc:7b:db:e5:f9:3f:a4:35:85:0c:a9:83:4d:7d:80:21:f5:
         13:ce:e7:85
good-cert.pem: good
        This Update: Sep 27 05:41:15 2021 GMT
        Next Update: Sep 28 05:41:15 2021 GMT
WARNING: no nonce in response
Response verify OK
```

revoked sample:
```
$ openssl ocsp -issuer issuer-cert.pem -cert revoked-cert.pem -text -url http://localhost
OCSP Request Data:
    Version: 1 (0x0)
    Requestor List:
        Certificate ID:
          Hash Algorithm: sha1
          Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
          Issuer Key Hash: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
          Serial Number: 2C
    Request Extensions:
        OCSP Nonce:
            04103CBD576C1FA4C7F81CAB991934FA9A13
OCSP Response Data:
    OCSP Response Status: successful (0x0)
    Response Type: Basic OCSP Response
    Version: 1 (0x0)
    Responder Id: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
    Produced At: Sep 27 05:41:07 2021 GMT
    Responses:
    Certificate ID:
      Hash Algorithm: sha1
      Issuer Name Hash: C982F5ADC033CBEC57898E0DB83EA0FE9B53FFB2
      Issuer Key Hash: 37582D0ABB2BF55AF00B0E8836D0E89C395CAFCC
      Serial Number: 2C
    Cert Status: revoked
    Revocation Time: Sep 27 05:37:24 2021 GMT
    Revocation Reason: cACompromise (0x2)
    This Update: Sep 27 05:41:07 2021 GMT
    Next Update: Sep 28 05:41:07 2021 GMT

    Signature Algorithm: sha512WithRSAEncryption
         31:f8:64:00:04:81:22:50:52:f6:d1:35:d5:16:b2:64:8a:10:
         74:ad:ef:44:bd:96:b0:f1:6c:60:81:fb:5f:66:2b:08:3f:d6:
         07:40:7d:0a:c0:15:71:55:e9:27:b8:78:c9:bb:77:b9:ad:f0:
         48:98:ec:50:62:1f:98:77:cc:95:0b:53:ca:4e:8c:23:da:71:
         e9:6a:1f:7b:0c:ad:3e:31:3c:23:79:db:43:68:82:11:c0:3e:
         38:b7:b7:c2:42:c3:f5:5b:ec:21:3f:e4:29:66:51:fb:ba:28:
         48:dd:e3:d7:ed:b5:24:fb:58:e2:14:6f:ee:e6:9d:f6:ab:f0:
         51:26:dd:74:33:57:3c:11:2f:f6:7c:58:2c:20:04:9d:e3:6a:
         aa:46:4a:81:ab:19:57:31:30:2d:3b:38:92:57:d1:21:26:51:
         66:0f:7c:fd:6b:12:32:d7:7f:12:3c:26:9f:35:90:4f:87:18:
         f2:82:08:17:b0:dc:f2:7c:b8:b0:cb:ea:05:60:3f:bc:27:8b:
         92:0a:f1:38:a4:36:2e:ad:68:91:69:1d:60:92:4f:80:5c:06:
         ab:71:02:43:d0:ed:7a:65:5e:2b:4c:df:5f:d4:78:2a:7a:8e:
         0e:03:79:b4:c8:63:0c:c8:e9:29:6f:69:2f:38:59:87:25:30:
         31:01:55:3d
revoked-cert.pem: revoked
        This Update: Sep 27 05:41:07 2021 GMT
        Next Update: Sep 28 05:41:07 2021 GMT
        Reason: cACompromise
        Revocation Time: Sep 27 05:37:24 2021 GMT
WARNING: no nonce in response
Response verify OK
```