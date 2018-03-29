'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const md5 = require('md5');

module.exports = function (defaults) {
  const fingerprintHash = md5(Date.now());
  const config = defaults.project.config(process.env.EMBER_ENV || 'development');
  let app = new EmberApp(defaults, {
    fingerprint: {
      extensions: ['js', 'css', 'map'], // list of extensions to fingerprint
      customHash: fingerprintHash
    },
    'ember-service-worker': {
      // registrationStrategy: 'inline',
      versionStrategy: 'every-build',
      enabled: config.environment === 'production' // change based on Environment dev/prod/staging
    },
    'esw-index': {
      // location: 'app-shell.html', //default is index.html
      // excludeScope: [/\/non-ember-app(\/.*)?$/, /\/another-app(\/.*)?$/],
      // includeScope: [/\/dashboard(\/.*)?$/, /\/admin(\/.*)?$/],
      version: fingerprintHash
    },
    'asset-cache': {
      include: [
        'assets/**/*'
      ],
      exclude: [
        // '**/*.map'
      ],
      manual: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
      ],
      version: fingerprintHash,
      // prepend: 'https://cdn.example.com/',
      // requestMode: 'cors',
      // lenientErrors: false
    },
    'esw-cache-fallback': {
      patterns: [
        '/api/v1/(.+)',
        'https://fonts.googleapis.com/(.+)',
        'https://fonts.gstatic.com/(.+)',
      ],
      version: fingerprintHash
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
