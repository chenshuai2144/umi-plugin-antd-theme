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
        // 是否压缩css
        min: true,
        // css module
        isModule: true,
        // 忽略 antd 的依赖
        ignoreAntd: false,
        // 忽略 pro-layout
        ignoreProLayout: false,
        // 不使用缓存
        cache: true,
      },
    ],
  ],
};
```

you can get config in `window.umi_plugin_ant_themeVar`

## LICENSE

MIT
