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
  const { cwd, outputPath, absTmpDirPath } = api.paths;

  const themeTemp = api.winPath(join(absTmpDirPath, 'plugin-theme'));

  // 增加中间件
  api.addMiddlewareAhead(() => {
    return serveStatic(themeTemp);
  });

  // 编译完成之后
  api.onBuildSuccess(() => {
    api.log.pending('💄  build theme');
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
    ).then(() => {
      api.log.success('🎊  build theme success');
    });
  });

  // dev 之后
  api.onDevCompileDone(() => {
    api.log.pending('💄  build theme');
    // 建立相关的临时文件夹
    if (existsSync(themeTemp)) {
      rimraf.sync(themeTemp);
    }
    if (existsSync(api.winPath(join(themeTemp, 'theme')))) {
      rimraf.sync(api.winPath(join(themeTemp, 'theme')));
    }

    mkdirSync(themeTemp, { mode: 33279 });

    mkdirSync(api.winPath(join(themeTemp, 'theme')), { mode: 33279 });

    buildCss(
      cwd,
      options.theme.map(theme => ({
        ...theme,
        fileName: api.winPath(join(themeTemp, 'theme', theme.fileName)),
      })),
      {
        min: false,
        ...options,
      },
    ).then(() => {
      api.log.success('🎊  build theme success');
    });
  });
}
