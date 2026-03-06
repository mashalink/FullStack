require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const config = require("../utils/config");
const User = require("../models/user");
const Blog = require("../models/blog");

const DEMO_USERNAME = "demo";
const DEMO_PASSWORD = "demopass";

const demoComments = [
  "great post",
  "very useful",
  "nice article",
  "thanks for sharing",
  "interesting read",
  "helpful content",
  "good explanation",
];

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const buildDemoBlogs = (userId, count = 20) => {
  return Array.from({ length: count }, (_, index) => {
    const i = index + 1;
    const commentCount = randomInt(0, 4);
    const comments = Array.from({ length: commentCount }, () =>
      randomFrom(demoComments),
    );

    return {
      title: `Demo blog ${i}`,
      author: `Author ${i % 5 || 5}`,
      url: `https://example.com/demo-${i}`,
      likes: randomInt(0, 50),
      comments,
      user: userId,
    };
  });
};

const seedProd = async () => {
  if (process.env.NODE_ENV !== "production") {
    throw new Error("Refusing to seed: NODE_ENV is not production");
  }

  console.log("Seeding PROD DB in safe mode...");
  console.log("Mongo URI:", config.MONGODB_URI);

  await mongoose.connect(config.MONGODB_URI, { family: 4 });

  const existingUser = await User.findOne({ username: DEMO_USERNAME });

  if (existingUser) {
    console.log(`Demo user "${DEMO_USERNAME}" already exists. Skipping seed.`);
    return;
  }

  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  const demoUser = await new User({
    username: DEMO_USERNAME,
    name: "Demo User",
    passwordHash,
  }).save();

  const blogs = buildDemoBlogs(demoUser._id, 20);
  const savedBlogs = await Blog.insertMany(blogs);

  demoUser.blogs = savedBlogs.map((blog) => blog._id);
  await demoUser.save();

  console.log("Seed completed successfully.");
  console.log(`Created user: ${demoUser.username}`);
  console.log(`Created blogs: ${savedBlogs.length}`);
};

seedProd()
  .catch((error) => {
    console.error("Seeding failed:");
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
