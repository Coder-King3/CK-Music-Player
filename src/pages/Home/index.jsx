import MkTable from '@/components/Mk-Table/Mk-Table'
import { httpGet } from '@/utils/http'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function App() {
  const [song, setSong] = useState([])
  // header
  const headerLink = [
    { title: '推荐', path: 'home' },
    { title: '音乐库', path: 'ml' },
    { title: '搜索', path: 'search' },
  ]
  const [headerActive, setHeaderActive] = useState(0)
  const [keyword, setKeyword] = useState('')
  const Navigate = useNavigate()

  // 歌单
  const [playlists, setPlayLists] = useState([])
  useEffect(() => {
    httpGet('/playlist/track/all?id=8290485579&limit=30&offset=1').then(
      (data) => {
        console.log(`data:`, data)
        const newData = data.songs.map((item) => {
          const names = item.ar.map((subItem) => subItem.name).join(',')
          const songs = {
            title: item.name,
            singer: names,
            cover: item.al.picUrl,
            time: item.dt,
            album: item.al.name,
            id: item.id,
            mv: item.mv,
            Lyric: item.id,
          }
          return songs
        })
        setSong(newData)
      }
    )

    httpGet('/cloudsearch?keywords=草东没有派对&type=1000').then(
      ({ result }) => {
        setPlayLists(result.playlists)
      }
    )
  }, [])

  function handleHeader(idx, path) {
    setHeaderActive(idx)
    Navigate('/' + path)
  }

  // 搜索
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      Navigate(`/search?keyword=${encodeURIComponent(keyword)}`)
    }
  }
  // 搜索输入
  const handleChange = (event) => {
    setKeyword(event.target.value)
  }
  return (
    <>
      <div className='main-container'>
        <div className='main-header'>
          {/*左标题*/}
          <span className='menu-link-main'>Fruity Music Play</span>
          {/*tabs*/}
          <div className='header-menu'>
            {headerLink.map((item, idx) => (
              <span
                key={idx}
                onClick={() => handleHeader(idx, item.path)}
                className={`main-header-link ${
                  headerActive == idx ? 'is-active' : ''
                }`}
              >
                {item.title}
              </span>
            ))}
          </div>
          {/*搜索*/}
          <div className='search-bar'>
            <input
              type='text'
              onChange={handleChange}
              value={keyword}
              placeholder='Search'
              onKeyDown={handleKeyPress}
            />
          </div>
        </div>
        <div className='content-wrapper'>
          <div className='content-wrapper-header'>
            <div className='content-wrapper-header-padding'>
              <div className='content-wrapper-context'>
                <h3 className='img-content'>草东没有派对</h3>
                <div className='content-text'>
                  草东没有派对（英语：No Party For Cao
                  Dong）是一支台湾的独立摇滚乐团，成军于2012年6月4日，现由巫堵（主唱和吉他）、筑筑（吉他）、鸟人（鼓手）[5]及世暄（贝斯）四人组成。2016年4月发行第一张唱片《丑奴儿》获初步注目及各奖项肯定[6]，包括第28届金曲奖最佳乐团等多项大奖。
                </div>
                <Button
                  style={{ padding: ' 0px 45px' }}
                  className='content-button'
                  shape='round'
                  type='primary'
                >
                  试听专辑
                </Button>
              </div>
            </div>
            <img src='ck-bg.jpg' height={230} />
          </div>
          {/*歌单*/}
          <div className='content-section'>
            <div className='content-section-title'>歌单</div>
            <div className='songs-card'>
              {playlists.map((item) => (
                <div
                  className='song-card'
                  key={item.id}
                  onClick={() => Navigate('/playlist?id=' + item.id)}
                >
                  <img
                    className='song-img yx-shadow'
                    src={`${item.coverImgUrl}?param=300y300`}
                  />
                  <div className='song-des'>
                    <div>
                      <p>{item.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/*歌曲*/}
          {song.length > 0 && (
            <div className='content-section'>
              <div className='content-section-title'>单曲</div>
              <MkTable data={song} style={{ maxHeight: '40vh' }} />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
