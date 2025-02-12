import { Film, PlayCircle } from 'react-feather'
import { httpGet } from '@/utils/http'
import { useDispatch } from 'react-redux'
import { addSongs, setPlaying } from '@/stores/modules/playerStore'
import { formatTimes } from '@/utils/FormatTime'
import './style.scss'
import { Col, Row } from 'antd'
import LazyImage from '../LazyImage'

export default function KingTable({ data, style, className }) {
  const dispatch = useDispatch()

  // 播放音乐
  function playMusic(item) {
    httpGet(`/song/url/v1?id=${item.id}&level=exhigh`).then(({ data }) => {
      const songs = Object.assign({}, item, { src: data[0].url })
      dispatch(addSongs(songs))
      dispatch(setPlaying(true))
    })
  }

  return (
    <>
      <Row>
        <div style={style} className={`w-full single-box ${className}`}>
          {data.map((item) => (
            <div
              className='flex single-item'
              key={item.id}
              onDoubleClick={() => playMusic(item)}
            >
              <Col span={8} className='textoverflow'>
                <div className='cover'>
                  <LazyImage
                    className='yx-shadow'
                    src={item.cover + '?param=28y28'}
                  />
                  <span className='ml-10 textoverflow'>{item.title}</span>
                </div>
              </Col>
              <Col span={8} className='textoverflow'>
                {item.singer}
              </Col>
              <Col span={4}>{formatTimes(item.time)}</Col>
              <Col span={4}>
                <div className='flex items-center justify-flexend'>
                  <PlayCircle onClick={() => playMusic(item)} />
                  {item.mv !== 0 ? <Film className='ml-10' /> : null}
                </div>
              </Col>
            </div>
          ))}
        </div>
      </Row>
    </>
  )
}
