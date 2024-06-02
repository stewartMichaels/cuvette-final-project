import axios from "axios";

const backendUrl = "http://localhost:3000/api/v1/quiz";

export const fetchQuizData = async () => {
    try {
        const reqUrl = `${backendUrl}/all`;
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;

        const response = await axios.get(reqUrl);

        return response.data.data;
    } catch (error) {
        console.log(error);
        alert('Failed to fetch quiz data');
        return [];
    }
}

// Delete a quiz by ID
export const deleteQuiz = async (quizId) => {
    try {
        const reqUrl = `${backendUrl}/delete/${quizId}`;
        await axios.delete(reqUrl);
        // alert('Quiz deleted successfully');
    } catch (error) {
        console.error(error);
        alert('Failed to delete quiz');
    }
};