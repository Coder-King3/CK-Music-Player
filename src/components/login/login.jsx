import './style.scss'
import { httpGet, httpPost } from '@/utils/http.js'
import { useEffect, useState } from 'react'
import { Avatar, message } from 'antd'

// eslint-disable-next-line react/prop-types
function Login({ modelValue, onModelValue, onLogin }) {
  // 当前登录方式
  const [isCurrent, setCurrent] = useState('qrcode')
  // 登录的数据
  const [loginForm, setLoginForm] = useState({
    phone: '',
    captcha: '',
  })
  // 二维码
  const [qrurl, setQrUrl] = useState('')
  const [Tips, setTips] = useState({
    message: '等待扫描二维码...',
    avatarUrl: '',
    nickname: '',
  })
  // 验证码
  const [countdown, setCountdown] = useState(60)
  const [isCounting, setIsCounting] = useState(false)
  //二维码登录
  useEffect(() => {
    if (isCurrent !== 'qrcode' || !modelValue) return
    const fetchQrCode = async () => {
      // 如果没有unikey就重新获取
      let key = localStorage.getItem('unikey') || ''
      if (!key) {
        const { data } = await httpGet('/login/qr/key')
        key = data.unikey
        localStorage.setItem('unikey', key)
      }
      // 获取二维码
      const { data } = await httpGet(`/login/qr/create?key=${key}&qrimg=true`)
      setQrUrl(data.qrimg)
    }

    // 检查二维码状态
    const checkQrCode = async () => {
      const enumeration = {
        800: 'Qr code expired',
        801: 'Wait to scan code...',
        802: 'verify',
        803: 'Authorized login successful',
      }

      let key = localStorage.getItem('unikey') || ''
      const { code, nickname, avatarUrl } = await httpGet(
        `/login/qr/check?key=${key}`
      )
      let message = enumeration[code]
      setTips({ message, nickname, avatarUrl })
      // 如果二维码过期就重新获取
      if (code === 800) {
        const { data } = await httpGet('/login/qr/key')
        key = data.unikey
        localStorage.setItem('unikey', key)
      } else if (code == 802) {
        console.log('授权中')
      } else if (code == 803) {
        // 授权完成就关闭登录窗口
        onLogin(true)
        onModelValue(false)
      }
    }

    fetchQrCode()
    // 五秒轮询二维码状态
    const intervalId = setInterval(checkQrCode, 5000)
    // 清除轮询
    return () => {
      clearInterval(intervalId)
    }
  }, [isCurrent, modelValue])

  // 验证码倒计时
  const startCountdown = () => {
    setIsCounting(true)
    setCountdown(60)
  }

  useEffect(() => {
    let intervalId

    if (isCounting) {
      intervalId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1)
      }, 1000)
    }

    return () => {
      clearInterval(intervalId)
    }
  }, [isCounting])

  useEffect(() => {
    if (countdown === 0) {
      setIsCounting(false)
    }
  }, [countdown])

  // 验证码登录
  const handleSubmit = (event, type) => {
    event.preventDefault()
    if (type === 'captcha') {
      // 验证验证码
      httpPost(`/captcha/verify`, {
        phone: loginForm.phone,
        captcha: loginForm.captcha,
      }).then(({ data }) => {
        if (data) {
          httpPost('/login/cellphone', {
            phone: loginForm.phone,
            captcha: loginForm.captcha,
          }).then(() => {
            // 通知父组件，让父组件刷新登录数据
            onLogin(true)
            onModelValue(false)
          })
        } else {
          message.info('验证码错误')
        }
      })
    }
  }

  // 发送验证码
  function sendCaptcha() {
    httpPost(`/captcha/sent`, {
      phone: loginForm.phone,
    }).then(({ data }) => {
      if (data) {
        startCountdown()
      }
    })
  }

  const ckBtn = (type) => {
    setCurrent(type.toLowerCase())
  }

  return (
    <>
      {modelValue && (
        <div className='login'>
          <div
            className={`popup-container`}
            onClick={() => onModelValue(false)}
          ></div>
          <div className='popup-content'>
            <div
              className={`container ${
                isCurrent !== 'qrcode' ? 'right-panel-active' : ''
              }`}
              id='container'
            >
              <div className='form-container sign-up-container'>
                <form onSubmit={(event) => handleSubmit(event, 'captcha')}>
                  <h1 style={{ color: '#000' }}>手机号登录</h1>
                  <span style={{ color: '#000' }}>输入手机号获取验证码</span>
                  <div className='mx-20'>
                    <input
                      value={loginForm.phone}
                      onChange={(event) =>
                        setLoginForm({
                          ...loginForm,
                          phone: event.target.value,
                        })
                      }
                      placeholder='请输入手机哈'
                    />
                    <div className='captcha-box'>
                      <input
                        value={loginForm.captcha}
                        onChange={(event) =>
                          setLoginForm({
                            ...loginForm,
                            captcha: event.target.value,
                          })
                        }
                        placeholder='请输入验证码'
                      />
                      <button onClick={sendCaptcha} disabled={isCounting}>
                        {isCounting ? `${countdown}` : '获取'}
                      </button>
                    </div>
                  </div>
                  <button type='submit'>登录</button>
                </form>
              </div>
              <div className='form-container sign-in-container'>
                <form onSubmit={(event) => handleSubmit(event, 'qrcode')}>
                  <h1 style={{ color: '#000' }}>验证码登录</h1>
                  <span style={{ color: '#000' }}>
                    使用手机版网易云扫描二维码
                  </span>
                  <div className='mx-20'>
                    <img src={qrurl} alt='' width={200} height={200} />
                    <div className='flex flex-col items-center'>
                      <span className='mb-10'>{Tips.message}</span>
                      {Tips.avatarUrl && (
                        <Avatar className='mb-10' src={Tips.avatarUrl} />
                      )}
                      <span>{Tips.nickname}</span>
                    </div>
                  </div>
                </form>
              </div>
              <div className='overlay-container'>
                <div className='overlay'>
                  <div className='overlay-panel overlay-left'>
                    <h1>你好，音乐者！</h1>
                    <p>快使用二维码登录吧！</p>
                    <button
                      className='ghost'
                      id='signIn'
                      onClick={() => ckBtn('qrcode')}
                    >
                      二维码登录
                    </button>
                  </div>
                  <div className='overlay-panel overlay-right'>
                    <h1>你好，音乐者！</h1>
                    <p>用验证码登录，享受音乐的海洋！</p>
                    <button
                      className='ghost'
                      id='signUp'
                      onClick={() => ckBtn('captcha')}
                    >
                      验证码登录
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Login
