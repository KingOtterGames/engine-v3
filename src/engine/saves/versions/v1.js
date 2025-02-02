const DefaultSave = {
    version: 1,
    name: '',
    tab: '',
    subtab: '',
}

const convertPreviousVersion = (_PreviousVersion) => {
    return DefaultSave
}

const V1Save = { DefaultSave, convertPreviousVersion }
export default V1Save
