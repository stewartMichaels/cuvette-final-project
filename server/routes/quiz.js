const express = require('express');
const router = express.Router();
const quizController = require('./../controller/quiz');
const verifyToken = require('../middlewares/verifyAuth');

router.post("/create", verifyToken, quizController.createQuiz);
router.get("/quiz-details/:quizId", quizController.getQuizDetailsById);
router.put("/update/:quizId", verifyToken, quizController.updateQuizDetailsById);
router.get("/all", quizController.getAllQuizzes);
router.delete("/delete/:quizId", verifyToken, quizController.deleteQuizById);

module.exports = router;