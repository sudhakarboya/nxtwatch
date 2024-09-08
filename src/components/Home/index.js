import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeVideoCard from '../HomeVideoCard'
import {HomeContainer} from './styledComponents'
import SavedVideosContext from '../../context/SavedVideosContext'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    videosList: [],
    searchInput: '',
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getHomeVideos()
  }

  onRequestSuccess = videos => {
    const updVideos = videos.map(eachVideo => ({
      id: eachVideo.id,
      title: eachVideo.title,
      thumbnailUrl: eachVideo.thumbnail_url,
      channel: {
        name: eachVideo.channel.name,
        profileImgUrl: eachVideo.channel.profile_image_url,
      },
      viewCount: eachVideo.view_count,
      publishedAt: eachVideo.published_at,
    }))
    this.setState({videosList: updVideos, apiStatus: apiConstants.success})
  }

  getHomeVideos = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {searchInput} = this.state

    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
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
            <HomeVideoCard key={each.id} videoDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderHome = () => {
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
          const changeSearchInput = event => {
            this.setState({searchInput: event.target.value})
          }

          return (
            <HomeContainer isDark={isDarkTheme} data-testid="home">
              <Header />
              <input
                type="search"
                placeholder="Search"
                onChange={changeSearchInput}
              />
              {this.renderHome()}
            </HomeContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}
export default Home
