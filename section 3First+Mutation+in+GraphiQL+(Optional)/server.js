const { ApolloServer, gql } = require("apollo-server");

const todos = [
  { task: "Wash car", completed: false },
  { task: "Clean room", completed: true }
];

//type definitions
const typeDefs = gql`
  type Todo {
    task: String
    completed: Boolean
  }

  type Query {
    // 1 get array of Todos
    getTodos: [Todo]
  }

  type Mutation {
    //1 add params with type checking
    //return Todo
    addTodo(task: String, completed: Boolean): Todo
  }
`;

//Functionality for our types
const resolvers = {
  //2 define resolver
  Query: {
    getTodos: () => todos
  },
  Mutation: {
    // 2 destructuring args object { task, completed }
    //_, root
    addTodo: (_, { task, completed }) => {
      const todo = { task, completed };
      todos.push(todo);
      return todo;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`);
});
