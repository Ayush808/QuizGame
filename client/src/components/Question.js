import React, { Fragment } from 'react';
import Answer from './Answer';

const Question = ({ question, selectedAnswer, handleClick }) => {

    return (
        <div>
            <h3>Question: {question.question}</h3>
            <div className="container">
                {
                    question.options.map((option, index) => (
                        <Answer opt={index + 1} option={question.options[index]}
                            selected={selectedAnswer == index + 1} handleClick={handleClick} />
                    ))
                }
            </div>
        </div>
    )
}

export default Question;