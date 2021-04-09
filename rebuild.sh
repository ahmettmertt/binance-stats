image_name="binance-stats"
container_name="binance-stats-container"

docker stop $container_name
docker rm $container_name
docker image rm $image_name

docker build -t $image_name .
docker run -p 8080:8080 -d --name $container_name $image_name
