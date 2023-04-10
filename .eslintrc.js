module.exports = {
  root: true,
  extends: ['airbnb', '@react-native-community', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
  ],
  rules: {
    'class-methods-use-this': 'off',
    'comma-dangle': 'off',
    curly: 'off',
    'no-dupe-class-members': 'off',
    'no-extra-semi': 'off',
    'no-fallthrough': ['warn', { commentPattern: 'break[\\s\\w]*omitted' }],
    'no-multi-spaces': 'error',
    'no-empty-function': 'off',
    'no-useless-constructor': 'off',
    'func-call-spacing': ['off', 'off'],
    radix: 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-native/no-inline-styles': 'off', // disallow styles declared within the component itself
    semi: 'off',
    'space-before-function-paren': ['off', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    // Airbnb style guide relaxation,
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.tsx'] }],
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx', '**/scripts/**/*.ts'],
      },
    ],
    'import/no-unresolved': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
    'react/destructuring-assignment': 'off',
    'react/no-unstable-nested-components': 'off',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: true,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsForRegex: ['^draft$', '^state$'],
      },
    ],
  },
}
