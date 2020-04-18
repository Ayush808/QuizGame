import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { top10Quizer } from './userApi'

const Leaderboard = ({ candi, finalScore }) => {

    const [users, setUsers] = useState([])

    const init = () => {
        top10Quizer().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                //console.log(data)
                setUsers(data)
            }
        })
    }

    useEffect(() => {
        const interval = setTimeout(() => {
            console.log('This will run every second!');
            init()
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <div className="bg-light">
            <Navbar />
            <p>I hope {candi} you did best. :) your score {finalScore}</p>
            <div className="leaderboard">
                <h1>
                    Top players :) Cheers
                </h1>
                {
                    users && users.map((user, index) => (
                        <ol>
                            <li>
                                <mark>{user.name}</mark>
                                <small>{user.score}</small>
                            </li>
                        </ol>
                    ))
                }
            </div>
        </div>
    )
}

export default Leaderboard