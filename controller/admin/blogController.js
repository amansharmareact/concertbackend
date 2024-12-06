const Blog = require("../../model/blogModel")

exports.createBlog = async (req, res) => {
    try {
        const { title, content, author, tags, published } = req.body;
        const newBlog = await Blog.create({ title, content, author, tags, published });
        res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error: error.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ message: 'Blogs fetched successfully', blogs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blogs', error: error.message });
    }
};
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post fetched successfully', blog });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching blog post', error: error.message });
    }
};
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, author, tags, published } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, author, tags, published },
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.status(200).json({ message: 'Blog post updated successfully', blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ message: 'Error updating blog post', error: error.message });
    }
};

exports.deleteBlogByid = async (req, res) => {
    try {
        const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found", status: 404 });
        }
        return res.status(200).json({
            message: "Blog deleted successfully",
            status: 200,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error deleting Blog: " + error.message,
            status: 500,
        });
    }
};
