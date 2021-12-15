import { Badge, Button, Modal, Popover } from 'antd'
import { useEffect, useState } from 'react'
import { IMAGE_BASE_URL, POSTER_RATIO } from '../constants/MoviePoster'
import { getGenresFromMovie } from '../utils/MovieUtils'
import {
    DeleteFilled,
    SmileFilled,
    StarFilled,
    ExclamationCircleOutlined,
} from '@ant-design/icons'
import { useMyListContext } from '../contexts/MyListProvider'
import './MyListItem.css'

function MyListItem({ movie }) {
    const { removeFromMyList } = useMyListContext()

    const [isLoading, setLoading] = useState(false)
    const [isModalVisible, setModalVisible] = useState(true)
    const [genres, setGenres] = useState([])

    const { LARGE } = POSTER_RATIO
    const name = movie.title ?? movie.name ?? movie.original_name

    const handleRemove = () => {
        Modal.confirm({
            title: `Remove '${name}' from my list`,
            icon: <ExclamationCircleOutlined />,
            visible: { isModalVisible },
            content: `Are you sure to remove '${name}' from my list?`,
            okText: 'Confirm',
            cancelText: 'Cancel',
            onCancel: () => setModalVisible(false),
            onOk: () => {
                removeFromMyList(movie)
                setModalVisible(false)
            },
        })
    }

    useEffect(() => {
        async function fetchData() {
            const movieGenres = await getGenresFromMovie(movie)
            setGenres(movieGenres)
        }
        if (movie) fetchData()
    }, [movie])

    return (
        <>
            {isLoading ? null : (
                <div className="my_list_item">
                    <img
                        style={{
                            ...LARGE,
                        }}
                        src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                        onLoad={() => {
                            setLoading(false)
                        }}
                        alt={movie.title}
                    />
                    <div className="my_list_content">
                        <div className="my_list_header">
                            <div>
                                <h2>{name}</h2>

                                <div className="popover_badge my_list_badge">
                                    {genres.map((genre) => (
                                        <Badge count={genre} key={genre} />
                                    ))}
                                </div>
                                <div className="popover_status_group my_list_status">
                                    <Popover content="Rating">
                                        <div className="popover_status">
                                            <StarFilled />
                                            {movie.vote_average}
                                        </div>
                                    </Popover>
                                    <Popover content="Vote count">
                                        <div className="popover_status">
                                            <SmileFilled />
                                            {movie.vote_count}
                                        </div>
                                    </Popover>
                                </div>
                            </div>
                            <Button
                                icon={<DeleteFilled />}
                                size="small"
                                onClick={handleRemove}
                                style={{ width: 'max-content' }}
                            >
                                Remove from my list
                            </Button>
                        </div>
                        <p className="my_list_description">{movie.overview}</p>
                    </div>
                </div>
            )}
        </>
    )
}
export default MyListItem
