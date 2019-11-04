import React from 'react';
import { Link } from 'react-router-dom';

const Login = props => {
    return (
        <div>
            <h2>{props.type.charAt(0).toUpperCase() + props.type.slice(1)}</h2>
            <label>E-mail</label>
            <input type="text" name="login" placeholde="E-mail" onChange={props.onInputChange}/>
            <label>Password</label>
            <input type="password" name="password" placeholde="Password" onChange={props.onInputChange}/>
            <input type="checkbox" onChange={props.onCheckboxToggleChange} /><label>remember me</label>
            <button disabled={!props.valid} onClick={() => props.handleSubmit(props.type)}>{props.type}</button>
            { props.type === 'login' ? <Link to="/signup">Sign Up</Link> : <Link to="/login">Log In</Link>}
        </div>
    )
}

export default Login;
