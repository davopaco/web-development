docker pull node:latest
docker build -t references-app:1.0.0 .
docker container run -p 1802:1802 -d references-app:1.0.0
docker ps -a