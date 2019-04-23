import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Streamer
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
                    <Link to="/" className="item">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header