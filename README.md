# CK-Music-Player

## 前言
这是一个轻量级的 react 音乐播放器，前端使用 react，后端采用 [网易云音乐 NODEJS API](https://github.com/Binaryify/NeteaseCloudMusicApi) 制作

有 Bug 和建议和其他问题都可以在 issue 提出

本项目开源免费，仅用作学习和交流

本项目的架构选型比较烂，未来有机会而且有空的话会发布重写的版本或者直接重构该播放器

## 开始构建使用

### 克隆项目到本地

**请注意务必要使用 yarn 作为包管理器！**

```bash
git clone git@github.com:Coder-King3/CK-Music-Player.git
cd CK-Music-Player
yarn
```

### 启动项目

```shell

yarn dev

```

### 设置后台接口地址

第一个：网易云 NODEJS 服务器，到 `.env.development` 将其设置为你的网易云后台 API 地址
```shell

# api接口请求地址
VITE_API_URL = 'https://netease-cloud-music-api-coderking3.vercel.app'

```

### 打包发布

``` shell

yarn build

```
