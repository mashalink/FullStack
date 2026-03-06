require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const config = require("../utils/config");
const User = require("../models/user");
const Blog = require("../models/blog");

const randomComments = [
  "great post",
  "very useful",
  "nice article",
  "thanks for sharing",
  "learned something new",
  "this helped a lot",
  "interesting perspective",
  "good explanation",
  "awesome",
  "cool writeup",
];

const seed = async () => {
  if (process.env.NODE_ENV !== "development") {
    console.log("Refusing to seed: NODE_ENV is not development");
    process.exit(1);
  }

  console.log("Seeding DEV DB:", config.MONGODB_URI);

  await mongoose.connect(config.MONGODB_URI, { family: 4 });

  await Blog.deleteMany({});
  await User.deleteMany({});

  const usersData = [
    { username: "ponchik", name: "Ponchik Dev" },
    { username: "maria", name: "Maria Fullstack" },
    { username: "alex", name: "Alex Backend" },
    { username: "luna", name: "Luna Designer" },
    { username: "otto", name: "Otto Hacker" },
  ];

  const users = [];

  for (const u of usersData) {
    const passwordHash = await bcrypt.hash("secretpass", 10);

    const user = await new User({
      username: u.username,
      name: u.name,
      passwordHash,
    }).save();

    users.push(user);
  }

  const blogs = [];

  for (const user of users) {
    const blogCount = Math.floor(Math.random() * 8) + 3; // 3–10

    const userBlogs = [];

    for (let i = 1; i <= blogCount; i++) {
      const commentCount = Math.floor(Math.random() * 5); // 0–4 comments

      const comments = Array.from(
        { length: commentCount },
        () => randomComments[Math.floor(Math.random() * randomComments.length)],
      );

      userBlogs.push({
        title: `${user.name} blog ${i}`,
        author: user.name,
        url: `https://example.com/${user.username}-${i}`,
        likes: Math.floor(Math.random() * 20),
        comments,
        user: user._id,
      });
    }

    const insertedBlogs = await Blog.insertMany(userBlogs);

    user.blogs = insertedBlogs.map((b) => b._id);
    await user.save();

    blogs.push(...insertedBlogs);
  }

  console.log(`Seed done.`);
  console.log(`Users: ${users.length}`);
  console.log(`Blogs: ${blogs.length}`);

  await mongoose.connection.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
