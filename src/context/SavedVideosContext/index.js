import React from 'react'

const SavedVideosContext = React.createContext({
  savedVideos: [],
  isDarkTheme: false,
  changeDarkTheme: () => {},
  savedVideo: () => {},
  deleteSavedVideo: () => {},
})
export default SavedVideosContext
