import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    marTop: {
        marginTop: 30
    }
  }));

const Login = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h5" gutterBottom>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</Typography>
            {props.errorMsg ? <Typography variant="body1" gutterBottom>{props.errorMsg}</Typography> : null}
            <TextField
                required
                id="outlined-basic"
                label="Email"
                type="email"
                margin="normal"
                variant="outlined"
                onChange={props.onInputChange}
                name="login"
                value={props.loginValue}
            />
            <TextField
                required
                id="outlined-basic"
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
                onChange={props.onInputChange}
                name="password"
                value={props.passwordValue}
            />
            
            <FormControlLabel
                control={
                    <Checkbox
                        checked={props.checked}
                        onChange={props.onCheckboxToggleChange}
                        value="checkedB"
                        color="primary"
                    />
                    }
                label="remember me"
            />
            <Button disabled={!props.valid} variant="contained" color="primary" onClick={() => props.handleSubmit(props.type)}>
                {props.type}
            </Button>
            { props.type === 'login' ? 
            <Link to="/signup" className={classes.marTop}>Sign Up</Link> 
            : <Link to="/login" className={classes.marTop}>Log In</Link>}
        </div>
    )
}

export default Login;
