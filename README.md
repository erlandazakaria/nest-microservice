# LEARN NEST MICROSERVICE USING KAFKA AND DOCKER

**How to install:**
docker-compose up -d

**Testing:**
curl --location --request POST 'localhost:3000/create-order' \
--header 'Content-Type: application/json' \
--data-raw '{
    "userId": "622ebc8f7515b48b09a171e9",
    "productId": "622ead907515b48b09a171e8",
    "quantity": 5
}'
