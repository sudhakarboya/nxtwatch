import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import ReactPlayer from 'react-player'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike} from 'react-icons/ai'
import {BiDislike} from 'react-icons/bi'
import {GrSave} from 'react-icons/gr'
import Header from '../Header'
import {VarientButton, TrendingContainer} from './styledComponents'

import SavedVideosContext from '../../context/SavedVideosContext'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItem: {},
    apiStatus: apiConstants.initial,
    isLikeActive: false,
    isDislikeActive: false,
    isSaveActive: false,
  }

  componentDidMount() {
    this.getVideoItem()
  }

  onRequestSuccess = video => {
    const updVideo = {
      id: video.id,
      title: video.title,
      videoUrl: video.video_url,
      thumbnailUrl: video.thumbnail_url,
      channel: {
        name: video.channel.name,
        profileImgUrl: video.channel.profile_image_url,
        subscriberCount: video.channel.subscriber_count,
      },
      viewCount: video.view_count,
      publishedAt: video.published_at,
      description: video.description,
    }
    this.setState({videoItem: updVideo, apiStatus: apiConstants.success})
  }

  getVideoItem = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`
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
      this.onRequestSuccess(data.video_details)
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

  playVideo = () => {
    const {videoItem} = this.state
    const {videoUrl} = videoItem
    return <ReactPlayer url={videoUrl} />
  }

  changeLikeActive = () => {
    this.setState(prevState => ({isLikeActive: !prevState.isLikeActive}))
  }

  changeDislikeStatus = () => {
    this.setState(prevState => ({isDislikeActive: !prevState.isDislikeActive}))
  }

  changeSaveStatus = () => {
    this.setState(prevState => ({isSaveActive: !prevState.isSaveActive}))
  }

  renderSuccessView = () => {
    const {videoItem, isLikeActive, isDislikeActive, isSaveActive} = this.state
    const {
      id,
      title,
      thumbnailUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoItem
    const {name, profileImgUrl, subscriberCount} = channel
    const publishedTime = formatDistanceToNow(new Date(publishedAt))

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {saveVideo, deleteSavedVideo, savedVideos} = value
          const video = savedVideos.find(each => each.id === id)
          const videoSaving = () => {
            if (video !== undefined) {
              deleteSavedVideo(id)
            }
            saveVideo(videoItem)
          }

          return (
            <div>
              <p>{title}</p>
              <button type="button" onClick={this.playVideo}>
                <img src={thumbnailUrl} alt="video thumbnail" />
              </button>
              <p>{viewCount}</p>
              <p>{description}</p>
              <p>{name}</p>
              <img src={profileImgUrl} alt="channel logo" />
              <p>{subscriberCount}</p>
              <p>{publishedTime}</p>
              <VarientButton
                type="button"
                isActive={isLikeActive}
                onClick={this.changeLikeActive}
              >
                <AiOutlineLike />
                Like
              </VarientButton>
              <VarientButton
                type="button"
                isActive={isDislikeActive}
                onClick={this.changeDislikeStatus}
              >
                <BiDislike />
                Dislike
              </VarientButton>
              <VarientButton
                type="button"
                isActive={isSaveActive}
                onClick={videoSaving}
              >
                <GrSave />
                Save
              </VarientButton>
            </div>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  renderTrend = () => {
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
            <TrendingContainer isDark={isDarkTheme} data-testid="trending">
              <Header />
              {this.renderTrend()}
            </TrendingContainer>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }
}
export default VideoItemDetails
