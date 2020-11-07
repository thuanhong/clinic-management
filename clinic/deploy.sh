#!/bin/sh
ssh -i ~/clinic-rsa-key.pem ubuntu@54.160.70.246 "sudo mv clinic temp_clinic"
scp -r -i ~/clinic-rsa-key.pem ~/clinic-management/clinic ubuntu@54.160.70.246:/home/ubuntu/
ssh -i ~/clinic-rsa-key.pem ubuntu@54.160.70.246 "sudo ./clinic/handling.sh"
ssh -i ~/clinic-rsa-key.pem ubuntu@54.160.70.246 "sudo rm -rf temp_clinic"
ssh -i ~/clinic-rsa-key.pem ubuntu@54.160.70.246 "sudo docker-compose -f ~/clinic/docker-compose.deploy.yml up -d"
