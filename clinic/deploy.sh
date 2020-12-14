#!/bin/sh
ssh -i ~/clinic-rsa-key.pem ubuntu@52.204.105.231 "sudo mv clinic temp_clinic"
scp -r -i ~/clinic-rsa-key.pem ../clinic ubuntu@52.204.105.231:/home/ubuntu/
ssh -i ~/clinic-rsa-key.pem ubuntu@52.204.105.231 "sudo ./clinic/handling.sh"
ssh -i ~/clinic-rsa-key.pem ubuntu@52.204.105.231 "sudo rm -rf temp_clinic"
ssh -i ~/clinic-rsa-key.pem ubuntu@52.204.105.231 "sudo docker-compose -f ~/clinic/docker-compose.dev.yml up -d"
