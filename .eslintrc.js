const { eslint } = require('@siberiacancode/eslint');

module.exports = {
  ...eslint.node,
  overrides: [
    ...eslint.node.overrides,
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/await-thenable': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-enum-comparison': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/naming-convention': 'off',
        'no-underscore-dangle': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/require-await': 'off',
        'class-methods-use-this': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        'max-classes-per-file': 'off',
        'promise/always-return': ['error', { ignoreLastCallback: true }]
      }
    }
  ]
};
