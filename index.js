// index.js
import mongoose from "mongoose";
import express from "express";
import path from "path";

import UserController from './src/controllers/user.controller.js';
import expressEjsLayouts from "express-ejs-layouts";
import { renderBlogForm, renderBlogs, addBlog} from "./src/controllers/blog.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";


mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected!'))
.catch(err => console.error('MongoDB connection error:', err));
const app = express();
const usersController = new UserController();
app.use(cookieParser());
app.use(setLastVisit);
app.use(session({
  secret: 'SecretKey',
  resave:false,
  saveUninitialized:true,
  cookie: {secure:false},
})
);


app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));
app.use(expressEjsLayouts);

// Middleware to parse request body
app.use(express.urlencoded({ extended: true }));

// Route to render the home page with all blogs
app.get("/", auth,  renderBlogs);
app.get('/register', usersController.getRegister);
app.get('/login',  usersController.getLogin);

// Route to render the blog creation form
app.get("/createblog", auth, renderBlogForm);
app.get('/logout', usersController.logout);

// Route to handle the addition of a new blog
app.post("/addblog",auth, addBlog);

// Route to render the blog update form
app.post(
    '/register',
    usersController.postRegister
  );
  app.post('/login', usersController.postLogin);

export default app;
