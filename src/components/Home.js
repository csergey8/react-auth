import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const Home = props => {
    return (
        <div>
            { props.isAuth ?  
                <Typography variant="h6" gutterBottom>
                    You are logged in
                </Typography>
            : "" }
            <Button variant="contained" color="primary" onClick={props.handleLogout}>
                Sign Out 
            </Button>
        </div>
    )
}

export default Home;