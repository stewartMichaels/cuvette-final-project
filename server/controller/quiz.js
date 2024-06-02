const Quiz = require("../models/quiz");

const createQuiz = async (req, res, next) => {
    console.log(`Stewart was here`)
    try {
        const currentUserID = req.currentUserID;

        const { name, questions, options } = req.body;

        if (!name || !questions || !options) {
            console.log(`createQuiz Controller, name:${name}, questions:${questions}, options:${options}`)

            return res.status(400).json({
                errorMessage: "Please enter all fields",
            });
        }

        const quizDetails = new Quiz({ name, questions, options, refUserId: currentUserID });

        await quizDetails.save();
        res.json({ message: "Quiz created successfully" });

    } catch (error) {
        next(error);
    }
}

const getQuizDetailsById = async (req, res, next) => {
    try {
        const { quizId } = req.params;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const quizDetails = await Quiz.findById(quizId);

        if (!quizDetails) {
            return res.status(404).json({
                errorMessage: "Quiz not found",
            });
        }

        res.json({ quizDetails });

    } catch (error) {
        next(error);
    }
}

const updateQuizDetailsById = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const { name, questions } = req.body;

        if (!name || !questions) {
            return res.status(400).json({
                errorMessage: "Please enter all fields",
            });
        }

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const isQuizExist = await Quiz.findOne({ _id: quizId });

        if (!isQuizExist) {
            return res.status(400).json({
                errorMessage: "Quiz not found",
            });
        }

        await Quiz.updateOne({ _id: quizId }, { $set: { name, questions } });

        res.json({ message: "Quiz updated successfully" });

    } catch (error) {
        next(error);
    }
}

const getAllQuizzes = async (req, res, next) => {
    try {
        // second parameter in find() is projection (controlling what will be returned/viewed)
        const allQuizzes = await Quiz.find({}, { name: 1, questions: 1, createdAt: 1 }).sort({ createdAt: -1 });
        res.json({ data: allQuizzes });
    } catch (error) {
        next(error);
    }
}

const deleteQuizById = async (req, res, next) => {
    try {
        const { quizId } = req.params;

        if (!quizId) {
            return res.status(400).json({
                errorMessage: "Bad request",
            });
        }

        const quiz = await Quiz.findById(quizId);

        if (!quiz) {
            return res.status(404).json({
                errorMessage: "Quiz not found",
            });
        }

        await Quiz.deleteOne({ _id: quizId });
        res.json({ message: "Quiz deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createQuiz,
    getQuizDetailsById,
    updateQuizDetailsById,
    getAllQuizzes,
    deleteQuizById,
}