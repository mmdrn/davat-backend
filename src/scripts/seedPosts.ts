import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/postModel";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const seedPosts = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Post.deleteMany(); // Clear existing posts if needed

    await Post.insertMany([
      { title: "First Post", content: "Hello World!", author: "Admin" },
      { title: "Second Post", content: "Another Post Here", author: "User123" },
      {
        title: "Third Post",
        content: "Post without Comments yet",
        author: "JaneDoe",
      },
    ]);

    console.log("✅ Posts seeded");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding posts:", error);
    process.exit(1);
  }
};

seedPosts();
