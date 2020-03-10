module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        modules: false,
        // targets: {
        //   // node: true,
        //   browsers: ['defaults', 'last 2 version', 'Firefox > 60', '> 5%', 'cover 99.5%', 'not ie < 8'],
        // },
      },
    ],
    ['@babel/preset-react', {}],
    ['@babel/preset-typescript', {}],
  ],
  plugins: [['@babel/plugin-proposal-class-properties', {}]],
};
