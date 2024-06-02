import axios from "axios";
const backendUrl = "http://localhost:3000/api/v1/quiz";

export const createQuiz = async (quizPayload) => {
    console.log(`qizPayload`, quizPayload)

    try {
        const reqUrl = `${backendUrl}/create`;
        const token = JSON.parse(localStorage.getItem('token'));
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.post(reqUrl, quizPayload);

        console.log(response.data)
    } catch (error) {
        console.log(error);
        alert('Something went wrong');
    }
}