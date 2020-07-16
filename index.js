const electron = require('electron');
const YoutubeDl = require("./YoutubeDl");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const youtubeDlInst = new YoutubeDl();
let mainWindow;

const ipc = electron.ipcMain;
const dialog = electron.dialog;
// Le reste de notre code (ouverture de fenêtre, etc) …
function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1000, height: 800, 
    webPreferences: {
    nodeIntegration: true,
    enableRemoteModule: true
    }}
);
  //mainWindow.webContents.openDevTools()

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

}

app.on('ready', createWindow);

ipc.on("setLink", (event, arg) => {
  youtubeDlInst.setLink(arg);
  youtubeDlInst.getInfo().then(_res => {
    event.sender.send("moviesData", _res);
  }).catch(_err => {
    event.sender.send("error", _err);
  })
});

ipc.on("selectDir", (event, _res) => {
  youtubeDlInst.setDirectory(_res[0]);
});

ipc.on("download", (event, arg) => {
  console.log("dl");
  youtubeDlInst.downloadLink();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});