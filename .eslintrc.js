module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  parser: 'babel-eslint',
  globals: {
    google: true,
  },
  plugins: [
    'babel',
  ],
  extends: 'airbnb-base',
  rules: {
    /* possible errors */
    'no-console': 'off',

    /* best practises */
    'accessor-pairs': 'error',
    curly: ['error', 'all'],
    'no-alert': 'error',
    'no-div-regex': 'error',
    // "no-magic-numbers": "error", // "error" to byłby cud
    'no-new': 'off', // "error" to byłby cud
    'no-param-reassign': 'off', // "error" to byłby cud
    'vars-on-top': 'off',
    'wrap-iife': ['error', 'inside', { functionPrototypeMethods: false }],

    /* stylistic issues */
    'consistent-this': ['error', '_this'],
    'func-names': 'off',
    indent: ['error', 2, { SwitchCase: 1 }],
    'max-depth': ['error', 3],
    'max-len': ['error', 120, 2, { ignoreComments: true }],
    'max-nested-callbacks': [2, 3],
    'max-params': ['error', 5],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'no-bitwise': ['error', { int32Hint: true }],
    'no-mixed-operators': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'padded-blocks': ['error', { classes: 'always', blocks: 'never', switches: 'never' }],

    /* es6 */
    // "prefer-arrow-callback": "off",
    // "prefer-template": "off",
    'arrow-parens': ['error', 'as-needed'],
    // "prefer-destructuring": "off", // można się jeszcze przyjrzeć

    /* babel on, airbnb off */
    semi: 'off',
    'babel/semi': ['error', 'always'],
    quotes: 'off',
    'babel/quotes': ['error', 'single', { avoidEscape: true }],
  },
};
