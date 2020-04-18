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
        <form className="mb-3">
            <div className="form-group">
                <label className="text-dark">Question</label>
                <input type="text" onChange={handleChange('question')} className="form-control" value={question} />
            </div>
            <div className="form-group">
                <label className="text-muted">option1</label>
                <input type="text" onChange={handleChange('option1')} className="form-control" value={option1} />
            </div>
            <div className="form-group">
                <label className="text-muted">option2</label>
                <input type="text" onChange={handleChange('option2')} className="form-control" value={option2} />
            </div>
            <div className="form-group">
                <label className="text-muted">option3</label>
                <input type="text" onChange={handleChange('option3')} className="form-control" value={option3} />
            </div>
            <div className="form-group">
                <label className="text-muted">option4</label>
                <input type="text" onChange={handleChange('option4')} className="form-control" value={option4} />
            </div>
            <div className="form-group">
                <label className="text-muted">Correct Answer</label>
                <select onChange={handleChange('answer')} className="form-control">
                    <option>Please Select</option>
                    <option value={answer}>1</option>
                    <option value={answer}>2</option>
                    <option value={answer}>3</option>
                    <option value={answer}>4</option>
                </select>
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit} style={{ float: "right" }}>Create Question</button>
        </form>
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