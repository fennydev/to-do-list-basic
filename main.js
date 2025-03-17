const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, 'index.html')); // Load your To-Do List
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
