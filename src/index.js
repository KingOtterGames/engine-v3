import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import Steam from './engine/steam/Steam'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <>
        <App />
        <Steam />
    </>
)
