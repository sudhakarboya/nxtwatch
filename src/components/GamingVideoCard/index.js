import {Link} from 'react-router-dom'

const GamingVideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails

  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <p>{title}</p>
        <p>{viewCount}</p>
      </li>
    </Link>
  )
}
export default GamingVideoCard
