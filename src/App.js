import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import axios from 'axios';

class App extends React.Component {
  state = {
    isAuth: false,
    formData: {
      login: null,
      password: null,
      remember: false
    },
    valid: false,
    urlAuth: '',
    msg: null
  }
  onInputChange = e => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    }, () => {
      if(this.state.formData.login && this.state.formData.password) {
        this.setState({
          valid: true
        })
      } else {
        this.setState({
          valid: false
        })
      }
    })
  }
  onCheckboxToggleChange = () => {
    this.setState({
      formData: {
        ...this.state.formData,
        remember: !this.state.formData.remember
      }
    }, () => console.log(this.state))
  }

  handleSubmit = type => {
    console.log(type);
    const credits = {
      email: this.state.login,
      username: this.state.login,
      password: this.state.password
    }
    axios.post(this.state.urlAuth + type, JSON.stringify(credits))
      .then(res => {
        console.log(res.data)
        if(res.data.error){
          this.setState({

          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route exact path="/">
          { this.state.isAuth ? <Home isAuth={this.state.isAuth} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" render={ () => <Login msg={this.state.msg} onCheckboxToggleChange={this.onCheckboxToggleChange} onInputChange={this.onInputChange} valid={this.state.valid} handleSubmit={this.handleSubmit} type="login" />}/>
        <Route path="/signup" render={ () => <Login msg={this.state.msg} onCheckboxToggleChange={this.onCheckboxToggleChange} onInputChange={this.onInputChange} valid={this.state.valid} handleSubmit={this.handleSubmit} type="signup" />} />
      </Switch>
      </BrowserRouter>
    );
  }
  
}

export default App;
