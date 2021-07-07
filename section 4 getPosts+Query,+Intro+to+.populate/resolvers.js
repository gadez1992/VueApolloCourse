module.exports = {
  Query: {
    getPosts: async (_, args, { Post }) => {
      const posts = await Post.find({})
        .sort({ createdDate: "desc" })
        .populate({
          path: "createdBy",
          model: "User"
        });
      return posts;
    }
  },
  Mutation: {
    addPost: async (
      _,
      { title, imageUrl, categories, description, creatorId },
      { Post }
    ) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        createdBy: creatorId
      }).save();
      return newPost;
    },
    // 1st param _, root wont use on this course
    // 2nd param all arguments in typeDefs
    // 3rd param context which allows us to pass the {User} model 
    signupUser: async (_, { username, email, password }, { User }) => {
      // if username give an error
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      // create a new user
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return newUser;
    }
  }
};
