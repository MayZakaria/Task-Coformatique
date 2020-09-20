import axios from 'axios';

const baseUrl = "http://localhost:3000"

export const getAllMessages = () => async (dispatch) => {
    await axios.get(`${baseUrl}/Rooms`)
        .then(res => {
            dispatch({
                type: "MESSAGE_LIST",
                payload: res.data
            })
        })
        .catch(err => { console.log(err); })
};

export const addMessage = (newMessage) => async (dispatch) => {
    await axios.post(`${baseUrl}/Rooms`, newMessage)
        .then(res => {
            axios.get(`${baseUrl}/Rooms`)
                .then(res => {
                    dispatch({
                        type: "MESSAGE_LIST",
                        payload: res.data
                    })
                })
                .catch(err => { console.log(err); })
        })
        .catch(err => { console.log(err); })
};


export const getMessageByID = (id) => async (dispatch) => {
    await axios.get(`${baseUrl}/Rooms/${id}`)
        .then(res => {
            dispatch({
                type: "MESSAGE_DETAILS",
                payload: res.data
            })
        })
        .catch(err => { console.log(err); })
};

export const register = (user) => async (dispatch) => {
    await axios.post(`${baseUrl}/Users`,user)
        .then(res => {
            dispatch({
                type: "REGISTER",
                payload: res.data
            })
        })
        .catch(err => { console.log(err); })
};

export const login = (user) => async (dispatch) => {
    await axios.post(`${baseUrl}/Users`,user)
        .then(res => {
            dispatch({
                type: "REGISTER",
                payload: res.data
            })
        })
        .catch(err => { console.log(err); })
};

// export const getProjectDetails = (id: number) => async (dispatch: Dispatch) => {
//     await axios.get(`${baseUrl}/projects/${id}`)
//         .then(res => {
//             dispatch({
//                 type: PROJECT_DETAILS,
//                 payload: res.data,
//             });
//         })
//         .catch(err => { console.log(err); });
// };