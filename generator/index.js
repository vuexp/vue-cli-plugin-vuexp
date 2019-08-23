/* eslint-disable no-console */

const path = require('path');
const fs = require('fs-extra');
const replace = require('replace-in-file');

const newline = process.platform === 'win32' ? '\r\n' : '\n';

module.exports = async (api, options, rootOptions) => {
  const genConfig = {
    // if it is a new project changes will be written as they normally would with any plugin
    // if it is an existing project, changes will be added to the ./vuexp-example directory
    dirPathPrefix: options.isNewProject === true ? './' : './vuexp-example/',

    // simple typescript detection and then variable is passed to multiple templating functions
    // to simply change the file's extension
    jsOrTs: api.hasPlugin('typescript') ? '.ts' : '.js',

    // A template type of 'simple' project will have a base template path that equals: ./templates/simple
    // then we determine if the project is using Nativescript-Vue-Web and we append a subdirectory to the base path
    templateTypePathModifer: options.templateType,

    // Get the location to the native app directory
    nativeAppPathModifier: 'src/',

    // Determine the path to App_Resources
    get appResourcesPathModifier() {
      return this.nativeAppPathModifier + 'App_Resources';
    },

    // setup directories to exclude in the tsconfig.json file(s)
    get tsExclusionArray() {
      return ['node_modules', 'dist', 'platforms', 'hooks', this.appResourcesPathModifier];
    }
  };

  // common render options to be passed to render functions
  const commonRenderOptions = {
    applicationName: api.generator.pkg.name,
    applicationVersion: api.generator.pkg.version,
    applicationAndroidVersionCode: api.generator.pkg.version.split('.').join('0'),
    applicationDescription: api.generator.pkg.description || api.generator.pkg.name,
    applicationLicense: api.generator.pkg.license || 'MIT',
    applicationId: options.applicationId,
    historyMode: options.historyMode,
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript'),
    usingBabel: api.hasPlugin('babel'),
    usingTS: api.hasPlugin('typescript')
  };

  console.log('adding to package.json');

  api.extendPackage({
    nativescript: {
      id: commonRenderOptions.applicationId,
      'tns-ios': {
        version: '6.0.2'
      },
      'tns-android': {
        version: '6.0.1'
      }
    },
    scripts: {
      'build:android': 'npm run setup-webpack-config && tns build android --bundle --env.production && npm run remove-webpack-config',
      'build:ios': 'npm run setup-webpack-config && tns build ios --bundle --env.production && npm run remove-webpack-config',
      'remove-webpack-config': 'node ./node_modules/vue-cli-plugin-vuexp/lib/scripts/webpack-maintenance post',
      'serve:android': 'npm run setup-webpack-config && tns run android --bundle --env.development',
      'serve:ios': 'npm run setup-webpack-config && tns run ios --bundle --env.development',
      // 'inspect:android': 'npm run setup-webpack-config && vue inspect -- --env.android > out-android.js',
      // 'inspect:ios': 'npm run setup-webpack-config && vue inspect -- --env.ios > out-ios.js',
      'debug:android': 'npm run setup-webpack-config && tns debug android --bundle --env.development',
      'debug:ios': 'npm run setup-webpack-config && tns debug ios --bundle --env.development',
      'preview:android': 'npm run setup-webpack-config && tns preview --bundle --env.development --env.android',
      'preview:ios': 'npm run setup-webpack-config && tns preview --bundle --env.development --env.ios',
      'setup-webpack-config': 'node ./node_modules/vue-cli-plugin-vuexp/lib/scripts/webpack-maintenance pre',
      'clean:platforms': 'rimraf platforms',
      'clean:android': 'rimraf platforms/android',
      'clean:ios': 'rimraf platforms/ios'
    },
    dependencies: {
      'nativescript-vue': '~2.4.0',
      vuexp: 'git://github.com/vuexp/vuexp.git#integration/v0.3.1',
      'tns-core-modules': '~6.0.6'
    },
    devDependencies: {
      'nativescript-dev-webpack': '~1.1.0',
      'nativescript-vue-template-compiler': '~2.4.0',
      'nativescript-worker-loader': '~0.9.5',
      'node-sass': '^4.11.0',
      'string-replace-loader': '^2.1.1',
      rimraf: '^2.6.3',
      'sass-loader': '^7.1.0'
      // webpack: '4.28.4',
      // 'webpack-cli': '^3.3.2'
    }
  });

  // add scripts when we are also developing for the web
  api.extendPackage({
    scripts: {
      'serve:web': 'vue-cli-service serve --mode development.web',
      'build:web': 'vue-cli-service build --mode production.web'
      //'inspect:web': 'npm run setup-webpack-config && vue inspect -- --env.web > out-web.js'
    }
  });

  if (rootOptions.router) {
    api.extendPackage({
      dependencies: {
        'vuexp-router': 'git://github.com/vuexp/vuexp-router.git#development'
      }
    });
  }

  if (api.hasPlugin('typescript')) {
    api.extendPackage({
      dependencies: {},
      devDependencies: {
        'fork-ts-checker-webpack-plugin': '^1.3.4',
        'terser-webpack-plugin': '^1.3.0'
        //'tns-platform-declarations': '^4.2.1'
      }
    });

    // this means it's a typescript project and using babel
    if (api.hasPlugin('babel')) {
      api.extendPackage({
        dependencies: {},
        devDependencies: {
          '@babel/types': '^7.4.4'
        }
      });
    }
  }

  // if the project is using babel, then load appropriate packages
  if (api.hasPlugin('babel')) {
    api.extendPackage({
      devDependencies: {
        '@babel/core': '^7.4.5',
        '@babel/preset-env': '^7.4.5',
        'babel-loader': '^8.0.6',
        '@babel/traverse': '^7.4.5'
      }
    });

    api.render(async () => {
      fs.ensureFileSync(genConfig.dirPathPrefix + 'babel.config.js');
      await applyBabelConfig(api, genConfig.dirPathPrefix + 'babel.config.js');
    });
  }

  // if the project is using eslint, add some global variables
  // to the eslintConfig in order to avoid no-def errors
  if (api.hasPlugin('eslint')) {
    api.extendPackage({
      eslintConfig: {
        globals: {
          TNS_APP_MODE: true,
          TNS_APP_PLATFORM: true
        }
      }
    });
  }

  console.log('deleting from package.json');
  api.extendPackage((pkg) => {
    // if the project is using babel, then delete babel-core
    if (api.hasPlugin('babel')) {
      delete pkg.devDependencies['babel-core'];
    }
    // we will be replacing these
    delete pkg.scripts['serve'];
    delete pkg.scripts['build'];
  });

  console.log('doing template rendering');

  // render App_Resources folder
  api.render(async () => {
    // eslint-disable-next-line prettier/prettier
    await renderDirectoryStructure(
      api,
      options,
      rootOptions,
      '.js',
      commonRenderOptions,
      './templates/App_Resources',
      genConfig.dirPathPrefix + genConfig.appResourcesPathModifier
    );
  });

  api.render(async () => {
    // render src directory
    await renderDirectoryStructure(
      api,
      options,
      rootOptions,
      genConfig.jsOrTs,
      commonRenderOptions,
      path.join('templates', genConfig.templateTypePathModifer, 'src'),
      genConfig.dirPathPrefix + 'src'
    );

    // add router statements to src/main.*s
    await vueRouterSetup(api, genConfig.dirPathPrefix, genConfig.jsOrTs);

    // add vuex statements to src/main.*s
    await vuexSetup(api, options, genConfig.dirPathPrefix, genConfig.jsOrTs, genConfig.nativeAppPathModifier);
  });

  api.onCreateComplete(async () => {
    // make changes to .gitignore
    gitignoreAdditions(api);

    // create files in ./ or ./vuexp-example
    writeRootFiles(api, options, genConfig.dirPathPrefix);

    // create nsconfig.json in ./ or ./vuexp-example
    nsconfigSetup(genConfig.dirPathPrefix, api.resolve('nsconfig.json'), genConfig.nativeAppPathModifier, genConfig.appResourcesPathModifier, options);

    // remove router config for projects that don't use vue-router
    if (!rootOptions.router) {
      fs.remove(genConfig.dirPathPrefix + genConfig.nativeAppPathModifier + 'router' + genConfig.jsOrTs, (err) => {
        if (err) throw err;
      });
    }

    if (api.hasPlugin('typescript')) {
      // we need to edit the tsconfig.json file in /app
      // for a Native only project to remove references to /src
      await tsconfigSetup(options, genConfig.dirPathPrefix, genConfig.nativeAppPathModifier);

      if (fs.existsSync(api.resolve('tslint.json'))) {
        await tslintSetup(genConfig.dirPathPrefix, api.resolve('tslint.json'), genConfig.tsExclusionArray);

        const baseDir = genConfig.nativeAppPathModifier;
        require('../lib/tslint')(
          {
            _: [`${baseDir}**/*.ts`, `${baseDir}**/*.vue`, `${baseDir}**/*.tsx`, 'tests/**/*.ts', 'tests/**/*.tsx']
          },
          api,
          false
        );
      }
    }

    // the main difference between New and Existing for this section is
    // that for New projects we are moving files around, but for
    // existing projects we are copying files into ./vuexp-example
    if (options.isNewProject) {
      // move type files out of src to ./ or ./vuexp-example
      if (api.hasPlugin('typescript')) {
        // Do these synchronously so in the event we delete the ./src directory in a native only
        // situation below we don't try and move a file that no longer exists
        try {
          fs.moveSync('./src/shims-tsx.d.ts', genConfig.dirPathPrefix + 'types/shims-tsx.d.ts', { overwrite: true });
          fs.moveSync('./src/shims-vue.d.ts', genConfig.dirPathPrefix + 'types/shims-vue.d.ts', { overwrite: true });
        } catch (err) {
          throw err;
        }
      }
    } else if (!options.isNewProject) {
      // copy type files from ./src to ./vuexp-example
      if (api.hasPlugin('typescript')) {
        fs.copy('./src/shims-tsx.d.ts', path.join(genConfig.dirPathPrefix, 'types/shims-tsx.d.ts'), (err) => {
          if (err) throw err;
        });

        fs.copy('./src/shims-vue.d.ts', path.join(genConfig.dirPathPrefix, 'types/shims-vue.d.ts'), (err) => {
          if (err) throw err;
        });
      }
    } else {
      // nothing to do here
    }

    if (api.hasPlugin('eslint')) {
      require('../lib/lint')({ silent: true }, api);
    }
  });
};

// setup vue-router options
// will not setup any vue-router options for native app
// for new projects it will write to changes as normal
// and for existing projects it will write  changes to the ./vuexp-example directory
const vueRouterSetup = (module.exports.vueRouterSetup = async (api, filePathPrefix, jsOrTs) => {
  try {
    if (api.hasPlugin('vue-router')) {
      api.injectImports(filePathPrefix.replace(/.\//, '') + 'src/main' + jsOrTs, `import router from './router';`);
      api.injectRootOptions(filePathPrefix.replace(/.\//, '') + 'src/main' + jsOrTs, `router`);
    }
  } catch (err) {
    throw err;
  }
});

// setup Vuex options
// for new projects it will write to changes as normal
// and for existing projects it will write  changes to the ./vuexp-example directory
const vuexSetup = (module.exports.vuexSetup = async (api, options, filePathPrefix, jsOrTs, nativeAppPathModifier) => {
  try {
    if (api.hasPlugin('vuex')) {
      api.injectImports(filePathPrefix.replace(/.\//, '') + 'src/main' + jsOrTs, `import store from './store';`);
      api.injectRootOptions(filePathPrefix.replace(/.\//, '') + 'src/main' + jsOrTs, `store`);

      // if we're using Nativescript-Vue-Web, then we have to modify the main.native file
      api.injectImports(filePathPrefix.replace(/.\//, '') + 'src/main.native' + jsOrTs, `import store from './store';`);
      api.injectRootOptions(filePathPrefix.replace(/.\//, '') + 'src/main.native' + jsOrTs, `store`);
    }
  } catch (err) {
    throw err;
  }
});

// write out babel.config.js options by adding options and replacing the base @vue/app
// for new projects it will write to the root of the project
// and for existing projects it will write it to the ./vuexp-example directory
const applyBabelConfig = (module.exports.applyBabelConfig = async (api, filePath) => {
  const babelReplaceOptions = {
    files: '',
    from: "  '@vue/app'",
    to: "  process.env.VUE_PLATFORM === 'web' ? '@vue/app' : {}, " + newline + "    ['@babel/env', { targets: { esmodules: true } }]"
  };

  try {
    babelReplaceOptions.files = filePath;

    api.render((files) => {
      files[filePath] = api.genJSConfig({
        plugins: ['@babel/plugin-syntax-dynamic-import'],
        presets: ['@vue/app']
      });
      // eslint-disable-next-line no-unused-vars
      replace(babelReplaceOptions, (err, changes) => {
        if (err) throw err;
      });
    });
  } catch (err) {
    throw err;
  }
});

// write out files in the root of the project
// this includes the environment files as well as a global types file for
// Typescript projects.  for new projects it will write files to the root of the project
// and for existing projects it will write it to the ./vuexp-example directory
const writeRootFiles = (module.exports.writeRootFiles = async (api, options, filePathPrefix) => {
  try {
    const envDevelopmentAndroid = 'NODE_ENV=development' + newline + 'VUE_APP_PLATFORM=android' + newline + 'VUE_APP_MODE=native';
    const envDevelopmentIOS = 'NODE_ENV=development' + newline + 'VUE_APP_PLATFORM=ios' + newline + 'VUE_APP_MODE=native';
    const envProductionAndroid = 'NODE_ENV=production' + newline + 'VUE_APP_PLATFORM=android' + newline + 'VUE_APP_MODE=native';
    const envProductionIOS = 'NODE_ENV=production' + newline + 'VUE_APP_PLATFORM=ios' + newline + 'VUE_APP_MODE=native';

    fs.writeFileSync(
      filePathPrefix + '.env.development.android',
      envDevelopmentAndroid,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFileSync(
      filePathPrefix + '.env.development.ios',
      envDevelopmentIOS,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFileSync(
      filePathPrefix + '.env.production.android',
      envProductionAndroid,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFileSync(
      filePathPrefix + '.env.production.ios',
      envProductionIOS,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );

    // only write these out if we are also developing for the web
    console.log('dual components env files');
    const envDevelopmentWeb = 'NODE_ENV=development' + newline + 'VUE_APP_PLATFORM=web' + newline + 'VUE_APP_MODE=web';
    const envProductionWeb = 'NODE_ENV=production' + newline + 'VUE_APP_PLATFORM=web' + newline + 'VUE_APP_MODE=web';

    fs.writeFileSync(
      filePathPrefix + '.env.development.web',
      envDevelopmentWeb,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );
    fs.writeFileSync(
      filePathPrefix + '.env.production.web',
      envProductionWeb,
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) throw err;
      }
    );

    // only write this out if we are using typescript
    if (api.hasPlugin('typescript')) {
      // this file is ultimately optional if you don't use any process.env.VARIABLE_NAME references in your code
      const globalTypes =
        'declare const TNS_ENV: string;' + newline + 'declare const TNS_APP_PLATFORM: string;' + newline + 'declare const TNS_APP_MODE: string;';
      fs.outputFileSync(
        filePathPrefix + 'types/globals.d.ts',
        globalTypes,
        {
          encoding: 'utf8'
        },
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    throw err;
  }
});

// write .gitignore additions for native app exemptions
// will make changes to the root .gitignore file regardless of new or exisiting project
const gitignoreAdditions = (module.exports.gitignoreAdditions = async (api) => {
  try {
    let gitignoreContent;
    const gitignorePath = api.resolve('.gitignore');
    const gitignoreAdditions = newline + '# NativeScript application' + newline + 'hooks' + newline + 'platforms' + newline + 'webpack.config.js';

    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, {
        encoding: 'utf8'
      });
    } else {
      gitignoreContent = '';
    }

    if (gitignoreContent.indexOf(gitignoreAdditions) === -1) {
      gitignoreContent += gitignoreAdditions;

      fs.writeFileSync(
        gitignorePath,
        gitignoreContent,
        {
          encoding: 'utf8'
        },
        (err) => {
          if (err) throw err;
        }
      );
    }
  } catch (err) {
    throw err;
  }
});

// setup nsconfig.json file.  for new projects it will write to the root of the project
// and for existing projects it will write it to the ./vuexp-example directory
const nsconfigSetup = (module.exports.nsconfigSetup = async (dirPathPrefix, nsconfigPath, nativeAppPathModifier, appResourcesPathModifier, options) => {
  let nsconfigContent = '';

  try {
    if (fs.existsSync(nsconfigPath)) {
      nsconfigContent = JSON.parse(
        fs.readFileSync(nsconfigPath, {
          encoding: 'utf8'
        })
      );
    } else {
      nsconfigContent = {};
    }

    nsconfigContent.appPath = nativeAppPathModifier.slice(0, -1);
    nsconfigContent.appResourcesPath = appResourcesPathModifier;

    if (options.isNewProject) {
      nsconfigContent.useLegacyWorkflow = false;
    }

    fs.writeFileSync(
      dirPathPrefix + 'nsconfig.json',
      JSON.stringify(nsconfigContent, null, 2),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.error(err);
      }
    );
  } catch (err) {
    throw err;
  }
});

// setup tslintSetup
const tslintSetup = (module.exports.tslintSetup = async (dirPathPrefix, tslintPath, tsExclusionArray) => {
  let tslintContent = '';

  try {
    if (fs.existsSync(tslintPath)) {
      tslintContent = JSON.parse(
        fs.readFileSync(tslintPath, {
          encoding: 'utf8'
        })
      );
    } else {
      return;
    }

    // create arrays if they aren't already in tslint.json
    if (tslintContent.linterOptions.exclude === undefined) tslintContent.linterOptions.exclude = new Array();
    if (tslintContent.exclude === undefined) tslintContent.exclude = new Array();

    // add items into exclude arrays, but only if they don't already exist
    for (let item of tsExclusionArray) {
      if (!tslintContent.linterOptions.exclude.includes(item + '/**')) tslintContent.linterOptions.exclude.push(item + '/**');

      if (!tslintContent.exclude.includes(item)) tslintContent.exclude.push(item);
    }

    fs.writeFileSync(
      dirPathPrefix + 'tslint.json',
      JSON.stringify(tslintContent, null, 2),
      {
        encoding: 'utf8'
      },
      (err) => {
        if (err) console.error(err);
      }
    );
  } catch (err) {
    throw err;
  }
});

// setup tsconfig for native only projects
const tsconfigSetup = (module.exports.tsconfigSetup = async (options, dirPathPrefix, nativeAppPathModifier) => {
  try {
    // setup the ability to edit the tsconfig.json file in the root of the project
    let tsConfigContent = '';
    let tsConfigPath = path.join(dirPathPrefix, 'tsconfig.json');

    if (fs.existsSync(tsConfigPath)) {
      tsConfigContent = fs.readJsonSync(tsConfigPath, {
        encoding: 'utf8'
      });
    } else {
      return;
    }

    tsConfigContent.compilerOptions.noImplicitAny = false;
    // // // tsConfigContent.compilerOptions.types = [];

    // edit types attribute to fix build
    tsConfigContent.compilerOptions.types = ['node'];

    // edit some of the options in compilerOptions.paths object array
    tsConfigContent.compilerOptions.paths['@/*'] = [nativeAppPathModifier + '*'];
    tsConfigContent.compilerOptions.paths['assets/*'] = [nativeAppPathModifier + 'assets/*'];
    tsConfigContent.compilerOptions.paths['fonts/*'] = [nativeAppPathModifier + 'fonts/*'];
    tsConfigContent.compilerOptions.paths['components/*'] = [nativeAppPathModifier + 'components/*'];
    tsConfigContent.compilerOptions.paths['styles/*'] = [nativeAppPathModifier + 'styles/*'];

    // add the types directory into the config
    if (!tsConfigContent.include.includes('types/**/*.d.ts')) tsConfigContent.include.push('types/**/*.d.ts');

    // add items into the include array
    if (!tsConfigContent.include.includes(nativeAppPathModifier + '**/*.ts')) tsConfigContent.include.push(nativeAppPathModifier + '**/*.ts');
    if (!tsConfigContent.include.includes(nativeAppPathModifier + '**/*.tsx')) tsConfigContent.include.push(nativeAppPathModifier + '**/*.tsx');
    if (!tsConfigContent.include.includes(nativeAppPathModifier + '**/*.vue')) tsConfigContent.include.push(nativeAppPathModifier + '**/*.vue');

    // add unit test directories into include array
    if (fs.existsSync(path.join(dirPathPrefix, 'tests'))) {
      if (!tsConfigContent.include.includes('tests/**/*.ts')) tsConfigContent.include.push('tests/**/*.ts');
      if (!tsConfigContent.include.includes('tests/**/*.tsx')) tsConfigContent.include.push('tests/**/*.tsx');
    }

    tsConfigContent.compilerOptions.paths['src/*'] = [nativeAppPathModifier + '*'];

    fs.writeJsonSync(tsConfigPath, tsConfigContent, {
      spaces: 2,
      encoding: 'utf8'
    });
  } catch (err) {
    throw err;
  }
});

// Use the generator's render function to render individual files passed in from an array.
// Will iterate through the array and then construct and object that is passed to render()
const renderFilesIndividually = (module.exports.renderFilesIndividually = async (
  api,
  options,
  jsOrTs,
  files,
  commonRenderOptions,
  srcPathPrefix,
  destPathPrefix
) => {
  try {
    const obj = {};

    for (let file of files) {
      let newFile = file;

      // renames .js files to .ts
      if (file.slice(-3) === '.js' || file.slice(-3) === '.ts') newFile = file.substring(0, file.length - 3) + jsOrTs;

      if ((!api.hasPlugin('typescript') && file !== 'tsconfig.json') || api.hasPlugin('typescript'))
        obj[path.join(destPathPrefix, newFile)] = path.join(srcPathPrefix, file);
    }

    api.render(obj, commonRenderOptions);
  } catch (err) {
    throw err;
  }
});

// Good chunk of the following code comes from vue-cli/packages/@vue/cli/lib/GeneratorAPI.js
// Specifically the render function.  We want to render the entire directory, but passing just
// the directory to render doesn't give us the ability to tell where to put it as the cli's render
// function lacks a simple directory in and directory out option.  So, we have to get the contents
// of the passed in directory and then render each file individually to where we want it via
// the render function's isObject(source) option that we use in our renderFilesIndividually function.

// eslint-disable-next-line prettier/prettier
// eslint-disable-next-line max-len
const renderDirectoryStructure = (module.exports.renderDirectoryStructure = async (
  api,
  options,
  rootOptions,
  jsOrTs,
  commonRenderOptions,
  srcPathPrefix,
  destPathPrefix
) => {
  try {
    const files = new Array();
    const _files = await getAllFilesInDirStructure(srcPathPrefix, __dirname);

    for (const rawPath of _files) {
      // // // let filename = path.basename(rawPath);
      // // // // dotfiles are ignored when published to npm, therefore in templates
      // // // // we need to use underscore instead (e.g. "_gitignore")
      // // // if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
      // // // 	filename = `.${filename.slice(1)}`;
      // // // }
      // // // if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
      // // // 	filename = `${filename.slice(1)}`;
      // // // }

      // only import styles based on the type of preprocessor you do or do not have.
      // Essentially acts as filter as you iterate through the list of files in a directory structure
      if (
        rawPath.slice(-4) === '.css' ||
        rawPath.slice(-5) === '.scss' ||
        rawPath.slice(-5) === '.sass' ||
        rawPath.slice(-5) === '.less' ||
        rawPath.slice(-5) === '.styl' ||
        rawPath.slice(-7) === '.stylus'
      ) {
        if (rootOptions.cssPreprocessor) {
          switch (rootOptions.cssPreprocessor) {
            case 'scss':
              if (rawPath.slice(-5) === '.scss' || rawPath.slice(-5) === '.sass') files.push(rawPath);
              break;
            case 'sass':
              if (rawPath.slice(-5) === '.scss' || rawPath.slice(-5) === '.sass') files.push(rawPath);
              break;
            case 'dart-sass':
              if (rawPath.slice(-5) === '.scss' || rawPath.slice(-5) === '.sass') files.push(rawPath);
              break;
            case 'less':
              if (rawPath.slice(-5) === '.less') files.push(rawPath);
              break;
            case 'stylus':
              if (rawPath.slice(-5) === '.styl' || rawPath.slice(-7) === '.stylus') files.push(rawPath);
              break;
          }
        } else {
          if (rawPath.slice(-4) === '.css') files.push(rawPath);
        }
      } else {
        files.push(rawPath);
      }
    }
    renderFilesIndividually(api, options, jsOrTs, files, commonRenderOptions, srcPathPrefix, destPathPrefix);
  } catch (err) {
    throw err;
  }
});

// THIS FUNCTION MAY NOT LONGER BE NEEDED AS OF 0.0.16
// WILL KEEP THIS COMMENTED OUT CODE IN FOR A FEW OF RELEASES
// // extract callsite file location using error stack
// const extractCallDir = (module.exports.extractCallDir = () => {
//   try {
//     const obj = {};
//     console.log('__dirname - ', __dirname);
//     Error.captureStackTrace(obj);
//     const callSite = obj.stack.split('\n')[3];
//     console.log('callSite - ', callSite);

//     let { fileName } = /(?<fileName>[^(]+):[0-9]+:[0-9]+/.exec(callSite).groups;
//     console.log('fileName 1 - ', fileName);

//     if (fileName.indexOf('file') >= 0) {
//       fileName = new URL(fileName).pathname;
//     }

//     if (fileName.indexOf(fileName.length - 1) === ')') {
//       fileName = fileName.splice(0, fileName.length - 1);
//     }

//     console.log(`fileName 2 - '`, fileName + `'`);

//     fileName = fileName.replace('at ', '');
//     console.log(`fileName 3 - '`, fileName) + `'`;

//     let dirname = path.dirname(fileName);
//     console.log(`dirname - '`, dirname + `'`);

//     return __dirname;
//   } catch (err) {
//     throw err;
//   }
// });

// utility function used to get all the files in a directory structure.  is recursive in nature due to globby
const getAllFilesInDirStructure = (module.exports.replaceInFile = async (srcPathPrefix, baseDir) => {
  try {
    const source = path.resolve(baseDir, srcPathPrefix);
    const globby = require('globby');
    const _files = await globby(['**/*'], {
      cwd: source
    });

    return _files;
  } catch (error) {
    console.log(error);
  }
});

// utility function used to remove sections of strings from files
const replaceInFile = (module.exports.replaceInFile = async (options) => {
  try {
    await replace(options);
  } catch (error) {
    console.error('Error occurred:', error);
  }
});
