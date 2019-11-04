import React from 'react'

const Home = props => {
    return (
        <div>
            { props.isAuth ? "You are logged in" : ""}
            <button>Sign Out</button>
        </div>
    )
}

export default Home;