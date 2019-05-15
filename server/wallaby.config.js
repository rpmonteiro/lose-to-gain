module.exports = function(wallaby) {
  const path = require('path')
  process.env.NODE_PATH += path.delimiter + wallaby.projectCacheDir + '/src'

  return {
    files: [
      'tsconfig.json',
      'src/**/*.json',
      'src/**/*.ts',
      { pattern: 'src/**/__tests__/*.ts', ignore: true }
    ],

    tests: ['src/**/__tests__/*.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.ts': wallaby.compilers.typeScript({
        typescript: require('typescript')
      })
    }
  }
}
