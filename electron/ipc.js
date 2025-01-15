const utils = require('./utils')
const fs = require('fs')
const { shell } = require('electron')

const init = (ipcMain, steamClient, gamedir, app) => {
    ipcMain.handle('save', (event, data) => {
        try {
            // String data
            const stringData = JSON.stringify(data)

            // Overwrite save
            fs.writeFileSync(gamedir + '/save.json', stringData, { flag: 'w+' })

            // Add a backup
            const backupdir = gamedir + '/backups'
            const backups = fs.readdirSync(backupdir).sort()

            // Remove last backup if full
            if (backups.length > 100) {
                fs.unlinkSync(backupdir + '/' + backups[0])
            }

            // Write new backup
            try {
                fs.writeFileSync(backupdir + '/' + utils.formatBackupName(), stringData, { flag: 'w+' })
            } catch (err) {
                console.error(err)
            }
        } catch (err) {
            console.error(err)
        }
    })

    ipcMain.handle('load', (event) => {
        return new Promise((res, rej) => {
            try {
                const data = fs.readFileSync(gamedir + '/save.json', 'utf8')
                res(JSON.parse(data))
            } catch (err) {
                res(null)
            }
        })
    })

    ipcMain.handle('remove', (event) => {
        try {
            fs.unlinkSync(gamedir + '/save.json')
        } catch (err) {
            console.error(err)
        }
    })

    ipcMain.handle('achievement', (event, key) => {
        steamClient.achievement.activate(key)
    })

    ipcMain.handle('link', (event, url) => {
        shell.openExternal(url)
    })

    ipcMain.handle('quit', (event) => {
        app.quit()
    })
}

module.exports = { init }
