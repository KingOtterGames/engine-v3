import Themes from './Themes.json'

const change = (theme) => {
    document.documentElement.setAttribute('data-theme', theme)
}

const getList = () => {
    return Themes
}

const Theme = { change, getList }
export default Theme
