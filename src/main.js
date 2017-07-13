import '../static/styles.css';
import 'babel-polyfill';
import * as Bluebird from 'bluebird';
import { PLATFORM } from 'aurelia-pal';
import 'materialize-css';

// remove out if you don't want a Promise polyfill
// (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin(PLATFORM.moduleName('aurelia-materialize-bridge'),
      b => b.useAll());

  // Anyone wanting to use HTMLImports to load views,
  // will need to install the following plugin.
  // aurelia.use.plugin(
  //   PLATFORM.moduleName('aurelia-html-import-template-loader'));

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
