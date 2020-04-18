const API = 'http://localhost:8000/api'
require('dotenv').config()

export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(user)
    }).then(response => {
        //console.log(response.json())
        return response.json()
    }).catch(err => console.log(err))
}

export const top10Quizer = () => {
    return fetch(`${API}/users?sortBy=score&order=desc&limit=5`, {
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}