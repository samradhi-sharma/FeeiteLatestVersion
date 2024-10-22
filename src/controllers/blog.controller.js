// src/controllers/blog.controller.js

import { blogs } from '../models/blog.model.js';

import Blog from '../models/blog.model.js'; // Import the Blog model

// Render the blog form
export const renderBlogForm = (req, res) => {
  res.render('addBlogForm', { userEmail: req.session.userEmail });
};

// Render the blogs list
export const renderBlogs = async (req, res) => {
  try {
    // Fetch all blogs from the database using Mongoose
    const blogs = await Blog.find({});
    res.render('blogs', { blogs, userEmail: req.session.userEmail });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Server error');
  }
};

// Add a new blog
export const addBlog = async (req, res) => {
  const { title, description, img } = req.body;

  try {
    // Create a new blog using the Mongoose model
    const newBlog = new Blog({ title, description, img });
    await newBlog.save(); // Save the blog to the database

    res.redirect('/'); // Redirect to the homepage after adding the blog
  } catch (error) {
    console.error('Error adding blog:', error);
    res.status(500).send('Server error');
  }
};

// Render the update blog form
export const renderUpdateBlogForm = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    res.render('updateBlogForm', { blog });
  } catch (error) {
    console.error('Error fetching blog for update:', error);
    res.status(500).send('Server error');
  }
};

// Update a blog
export const updateBlog = async (req, res) => {
  const { title, description, img } = req.body;
  const blogId = req.params.id;

  try {
    await Blog.findByIdAndUpdate(blogId, { title, description, img });
    res.redirect('/');
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).send('Server error');
  }
};
