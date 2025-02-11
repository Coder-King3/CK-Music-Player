import './index.scss'
import { Avatar, Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { httpGet } from '@/utils/http.js'
import { useNavigate } from 'react-router-dom'
import LazyImage from '../../components/LazyImage'

const MusicLibrary = () => {
  // 示例数据
  const [songList, setSongList] = useState([])

  const [playlist, setPlayList] = useState([])
  const Navigate = useNavigate()

  useEffect(() => {
    httpGet('/playlist/track/all?id=8290485579&limit=30&offset=1').then(
      ({ songs }) => {
        setSongList(songs)
      }
    )
    httpGet('/cloudsearch?keywords=草东没有派对&type=1000').then(
      ({ result }) => {
        setPlayList(result.playlists)
      }
    )
  }, [])

  return (
    <div className='music-library-container'>
      <div className='content-container'>
        <Row>
          <Col span={17}>
            <div className='left'>
              <div className='avatar'>
                <div className='bnmsg'>
                  <Avatar shape='square' size={64} src='king.jpg' />
                  <div className='name-box'>
                    <div className='title'>{`king's music taste`}</div>
                    <div className='des'>coderking</div>
                  </div>
                </div>
              </div>
              <div className='banner'>
                <h2 style={{ textAlign: 'left' }}>推荐给你</h2>
                <div className='wrapper-contexts'>
                  <div className='content-wrapper-header-padding dw'>
                    <div className='content-wrapper-context'>
                      <div
                        className='content-text'
                        style={{ maxWidth: '400px' }}
                      >
                        缸里有梦想 缸底有烂账 谁赔了信仰 <br />
                        谁对自己撒谎 谁喝着最便宜的酒去陪葬
                      </div>
                    </div>
                  </div>
                  <div className='content-text_author'>
                    — 草东没有派对《缸》
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col span={7}>
            <div className='right'>
              <h2 style={{ textAlign: 'left' }}>最近收听</h2>
              <div className='songlist'>
                {songList &&
                  songList.map((item) => (
                    <div
                      className='song-item'
                      key={item.id}
                      onClick={() => Navigate('/playlist?id=' + item.id)}
                    >
                      <Avatar
                        shape='square'
                        size={55}
                        src={item.al.picUrl + '?param=52y52'}
                      />
                      <div className='msg'>
                        <div>{item.name}</div>
                        <div>{item.ar.map((item2) => item2.name).join()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='footer--container'>
        <h2 className='mb-10' style={{ textAlign: 'left' }}>
          推荐歌单
        </h2>
        <div className='songlist'>
          {playlist.map((item) => (
            <div
              className='songlist-item'
              key={item.id}
              onClick={() => Navigate('/playlist?id=' + item.id)}
            >
              <LazyImage className='songlist-img' src={item.coverImgUrl} />
              <div className='songlist-title'>
                <div>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MusicLibrary
