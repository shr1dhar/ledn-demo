#! /bin/bash

mongoimport --host mongodb_container --db ledn --collection accounts --type json --file /data/accounts_large.json --jsonArray