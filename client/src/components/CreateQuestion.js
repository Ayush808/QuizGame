import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { isAuthenticated } from '../auth'
import { createQuestion } from './quizApi'

const CreateQuestion = () => {

    const { user, token } = isAuthenticated();

    const [values, setValues] = useState({
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answer: 0,
        error: false,
        success: false
    })

    const { question, option1, option2, option3, option4, answer, success, error } = values

    // higher order function is the function that return the another function
    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const clickSubmit = e => {
        e.preventDefault()

        createQuestion({ question, options: [option1, option2, option3, option4], answer }, user._id, token) // here key and value are same so dont need of name: name , password: password , etc: etc
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                } else {
                    setValues({
                        ...values,
                        question: '',
                        option1: '',
                        option2: '',
                        option3: '',
                        option4: '',
                        answer: 0,
                        error: false,
                        success: true
                    })
                }
            })
    }

    const newPostForm = () => (

        <div className="form-style-5">
            <form>
                <fieldset>
                    <legend><span class="number">1</span>Question</legend>
                    <input type="text" onChange={handleChange('question')} value={question} placeholder="Question *" required />
                    <legend><span class="number">2</span>Options</legend>
                    <input type="text" onChange={handleChange('option1')} value={option1} placeholder="option 1 *" required />
                    <input type="text" onChange={handleChange('option2')} value={option2} placeholder="option 2 *" required />
                    <input type="text" onChange={handleChange('option3')} value={option3} placeholder="option 3 *" required />
                    <input type="text" onChange={handleChange('option4')} value={option4} placeholder="option 4 *" required />
                    <legend><span class="number">3</span>Correct Answer</legend>
                    <select id="job" onChange={handleChange('answer')} >
                        <option >Please Select</option>
                        <option value={1} >1</option>
                        <option value={2} >2</option>
                        <option value={3} >3</option>
                        <option value={4} >4</option>
                    </select>
                </fieldset>
                <button value="Apply" onClick={clickSubmit} >Create Question</button>
            </form>
        </div>
    )

    const showError = () => {
        return (
            <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
                {error}
            </div>
        )
    }

    const showSuccess = () => {
        return (
            <div className="alert alert-info" style={{ display: success ? "" : "none" }}>
                New Question is created.
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className="col-md-8 offset-md-2">
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    )
}

export default CreateQuestion