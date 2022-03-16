var dbName = "nest-microservice",
dbUser = "user";
dbPass = "pass";

var db = db.getSiblingDB(dbName);

db.createUser(
  {
    user: dbUser,
    pwd: dbPass,
    roles: [ { role: "dbOwner", db: dbName} ]
  }
)

db.createCollection("users");
db.users.insert({
  "_id": new ObjectId("622ebc8f7515b48b09a171e9"),
  "name": "User A",
  "email": "a@user.com",
  "password": "123"
});

db.createCollection("orders");
db.orders.insert({
  "_id": new ObjectId("622ec608f8f921ac7a646333"),
  "updatedDate": "2022-03-14T04:35:20.902+00:00",
  "createdDate": "2022-03-14T04:35:20.901+00:00",
  "total": 3000,
  "productId": "622ead907515b48b09a171e8",
  "userId": "622ebc8f7515b48b09a171e9"
});

db.createCollection("products");
db.products.insert({
  "_id": new ObjectId("622ead907515b48b09a171e8"),
  "name": "Product A",
  "price": 1000
});
