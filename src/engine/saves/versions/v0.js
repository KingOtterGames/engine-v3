const DefaultSave = {
    version: 0,
    name: '',
    tab: '',
    subtab: '',
}

const convertPreviousVersion = (PreviousVersion) => {
    return DefaultSave
}

const V0Save = { DefaultSave, convertPreviousVersion }
export default V0Save
