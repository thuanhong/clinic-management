module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parser: 'babel-eslint',
  env: {
    browser: false,
    node: true,
    es6: true,
    mocha: false,
  },
  parserOptions: {
    sourceType: 'module',
  },
  ecmaFeatures: {
    arrowFunctions: true,
    blockBindings: true,
    classes: true,
    defaultParams: true,
    modules: true,
    spread: true,
    globalReturn: true,
  },
  rules: {
    'valid-jsdoc': [
      'error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: true,
        requireReturnDescription: true,
        preferType: {
          String: 'string',
          object: 'Object',
        },
      },
    ],
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    'no-undef': 0,
    'no-var': 1,
    'no-eval': 'error',
    'react/prop-types': 0,
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'no-console': ['error', { allow: ['warn', 'info'] }],
    'space-before-function-paren': ['error', 'never'],
    'padded-blocks': ['error', 'always'],
    'prefer-arrow-callback': [0, { allowNamedFunctions: true }],
    'func-names': ['error', 'never'],
    'no-use-before-define': [
      'error',
      {
        functions: true,
        classes: true,
      },
    ],
    'max-nested-callbacks': ['error', 5],
  },
};
