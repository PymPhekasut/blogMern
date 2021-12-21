

const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: {},
        required: true
    },

    author: {
        type: String,
        default: "Admin"
    },

    slug: {
        type: String,
        lowercase: true,
        unique: true
    }
}, { timestamps: true }); //created + updated from mongoose

//name of model, struction of model = schema
module.exports = mongoose.model("Blogs", blogSchema);