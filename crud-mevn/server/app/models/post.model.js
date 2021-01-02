module.exports = (mongoose) => {
  const Post = mongoose.model(
    "post",
    mongoose.Schema(
      {
        name: String,
        email: String,
       
      },
      { timestamps: true }
    )
  );

  return Post;
};
