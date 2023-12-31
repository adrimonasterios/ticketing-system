import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  var mongoose: any;
}
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const dbConnect =
  (handler: any) => async (req: NextRequest, res: NextResponse) => {
    if (cached.conn) {
      return handler(req, res);
    }

    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose
        .connect(MONGODB_URI as string, opts)
        .then((mongoose) => {
          return mongoose;
        })
        .catch((err) => console.log(err));
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return handler(req, res);
  };

export default dbConnect;
