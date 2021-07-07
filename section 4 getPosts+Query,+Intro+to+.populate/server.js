const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "typeDefs.gql");
// pass typeDefs to server
const typeDefs = fs.readFileSync(filePath, "utf-8");
const resolvers = require("./resolvers");

require('dotenv').config({ path: "variables.env" });
// import schemas
const User = require("./models/User");
const Post = require("./models/Post");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("DB connected"))
  .catch(err => console.error(err));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  //pass schemas to Apollo server
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
