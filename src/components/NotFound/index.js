import SavedVideoContext from '../../context/SavedVideosContext'

const NotFound = () => {
  const getImageUrl = isDark => {
    const url = isDark
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
    return url
  }
  return (
    <SavedVideoContext.Consumer>
      {value => {
        const {isDarkTheme} = value
        const imgUrl = getImageUrl(isDarkTheme)
        return (
          <div>
            <img src={imgUrl} alt="not found" />
            <h1>Page Not Foud</h1>
            <p>We are sorry, the page you requested could not be found.</p>
          </div>
        )
      }}
    </SavedVideoContext.Consumer>
  )
}
export default NotFound
