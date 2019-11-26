// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from 'umi-types';
import { join } from 'path';
import serveStatic from 'serve-static';
import rimraf from 'rimraf';
import { existsSync, mkdirSync } from 'fs';

const buildCss = require('antd-pro-merge-less');

interface themeConfig {
  theme: 'dark' | 'light';
  fileName: string;
  modifyVars: { [key: string]: string };
}

export default function(
  api: IApi,
  options: {
    theme: themeConfig[];
    min: boolean;
  },
) {
  const { cwd, outputPath, absNodeModulesPath } = api.paths;

  const themeTemp = api.winPath(join(absNodeModulesPath, '.plugin-theme'));
  console.log(themeTemp);
  // 增加中间件
  api.addMiddlewareAhead(() => {
    return serveStatic(themeTemp);
  });

  api.addHTMLHeadScript({
    content: `window.umi_plugin_ant_themeVar = ${JSON.stringify(options.theme)}`,
  });

  // 编译完成之后
  api.onBuildSuccess(() => {
    api.log.pending('💄  build theme');

    try {
      if (existsSync(api.winPath(join(outputPath, 'theme')))) {
        rimraf.sync(api.winPath(join(outputPath, 'theme')));
      }
      mkdirSync(api.winPath(join(outputPath, 'theme')));
    } catch (error) {
      // console.log(error);
    }

    buildCss(
      cwd,
      options.theme.map(
        theme => ({
          ...theme,
          fileName: api.winPath(join(outputPath, 'theme', theme.fileName)),
        }),
        {
          min: true,
          ...options,
        },
      ),
    )
      .then(() => {
        api.log.success('🎊  build theme success');
      })
      .catch(e => {
        console.log(e);
      });
  });

  // dev 之后
  api.onDevCompileDone(() => {
    api.log.pending('💄  build theme');
    // 建立相关的临时文件夹
    try {
      if (existsSync(themeTemp)) {
        rimraf.sync(themeTemp);
      }
      if (existsSync(api.winPath(join(themeTemp, 'theme')))) {
        rimraf.sync(api.winPath(join(themeTemp, 'theme')));
      }

      mkdirSync(themeTemp);

      mkdirSync(api.winPath(join(themeTemp, 'theme')));
    } catch (error) {
      // console.log(error);
    }

    buildCss(
      cwd,
      options.theme.map(theme => ({
        ...theme,
        fileName: api.winPath(join(themeTemp, 'theme', theme.fileName)),
      })),
      {
        ...options,
      },
    )
      .then(() => {
        api.log.success('🎊  build theme success');
      })
      .catch(e => {
        console.log(e);
      });
  });
}
