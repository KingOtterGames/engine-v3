import { useEffect, useState } from 'react'
import './App.css'
import Game from './views/4. Views/Game/Game'
import Saves from './engine/saves/Saves'

function App() {
    const [save, setSave] = useState(null)

    useEffect(() => {
        Saves.load().then((data) => {
            setSave(data)
        })
    })

    return <div>{save && <Game save={save} />}</div>
}

export default App
