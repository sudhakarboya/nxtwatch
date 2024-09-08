import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

const HomeVideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    channel,
    viewCount,
    publishedAt,
  } = videoDetails
  const {name, profileImgUrl} = channel
  const publishedTime = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <p>{title}</p>
        <img src={profileImgUrl} alt="channel logo" />
        <p>{viewCount}</p>
        <p>{publishedTime}</p>
        <p>{name}</p>
      </li>
    </Link>
  )
}
export default HomeVideoCard
