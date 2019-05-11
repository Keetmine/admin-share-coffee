module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
        // 'prettier/prettier': ["error", { "singleQuote": true }],
        'no-console': ['error', {allow: ['warn', 'error', 'log', 'info', 'time', 'timeEnd']}],
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',

        indent: [
            'error',
            'tab',
            {
                SwitchCase: 1,
                MemberExpression: 1,
                FunctionDeclaration: {body: 1, parameters: 2},
                CallExpression: {arguments: 'first'},
                ArrayExpression: 1,
                ObjectExpression: 1,
                ImportDeclaration: 1,
                flatTernaryExpressions: true
            }
        ],

        'linebreak-style': ['error', 'unix'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'no-throw-literal': 'error',
        // pattern string
        'prefer-template': 2,

        'require-yield': 0,

        'function-paren-newline': 0,

        'object-curly-newline': 0,

        'no-use-before-define': 0,

        'no-confusing-arrow': 0,

        'max-len': ['error', {code: 120, tabWidth: 4}],

        'import/prefer-default-export': 0,

        'no-duplicate-imports': ['error', {includeExports: true}],

        'import/imports-first': 0,
        'import/newline-after-import': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/extensions': 0,
        'import/no-unresolved': 0,

        'comma-dangle': ['error', 'never'],

        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['error', 'as-needed']
    },
}
