module.exports = {
    root: true,
    parserOptions: { ecmaVersion: 2020, sourceType: 'module', ecmaFeatures: { jsx: true } },
    settings: { react: { version: 'detect' } },
    env: { jest: true, browser: true, amd: true, node: true, es6: true },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    rules: {
        'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
        'react/react-in-jsx-scope': 'off',
        'no-prototype-builtins': 'off',
        'prettier/prettier': ['error', { endOfLine: 'auto'}, { usePrettierrc: true }],
        'no-unused-vars': [
            'error',
            {
                "args": "all",
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_"
              },
        ],
        'no-empty': 'off'
    },
}
