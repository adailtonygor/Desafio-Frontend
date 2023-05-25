module.exports = {
    presets: [['@babel/preset-env', { targets: { esmodules: true } }]],
    env: { browser: true, jest: true },
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
    ],
    ignorePatterns: ['.eslintrc.cjs'],
};
