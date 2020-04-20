import React, { useState, useEffect } from 'react'
import Timer from './Timer'
import { isAuthenticated } from '../auth'
import { getAllQuestions } from './quizApi'
import { updateUser } from './userApi'
import Navbar from './Navbar'
import Question from './Question'
import Leaderboard from './Leaderboard'

const Quiz = () => {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState('')
    const [firstTime, setfirstTime] = useState('')
    const [finalScore, setfinalScore] = useState(0)
    const [error, setError] = useState('')
    const [DoneTest, setDoneTest] = useState(false)
    const { user, token } = isAuthenticated()

    const loadQuestions = () => {
        getAllQuestions(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                console.log(data)
                setQuestions(data)
                setfirstTime('done')
            }
        })
    }

    useEffect(() => {
        if (firstTime === '') {
            loadQuestions()
        }
        //console.log(selectedAnswer)
        updateUser(user._id, token, { score: finalScore })
    }, [finalScore])

    const handleNext = () => {

        checkAndUpdateFinalScore()

        setSelectedAnswer('')

        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1)
            return
        }
    }

    const handleError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const handleClick = e => {
        setSelectedAnswer(e.target.value)
    }

    const handlefinish = () => {

        checkAndUpdateFinalScore()

        setDoneTest(true)
        console.log('you are done.. Hope you enjoy')
    }

    const EndTest = () => {
        checkAndUpdateFinalScore()
        setDoneTest(true)
        console.log('Time out')
    }

    const checkAndUpdateFinalScore = () => {

        if (selectedAnswer == '') {
            const error = 'Sorry, its mandatory to tick one...!'
            setError(error)
            return
        }

        if (questions[currentQuestion].answer == selectedAnswer) {
            setfinalScore(finalScore + 1)
            // console.log(finalScore)
        } else {
            setfinalScore(finalScore)
            // console.log(finalScore)
        }

    }

    if (DoneTest) {
        return (
            <Leaderboard candi={user.name} finalScore={finalScore} />
        )
    } else {
        return (
            <div className="quiz" >
                <Navbar />
                <div className="container">
                    {handleError(error)}
                    <h2>
                        <Timer EndTest={EndTest} />
                    </h2>
                    <h6>Question {currentQuestion + 1} of {questions.length}</h6>
                    <br />
                    <div className="text-center">
                        {
                            questions && questions[currentQuestion] &&
                            <Question question={questions[currentQuestion]}
                                selectedAnswer={selectedAnswer} handleClick={handleClick} />
                        }
                        <br />
                    </div>
                    {
                        currentQuestion === (questions.length - 1) ? (
                            <button onClick={handlefinish} className="button5" >Finish</button>
                        ) : (
                                <button onClick={handleNext} className="button5">Next</button>
                            )
                    }
                </div>
            </div>
        )
    }

}

export default Quiz