import Modules from '../../modules'
const ModuleKeys = Object.keys(Modules)

const reducer = (state, action) => {
    return JSON.parse(JSON.stringify(action.action(state, action.payload)))
}

const update = (dispatch, deltaTime) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ action: Modules[Module].onUpdate, payload: deltaTime })
    })
}

const fixedUpdate = (dispatch) => {
    ModuleKeys.forEach((Module) => {
        dispatch({ action: Modules[Module].onFixedUpdate })
    })
}

export const Dispatcher = {
    reducer,
    update,
    fixedUpdate,
}
export default Dispatcher
