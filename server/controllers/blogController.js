
const slugify = require("slugify");
const Blogs = require("../models/blogs");
const { v4: uuidv4 } = require('uuid');

//Create data
exports.create = (req, res) => {
    const { title, content, author } = req.body;
    let slug = slugify(title);

    if (!slug) slug = uuidv4();

    //Validate Data
    switch (true) {
        case !title:
            return res.status(400).json({ error: "Please insert title name" });
            break;
        case !content:
            return res.status(400).json({ error: "Please insert content" });
            break;
    }
    //Create Blog
    Blogs.create({ title, content, author, slug }, (err, blog) => {
        if (err) {
            res.status(400).json({ error: "Slug already in used" });
        }
        res.json(blog);
    });

};

exports.getAllBlogs = (req, res) => {
    Blogs.find({}).exec((err, blogs) => {
        res.json(blogs);
    });
};


exports.singleBlog = (req, res) => {
    const { slug } = req.params;
    Blogs.findOne({ slug }).exec((err, blog) => {
        res.json(blog);
    });
};

exports.removeBlog = (req, res) => {
    const { slug } = req.params;
    Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
        if (err) console.log(err);
        res.json({
            message: "Successfully deleted"
        });
    });
};

exports.updateBlog = (req, res) => {
    const { slug } = req.params;
    const { title, content, author } = req.body;
    Blogs.findOneAndUpdate({ slug }, { title, content, author }, { new: true }).exec((err, blog) => {
        if (err) console.log(err);
        res.json(blog);
    });
};
