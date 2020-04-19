const API = '/api'
require('dotenv').config()

export const getAllQuestions = (userId, token) => {
    return fetch(`${API}/questions/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        //console.log(response.json())
        return response.json()
    }).catch(err => console.log(err))
}

export const createQuestion = (question, userId, token) => {
    return fetch(`${API}/admin/question/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(question) // form data bcz content type is form
    }).then(response => { return response.json() })
        .catch(err => { console.log(err) })

}