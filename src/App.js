import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import SavedVideosContext from './context/SavedVideosContext'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import './App.css'
// Replace your code here

class App extends Component {
  state = {
    savedVideos: [],
    isDarkTheme: false,
  }

  changeDarkTheme = () => {
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  saveVideo = newVideo => {
    this.setState(prevState => ({
      savedVideos: [...prevState.savedVideos, newVideo],
    }))
  }

  deleteSavedVideo = id => {
    const {savedVideos} = this.state
    const filteredVideos = savedVideos.filter(eachVideo => eachVideo.id !== id)
    this.setState({savedVideos: filteredVideos})
  }

  render() {
    const {savedVideos, isDarkTheme} = this.state
    return (
      <SavedVideosContext.Provider
        value={{
          savedVideos,
          isDarkTheme,
          changeDarkTheme: this.changeDarkTheme,
          saveVideo: this.saveVideo,
          deleteSavedVideo: this.deleteSavedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute path="/videos/:id" component={VideoItemDetails} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </SavedVideosContext.Provider>
    )
  }
}

export default App
