#!/bin/sh

sudo docker-compose -f ~/temp_clinic/docker-compose.deploy.yml down;
sudo docker container kill $(docker ps -a -q);
sudo docker container rm $(docker ps -a -q);
sudo docker rmi -f clinic_web-backend:latest
