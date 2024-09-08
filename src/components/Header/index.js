import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {FaRegMoon} from 'react-icons/fa'
import {IoSunnyOutline} from 'react-icons/io5'
import SavedVideosContext from '../../context/SavedVideosContext'

const Header = props => {
  const onLogoutAcc = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <SavedVideosContext.Consumer>
      {value => {
        const {isDarkTheme, changeDarkTheme} = value
        const onChangeDarkTheme = () => {
          changeDarkTheme()
        }
        return (
          <div>
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="website logo"
              />
            </Link>
            {isDarkTheme ? (
              <button type="button" onClick={onChangeDarkTheme}>
                <IoSunnyOutline />i
              </button>
            ) : (
              <button type="button" onClick={onChangeDarkTheme}>
                <FaRegMoon />h
              </button>
            )}
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup modal trigger={<button type="button">Logout</button>}>
              {close => (
                <div>
                  <p>Are you sure, you want to logout</p>
                  <button type="button" onClick={() => close()}>
                    Cancel
                  </button>
                  <button type="button" onClick={onLogoutAcc}>
                    Confirm
                  </button>
                </div>
              )}
            </Popup>
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/trending">
                <li>Trending</li>
              </Link>
              <Link to="/gaming">
                <li>Gaming</li>
              </Link>
              <Link to="/saved-videos">
                <li>Saved Videos</li>
              </Link>
            </ul>
            <h1>CONTACT US</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png "
              alt="facebook logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
              alt="twitter logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png "
              alt="linked in logo"
            />
            <p>Enjoy! Now to see your channels and recomendations!</p>
          </div>
        )
      }}
    </SavedVideosContext.Consumer>
  )
}
export default withRouter(Header)
