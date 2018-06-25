import { app, BrowserWindow, ipcMain } from 'electron'
import MenuBuilder from './menu'
import { RTMClient, WebClient } from '@slack/client'

let mainWindow = null

require('dotenv').config()

const token = process.env.SLACK_API_TOKEN

const rtm = new RTMClient(token)
const web = new WebClient(token)

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support')
  sourceMapSupport.install()
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')()
  const path = require('path')
  const p = path.join(__dirname, '..', 'app', 'node_modules')
  require('module').globalPaths.push(p)
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    // await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    transparent: true,
    resizable: true,
    alwaysOnTop: true,
    center: true
  })

  mainWindow.loadURL(`file://${__dirname}/app.html`)

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) throw new Error('"mainWindow" is not defined')
    mainWindow.show()
    mainWindow.focus()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  ipcMain.on('boot', event => {
    rtm.on('message', e => {
      console.log(e)
      event.sender.send('message', e)
    })
    rtm.on('error', e => console.error(e))
    rtm.start()
  })
  mainWindow.on('closed', () => (mainWindow = null))

  const menuBuilder = new MenuBuilder(mainWindow)
  menuBuilder.buildMenu()
})
