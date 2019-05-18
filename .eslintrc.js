module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },

    extends: ['airbnb-base', 'eslint:recommended'],
    plugins: ['react'],
    rules: {
        'no-console': ['error', {allow: ['warn', 'error', 'log', 'info', 'time', 'timeEnd']}],

        quotes: ['error', 'single'],
        'max-len': ['error', {code: 120, tabWidth: 4}],

        'no-duplicate-imports': ['error', {includeExports: true}],
        'import/imports-first': 0,
        'import/newline-after-import': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0
    },
}
