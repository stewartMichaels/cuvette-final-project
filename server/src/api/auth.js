import axios from "axios";
const backendUrl = "http://localhost:3000/api/v1/auth";

export const signupUser = async ({ email, password, name }) => {
    try {

        const reqUrl = `${backendUrl}/register`;
        const response = await axios.post(reqUrl, {
            name,
            email,
            password
        });
        if(response.status === 201) {
            return "OK";
        }

        return "failed to create user";

    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 409) {
            // Handle the case where the user already exists
            alert('User already exists. Please use a different email.');
        } else {
            console.log(error);
            alert('Something went wrong');
        }
    }
};

export const loginUser = async ({ email, password }) => {
    try {
        const reqUrl = `${backendUrl}/login`;
        const response = await axios.post(reqUrl, {
            email,
            password
        });

        if (response.data?.token) {
            localStorage.setItem('token', JSON.stringify(response.data?.token));
            localStorage.setItem('name', JSON.stringify(response.data?.name));
        }

        return "OK";

    } catch (error) {
        console.log(error);
        alert('Something went wrong');
    }
};