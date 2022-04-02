const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const path = require("path");
if (process.env.NODE_ENV !== "production") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}
let mainWindow;
let newProductWindow;
let shortcutKey = process.platform == "darwin" ? "command" : "Ctrl";

const templateMenu = [
  {
    label: "Products",
    submenu: [
      {
        label: "New Product",
        accelerator: shortcutKey + "+N",
        click() {
          openNewProductWindow();
        },
      },
      {
        label: "Remove ALL products",
        click() {
          mainWindow.webContents.send("product:remove-all");
        },
      },
      {
        label: "Exit",
        accelerator: shortcutKey + "+Q",
        click() {
          app.quit();
        },
      },
    ],
  },
];
if (process.platform == "darwin") {
  templateMenu.unshift({
    label: app.getName(),
  });
}
if (process.env.NODE_ENV !== "production") {
  templateMenu.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Show/Hide",
        accelerator: shortcutKey + "+D",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        role: "reload",
      },
    ],
  });
}
function openNewProductWindow() {
  newProductWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 400,
    height: 400,
    title: "New Product",
  });
  //   newProductWindow.setMenu(null);
  newProductWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/newprod.html"),
      protocol: "file",
      slashes: true,
    })
  );
  newProductWindow.on("closed", () => {
    newProductWindow = null;
  });
}
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  const menu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(menu);
  mainWindow.on("closed", () => {
    app.quit();
  });
});

ipcMain.on("product:new", (e, product) => {
  mainWindow.webContents.send("product:new", product);
  newProductWindow.close();
});
