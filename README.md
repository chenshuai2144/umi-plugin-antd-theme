# umi-plugin-antd-theme

[![NPM version](https://img.shields.io/npm/v/umi-plugin-antd-theme.svg?style=flat)](https://npmjs.org/package/umi-plugin-antd-theme) [![NPM downloads](http://img.shields.io/npm/dm/umi-plugin-antd-theme.svg?style=flat)](https://npmjs.org/package/umi-plugin-antd-theme)

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: [
    [
      'umi-plugin-antd-theme',
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
        min: false, //default true
      },
    ],
  ],
};
```

## LICENSE

MIT
