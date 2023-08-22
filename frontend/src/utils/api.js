import axios from "axios";

const params = {
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
};
console.log(process.env.REACT_APP_STRIPE_APP_KEY)
export const fetchDataFromApi = async (url) => {
    try {
        const { data } = await axios.get(
            process.env.REACT_APP_DEV_URL + url,
            params
        );
        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};

export const makePaymentRequest = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});

export const getUserProfile = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});

export const getOrderUser = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});

export const postCartUser = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});

export const getData = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});

export const postData = axios.create({
    baseURL: process.env.REACT_APP_DEV_URL,
    mode: 'no-cors',
    headers: {
        Authorization: "bearer " + process.env.REACT_APP_STRIPE_APP_KEY,
    },
});