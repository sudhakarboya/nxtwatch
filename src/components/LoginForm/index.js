import {Component} from 'react'
import Cookies from 'js-cookie'
import {LoginButton} from './styledComponents'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    isShowError: false,
    errorMsg: '',
    isShowPassword: false,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <div>
        <label htmlFor="username">USERNAME</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={this.changeUsername}
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password, isShowPassword} = this.state
    return (
      <div>
        {isShowPassword ? (
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              type="text"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
            />
          </div>
        ) : (
          <div>
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword}
            />
          </div>
        )}
      </div>
    )
  }

  onRequestSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onRequestSuccess(data.jwt_token)
    } else {
      console.log(data.error_msg)
      this.setState({isShowError: true, errorMsg: data.error_msg})
    }
  }

  render() {
    const {isShowError, errorMsg} = this.state
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
        />
        <form onSubmit={this.onSubmitForm}>
          {this.renderUsername()}
          {this.renderPassword()}
          <input
            type="checkbox"
            id="showPassword"
            onClick={this.onChangeShowPassword}
          />
          <label htmlFor="showPassword">Show Password</label>
          <div>
            <LoginButton type="submit">Login</LoginButton>
          </div>
        </form>
        {isShowError && <p>{errorMsg}</p>}
      </div>
    )
  }
}
export default LoginForm
