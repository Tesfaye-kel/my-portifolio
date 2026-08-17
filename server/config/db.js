import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If already connected, return the cached connection
  if (cached.conn) return cached.conn;

  // If connection is in progress, return that promise
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectDB;