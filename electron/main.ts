import {app, BrowserWindow, dialog} from 'electron';
import * as path from 'path';
import * as isDev from 'electron-is-dev';

const {autoUpdater} = require("electron-updater");

let win: BrowserWindow;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    });


    if (isDev) {
        win.loadURL('http://localhost:3000/index.html');
    } else {
        win.loadURL(`file://${__dirname}/../index.html`);
    }

    win.on('closed', () => win = new BrowserWindow());

    // For hot-reloading
    if (isDev) {
        require('electron-reload')(__dirname, {
            electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
            forceHardReset: true,
            hardResetMethod: 'exit'
        });
    }
}

// Auto update feature
autoUpdater.requestHeaders = {"PRIVATE-TOKEN": "your-gitlab-token"};
autoUpdater.autoDownload = true;

autoUpdater.on('update-downloaded', () => {
    console.log("Leaving and restarting")
})

autoUpdater.on('update-available', () => {
    dialog.showMessageBox(
        win,
        {
            message: "Un update is available, do you want to download and restart the app ?",
            buttons: ["Update now", "Remind me later"],
            defaultId: 0,
            cancelId: 1
        })
        .then(result => {
                if (result.response === 0) {
                    autoUpdater.quitAndInstall()
                } else if (result.response === 1) {
                    // bound to buttons array
                    console.log("Cancel button clicked.");
                }
            }
        );
});

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify().then((r: any) => {
        console.log("checkForUpdatesAndNotify : " + r)
    }).catch((err: any) => {
        console.log(err)
    });
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
