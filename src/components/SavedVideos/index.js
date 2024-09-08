import SavedVideosContext from '../../context/SavedVideosContext'
import SavedVideoCard from '../SavedVideoCard'

const SavedVideos = () => (
  <SavedVideosContext.Consumer>
    {value => {
      const {savedVideos} = value
      return (
        <div>
          <h1>Saved Videos</h1>
          {savedVideos.length > 0 ? (
            <div>
              <ul>
                {savedVideos.map(each => (
                  <SavedVideoCard key={each.id} videoDetails={each} />
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
              />
              <h1>No saved videos found</h1>
              <p>You can save your videos while watching them</p>
            </div>
          )}
        </div>
      )
    }}
  </SavedVideosContext.Consumer>
)
export default SavedVideos
