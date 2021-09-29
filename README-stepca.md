# StepCA

Tested with versions [0.17.4](https://github.com/smallstep/certificates/releases/tag/v0.17.4)

Necessary configuration change in ca.json:
```json
        "db": {
                "type": "mysql",
                "dataSource": "stepcauser:pass@tcp(127.0.0.1:3306)/",
                "database": "stepcadbname"
        },
```

Ensure that the user has the corresponding rights in the database:
```
CREATE DATABASE stepcadbname;
CREATE USER 'stepcauser'@'%' IDENTIFIED BY 'pass';
GRANT ALL PRIVILEGES ON stepcadbname.* TO 'stepcauser'@'%';
``` 