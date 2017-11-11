/* Infra stuff */
const { app, BrowserWindow } = require("electron");


let mainWindow = null;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 600
        
    });

    mainWindow.openDevTools();
    mainWindow.loadURL(`file://${__dirname}/app/html/index.html`);
});

app.on("window-all-closed", () => {
    app.quit();
});