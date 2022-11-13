module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'react-app',
    'airbnb',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'plugin:import/typescript',
  ],
  plugins: ['jsx-a11y', 'prettier', 'typescript', 'import'],
  rules: {
    'prettier/prettier': ['error', { singleQuote: true }],
    semi: 0,
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/require-default-props': 1,
    'import/prefer-default-export': 1,
    camelcase: 1,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 1,
    'no-use-before-define': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-cycle': 1,
    'no-unused-expressions': 0,
    'no-unused-vars': 1,
    'react-hooks/exhaustive-deps': 0,
    'dot-notation': 1,
    'no-useless-return': 0,
    'react/no-unused-prop-types': 1,
    'no-param-reassign': 1,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'react/prop-types': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};
