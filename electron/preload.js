const { ipcRenderer, contextBridge } = require('electron')
contextBridge.exposeInMainWorld('api', {
    save: (data) => {
        return ipcRenderer.invoke('save', data)
    },
    load: () => {
        return ipcRenderer.invoke('load')
    },
    remove: () => {
        return ipcRenderer.invoke('remove')
    },
    achievement: (key) => {
        return ipcRenderer.invoke('achievement', key)
    },
    link: (url) => {
        return ipcRenderer.invoke('link', url)
    },
    quit: () => {
        return ipcRenderer.invoke('quit')
    },
})
