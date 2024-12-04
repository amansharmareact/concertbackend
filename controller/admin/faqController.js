const FAQ = require("../../model/faqModel");




exports.createFAQ = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newFAQ = await FAQ.create({ question, answer });
        res.status(201).json({ message: 'FAQ created successfully', faq: newFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Error creating FAQ', error: error.message });
    }
};

exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json({ message: 'FAQs fetched successfully', faqs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching FAQs', error: error.message });
    }
};
exports.updateFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );

        if (!updatedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json({ message: 'FAQ updated successfully', faq: updatedFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQ', error: error.message });
    }
};
exports.deleteFAQ = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedFAQ = await FAQ.findByIdAndDelete(id);

        if (!deletedFAQ) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FAQ', error: error.message });
    }
};
