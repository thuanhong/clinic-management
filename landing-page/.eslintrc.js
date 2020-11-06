module.exports = {
  "extends": [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  "parser": "babel-eslint",
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": false
  },
  "parserOptions": {
      "sourceType": "module"
  },
  "ecmaFeatures": {
    "arrowFunctions": true,
    "blockBindings": true,
    "classes": true,
    "defaultParams": true,
    "modules": true,
    "spread": true,
    "globalReturn": true,
  },
  "rules": {
    "valid-jsdoc": ["error", {
      "requireReturn": true,
      "requireReturnType": true,
      "requireParamDescription": true,
      "requireReturnDescription": true,
      "preferType": {
        "String": "string",
        "object": "Object",
      }
    }],
    "require-jsdoc": ["error", {
      "require": {
          "FunctionDeclaration": true,
          "MethodDefinition": true,
          "ClassDeclaration": true
      }
    }],
    "no-var": 1,
    "padded-blocks": 0,
    "import/no-unresolved": 0,
    "react/prop-types": 0,
    "no-undef": ["warn"],
    "no-eval": "error",
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "no-console": ["error", { "allow": ["warn", "info"] }],
    "space-before-function-paren": ["error", "never"],
    "prefer-arrow-callback": [0, { "allowNamedFunctions": true }],
    "func-names": ["error", "never"],
    "no-use-before-define": [
      "error", {
        "functions": true,
        "classes": true
      }
    ],
    "max-nested-callbacks": [
      "error",
      5
    ],
  }
}