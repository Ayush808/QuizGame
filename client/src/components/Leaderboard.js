import React, { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import { top10Quizer } from './userApi'
import { isAuthenticated } from '../auth/index'

const Leaderboard = ({ candi, finalScore }) => {

    const { user: { name, score } } = isAuthenticated();

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
            //console.log('This will run every second!');
            init()
        }, 1000);
    }, [])

    return (
        <div className="bg-light">
            <Navbar />
            <p className="text-center">I hope {name} you did best. :) your score {score}</p>
            <div className="leaderboard">
                <h1>
                    Top players :) Cheers
                </h1>
                <ol>
                    {
                        users && users.map((user, index) => (

                            <li>
                                <mark>{user.name}</mark>
                                <small>{user.score}</small>
                            </li>
                        ))
                    }
                </ol>
            </div>
        </div>
    )
}

export default Leaderboard