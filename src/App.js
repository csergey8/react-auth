import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import ContainerComponent from './components/ContainerComponent';
import Home from "./components/Home";
import Login from "./components/Login";
import axios from "axios";

class App extends React.Component {
  state = {
    isAuth: true,
    formData: {
      login: '',
      password: '',
      remember: false,
    },
    valid: false,
    urlAuth: '/api/',
    errorMsg: null,
  };

  componentDidMount() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if(token) {
      axios.post(`${this.state.urlAuth}/auth`)
        .then(res => {
          if (res.data.error) {
            this.setState({
              errorMsg: res.data.error.msg,
            });
          } else {
            if(res.data.user) {
              this.setState({
                isAuth: true
              })
            }
          }
        })
    }
  }
  onInputChange = e => {
    this.setState(
      {
        formData: {
          ...this.state.formData,
          [e.target.name]: e.target.value,
        },
      },
      () => {
        console.log(this.state)
        if (this.state.formData.login && this.state.formData.password) {
          this.setState({
            valid: true,
          });
        } else {
          this.setState({
            valid: false,
          });
        }
      }
    );
  };

  handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    this.setState({
      isAuth: false,
    });
  };

  onCheckboxToggleChange = () => {
    this.setState({
      formData: {
        ...this.state.formData,
        remember: !this.state.formData.remember,
      },
    });
  };

  handleSubmit = type => {
    const credits = {
      email: this.state.formData.login,
      password: this.state.formData.password,
    };
    axios
      .post(this.state.urlAuth + type, JSON.stringify(credits))
      .then(res => {
        if (res.data.error) {
          this.setState({
            errorMsg: res.data.error.msg,
          }, () => setTimeout(() => this.setState({
            errorMsg: null
          })), 4000);
        } else {
          if(res.data.user) {
            this.setState({
              isAuth: true,
              formData: {
                login: null,
                password: null,
                remember: false,
              }
            })
          if(this.state.remember) {
            localStorage.setItem('authToken', res.data.user.token)
          } else {
            sessionStorage.setItem('authToken', res.data.user.token)
          }
        }
        }
      })
      .catch(err => {
        this.setState({
          errorMsg: err.toString(),
            formData: {
              login: '',
              password: '',
              remember: false,
            }
        }, () => setTimeout(() => {this.setState({
          errorMsg: null
        })}), 4000)
        });
  };
  render() {
    return (
      <ContainerComponent>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              {this.state.isAuth ? (
                <Home
                  isAuth={this.state.isAuth}
                  handleLogout={this.handleLogout}
                />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
            <Route path="/login">
              {this.state.isAuth ? (
                <Redirect to="/" />
              ) : (
                <Login
                  msg={this.state.msg}
                  onCheckboxToggleChange={this.onCheckboxToggleChange}
                  onInputChange={this.onInputChange}
                  valid={this.state.valid}
                  handleSubmit={this.handleSubmit}
                  type="login"
                  checked={this.state.formData.remember}
                  errorMsg={this.state.errorMsg}
                  loginValue={this.state.formData.login}
                  passwordValue={this.state.formData.password}
                />
              )}
            </Route>
            <Route path="/signup">
              {this.state.isAuth ? (
                <Redirect to="/" />
              ) : (
                <Login
                  msg={this.state.msg}
                  onCheckboxToggleChange={this.onCheckboxToggleChange}
                  onInputChange={this.onInputChange}
                  valid={this.state.valid}
                  handleSubmit={this.handleSubmit}
                  type="signup"
                  checked={this.state.formData.remember}
                  errorMsg={this.state.errorMsg}
                  loginValue={this.state.formData.login}
                  passwordValue={this.state.formData.password}
                />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </ContainerComponent>
    );
  }
}

export default App;
