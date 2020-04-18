import React from 'react'

const Answer = ({ opt, option, selected, handleClick }) => {

    let classes = ['answer']

    if (selected) {
        classes.push('selected')
    }

    return (
        <button value={opt} className={classes.join(" ")} onClick={handleClick} >
            <span className="letter">{opt}. </span> {option}
        </button>
    )
}

export default Answer