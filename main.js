const { app, BrowserWindow, session, shell, Menu } = require('electron');
const path = require('path');

// Mahalliy tarmoqda (LAN) ulanish ishonchli bo'lishi uchun haqiqiy lokal IP'larni yashirmaymiz
app.commandLine.appendSwitch('disable-features', 'WebRtcHideLocalIpsWithMdns');

// Portable rejim: sozlamalar EXE yonidagi papkada saqlanadi
if (process.env.PORTABLE_EXECUTABLE_DIR) {
  app.setPath('userData', path.join(process.env.PORTABLE_EXECUTABLE_DIR, 'P2PChat-data'));
}

const gotLock = app.requestSingleInstanceLock();
if (!gotLock) app.quit();

function createWindow() {
  Menu.setApplicationMenu(null);
  const win = new BrowserWindow({
    width: 980,
    height: 720,
    minWidth: 360,
    minHeight: 520,
    backgroundColor: '#0f1720',
    autoHideMenuBar: true,
    title: 'P2P Chat',
    webPreferences: { contextIsolation: true, nodeIntegration: false, sandbox: true }
  });
  win.loadFile(path.join(__dirname, 'www', 'index.html'));
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (!url.startsWith('file://')) e.preventDefault();
  });
}

app.whenReady().then(() => {
  const allowed = ['media', 'audioCapture', 'videoCapture', 'clipboard-sanitized-write'];
  session.defaultSession.setPermissionRequestHandler((wc, permission, cb) => cb(allowed.includes(permission)));
  session.defaultSession.setPermissionCheckHandler((wc, permission) => allowed.includes(permission));
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('second-instance', () => {
  const [w] = BrowserWindow.getAllWindows();
  if (w) { if (w.isMinimized()) w.restore(); w.focus(); }
});

app.on('window-all-closed', () => app.quit());
