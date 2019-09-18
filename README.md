# umi-plugin-ant-theme

[![NPM version](https://img.shields.io/npm/v/umi-plugin-ant-theme.svg?style=flat)](https://npmjs.org/package/umi-plugin-ant-theme) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-ant-theme.svg?style=flat)](https://npmjs.org/package/umi-plugin-ant-theme)

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    [
      'umi-plugin-ant-theme',
      {
        theme: [
          {
            theme: 'dark',
            fileName: 'dark.css',
          },
          {
            fileName: 'mingQing.css',
            modifyVars: {
              '@primary-color': '#13C2C2',
            },
          },
        ],
      },
    ],
  ],
};
```

## Options

TODO

## LICENSE

MIT
