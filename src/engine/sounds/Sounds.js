import { Howl } from 'howler'

function importAll(r) {
    let sounds = {}
    r.keys().forEach((item) => {
        sounds[item.replace('./', '').replace('.mp3', '').replace('.ogg', '').replace('.wav', '')] = r(item)
    })
    return sounds
}

const sounds = importAll(require.context('../../assets/sounds/', true))

let SoundLibrary = {}
let Keys = Object.keys(sounds)
for (let i = 0; i < Keys.length; i++) {
    SoundLibrary[Keys[i]] = new Howl({
        src: sounds[Keys[i]],
        volume: 0.5,
    })
}

const play = (key) => {
    SoundLibrary[key].play()
}

const volume = (level) => {
    let keys = Object.keys(SoundLibrary)
    for (let i = 0; i < keys.length; i++) {
        SoundLibrary[keys[i]].volume(level)
    }
}

const stop = () => {
    let keys = Object.keys(SoundLibrary)
    for (let i = 0; i < keys.length; i++) {
        SoundLibrary[keys[i]].stop()
    }
}

const Sounds = {
    play,
    volume,
    stop,
}

export default Sounds
