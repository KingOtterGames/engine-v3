import ModuleExampleActions from './actions'

describe('ModuleExample actions', () => {
    test('action', () => {
        expect(ModuleExampleActions.example({}, {})).toStrictEqual({})
    })
})
