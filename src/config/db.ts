import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using connection string
    await mongoose.connect(
      process.env.MONGO_URI ||
        "mongodb://admin:1234567890@localhost:27017/express_ts_api"
    );
    console.log("MongoDB connected");
  } catch (err) {
    // Log any connection errors and exit process
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
