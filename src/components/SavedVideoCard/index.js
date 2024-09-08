import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const SavedVideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
  const {name} = channel
  const publishedTime = formatDistanceToNow(new Date(publishedAt))
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <p>{title}</p>
        <p>{viewCount}</p>
        <p>{name}</p>
        <p>{publishedTime}</p>
      </li>
    </Link>
  )
}
export default SavedVideoCard
