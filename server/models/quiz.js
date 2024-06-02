const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
    },
    options: {
        type: String,
        required: true,
    },
    refUserId: {
        type: mongoose.ObjectId,
    },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } });

module.exports = mongoose.model("Quiz", quizSchema);