// blog.model.js
import mongoose from 'mongoose';


export const blogs = [
  {
    id:"1",
    title: "Coding Ninjas",
    description: "Coding Ninjas is an e-learning platform that offers courses taught by Stanford University faculty, IITs, IIITs, and Ex-Facebook, Google, and Amazon employees.",
    img: "https://asset.brandfetch.io/idQVGbrvGL/idFrWdCkB5.png?updated=1681732628908I",
  },
  {
    id:"2",
    title: "Apple",
    description: "Apple Inc. is an American computer and consumer electronics company famous for creating the iPhone, iPad, and Macintosh computers. Apple is one of the largest companies globally with a market cap of over 2 trillion dollars.",
    img: "https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-icon-16.png",
  },
];



// Define the schema for the blog
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  }
  
});

// Create a model using the schema
const Blog = mongoose.model('Blog', blogSchema); // Using 'Blog' for the model name

export default Blog;