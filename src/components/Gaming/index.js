import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import GamingVideoCard from '../GamingVideoCard'
import {GamingContainer} from './styledComponents'
import SavedVideosContext from '../../context/SavedVideosContext'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Gaming extends Component {
  state = {
    videosList: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getGamingVideos()
  }

  onRequestSuccess = videos => {
    const updVideos = videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      viewCount: eachVideo.view_count,
    }))
    this.setState({videosList: updVideos, apiStatus: apiConstants.success})
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})

    const url = `https://apis.ccbp.in/videos/gaming`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onRequestSuccess(data.videos)
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" width="50" height="50" />
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failuer view"
      />
      <h1>Opps! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Plaese try again
      </p>
      <button type="button" onClick={this.getHomeVideos}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {videosList} = this.state

    return (
      <div>
        <ul>
          {videosList.map(each => (
            <GamingVideoCard key={each.id} videoDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderGame = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.renderLoader()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {isDarkTheme} = value

          return (
            <GamingContainer isDark={isDarkTheme} data-testid="gaming">
              <Header />
              <h1>Gaming</h1>
              {this.renderGame()}
            </GamingContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}
export default Gaming
