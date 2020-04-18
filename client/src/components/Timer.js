import React, { useState, useEffect } from 'react';

//Component using Hooks
const Timer = ({ EndTest }) => {
    const [sec, setSec] = useState(0)
    const [min, setMin] = useState(3)

    if (min === 0 && sec === 0) {
        EndTest();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setSec(sec => sec - 1)
            if (sec === 0) {
                setSec(59)
                setMin(min => min - 1)
            }
        }, 1000)
        return () => clearInterval(interval)
    })



    return (
        <div>
            <h2> Timer </h2>
            <h2>{min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}</h2>

        </div>
    )

}

export default Timer